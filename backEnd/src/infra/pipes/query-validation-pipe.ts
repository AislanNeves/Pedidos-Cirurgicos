import { z } from 'zod'
import { ZodValidationPipe } from './zod-validation-pipe'

export const QueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

export type QueryParamSchema = z.infer<typeof QueryParamSchema>
export const queryValidationPipe = new ZodValidationPipe(QueryParamSchema)
