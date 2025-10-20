import { AdvocatesTableHeaderPagination } from "@/app/_components/AdvocatesTableHeaderPagination";
import { AdvocatesTableHeaderSearch } from "@/app/_components/AdvocatesTableHeaderSearch";
import { Flex } from "@radix-ui/themes";
import { FC } from "react";

interface Props {
  onSearchChange(searchTerm: string): void;
  currentPage: number;
  totalPages: number;
  onPageChange(page: number): void;
}

export const AdvocatesTableHeader: FC<Props> = ({
  onSearchChange,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Flex gap="5" justify="between" align="center">
      <AdvocatesTableHeaderSearch onSearchChange={onSearchChange} />
      <AdvocatesTableHeaderPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Flex>
  );
};
