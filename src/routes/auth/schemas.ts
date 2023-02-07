import { z } from 'zod';

export const loginPayloadSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'email é obrigatório' }).email(),
    password: z.string({ required_error: 'password é obrigatório' })
  })
});
