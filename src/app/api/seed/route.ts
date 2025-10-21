import { seedSpecialties } from "../../../db/seed/specialties";
import { seedAdvocates, seedAdvocateSpecialties } from "../../../db/seed/advocates";

export async function POST() {
  // Seed specialties first
  const insertedSpecialties = await seedSpecialties();

  // Then seed advocates
  const insertedAdvocates = await seedAdvocates();

  // Finally, create the many-to-many relationships
  await seedAdvocateSpecialties(insertedAdvocates, insertedSpecialties);

  return Response.json({
    specialties: insertedSpecialties,
    advocates: insertedAdvocates,
    message: "Database seeded successfully",
  });
}
