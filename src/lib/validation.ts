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

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type CreateMonitorInput = z.infer<typeof createMonitorSchema>;
export type EditMonitorInput = z.infer<typeof editMonitorSchema>;
