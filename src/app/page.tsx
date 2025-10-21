"use client";

import { useEffect, useState } from "react";
import { AdvocateWithSpecialties } from "@/db/schema";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { AdvocatesPageHeader } from "@/app/_components/AdvocatesPageHeader";
import { AdvocatesTable } from "@/app/_components/AdvocatesTable";
import { AdvocatesTableHeader } from "@/app/_components/AdvocatesTableHeader";
import { Flex } from "@radix-ui/themes";

export default function Home() {
  const [advocates, setAdvocates] = useState<AdvocateWithSpecialties[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<
    AdvocateWithSpecialties[]
  >([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (searchTerm: string) => {
    if (searchTerm === "") {
      setFilteredAdvocates(advocates);
      return;
    }

    const caseInsensitiveSearchTerm = searchTerm.toLowerCase();

    console.log("filtering advocates...", caseInsensitiveSearchTerm);

    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(caseInsensitiveSearchTerm) ||
        advocate.lastName.toLowerCase().includes(caseInsensitiveSearchTerm) ||
        advocate.city.toLowerCase().includes(caseInsensitiveSearchTerm) ||
        advocate.degree.toLowerCase().includes(caseInsensitiveSearchTerm) ||
        advocate.specialties.some((specialty) =>
          specialty.toLowerCase().includes(caseInsensitiveSearchTerm),
        ) ||
        advocate.yearsOfExperience
          .toLocaleString()
          .toLowerCase()
          .includes(caseInsensitiveSearchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  return (
    <Flex direction="column" gap="2">
      <AdvocatesPageHeader />
      <main style={{ marginLeft: "24px", marginRight: "24px" }}>
        <Flex direction="column" gap="4" mt="2">
          <AdvocatesTableHeader onSearchChange={onChange} />
          <AdvocatesTable filteredAdvocates={filteredAdvocates} />
        </Flex>
      </main>
    </Flex>
  );
}
