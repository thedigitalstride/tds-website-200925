export interface ProcessedSVG {
  optimized: string
  original: string
  metadata: {
    width?: number
    height?: number
    viewBox?: string
    pathCount: number
    fileSize: number
  }
}