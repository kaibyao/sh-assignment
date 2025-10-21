import db from "../../../db";
import { advocates, advocateSpecialties, specialties } from "../../../db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET() {
  const data = await db
    .select({
      id: advocates.id,
      firstName: advocates.firstName,
      lastName: advocates.lastName,
      city: advocates.city,
      degree: advocates.degree,
      yearsOfExperience: advocates.yearsOfExperience,
      phoneNumber: advocates.phoneNumber,
      createdAt: advocates.createdAt,
      specialties: sql<string[]>`COALESCE(array_agg(${specialties.name}), ARRAY[]::text[])`,
    })
    .from(advocates)
    .innerJoin(advocateSpecialties, eq(advocateSpecialties.advocateId, advocates.id))
    .innerJoin(specialties, eq(advocateSpecialties.specialtyId, specialties.id))
    .groupBy(advocates.id);

  return Response.json({ data });
}
