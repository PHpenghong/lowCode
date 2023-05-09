import requestDecorator from '@/utils/RequestDecorator'
import { USER_API, POST } from '../const'

export const login = (data: any) =>
  requestDecorator({
    url: `${USER_API}login`,
    method: POST,
    data,
    config: {}
  })

export const register = (data: any) =>
  requestDecorator({
    url: `${USER_API}register`,
    method: POST,
    data,
    config: {}
  })

export const getUser = () =>
  requestDecorator({
    url: `${USER_API}getUser`,
    method: POST,
    data: {},
    config: {}
  })

export const logout = (data: any) =>
  requestDecorator({
    url: `${USER_API}logout`,
    method: POST,
    data,
    config: {}
  })

export const uploadAvatar = (data: any, config: any) =>
  requestDecorator({
    url: `${USER_API}uploadAvatar`,
    method: POST,
    data,
    config
  })

export const search = (data: any) =>
  requestDecorator({
    url: `${USER_API}search`,
    method: POST,
    data
  })
