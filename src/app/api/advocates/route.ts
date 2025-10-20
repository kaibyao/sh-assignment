import db from "../../../db";
import { advocates, advocateSpecialties, specialties } from "../../../db/schema";
import { eq } from "drizzle-orm";

type AdvocateSpecialtyRow = {
  advocateId: number;
  specialtyId: number;
  specialtyName: string;
};

export async function GET() {
  // Fetch all advocates
  const advocatesData = await db.select().from(advocates);

  // Fetch all advocate-specialty relationships with specialty names
  const advocateSpecialtyData = await db
    .select({
      advocateId: advocateSpecialties.advocateId,
      specialtyId: advocateSpecialties.specialtyId,
      specialtyName: specialties.name,
    })
    .from(advocateSpecialties)
    .innerJoin(specialties, eq(advocateSpecialties.specialtyId, specialties.id));

  // Group specialties by advocate
  const specialtiesByAdvocate = (
    advocateSpecialtyData as AdvocateSpecialtyRow[]
  ).reduce<Record<number, string[]>>(
    (acc: Record<number, string[]>, row: AdvocateSpecialtyRow) => {
      if (!acc[row.advocateId]) {
        acc[row.advocateId] = [];
      }
      acc[row.advocateId].push(row.specialtyName);
      return acc;
    },
    {}
  );

  // Combine advocates with their specialties
  const data = advocatesData.map((advocate) => ({
    ...advocate,
    specialties: specialtiesByAdvocate[advocate.id] || [],
  }));

  return Response.json({ data });
}
