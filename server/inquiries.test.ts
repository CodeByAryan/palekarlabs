import { describe, expect, it } from 'vitest'
import { z } from 'zod'

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  businessName: z.string().trim().min(2).max(160).optional().or(z.literal('')),
  email: z.string().trim().email().optional().or(z.literal('')),
  phone: z.string().trim().min(7).max(24).optional().or(z.literal('')),
  message: z.string().trim().min(10).max(2000),
})

describe('inquiry validation', () => {
  it('accepts a valid inquiry with email or phone', () => {
    const payload = {
      name: 'Aarav Palekar',
      businessName: 'Palekar Labs',
      email: 'hello@palekarlabs.com',
      phone: '',
      message: 'We need a website for our local clinic.',
    }

    expect(inquirySchema.safeParse(payload).success).toBe(true)
  })

  it('rejects a message that is too short', () => {
    const payload = {
      name: 'Aarav Palekar',
      businessName: 'Palekar Labs',
      email: 'hello@palekarlabs.com',
      phone: '9876543210',
      message: 'Hi',
    }

    expect(inquirySchema.safeParse(payload).success).toBe(false)
  })

  it('rejects a malformed email', () => {
    const payload = {
      name: 'Aarav Palekar',
      businessName: 'Palekar Labs',
      email: 'invalid-email',
      phone: '9876543210',
      message: 'We need a website for our local clinic.',
    }

    expect(inquirySchema.safeParse(payload).success).toBe(false)
  })
})
