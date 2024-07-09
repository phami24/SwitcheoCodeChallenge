import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import TokenCard from "./TokenCard";

const TokenItems = () => {
  const tokens = [
    { src: "/assets/tokens/ETH.svg", name: "ETH" },
    { src: "/assets/tokens/DAI.svg", name: "DAI" },
    { src: "/assets/tokens/USDC.svg", name: "USDC" },
    { src: "/assets/tokens/USDT.svg", name: "USDT" },
    { src: "/assets/tokens/WBTC.svg", name: "WBTC" },
    { src: "/assets/tokens/WETH.svg", name: "WETH" },
  ];

  return (
  <Box mt={5}>
      <Flex flexWrap="wrap" justifyContent="space-around">
        {tokens.map((token, index) => (
          <Flex key={index} flexBasis="30%" mb={2}>
            <TokenCard src={token.src} name={token.name} />
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default TokenItems;
