import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { PrismaService } from '../../src/infra/prisma/prisma.service'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Hospital Routes', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    await app.init()

    // CREATE PROCEDURES
    await prisma.procedures.createMany({
      data: [
        { name: 'Radiofrequência' },
        { name: 'Lipoaspiracao' },
        { name: 'Peeling ultrassônico' },
        { name: 'Microagulhamento' },
        { name: 'Lipo Cavitação' },
        { name: 'Drenagem Linfática' },
        { name: 'Criolipólise' },
        { name: 'Carboxiterapia' },
        { name: 'Preenchimento Facial' },
        { name: 'Toxina Botulínica' },
        { name: 'Tecarterapia' },
      ],
    })

    // CREATE HOSPITALS
    await prisma.hospital.createMany({
      data: [
        { name: 'Hospital de Amor' },
        { name: 'Hospital Israelita' },
        { name: 'Hospital do Einstein' },
        { name: 'Hospital de São Paulo' },
        { name: 'Hospital de Esperança' },
        { name: 'Hospital de Carinho' },
        { name: 'Hospital do Cuidado' },
        { name: 'Hospital do Idoso' },
      ],
    })

    // CREATE ROOMS
    await prisma.room.createMany({
      data: [
        { hospitalId: 1, name: 'Sala 001' },
        { hospitalId: 1, name: 'Sala 002' },
        { hospitalId: 2, name: 'Sala 003' },
        { hospitalId: 2, name: 'Sala 001' },
        { hospitalId: 2, name: 'Sala 002' },
        { hospitalId: 3, name: 'Sala 003' },
        { hospitalId: 3, name: 'Sala 001' },
        { hospitalId: 3, name: 'Sala 002' },
        { hospitalId: 4, name: 'Sala 003' },
        { hospitalId: 4, name: 'Sala 001' },
        { hospitalId: 4, name: 'Sala 002' },
        { hospitalId: 5, name: 'Sala 003' },
        { hospitalId: 5, name: 'Sala 001' },
        { hospitalId: 5, name: 'Sala 002' },
        { hospitalId: 6, name: 'Sala 003' },
        { hospitalId: 6, name: 'Sala 001' },
        { hospitalId: 6, name: 'Sala 002' },
        { hospitalId: 7, name: 'Sala 001' },
        { hospitalId: 8, name: 'Sala 001' },
      ],
    })
  })

  afterEach(async () => {
    await prisma.surgeryOrder.deleteMany()
  })

  it('should be able to create a new surgery order and list it', async () => {
    const data = {
      roomId: 2,
      hospitalId: 1,
      proceduresId: 3,
      doctor: 'Doutor Hortolino',
      patient: 'Paulo Bezerra',
      surgeryDate: '2024-12-19T00:00:00.000Z',
      observations: 'Alergico à dipirona',
    }

    const createSurgeryOrderResponse = await request(app.getHttpServer())
      .post('/surgery-orders')
      .send(data)
    const listSurgeryOrderResponse = await request(app.getHttpServer()).get(
      '/surgery-orders/?page=1',
    )

    expect(createSurgeryOrderResponse.statusCode).toBe(201)
    expect(listSurgeryOrderResponse.statusCode).toBe(200)
    // Get first order from array
    const orderResponse = listSurgeryOrderResponse.body.orders[0]
    expect(orderResponse).toEqual(expect.objectContaining(data))
  })

  it('should be able to edit a surgery order and list it', async () => {
    const { id } = await prisma.surgeryOrder.create({
      data: {
        roomId: 7,
        hospitalId: 3,
        proceduresId: 7,
        doctor: 'Doutor Hortolino',
        patient: 'Paulo Bezerra',
        surgeryDate: '2024-12-19T00:00:00.000Z',
        observations: 'Alergico à dipirona',
      },
    })

    const editSurgeryOrderData = {
      id,
      roomId: 5,
      hospitalId: 2,
      proceduresId: 6,
      doctor: 'Doutor Galvin',
      patient: 'Paulo Silva',
      surgeryDate: '2024-12-20T00:00:00.000Z',
      observations: 'Alergico à ibuprofeno',
    }

    const editSurgeryOrderResponse = await request(app.getHttpServer())
      .put('/surgery-orders')
      .send(editSurgeryOrderData)

    const listSurgeryOrderResponse = await request(app.getHttpServer())
      .get('/surgery-orders/?page=1')
      .expect(200)

    expect(editSurgeryOrderResponse.statusCode).toBe(200)
    expect(listSurgeryOrderResponse.statusCode).toBe(200)
    // Get first order from array
    const orderResponse = listSurgeryOrderResponse.body.orders[0]
    expect(orderResponse).toEqual(expect.objectContaining(editSurgeryOrderData))
  })

  it('should be able to delete a created surgery order', async () => {
    let deleteSurgeryOrderResponse, surgeryOrderExists

    const data = {
      roomId: 2,
      hospitalId: 1,
      proceduresId: 3,
      doctor: 'Doutor Hortolino',
      patient: 'Paulo Bezerra',
      surgeryDate: '2024-12-19T00:00:00.000Z',
      observations: 'Alergico à dipirona',
    }

    const createSurgeryOrderResponse = await request(app.getHttpServer())
      .post('/surgery-orders')
      .send(data)

    const getSurgeryOrder = await prisma.surgeryOrder.findFirst({
      where: {
        roomId: 2,
        hospitalId: 1,
        proceduresId: 3,
        doctor: 'Doutor Hortolino',
        patient: 'Paulo Bezerra',
        surgeryDate: '2024-12-19T00:00:00.000Z',
        observations: 'Alergico à dipirona',
      },
    })

    if (getSurgeryOrder) {
      const { id } = getSurgeryOrder

      deleteSurgeryOrderResponse = await request(app.getHttpServer()).delete(
        `/surgery-orders/?surgeryOrderId=${id}`,
      )

      surgeryOrderExists = await prisma.surgeryOrder.findFirst({
        where: {
          id,
        },
      })
    }

    expect(createSurgeryOrderResponse.statusCode).toBe(201)
    expect(deleteSurgeryOrderResponse.statusCode).toBe(200)
    expect(surgeryOrderExists).toBe(null)
  })
})
