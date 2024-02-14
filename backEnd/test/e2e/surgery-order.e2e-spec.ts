import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { PrismaService } from '../../src/infra/prisma/prisma.service'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Surgery Order E2E: Create, Update, List, Delete', () => {
  let app: INestApplication
  let prisma: PrismaService

  const modifiedSurgeryOrderData = {
    id: 1,
    roomId: 5,
    hospitalId: 2,
    proceduresId: 2,
    doctor: 'Doutor Galvin',
    patient: 'Paulo Silva',
    surgeryDate: '2024-12-20T00:00:00.000Z',
    observations: 'Alergico à ibuprofeno',
  }

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

  it('should be able to create a new surgery order', async () => {
    const data = {
      roomId: 3,
      hospitalId: 2,
      proceduresId: 3,
      doctor: 'Doutor Hortolino',
      patient: 'Paulo Bezerra',
      surgeryDate: '2024-12-19T00:00:00.000Z',
      observations: 'Alergico à dipirona',
    }

    const createSurgeryOrderResponse = await request(app.getHttpServer())
      .post('/surgery-orders')
      .send(data)

    expect(createSurgeryOrderResponse.statusCode).toBe(201)
  })

  it('should be able to edit a surgery order', async () => {
    const editSurgeryOrderResponse = await request(app.getHttpServer())
      .put('/surgery-orders')
      .send(modifiedSurgeryOrderData)

    expect(editSurgeryOrderResponse.statusCode).toBe(200)
  })

  it('should be able to get a specific surgery order', async () => {
    const getSurgeryOrderResponse = await request(app.getHttpServer()).get(
      '/surgery-orders/first/?index=1',
    )

    expect(getSurgeryOrderResponse.statusCode).toBe(200)
    expect(getSurgeryOrderResponse.body).toEqual(
      expect.objectContaining(modifiedSurgeryOrderData),
    )
  })

  it('should be able to delete a surgery order', async () => {
    const { id } = modifiedSurgeryOrderData

    const deleteSurgeryOrderResponse = await request(
      app.getHttpServer(),
    ).delete(`/surgery-orders/?surgeryOrderId=${id}`)

    expect(deleteSurgeryOrderResponse.statusCode).toBe(200)
  })
})
