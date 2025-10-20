import { Box, Heading } from "@radix-ui/themes";
import { FC } from "react";

export const AdvocatesPageHeader: FC = () => (
  <Box
    px={"5"}
    py={"3"}
    style={{
      backgroundColor: "rgb(29, 67, 57)",
    }}
  >
    <Heading as="h1" style={{ color: "white" }}>
      Solace Advocates
    </Heading>
  </Box>
);
