export interface GridAttr {
  label: string
  explain: string
  type: string
  default: string
  version: string
}

export interface GridEvent {
  label: string
  explain: string
  callback: string
  version: string
}

export interface GridSlot {
  label: string
  explain: string
  text?: string
  version: string
}

export interface GridMethod {
  label: string
  explain: string
  version: string
}

export type GridType = 'Attr' | 'Slot' | 'Event' | 'Method'

export interface ApiData {
  title: string
  text?: string
  type: GridType
  light?: boolean
  grid: (GridAttr | GridSlot | GridEvent | GridMethod)[]
}
;[]

export interface ComData {
  title?: string
  name: string
  fileName: string
  content: string
}
