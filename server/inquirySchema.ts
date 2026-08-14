import { z } from 'zod'

export const inquirySchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120, 'Name is too long'),
  businessName: z
    .string()
    .trim()
    .max(160, 'Business name is too long')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .trim()
    .min(7, 'Phone number is too short')
    .max(24, 'Phone number is too long')
    .optional()
    .or(z.literal('')),
  message: z.string().trim().min(10, 'Please share a bit more detail').max(2000, 'Message is too long'),
})

export type InquiryInput = z.infer<typeof inquirySchema>

export function normalizeInquiry(input: InquiryInput) {
  return {
    name: input.name.trim(),
    businessName: input.businessName?.trim() ?? '',
    email: input.email?.trim() ?? '',
    phone: input.phone?.trim() ?? '',
    message: input.message.trim(),
  }
}
