import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const mockInterview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    json_mock_resp: text('json_mock_resp').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc: varchar('jobDesc').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull(),
    mockId: varchar('mockId').notNull(),
})