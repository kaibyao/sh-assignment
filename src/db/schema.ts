import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  serial,
  timestamp,
  bigint,
  primaryKey,
} from "drizzle-orm/pg-core";

const advocates = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  degree: text("degree").notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

const specialties = pgTable("specialties", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

const advocateSpecialties = pgTable(
  "advocate_specialties",
  {
    advocateId: integer("advocate_id")
      .notNull()
      .references(() => advocates.id, { onDelete: "cascade" }),
    specialtyId: integer("specialty_id")
      .notNull()
      .references(() => specialties.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.advocateId, table.specialtyId] }),
  })
);

export type SelectAdvocate = typeof advocates.$inferSelect;
export type SelectSpecialty = typeof specialties.$inferSelect;
export type InsertSpecialty = typeof specialties.$inferInsert;
export type SelectAdvocateSpecialty = typeof advocateSpecialties.$inferSelect;
export type InsertAdvocateSpecialty = typeof advocateSpecialties.$inferInsert;

// Type for advocate with their specialties populated
export type AdvocateWithSpecialties = SelectAdvocate & {
  specialties: string[];
};

export { advocates, specialties, advocateSpecialties };
