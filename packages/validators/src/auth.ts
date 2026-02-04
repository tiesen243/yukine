import * as z from 'zod'

export const signUpDTO = {
  body: z
    .object({
      email: z.email(),
      username: z.string().min(4).max(20),
      password: z.string().min(8).max(100),
      confirmPassword: z.string().min(8).max(100),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Confirm password doesn't match",
      path: ['confirmPassword'],
    }),
}

export type SignUpDTO = {
  [K in keyof typeof signUpDTO]: z.infer<(typeof signUpDTO)[K]>
}
