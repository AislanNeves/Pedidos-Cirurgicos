import { reqAPI } from '../api'
import { REQ_URLS } from '../../constants/surgery-order.constants'

export const retrieveSurgeryOrders = async (pageIndex = 1) => {
  try {
    const method = 'get'
    const url = REQ_URLS.SURGERY_ORDER.GET.PAGE + pageIndex
    const response = await reqAPI(method, url, null)

    return response
  } catch (err) {
    console.log('Error: ', err)
  }
}

export const createSurgeryOrder = async (data: any) => {
  try {
    const method = 'post'
    const url = REQ_URLS.SURGERY_ORDER.POST.SURGERY_ORDER
    const response = await reqAPI(method, url, data)

    return response
  } catch (err) {
    console.log('Error: ', err)
  }
}

export const deleteSurgeryOrder = async (id: number) => {
  try {
    const method = 'delete'
    const url = REQ_URLS.SURGERY_ORDER.DELETE.SURGERY_ORDER + id
    const response = await reqAPI(method, url, null)

    return response
  } catch (err) {
    console.log('Error: ', err)
  }
}

export const updateSurgeryOrder = async (data: any) => {
  try {
    const method = 'put'
    const url = REQ_URLS.SURGERY_ORDER.PUT.SURGERY_ORDER
    const response = await reqAPI(method, url, data)

    return response
  } catch (err) {
    console.log('Error: ', err)
  }
}

export const retrieveRoomsByHospitalId = async (hospitalId: string) => {
  try {
    const method = 'get'
    const url = REQ_URLS.ROOMS.GET.BY_HOSPITAL_ID + hospitalId
    const response = await reqAPI(method, url, null)

    return response
  } catch (err) {
    console.log('Error: ', err)
  }
}

export const retrieveRooms = async () => {
  try {
    const method = 'get'
    const url = REQ_URLS.ROOMS.GET.ROOMS
    const response = await reqAPI(method, url, null)

    return response
  } catch (err) {
    console.log('Error: ', err)
  }
}

export const retrieveRoomByRoomId = async (roomId: any) => {
  try {
    const method = 'get'
    const url = REQ_URLS.ROOMS.GET.BY_ROOM_ID + roomId
    const response = await reqAPI(method, url, null)

    return response
  } catch (err) {
    console.log('Error: ', err)
  }
}

export const retrieveHospitals = async () => {
  try {
    const method = 'get'
    const url = REQ_URLS.HOSPITALS.GET.HOSPITALS
    const response = await reqAPI(method, url, null)

    return response
  } catch (err) {
    console.log('Error: ', err)
  }
}

export const retrieveProcedures = async () => {
  try {
    const method = 'get'
    const url = REQ_URLS.PROCEDURES.GET.PROCEDURES
    const response = await reqAPI(method, url, null)

    return response
  } catch (err) {
    console.log('Error: ', err)
  }
}
