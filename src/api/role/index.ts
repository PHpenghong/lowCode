import { POST, ROLE_API, GET, DELETE } from '../const'
import requestDecorator from '@/utils/RequestDecorator'

export const getRole = () =>
  requestDecorator({
    url: `${ROLE_API}getRole`,
    method: POST,
    data: {},
    config: {}
  })

export const save = (data: any) =>
  requestDecorator({
    url: `${ROLE_API}save`,
    method: POST,
    data,
    config: {}
  })

export const getRouterRole = (data: any) =>
  requestDecorator({
    url: `${ROLE_API}getRouterRole`,
    method: POST,
    data,
    config: {}
  })

export const getRouter = (data: any) =>
  requestDecorator({
    url: `${ROLE_API}getRouter`,
    method: GET,
    data,
    config: {}
  })

export const add = (data: any) =>
  requestDecorator({
    url: `${ROLE_API}add`,
    method: POST,
    data,
    config: {}
  })
export const edit = (data: any) =>
  requestDecorator({
    url: `${ROLE_API}edit`,
    method: POST,
    data,
    config: {}
  })

export const del = (data: any) =>
  requestDecorator({
    url: `${ROLE_API}del`,
    method: DELETE,
    data,
    config: {}
  })
