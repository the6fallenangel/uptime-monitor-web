import z from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const createMonitorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  url: z.url("Enter a valid URL, including https://"),
  intervalValue: z.number().int().positive("Must be a positive number"),
  intervalUnit: z.enum(["s", "m", "h"]),
});

export const editMonitorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  intervalValue: z.number().int().positive("Must be a positive number"),
  intervalUnit: z.enum(["s", "m", "h"]),
});

export const updateNameSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type CreateMonitorInput = z.infer<typeof createMonitorSchema>;
export type EditMonitorInput = z.infer<typeof editMonitorSchema>;
export type UpdateNameInput = z.infer<typeof updateNameSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
