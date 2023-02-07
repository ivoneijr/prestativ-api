import { z } from 'zod';

export const createPayloadSchema = z.object({
  body: z.object({
    firstName: z.string({ required_error: 'firstName é obrigatório' }),
    lastName: z.string({ required_error: 'lastName é obrigatório' }),
    email: z.string({ required_error: 'email é obrigatório' }).email(),
    password: z.string().min(8, { message: 'Mínimo 8 caracteres' }),
    role: z.enum(['DEFAULT', 'MANAGER', 'ADMIN', 'SUPER_ADMIN']),
    isActive: z.boolean({ required_error: 'status é obrigatório' })
  })
});
