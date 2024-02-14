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

  test('[GET] /surgery-orders', async () => {
    await prisma.surgeryOrder.create({
      data: {
        roomId: 1,
        hospitalId: 1,
        proceduresId: 1,
        doctor: 'Doutor Hortolino',
        patient: 'Paulo Bezerra',
        surgeryDate: '2024-12-19T00:00:00.000Z',
        observations: 'Alergico à dipirona',
      },
    })

    const response = await request(app.getHttpServer()).get(
      '/surgery-orders/?page=1',
    )

    expect(response.statusCode).toBe(200)
  })

  test('[POST] /surgery-orders', async () => {
    const response = await request(app.getHttpServer())
      .post('/surgery-orders')
      .send({
        roomId: 2,
        hospitalId: 1,
        proceduresId: 3,
        doctor: 'Doutor Hortolino',
        patient: 'Paulo Bezerra',
        surgeryDate: '2024-12-19T00:00:00.000Z',
        observations: 'Alergico à dipirona',
      })

    expect(response.statusCode).toBe(201)
  })

  test('[PUT] /surgery-orders', async () => {
    const { id } = await prisma.surgeryOrder.create({
      data: {
        roomId: 5,
        hospitalId: 1,
        proceduresId: 5,
        doctor: 'Doutor Hortolino',
        patient: 'Paulo Bezerra',
        surgeryDate: '2024-12-19T00:00:00.000Z',
        observations: 'Alergico à dipirona',
      },
    })

    const response = await request(app.getHttpServer())
      .put('/surgery-orders')
      .send({
        id,
        roomId: 5,
        hospitalId: 1,
        proceduresId: 6,
        doctor: 'Doutor Galvin',
        patient: 'Paulo Silva',
        surgeryDate: '2024-12-19T00:00:00.000Z',
        observations: 'Alergico à dipirona',
      })

    expect(response.statusCode).toBe(200)
  })

  test('[DELETE] /surgery-orders', async () => {
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

    const response = await request(app.getHttpServer()).delete(
      `/surgery-orders/?surgeryOrderId=${id}`,
    )

    expect(response.statusCode).toBe(200)
  })
})
