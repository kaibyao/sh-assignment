"use client";

import { useEffect, useState } from "react";
import { AdvocateWithSpecialties } from "@/db/schema";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { AdvocatesPageHeader } from "@/app/_components/AdvocatesPageHeader";
import { AdvocatesTable } from "@/app/_components/AdvocatesTable";
import { AdvocatesTableHeader } from "@/app/_components/AdvocatesTableHeader";
import { Flex } from "@radix-ui/themes";
import { PAGE_SIZE } from "@/app/constants";

export default function Home() {
  const [advocates, setAdvocates] = useState<AdvocateWithSpecialties[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("fetching advocates...", { page: currentPage, searchTerm });
    const params = new URLSearchParams({
      page: currentPage.toString(),
      ...(searchTerm && { searchTerm }),
    });

    fetch(`/api/advocates?${params}`).then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setTotalPages(Math.ceil(jsonResponse.totalCount / PAGE_SIZE));
      });
    });
  }, [currentPage, searchTerm]);

  const onChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1); // Reset to page 1 when search changes
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Flex direction="column" gap="2">
      <AdvocatesPageHeader />
      <main style={{ marginLeft: "24px", marginRight: "24px" }}>
        <Flex direction="column" gap="4" mt="2">
          <AdvocatesTableHeader
            onSearchChange={onChange}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
          <AdvocatesTable filteredAdvocates={advocates} />
        </Flex>
      </main>
    </Flex>
  );
}
