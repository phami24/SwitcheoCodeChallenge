// TokenItems.js
import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

const ListPopularToken = ({ tokens, setSelectedToken , onClose}) => {
  const chooseToken = (token) => {
    setSelectedToken(token);
    console.log(token);
    onClose();
  };
  return (
    <Box mt={2} className="scroll-container">
      {tokens.map((token) => (
        <Flex
          key={token.currency}
          alignItems="center"
          gap="3"
          mb="2"
          cursor="pointer"
          _hover={{ backgroundColor: "#1E1F21" }}
          w="full"
          p="2"
          borderRadius="md"
          onClick={() => chooseToken(token)}
        >
          <Image
            src={`/assets/tokens/${token.currency}.svg`}
            alt={token.currency}
            boxSize="30px"
            borderRadius="full"
          />
          <Text>{token.currency}</Text>
        </Flex>
      ))}
    </Box>
  );
};

export default ListPopularToken;
