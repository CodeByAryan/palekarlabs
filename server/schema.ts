import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  businessName: text('business_name'),
  email: text('email'),
  phone: text('phone'),
  message: text('message').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export type InquiryRecord = typeof inquiries.$inferSelect
