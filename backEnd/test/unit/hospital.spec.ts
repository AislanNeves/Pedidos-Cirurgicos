import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { PrismaService } from '../../src/infra/prisma/prisma.service'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Procedure Routes', () => {
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
    await prisma.procedures.deleteMany()
  })

  test('[GET] /hospitals', async () => {
    await prisma.procedures.createMany({
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

    const response = await request(app.getHttpServer()).get('/hospitals')

    expect(response.statusCode).toBe(200)
  })

  test('[POST] /hospitals', async () => {
    const response = await request(app.getHttpServer())
      .post('/hospitals')
      .send({ name: 'Hospital de São Paulo' })

    expect(response.statusCode).toBe(201)
  })
})
