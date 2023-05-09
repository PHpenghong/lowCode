import requestDecorator from '@/utils/RequestDecorator'
import { BGCONF_API, PATCH, POST, GET } from '../const'

// 获取文件
export const getFiles = (data: any) =>
  requestDecorator({
    url: `${BGCONF_API}files/images`,
    method: GET,
    data,
    header: {}
  })
// 上传文件
export const uploadFIle = (data: any, header: any) =>
  requestDecorator({
    url: `${BGCONF_API}files/images`,
    method: POST,
    data,
    header
  })
// 获取配置
export const getConf = (data: any) =>
  requestDecorator({
    url: `${BGCONF_API}conf`,
    method: GET,
    data,
    header: {}
  })

// 修改配置
export const setConf = (data: any) =>
  requestDecorator({
    url: `${BGCONF_API}conf`,
    method: PATCH,
    data,
    header: {}
  })

// 服务状态
export const getService = (data: any) =>
  requestDecorator({
    url: `${BGCONF_API}service`,
    method: GET,
    data,
    header: {}
  })

// 获取网络信息
export const getNet = (data: any) =>
  requestDecorator({
    url: `${BGCONF_API}net`,
    method: GET,
    data,
    header: {}
  })

// 修改网络信息
export const setNet = (data: any) =>
  requestDecorator({
    url: `${BGCONF_API}net`,
    method: PATCH,
    data,
    header: {}
  })
