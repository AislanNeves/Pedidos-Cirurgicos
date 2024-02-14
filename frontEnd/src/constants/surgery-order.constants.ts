const BASE_SURGERY_ORDER = '/surgery-orders'
const BASE_PROCEDURES = '/procedures'
const BASE_ROOMS = '/rooms'
const BASE_HOSPITALS = '/hospitals'

export const REQ_URLS = {
  SURGERY_ORDER: {
    GET: {
      PAGE: BASE_SURGERY_ORDER + '/?page=',
    },
    POST: {
      SURGERY_ORDER: BASE_SURGERY_ORDER,
    },
    PUT: { SURGERY_ORDER: BASE_SURGERY_ORDER },
    DELETE: { SURGERY_ORDER: BASE_SURGERY_ORDER + '/?surgeryOrderId=' },
  },
  ROOMS: {
    GET: {
      ROOMS: BASE_ROOMS + '/all',
      BY_ROOM_ID: BASE_ROOMS + '/first/?roomId=',
      BY_HOSPITAL_ID: BASE_ROOMS + '/?hospitalId=',
    },
  },
  HOSPITALS: {
    GET: {
      HOSPITALS: BASE_HOSPITALS,
    },
  },
  PROCEDURES: {
    GET: { PROCEDURES: BASE_PROCEDURES },
  },
}
