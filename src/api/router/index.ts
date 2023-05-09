import { POST, ROUTER_API, GET, DELETE } from '../const'
import requestDecorator from '@/utils/RequestDecorator'

export const save = (data: any) =>
  requestDecorator({
    url: `${ROUTER_API}save`,
    method: POST,
    data,
    config: {}
  })

export const getList = () =>
  requestDecorator({
    url: `${ROUTER_API}getList`,
    method: GET,
    data: {},
    config: {}
  })

export const getRouter = () =>
  requestDecorator({
    url: `${ROUTER_API}getRouter`,
    method: GET,
    data: {},
    config: {}
  })

export const edit = (data: any) =>
  requestDecorator({
    url: `${ROUTER_API}edit`,
    method: POST,
    data,
    config: {}
  })

export const del = (data: any) =>
  requestDecorator({
    url: `${ROUTER_API}del`,
    method: DELETE,
    data,
    config: {}
  })
