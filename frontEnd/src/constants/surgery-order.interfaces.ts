export interface SurgeryOrderFormData {
  id: number
  roomId: string
  proceduresId: string
  doctor: string
  patient: string
  hospitalId: string
  created_at: string
  surgeryDate: string
  observations: string
}

export interface SurgeryOrderType {
  id: number
  roomId: number
  proceduresId: number
  doctor: string
  patient: string
  hospitalId: number
  created_at: string
  surgeryDate: string
  observations: string
}

export interface HospitalType {
  id: number
  name: string
}

export interface RoomType {
  id: number
  hospitalId: number
  name: string
}

export interface ProcedureType {
  id: number
  name: string
}
