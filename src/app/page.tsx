"use client";

import { useEffect, useState } from "react";
import { AdvocateWithSpecialties } from "@/db/schema";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { AdvocatesPageHeader } from "@/app/_components/AdvocatesPageHeader";
import { AdvocatesTable } from "@/app/_components/AdvocatesTable";
import { AdvocatesTableHeader } from "@/app/_components/AdvocatesTableHeader";

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

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <>
      <AdvocatesPageHeader />
      <main style={{ margin: "24px" }}>
        <br />
        <br />
        <AdvocatesTableHeader
          onSearchChange={onChange}
          onSearchReset={onClick}
        />
        <br />
        <br />
        <AdvocatesTable filteredAdvocates={filteredAdvocates} />
      </main>
    </>
  );
}
