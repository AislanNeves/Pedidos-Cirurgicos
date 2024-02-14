import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { z } from 'zod'
import {
  queryValidationPipe,
  QueryParamSchema,
} from '../pipes/query-validation-pipe'

const SurgeryOrderBodySchema = z.object({
  roomId: z.number(),
  hospitalId: z.number(),
  proceduresId: z.number(),
  doctor: z.string().max(60, 'Character limit exceeded'),
  patient: z.string().max(60, 'Character limit exceeded'),
  surgeryDate: z.coerce
    .date()
    .min(new Date(), 'Start date must be in the future'),
  observations: z.string().max(100, 'Character limit exceeded'),
})
type SurgeryOrderBodySchema = z.infer<typeof SurgeryOrderBodySchema>
const createBodyValidationPipe = new ZodValidationPipe(SurgeryOrderBodySchema)

const UpdateSurgeryOrderBodySchema = SurgeryOrderBodySchema.extend({
  id: z.number(),
})
type UpdateSurgeryOrderBodySchema = z.infer<typeof UpdateSurgeryOrderBodySchema>
const updateBodyValidationPipe = new ZodValidationPipe(
  UpdateSurgeryOrderBodySchema,
)

@Controller('/surgery-orders')
export class SurgeryOrderController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async requestSurgeryOrders(
    @Query('page', queryValidationPipe) page: QueryParamSchema,
  ) {
    const perPage = 100

    const orders = await this.prisma.surgeryOrder.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        created_at: 'desc',
      },
    })

    return { orders }
  }

  @Get('/first')
  async requestSurgeryOrder(
    @Query('index', queryValidationPipe) id: QueryParamSchema,
  ) {
    const firstSurgeryOrderResponse = await this.prisma.surgeryOrder.findFirst({
      where: {
        id,
      },
    })

    return firstSurgeryOrderResponse
  }

  @Post()
  @UsePipes(new ZodValidationPipe(SurgeryOrderBodySchema))
  async createSurgeryOrder(
    @Body(createBodyValidationPipe) body: SurgeryOrderBodySchema,
  ) {
    const {
      roomId,
      hospitalId,
      proceduresId,
      doctor,
      patient,
      surgeryDate,
      observations,
    } = body

    const isBusy = await this.prisma.surgeryOrder.findMany({
      where: {
        surgeryDate,
        roomId,
      },
    })

    const isProcedureValid = await this.prisma.procedures.findUnique({
      where: {
        id: proceduresId,
      },
    })

    const isRoomValid = await this.prisma.room.findUnique({
      where: {
        id: roomId,
      },
    })

    if (isBusy.length) {
      throw new ConflictException('This room is reserved for another patient')
    }

    if (!isProcedureValid) {
      throw new NotFoundException('This procedure does not exist')
    }

    if (!isRoomValid) {
      throw new NotFoundException('This room does not exist')
    }

    await this.prisma.surgeryOrder.create({
      data: {
        roomId,
        hospitalId,
        proceduresId,
        doctor,
        patient,
        surgeryDate,
        observations,
      },
    })
  }

  @Put()
  async updateSurgeryOrder(
    @Body(updateBodyValidationPipe) body: UpdateSurgeryOrderBodySchema,
  ) {
    const {
      id,
      roomId,
      hospitalId,
      proceduresId,
      doctor,
      patient,
      surgeryDate,
      observations,
    } = body

    const isBusy = await this.prisma.surgeryOrder.findMany({
      where: {
        surgeryDate,
        roomId,
      },
    })

    if (isBusy.length && isBusy[0].id !== id) {
      throw new ConflictException('This room is reserved for another patient')
    }

    await this.prisma.surgeryOrder.update({
      where: {
        id,
      },
      data: {
        roomId,
        hospitalId,
        proceduresId,
        doctor,
        patient,
        surgeryDate,
        observations,
      },
    })
  }

  @Delete()
  async deleteSurgeryOrder(
    @Query('surgeryOrderId', queryValidationPipe) id: QueryParamSchema,
  ) {
    await this.prisma.surgeryOrder.delete({
      where: {
        id,
      },
    })
  }
}
