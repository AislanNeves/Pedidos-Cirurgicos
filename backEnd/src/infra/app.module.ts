import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { envSchema } from '@/infra/env'

import { SurgeryOrderController } from './controllers/surgery-order.controller'
import { RoomsController } from './controllers/room.controller'
import { ProceduresController } from './controllers/procedures.controller'
import { HospitalController } from './controllers/hospital.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [
    SurgeryOrderController,
    RoomsController,
    ProceduresController,
    HospitalController
  ],
  providers: [PrismaService],
})
export class AppModule {}
