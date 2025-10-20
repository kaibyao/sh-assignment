"use client";

import { useEffect, useState } from "react";
import { SelectAdvocate } from "@/db/schema";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { AdvocatesPageHeader } from "@/app/_components/AdvocatesPageHeader";
import { AdvocatesTable } from "@/app/_components/AdvocatesTable";

export default function Home() {
  const [advocates, setAdvocates] = useState<SelectAdvocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<SelectAdvocate[]>(
    [],
  );

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    document.getElementById("search-term").innerHTML = searchTerm;

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.toLocaleString().includes(searchTerm)
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
        <div>
          <p>Search</p>
          <p>
            Searching for: <span id="search-term"></span>
          </p>
          <input style={{ border: "1px solid black" }} onChange={onChange} />
          <button onClick={onClick}>Reset Search</button>
        </div>
        <br />
        <br />
        <AdvocatesTable filteredAdvocates={filteredAdvocates} />
      </main>
    </>
  );
}
