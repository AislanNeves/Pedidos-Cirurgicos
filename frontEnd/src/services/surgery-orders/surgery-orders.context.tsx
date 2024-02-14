import React, { ReactNode } from 'react'

import {
  createSurgeryOrder,
  deleteSurgeryOrder,
  retrieveHospitals,
  retrieveProcedures,
  retrieveRoomByRoomId,
  retrieveRooms,
  retrieveRoomsByHospitalId,
  retrieveSurgeryOrders,
  updateSurgeryOrder,
} from './surgery-order.service'
import { stringToDateFormat } from '../../utils/mappers/date.mappers'
import {
  RoomType,
  SurgeryOrderFormData,
  SurgeryOrderType,
} from '../../constants/surgery-order.interfaces'

interface SurgeryOrderContextType {
  handleFormSubmitUpdate: (
    surgeryOrder: SurgeryOrderFormData,
  ) => Promise<boolean>
  handleFormSubmitCreate: (
    surgeryOrder: SurgeryOrderFormData,
  ) => Promise<boolean>
  handleLoadListRoomsByHospitalId: (
    hospitalId: string,
  ) => Promise<RoomType[] | boolean>
  handleLoadListSurgeryOrders: (
    pageIndex: number,
  ) => Promise<SurgeryOrderType | boolean>
  handleLoadSurgeryOrder: (
    order: SurgeryOrderType,
  ) => Promise<SurgeryOrderFormData | undefined>
  handleLoadFormFields: () => any
  handleDeleteSurgeryOrder: (id: number) => Promise<boolean | undefined>
}

interface SurgeryOrderContextProps {
  children: ReactNode
}

export const SurgeryOrdersContext = React.createContext(
  {} as SurgeryOrderContextType,
)

export const SurgeryOrdersContextProvider = ({
  children,
}: SurgeryOrderContextProps) => {
  const loadListProcedures = async () => {
    try {
      const response = await retrieveProcedures()

      if (response) {
        const { data }: any = response
        const proceduresList = data

        return proceduresList
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  const loadListRooms = async () => {
    try {
      const response = await retrieveRooms()

      if (response) {
        const { data }: any = response
        const listRooms = data

        return listRooms
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  const loadListHospitals = async () => {
    try {
      const response = await retrieveHospitals()

      if (response) {
        const { data }: any = response
        const hospitalsList = data

        return hospitalsList
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  const handleLoadFormFields = async () => {
    try {
      const hospitalsList = await loadListHospitals()
      const proceduresList = await loadListProcedures()
      const roomsList = await loadListRooms()

      return {
        hospitalsList,
        proceduresList,
        roomsList,
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  const handleLoadListRoomsByHospitalId = async (hospitalId: string) => {
    try {
      const response = await retrieveRoomsByHospitalId(hospitalId)

      if (response) {
        const { data }: any = response
        const roomsList = data

        return roomsList
      } else {
        return false
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  const handleLoadSurgeryOrder = async (order: SurgeryOrderType) => {
    try {
      const response = await retrieveRoomByRoomId(order.roomId)

      if (response && response.status === 200) {
        const { hospitalId }: any = response.data

        const surgeryDate = stringToDateFormat(order.surgeryDate)

        const surgeryOrder = {
          ...order,
          proceduresId: order.proceduresId.toString(),
          roomId: order.roomId.toString(),
          hospitalId: hospitalId.toString(),
          surgeryDate,
        }

        return surgeryOrder
      }
    } catch (err) {
      console.log('Error: ', err)
    }
  }

  const handleLoadListSurgeryOrders = async (pageIndex) => {
    try {
      const response = await retrieveSurgeryOrders(pageIndex)

      if (response) {
        const { data }: any = response
        const surgeryOrderList = data

        return surgeryOrderList
      }
    } catch (err) {
      console.log('Error', err)

      return false
    }
  }

  const handleDeleteSurgeryOrder = async (id: number) => {
    try {
      const response = await deleteSurgeryOrder(id)

      if (response && response.status === 200) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.log('Error: ', err)
    }
  }

  const handleFormSubmitCreate = async (surgeryOrder: SurgeryOrderFormData) => {
    const proceduresId = parseInt(surgeryOrder.proceduresId)
    const roomId = parseInt(surgeryOrder.roomId)
    const hospitalId = parseInt(surgeryOrder.hospitalId)

    const surgeryOrderData: SurgeryOrderType = {
      ...surgeryOrder,
      proceduresId,
      roomId,
      hospitalId,
    }

    try {
      const response = await createSurgeryOrder(surgeryOrderData)

      if (response && response.status === 201) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.log('Error: ', err)

      return false
    }
  }

  const handleFormSubmitUpdate = async (surgeryOrder: SurgeryOrderFormData) => {
    try {
      const proceduresId = parseInt(surgeryOrder.proceduresId)
      const roomId = parseInt(surgeryOrder.roomId)
      const hospitalId = parseInt(surgeryOrder.hospitalId)

      const surgeryOrderData: SurgeryOrderType = {
        ...surgeryOrder,
        proceduresId,
        roomId,
        hospitalId,
      }

      const response = await updateSurgeryOrder(surgeryOrderData)

      if (response && response.status === 200) {
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <SurgeryOrdersContext.Provider
      value={{
        handleLoadListSurgeryOrders,
        handleLoadListRoomsByHospitalId,
        handleLoadSurgeryOrder,
        handleLoadFormFields,
        handleDeleteSurgeryOrder,
        handleFormSubmitCreate,
        handleFormSubmitUpdate,
      }}
    >
      {children}
    </SurgeryOrdersContext.Provider>
  )
}
