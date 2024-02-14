import React, {
  ChangeEvent,
  useState,
  FormEvent,
  useEffect,
  useContext,
} from 'react'
import {
  Button,
  Container,
  FormCol,
  FormCover,
  FormWrapper,
  HistoryList,
  Input,
  Label,
  PageTitle,
  Select,
  TableContainer,
  Textarea,
  Toogle,
} from './home.styles'
import { dateISOStringToUTCDate } from '../../../../utils/mappers/date.mappers'
import { SurgeryOrdersContext } from '../../../../services/surgery-orders/surgery-orders.context'
import {
  SurgeryOrderFormData,
  ProcedureType,
  RoomType,
  HospitalType,
  SurgeryOrderType,
} from '../../../../constants/surgery-order.interfaces'
import { SurgeryOrderDefaultValues } from '../../../../constants/surgery-order.defaults'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function Home() {
  const [surgeryOrder, setSurgeryOrder] = useState<SurgeryOrderFormData>(
    SurgeryOrderDefaultValues,
  )
  const [procedures, setProcedures] = useState<ProcedureType[]>([])
  const [rooms, setRooms] = useState<RoomType[]>([])
  const [hospitals, setHospitals] = useState<HospitalType[]>([])

  const [hospitalRooms, setHospitalRooms] = useState<RoomType[]>([])

  const [isLoading, setLoading] = useState(true)
  const [isRoomDisabled, setRoomStatus] = useState(true)

  const [code, setCode] = useState(0)
  const [surgeryOrders, setSurgeryOrders] = useState<SurgeryOrderType[]>([])

  const {
    roomId,
    proceduresId,
    doctor,
    patient,
    hospitalId,
    surgeryDate,
    observations,
  } = surgeryOrder

  const {
    handleFormSubmitCreate,
    handleFormSubmitUpdate,
    handleLoadListRoomsByHospitalId,
    handleLoadListSurgeryOrders,
    handleLoadSurgeryOrder,
    handleLoadFormFields,
    handleDeleteSurgeryOrder,
  } = useContext(SurgeryOrdersContext)

  // Load lists
  const loadListSurgeryOrders = async (pageIndex = 1) => {
    try {
      const surgeryOrdersResponse = await handleLoadListSurgeryOrders(pageIndex)

      if (surgeryOrdersResponse !== false) {
        const { orders }: any = surgeryOrdersResponse
        setSurgeryOrders(orders)
      } else {
        toast('Erro ao carregar lista!')
      }
    } catch (err) {
      console.log('Error', err)
    }
  }

  const loadListRoomsByHospitalId = async (hospitalId: string) => {
    try {
      const roomsList: any = await handleLoadListRoomsByHospitalId(hospitalId)

      if (roomsList !== false) {
        setHospitalRooms(roomsList!)
        setRoomStatus(false)
      } else {
        setHospitalRooms([])
        toast('Erro ao carregar salas!')
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  const loadSurgeryOrderToFormData = async (data: SurgeryOrderType) => {
    try {
      const order = await handleLoadSurgeryOrder(data)

      if (order) {
        await loadListRoomsByHospitalId(order.hospitalId!)
        setCode(order.id)
        setSurgeryOrder(order)
      } else {
        toast('Erro ao carregar o pedido cirúrgico')
      }
    } catch (err) {
      console.log('Error: ', err)
    }
  }

  // Handle forms
  const LoadFormFields = async () => {
    try {
      const { hospitalsList, proceduresList, roomsList } =
        await handleLoadFormFields()

      setHospitals(hospitalsList)
      setProcedures(proceduresList)
      setRooms(roomsList)

      setRoomStatus(false)
      setLoading(false)
    } catch (err) {
      throw new Error(err)
    }
  }

  const deleteSurgeryOrder = async (order: SurgeryOrderType) => {
    try {
      const isDeleteSuccessful = await handleDeleteSurgeryOrder(order.id)

      if (isDeleteSuccessful) {
        toast('Apagado com sucesso!')
      } else {
        toast('Erro ao apagar!')
      }

      await loadListSurgeryOrders()
    } catch (err) {
      console.log('Error', err)
    }
  }

  const formSubmitCreate = async () => {
    try {
      const response = await handleFormSubmitCreate(surgeryOrder)

      if (response) {
        toast('Pedido Cirúrgico Cadastrado!')
        await loadListSurgeryOrders()
      } else {
        toast(
          'Escolha outro dia, já existem cirurgias agendadas para este dia, sala e hospital!',
        )
      }
    } catch (err) {
      console.log('Error: ', err)
    }
  }

  const formSubmitUpdate = async () => {
    try {
      const response = await handleFormSubmitUpdate(surgeryOrder)

      if (response) {
        toast('Pedido Cirúrgico Atualizado!')
        await loadListSurgeryOrders()
      } else {
        toast(
          'Escolha outro dia, já existem cirurgias agendadas para este horário, sala e hospital!',
        )
      }
    } catch (err) {
      console.log('Error', err)
    }
  }

  const handleForm = async (e: FormEvent) => {
    e.preventDefault()
    setSurgeryOrder(SurgeryOrderDefaultValues)

    if (code) {
      await formSubmitUpdate()
      setCode(0)
    } else {
      await formSubmitCreate()
    }
  }

  // Handle inputs
  const handleChangeInput = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setSurgeryOrder((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleChangeHospitalSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setSurgeryOrder((prevState) => ({ ...prevState, [name]: value }))

    loadListRoomsByHospitalId(value)
  }

  useEffect(() => {
    loadListSurgeryOrders()
    LoadFormFields()
  }, [])

  return isLoading ? (
    <></>
  ) : (
    <>
      <ToastContainer />
      <Container>
        <FormWrapper onSubmit={handleForm}>
          <FormCover />

          <FormCol>
            <PageTitle>Pedidos Cirúrgicos</PageTitle>
            <Label htmlFor="codigo">Código:</Label>
            <Input type="number" id="code" value={code} readOnly disabled />

            <Label htmlFor="doctor">Doutor:</Label>
            <Input
              type="text"
              id="doctor"
              name="doctor"
              value={doctor}
              maxLength={60}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeInput(e)
              }
              required
            />

            <Label htmlFor="proceduresId">Procedimento:</Label>
            <Select
              id="proceduresId"
              name="proceduresId"
              value={proceduresId}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleChangeInput(e)
              }
              required
            >
              <option value="" disabled>
                Escolha um procedimento
              </option>
              {procedures.map((procedure) => (
                <option key={procedure.id} value={procedure.id}>
                  {procedure.name}
                </option>
              ))}
            </Select>

            <Label htmlFor="patient">Paciente:</Label>
            <Input
              type="text"
              id="patient"
              name="patient"
              value={patient}
              maxLength={60}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeInput(e)
              }
              required
            />

            <Label htmlFor="observations">Observações Gerais:</Label>
            <Textarea
              id="observations"
              name="observations"
              value={observations}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                handleChangeInput(e)
              }
              maxLength={300}
            />

            <Label htmlFor="surgeryDate">Data da Cirurgia:</Label>
            <Input
              type="date"
              id="surgeryDate"
              name="surgeryDate"
              value={surgeryDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeInput(e)
              }
              required
            />

            <Label htmlFor="hospital">Hospital:</Label>
            <Select
              id="hospitalId"
              name="hospitalId"
              value={hospitalId}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleChangeHospitalSelect(e)
              }
              required
            >
              <option value="" disabled>
                Escolha um hospital
              </option>
              {hospitals.map((hospital, index) => (
                <option key={index} value={hospital.id}>
                  {hospital.name}
                </option>
              ))}
            </Select>

            <Label htmlFor="sala">Sala:</Label>
            <Select
              id="roomId"
              name="roomId"
              value={roomId}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleChangeInput(e)
              }
              disabled={isRoomDisabled}
              required
            >
              <option value="" disabled>
                Escolha a sala cirúrgica
              </option>
              {hospitalRooms.map((room, index) => (
                <option key={index} value={room.id}>
                  {room.name}
                </option>
              ))}
            </Select>

            <Button type="submit">{!code ? 'CADASTRAR' : 'ATUALIZAR'}</Button>
          </FormCol>
        </FormWrapper>
      </Container>
      <TableContainer>
        <HistoryList>
          <table id="ordersList">
            <thead>
              <tr>
                <th>Código</th>
                <th>Sala</th>
                <th>Procedimento</th>
                <th>Doutor</th>
                <th>Paciente</th>
                <th>Hospital</th>
                <th>Data da Cirurgia</th>
                <th>Data de Criação</th>
                <th>Observações</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {surgeryOrders.map((surgeryOrders, index) => (
                <tr key={index}>
                  <td>{surgeryOrders.id}</td>
                  <td>{rooms[surgeryOrders.roomId - 1].name}</td>
                  <td>{procedures[surgeryOrders.proceduresId - 1].name}</td>
                  <td>{surgeryOrders.doctor}</td>
                  <td>{surgeryOrders.patient}</td>
                  <td>{hospitals[surgeryOrders.hospitalId - 1].name}</td>
                  <td>{dateISOStringToUTCDate(surgeryOrders.surgeryDate)}</td>
                  <td>
                    {new Date(surgeryOrders.created_at).toLocaleDateString()}
                  </td>
                  <td>{surgeryOrders.observations}</td>
                  <td>
                    <Toogle
                      type="button"
                      className="edit"
                      aria-label="edit"
                      onClick={() => loadSurgeryOrderToFormData(surgeryOrders)}
                    >
                      <span aria-hidden="true">EDITAR</span>
                    </Toogle>
                  </td>
                  <td>
                    <Toogle
                      type="button"
                      className="delete"
                      aria-label="delete"
                      onClick={() => deleteSurgeryOrder(surgeryOrders)}
                    >
                      <span aria-hidden="true">APAGAR</span>
                    </Toogle>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </HistoryList>
      </TableContainer>
    </>
  )
}
