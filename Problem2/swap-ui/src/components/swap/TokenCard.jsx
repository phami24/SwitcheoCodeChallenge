import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const TokenCard = ({ src, name }) => {
  return (
    <Flex
      justify="center"
      align="center"
      backgroundColor="#1B1B1B"
      borderRadius="full"
      border="1px solid gray"
      padding={2}
      gap={2}
      cursor={"pointer"}
    >
      <Image src={src} alt={name} boxSize="20px" />
      <Text  fontSize={"sm"} color="white">{name}</Text>
    </Flex>
  );
};

export default TokenCard;
