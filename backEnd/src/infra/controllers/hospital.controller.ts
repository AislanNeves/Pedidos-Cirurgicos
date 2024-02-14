import { Body, Controller, Get, Post } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { z } from 'zod'

const HospitalBodySchema = z.object({
  name: z.string(),
})

type HospitalBodySchema = z.infer<typeof HospitalBodySchema>
const bodyValidationPipe = new ZodValidationPipe(HospitalBodySchema)

@Controller('/hospitals')
export class HospitalController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async requestHospitals() {
    const hospitals = await this.prisma.hospital.findMany()

    return hospitals
  }

  @Post()
  async createHospital(@Body(bodyValidationPipe) body: HospitalBodySchema) {
    const { name } = body

    await this.prisma.hospital.create({
      data: {
        name,
      },
    })
  }
}
