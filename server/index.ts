import express from 'express'
import cors from 'cors'
import { db } from './db'
import { inquiries } from './schema'
import { inquirySchema, normalizeInquiry } from './inquirySchema'

const app = express()
const port = Number(process.env.PORT ?? 3001)

app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/inquiries', async (req, res) => {
  const parsed = inquirySchema.safeParse(req.body)

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors
    return res.status(400).json({
      ok: false,
      message: 'Please check the form fields and try again.',
      errors,
    })
  }

  const payload = normalizeInquiry(parsed.data)

  const hasContact = Boolean(payload.email || payload.phone)
  if (!hasContact) {
    return res.status(400).json({
      ok: false,
      message: 'Please add either an email address or phone number so we can contact you.',
      errors: {
        email: ['required if phone is empty'],
        phone: ['required if email is empty'],
      },
    })
  }

  try {
    const [inserted] = await db.insert(inquiries).values({
      name: payload.name,
      businessName: payload.businessName || null,
      email: payload.email || null,
      phone: payload.phone || null,
      message: payload.message,
    }).returning()

    return res.status(201).json({
      ok: true,
      message: 'Thanks! Your inquiry has been received.',
      inquiry: inserted,
    })
  } catch (error) {
    console.error('Inquiry insert failed', error)
    return res.status(500).json({
      ok: false,
      message: 'Something went wrong while saving your inquiry. Please try again later.',
    })
  }
})

app.listen(port, () => {
  console.log(`Palekar Labs API running on http://localhost:${port}`)
})

export { app }
