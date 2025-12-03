import type { GoogleMapBlock as GoogleMapBlockProps } from '@/payload-types'
import { GoogleMapClient } from './GoogleMapClient'
import { cn } from '@/utilities/ui'

type Props = GoogleMapBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const GoogleMapBlock: React.FC<Props> = ({ className, disableInnerContainer, ...props }) => {
  // Ensure coordinates are provided (required fields in Payload)
  if (props.latitude == null || props.longitude == null) {
    return (
      <div className={cn('p-8 text-center text-secondary', { container: !disableInnerContainer })}>
        <p>Map coordinates are required. Please configure latitude and longitude.</p>
      </div>
    )
  }

  return (
    <div
      className={cn({
        container: !disableInnerContainer,
      })}
    >
      <GoogleMapClient
        latitude={props.latitude}
        longitude={props.longitude}
        zoom={props.zoom || 15}
        markerTitle={props.markerTitle || null}
        aspectRatio={props.aspectRatio || '16:9'}
        customHeight={props.customHeight || 400}
        className={className}
      />
    </div>
  )
}

