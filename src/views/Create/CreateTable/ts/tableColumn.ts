interface Slots {
  customRender: string
}

export interface EditTableColumn {
  title: string
  id?: string
  key: string
  dataIndex?: string
  align?: string
  width?: string | number
  slots?: Slots
  ellipsis?: boolean
}

export const editTableColumn: EditTableColumn[] = [
  {
    title: '标题',
    key: 'title',
    dataIndex: 'title',
    align: 'center',
    // width: number,
    // slots: { customRender: 'title' },
    ellipsis: true
  },
  {
    title: 'Key',
    key: 'key',
    dataIndex: 'key',
    align: 'center',
    // width: number,
    // slots: { customRender: 'key' },
    ellipsis: true
  },
  {
    title: '对齐方式',
    key: 'align',
    dataIndex: 'align',
    align: 'center',
    // width: number,
    // slots: { customRender: 'align' },
    ellipsis: true
  },
  {
    title: '宽度',
    key: 'width',
    dataIndex: 'width',
    align: 'center',
    // width: number,
    // slots: { customRender: 'width' },
    ellipsis: true
  },
  {
    title: '是否省略',
    key: 'ellipsis',
    dataIndex: 'ellipsis',
    align: 'center',
    // width: number,
    // slots: { customRender: 'ellipsis' },
    ellipsis: true
  },
  {
    title: '操作',
    key: 'actions',
    dataIndex: 'actions',
    align: 'center',
    width: 200,
    // slots: { customRender: 'actions' },
    ellipsis: true
  }
]
