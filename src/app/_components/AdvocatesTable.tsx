import { Table } from "@radix-ui/themes";
import { SelectAdvocate } from "@/db/schema";

interface AdvocatesTableProps {
  filteredAdvocates: SelectAdvocate[];
}

export function AdvocatesTable({ filteredAdvocates }: AdvocatesTableProps) {
  return (
    <Table.Root variant="surface" size="2">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>City</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Degree</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Specialties</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Years of Experience</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Phone Number</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {filteredAdvocates.map((advocate) => (
          <Table.Row key={advocate.id}>
            <Table.RowHeaderCell>{advocate.firstName}</Table.RowHeaderCell>
            <Table.Cell>{advocate.lastName}</Table.Cell>
            <Table.Cell>{advocate.city}</Table.Cell>
            <Table.Cell>{advocate.degree}</Table.Cell>
            <Table.Cell>
              {advocate.specialties.map((s: string) => (
                <div key={s}>{s}</div>
              ))}
            </Table.Cell>
            <Table.Cell>{advocate.yearsOfExperience}</Table.Cell>
            <Table.Cell>{advocate.phoneNumber}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
