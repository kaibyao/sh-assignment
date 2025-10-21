import db from "..";
import {
  advocates,
  advocateSpecialties,
  type SelectSpecialty,
  type InsertAdvocateSpecialty,
} from "../schema";

const getRandomSpecialtyIds = (totalSpecialties: number) => {
  const random1 = Math.floor(Math.random() * totalSpecialties);
  const random2 =
    Math.floor(Math.random() * (totalSpecialties - random1)) + random1 + 1;

  const specialtyIds: number[] = [];
  for (let i = random1; i < random2; i++) {
    specialtyIds.push(i + 1); // IDs are 1-indexed
  }

  return specialtyIds;
};

const advocateData = [
  {
    firstName: "John",
    lastName: "Doe",
    city: "New York",
    degree: "MD",
    yearsOfExperience: 10,
    phoneNumber: 5551234567,
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    city: "Los Angeles",
    degree: "PhD",
    yearsOfExperience: 8,
    phoneNumber: 5559876543,
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    city: "Chicago",
    degree: "MSW",
    yearsOfExperience: 5,
    phoneNumber: 5554567890,
  },
  {
    firstName: "Michael",
    lastName: "Brown",
    city: "Houston",
    degree: "MD",
    yearsOfExperience: 12,
    phoneNumber: 5556543210,
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    city: "Phoenix",
    degree: "PhD",
    yearsOfExperience: 7,
    phoneNumber: 5553210987,
  },
  {
    firstName: "Chris",
    lastName: "Martinez",
    city: "Philadelphia",
    degree: "MSW",
    yearsOfExperience: 9,
    phoneNumber: 5557890123,
  },
  {
    firstName: "Jessica",
    lastName: "Taylor",
    city: "San Antonio",
    degree: "MD",
    yearsOfExperience: 11,
    phoneNumber: 5554561234,
  },
  {
    firstName: "David",
    lastName: "Harris",
    city: "San Diego",
    degree: "PhD",
    yearsOfExperience: 6,
    phoneNumber: 5557896543,
  },
  {
    firstName: "Laura",
    lastName: "Clark",
    city: "Dallas",
    degree: "MSW",
    yearsOfExperience: 4,
    phoneNumber: 5550123456,
  },
  {
    firstName: "Daniel",
    lastName: "Lewis",
    city: "San Jose",
    degree: "MD",
    yearsOfExperience: 13,
    phoneNumber: 5553217654,
  },
  {
    firstName: "Sarah",
    lastName: "Lee",
    city: "Austin",
    degree: "PhD",
    yearsOfExperience: 10,
    phoneNumber: 5551238765,
  },
  {
    firstName: "James",
    lastName: "King",
    city: "Jacksonville",
    degree: "MSW",
    yearsOfExperience: 5,
    phoneNumber: 5556540987,
  },
  {
    firstName: "Megan",
    lastName: "Green",
    city: "San Francisco",
    degree: "MD",
    yearsOfExperience: 14,
    phoneNumber: 5559873456,
  },
  {
    firstName: "Joshua",
    lastName: "Walker",
    city: "Columbus",
    degree: "PhD",
    yearsOfExperience: 9,
    phoneNumber: 5556781234,
  },
  {
    firstName: "Amanda",
    lastName: "Hall",
    city: "Fort Worth",
    degree: "MSW",
    yearsOfExperience: 3,
    phoneNumber: 5559872345,
  },
];

export async function seedAdvocates() {
  const insertedAdvocates = await db
    .insert(advocates)
    .values(advocateData)
    .returning();

  return insertedAdvocates;
}

export async function seedAdvocateSpecialties(
  insertedAdvocates: { id: number }[],
  insertedSpecialties: SelectSpecialty[]
) {
  const advocateSpecialtyData: InsertAdvocateSpecialty[] =
    insertedAdvocates.flatMap((advocate) => {
      const randomSpecialtyIds = getRandomSpecialtyIds(
        insertedSpecialties.length
      );
      return randomSpecialtyIds.map((specialtyId) => ({
        advocateId: advocate.id,
        specialtyId,
      }));
    });

  await db.insert(advocateSpecialties).values(advocateSpecialtyData);
}
