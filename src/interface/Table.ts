interface slotsInterface {
  customRender: string
}

export interface tableColumnsInterface {
  title?: string
  dataIndex: string | number
  key: string | number
  slots?: slotsInterface
  align?: string
  width?: number
  filters?: any
  onFilter?: any
  ellipsis?: boolean
}

export interface pageInterface {
  current: number
  pageSize: number
  total: number
  showSizeChanger?: boolean
  showSizeChange?: any
}
