import { AdvocatesTableHeaderSearch } from "@/app/_components/AdvocatesTableHeaderSearch";
import { Flex } from "@radix-ui/themes";
import { FC } from "react";

interface Props {
  onSearchChange(searchTerm: string): void;
}

export const AdvocatesTableHeader: FC<Props> = ({ onSearchChange }) => {
  return (
    <Flex gap="5" justify="between" align="center">
      <AdvocatesTableHeaderSearch onSearchChange={onSearchChange} />
    </Flex>
  );
};
