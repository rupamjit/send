import { z } from "zod";

export const createShareSchema = z.object({
  expiryTime: z.number().min(15).max(1440),
  text: z.string().optional(),
  key: z.string().optional(),
  name: z.string().optional(),
  type: z.string().optional(),
  ufsUrl: z.string().optional(),
  size: z.number().optional(),
  password: z.string().min(4).max(32).optional(),
  isOneTime: z.boolean().optional().default(false),
  maxViews: z.number().min(1).optional(),
}).refine(
  (data) => data.text || data.key,
  { message: "Either text or a file must be provided" }
);

export const accessShareSchema = z.object({
  code: z.string().length(6),
  password: z.string().optional(),
});

export const verifyPasswordSchema = z.object({
  code: z.string().length(6),
  password: z.string().min(1),
});

export type CreateShareInput = z.infer<typeof createShareSchema>;
export type AccessShareInput = z.infer<typeof accessShareSchema>;
export type VerifyPasswordInput = z.infer<typeof verifyPasswordSchema>;