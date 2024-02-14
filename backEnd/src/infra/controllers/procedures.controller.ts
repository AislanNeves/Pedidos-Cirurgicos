import { Body, Controller, Get, Post } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { z } from 'zod'

const ProceduresBodySchema = z.object({
  name: z.string().max(100, 'Character limit exceeded'),
})

type ProceduresBodySchema = z.infer<typeof ProceduresBodySchema>
const bodyValidationPipe = new ZodValidationPipe(ProceduresBodySchema)

@Controller('/procedures')
export class ProceduresController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async requestProcedures() {
    const procedures = await this.prisma.procedures.findMany()

    return procedures
  }

  @Post()
  async createProcedures(@Body(bodyValidationPipe) body: ProceduresBodySchema) {
    const { name } = body

    await this.prisma.procedures.create({
      data: {
        name,
      },
    })
  }
}
