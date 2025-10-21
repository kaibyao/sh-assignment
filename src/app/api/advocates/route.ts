import { PAGE_SIZE } from "@/app/constants";
import db from "../../../db";
import {
  advocates,
  advocateSpecialties,
  specialties,
} from "../../../db/schema";
import { eq, sql, or, ilike } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const searchTerm = searchParams.get("searchTerm") || "";

  const offset = (page - 1) * PAGE_SIZE;

  // Build search filter condition
  const searchFilter = searchTerm
    ? or(
        ilike(advocates.firstName, `%${searchTerm}%`),
        ilike(advocates.lastName, `%${searchTerm}%`),
        ilike(advocates.city, `%${searchTerm}%`),
        ilike(advocates.degree, `%${searchTerm}%`),
        ilike(specialties.name, `%${searchTerm}%`),
        sql`CAST(${
          advocates.yearsOfExperience
        } AS TEXT) ILIKE ${`%${searchTerm}%`}`,
      )
    : undefined;

  // Build the base query with joins
  const baseQuery = db
    .select({
      id: advocates.id,
      firstName: advocates.firstName,
      lastName: advocates.lastName,
      city: advocates.city,
      degree: advocates.degree,
      yearsOfExperience: advocates.yearsOfExperience,
      phoneNumber: advocates.phoneNumber,
      createdAt: advocates.createdAt,
      specialties: sql<
        string[]
      >`COALESCE(array_agg(${specialties.name}), ARRAY[]::text[])`,
    })
    .from(advocates)
    .innerJoin(
      advocateSpecialties,
      eq(advocateSpecialties.advocateId, advocates.id),
    )
    .innerJoin(
      specialties,
      eq(advocateSpecialties.specialtyId, specialties.id),
    );

  // Get paginated data
  const data = searchFilter
    ? await baseQuery
        .where(searchFilter)
        .groupBy(advocates.id)
        .limit(PAGE_SIZE)
        .offset(offset)
    : await baseQuery.groupBy(advocates.id).limit(PAGE_SIZE).offset(offset);

  // Get total count of matching advocates (count distinct to avoid counting duplicates from joins)
  const countQuery = db
    .select({ count: sql<number>`count(distinct ${advocates.id})` })
    .from(advocates)
    .innerJoin(
      advocateSpecialties,
      eq(advocateSpecialties.advocateId, advocates.id),
    )
    .innerJoin(
      specialties,
      eq(advocateSpecialties.specialtyId, specialties.id),
    );

  const countResult = searchFilter
    ? await countQuery.where(searchFilter)
    : await countQuery;

  const totalCount = Number(countResult[0]?.count) || 0;

  return Response.json({ data, totalCount });
}
