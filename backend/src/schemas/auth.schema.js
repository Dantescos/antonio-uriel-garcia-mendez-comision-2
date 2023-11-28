import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "requiere nombre de usuario",
  }),
  email: z
    .string({
      required_error: "requiere correo electronico",
    })
    .email({
      message: "correlo electronico invalido",
    }),
  password: z
    .string({
      required_error: "requiere contraseña",
    })
    .min(8, {
      message: "la contraseña necesita minimo 8 caracteres",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "requiere correo electronico",
    })
    .email({
      message: "correlo electronico invalido",
    }),
  password: z
    .string({
      required_error: "requiere contraseña",
    })
    .min(8, {
      message: "la contraseña necesita minimo 8 caracteres",
    }),
});
