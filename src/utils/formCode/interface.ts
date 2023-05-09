interface selectOption {
  key: string
  label: string
  options: any[]
}

export interface Format {
  key: string
  name: string
  label: string
  itemType: string
  tag: string
  slot?: boolean
  slotName?: string
  disabled?: boolean
  placeholder?: string
  selectOption?: selectOption | {}
  style?: { [key: string]: any }
}
