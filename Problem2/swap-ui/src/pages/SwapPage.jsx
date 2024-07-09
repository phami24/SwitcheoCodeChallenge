import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import SwapForm from "../components/swap/SwapForm";

const SwapPage = () => {
  localStorage.setItem("chakra-ui-color-mode", "dark");
  return (
    <Flex
      backgroundColor={"black"}
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      {/* Form header */}
      <Box></Box>
      {/* Form body */}
      <Box>
        <SwapForm />
      </Box>
      {/* Connect button */}
      <Box></Box>
    </Flex>
  );
};

export default SwapPage;
