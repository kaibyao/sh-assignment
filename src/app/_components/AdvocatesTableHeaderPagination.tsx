import { FC } from "react";
import { Select, Flex, Text } from "@radix-ui/themes";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange(page: number): void;
}

export const AdvocatesTableHeaderPagination: FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Don't show pagination if there are no pages or only one page
  if (totalPages <= 1) {
    return null;
  }

  // Generate array of page numbers for the select options
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Flex align="center" gap="2">
      <Text size="2">Viewing page</Text>
      <Select.Root
        value={currentPage.toString()}
        onValueChange={(value) => onPageChange(parseInt(value))}
      >
        <Select.Trigger />
        <Select.Content>
          {pageNumbers.map((pageNum) => (
            <Select.Item key={pageNum} value={pageNum.toString()}>
              {pageNum}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Text size="2">of {totalPages}</Text>
    </Flex>
  );
};
