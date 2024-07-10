import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import TokenCard from "./TokenCard";

const TokenItems = ({ setSelectedToken, onClose }) => {
  const tokens = [
    {
      currency: "ETH",
      price: 1645.9337373737374,
      date: "2023-08-29T07:10:52.000Z",
    },
    {
      currency: "DAI",
      price: null,
      date: null,
    },
    {
      currency: "USDC",
      price: 0.989832,
      date: "2023-08-29T07:10:40.000Z",
    },
    {
      currency: "USDT",
      price: null,
      date: null,
    },
    {
      currency: "WBTC",
      price: 26002.82202020202,
      date: "2023-08-29T07:10:52.000Z",
    },
    {
      currency: "WETH",
      price: null,
      date: null,
    },
  ];
  const chooseToken = (token) => {
    setSelectedToken(token);
    console.log(token);
    onClose();
  };
  return (
    <Box mt={5}>
      <Flex flexWrap="wrap" justifyContent="space-around">
        {tokens.map((token, index) => (
          <Flex
            key={index}
            flexBasis="30%"
            mb={2}
            onClick={() => chooseToken(token)}
          >
            <TokenCard
              src={`/assets/tokens/${token.currency}.svg`}
              name={token.currency}
            />
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default TokenItems;
