'use client'

import { useEffect, useRef, useState } from 'react'
import { setOptions, importLibrary } from '@googlemaps/js-api-loader'
import { cn } from '@/utilities/ui'

type GoogleMapClientProps = {
  latitude: number
  longitude: number
  zoom?: number | null
  markerTitle?: string | null
  aspectRatio?: string | null
  customHeight?: number | null
  className?: string
}

export const GoogleMapClient: React.FC<GoogleMapClientProps> = ({
  latitude,
  longitude,
  zoom = 15,
  markerTitle,
  aspectRatio = '16:9',
  customHeight = 400,
  className,
}) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const mapInstanceRef = useRef<any>(null)
  const markerRef = useRef<any>(null)

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  // Calculate container height based on aspect ratio
  const getContainerHeight = () => {
    if (aspectRatio === 'custom') {
      return `${customHeight}px`
    }

    const aspectRatios: Record<string, string> = {
      '16:9': '56.25%', // 9/16 * 100
      '4:3': '75%', // 3/4 * 100
      square: '100%', // 1/1 * 100
    }

    return aspectRatios[aspectRatio || '16:9'] || '56.25%'
  }

  useEffect(() => {
    if (!mapRef.current || !apiKey) {
      if (!apiKey) {
        setError('Google Maps API key is not configured')
        setIsLoading(false)
      }
      return
    }

    let isMounted = true

    const initMap = async () => {
      try {
        // Set API options using the new functional API
        setOptions({
          key: apiKey!,
        })

        // Always import maps and marker libraries (required for map display)
        const [mapsLibrary, markerLibrary] = await Promise.all([
          importLibrary('maps'),
          importLibrary('marker'),
        ])

        const { Map } = mapsLibrary as { Map: new (element: HTMLElement, options?: any) => any }
        const { AdvancedMarkerElement } = markerLibrary as {
          AdvancedMarkerElement: new (options?: any) => any
        }

        if (!isMounted || !mapRef.current) return

        // Create map using the imported Map class
        const map = new Map(mapRef.current, {
          center: { lat: latitude, lng: longitude },
          zoom: zoom || 15,
          mapId: 'roadmap',
          disableDefaultUI: false,
        })

        mapInstanceRef.current = map

        // Create marker using AdvancedMarkerElement (recommended by Google)
        const marker = new AdvancedMarkerElement({
          map,
          position: { lat: latitude, lng: longitude },
          title: markerTitle || undefined,
        })

        markerRef.current = marker

        setIsLoading(false)
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load map')
          setIsLoading(false)
        }
      }
    }

    initMap()

    return () => {
      isMounted = false
      if (markerRef.current) {
        markerRef.current.setMap(null)
      }
      mapInstanceRef.current = null
      markerRef.current = null
    }
  }, [latitude, longitude, zoom, markerTitle, apiKey])

  const containerHeight = getContainerHeight()

  if (!apiKey) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-secondary p-8 rounded-xl border border-outline',
          className,
        )}
        style={{ minHeight: containerHeight }}
      >
        <div className="text-center">
          <p className="text-secondary mb-2">Google Maps API key is not configured</p>
          <p className="text-sm text-utility-gray-400">
            Please add <code className="bg-primary px-2 py-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your
            environment variables.
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    const googleMapsUrl = `https://www.google.com/maps/@${latitude},${longitude},${zoom}z`

    return (
      <div
        className={cn(
          'flex items-center justify-center bg-secondary p-8 rounded-xl border border-outline',
          className,
        )}
        style={{ minHeight: containerHeight }}
      >
        <div className="text-center">
          <p className="text-secondary mb-2">Unable to load map</p>
          <p className="text-sm text-utility-gray-400 mb-4">{error}</p>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-dark transition-colors underline"
          >
            View on Google Maps
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('relative w-full', className)}>
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-secondary rounded-xl border border-outline z-10"
          style={{ minHeight: containerHeight }}
        >
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent mb-2"></div>
            <p className="text-sm text-utility-gray-400">Loading map...</p>
          </div>
        </div>
      )}
      <div
        ref={mapRef}
        className={cn('w-full rounded-xl overflow-hidden', isLoading && 'opacity-0')}
        style={{ height: containerHeight, minHeight: '200px' }}
      />
    </div>
  )
}

