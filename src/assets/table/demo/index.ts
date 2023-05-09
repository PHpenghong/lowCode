export const demoCol = [
  {
    title: '序号',
    dataIndex: 'index',
    ellipsis: true,
    width: 80,
    key: 'index',
    align: 'center'
  },
  {
    key: 'name',
    title: '昵称',
    width: '',
    ellipsis: true,
    align: 'center',
    dataIndex: 'name'
  },
  {
    key: 'email',
    title: '邮箱',
    width: '',
    ellipsis: true,
    align: 'center',
    dataIndex: 'email'
  },
  {
    key: 'phone',
    title: '手机',
    width: '',
    ellipsis: true,
    align: 'center',
    dataIndex: 'phone'
  },
  {
    key: 'actions',
    title: '操作',
    width: '',
    ellipsis: true,
    align: 'center',
    dataIndex: 'actions'
  }
]

export const demoParam = (page: number, pageSize: number, param: any) => ({
  page,
  page_size: pageSize,
  ...param
})

export const demoRes = (res: any) => {
  let data = []
  let total = 0
  if (res.code == 0) {
    data = res.data.data || []
    total = res.data.total || 0
  } else {
    // codeErr(res)
  }
  return [data, total]
}
