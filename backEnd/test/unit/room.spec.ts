import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { PrismaService } from '../../src/infra/prisma/prisma.service'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Room Routes', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    await app.init()
  })

  afterEach(async () => {
    await prisma.room.deleteMany()
  })

  test('[GET] /rooms', async () => {
    const { id } = await prisma.hospital.create({
      data: { name: 'Hospital de Esperança' },
    })

    await prisma.room.createMany({
      data: [
        { hospitalId: id, name: 'Sala 001' },
        { hospitalId: id, name: 'Sala 002' },
        { hospitalId: id, name: 'Sala 003' },
        { hospitalId: id, name: 'Sala 004' },
        { hospitalId: id, name: 'Sala 005' },
      ],
    })

    const response = await request(app.getHttpServer()).get(
      `/rooms/?hospitalId=${id}`,
    )

    expect(response.statusCode).toBe(200)
  })

  test('[POST] /rooms', async () => {
    const { id } = await prisma.hospital.create({
      data: { name: 'Hospital de Esperança' },
    })

    const response = await request(app.getHttpServer())
      .post('/rooms')
      .send({ hospitalId: id, name: 'Sala 001' })

    expect(response.statusCode).toBe(201)
  })
})
