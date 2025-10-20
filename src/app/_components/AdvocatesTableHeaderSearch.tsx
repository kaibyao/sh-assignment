import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { FC, useState } from "react";

interface Props {
  onSearchChange(searchTerm: string): void;
}

export const AdvocatesTableHeaderSearch: FC<Props> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    setSearchTerm(searchTerm);
    onSearchChange(searchTerm);
  };

  const handleSearchReset = () => {
    setSearchTerm("");
    onSearchChange("");
  };

  return (
    <Flex gap="1" align="center" maxWidth="400px" width={"100%"}>
      <TextField.Root
        autoFocus
        placeholder="Search for advocate based on an attribute..."
        onChange={handleSearchChange}
        value={searchTerm}
        style={{ width: "100%" }}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      {!!searchTerm && (
        <Button variant="surface" onClick={handleSearchReset}>
          Reset Search
        </Button>
      )}
    </Flex>
  );
};
