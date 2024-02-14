import { SurgeryOrderFormData } from './surgery-order.interfaces'

export const SurgeryOrderDefaultValues: SurgeryOrderFormData = {
  id: 0,
  roomId: '',
  proceduresId: '',
  doctor: '',
  patient: '',
  hospitalId: '',
  surgeryDate: '',
  observations: '',
  created_at: '',
}
