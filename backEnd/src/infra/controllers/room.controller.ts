import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { z } from 'zod'

const RoomsBodySchema = z.object({
  hospitalId: z.number(),
  name: z.string().max(100, 'Character limit exceeded'),
})

type RoomsBodySchema = z.infer<typeof RoomsBodySchema>
const bodyValidationPipe = new ZodValidationPipe(RoomsBodySchema)

export const QueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type QueryParamSchema = z.infer<typeof QueryParamSchema>
const queryValidationPipe = new ZodValidationPipe(QueryParamSchema)

@Controller('/rooms')
export class RoomsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async requestRooms(
    @Query('hospitalId', queryValidationPipe) hospitalId: QueryParamSchema,
  ) {
    const rooms = await this.prisma.room.findMany({
      where: {
        hospitalId,
      },
    })

    return rooms
  }

  @Get('/all')
  async requestAllRooms() {
    const rooms = await this.prisma.room.findMany()

    return rooms
  }

  @Get('/first/')
  async requestRoomsByRoomId(
    @Query('roomId', queryValidationPipe) id: QueryParamSchema,
  ) {
    const rooms = await this.prisma.room.findFirst({
      where: {
        id,
      },
    })

    if (!rooms) {
      throw new NotFoundException('This room does not exist')
    }

    return rooms
  }

  @Post()
  async createRooms(@Body(bodyValidationPipe) body: RoomsBodySchema) {
    const { name } = body

    await this.prisma.room.create({
      data: {
        hospitalId: 1,
        name,
      },
    })
  }
}
