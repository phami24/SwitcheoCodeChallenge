import React, { useEffect, useState } from "react";
import { Box, Button, Flex, FormLabel, Text } from "@chakra-ui/react";
import AmountInput from "./AmountInput";
import { TriangleDownIcon } from "@chakra-ui/icons";
import TokenSelectedButton from "./TokenSelectedButton";

const SwapForm = () => {
  const defaultToken = {
    currency: "ETH",
    date: "2023-08-29T07:10:52.000Z",
    price: 1645.9337373737374,
  };
  const [selectedTokenFrom, setSelectedTokenFrom] = useState(defaultToken);
  const [selectedTokenTo, setSelectedTokenTo] = useState(null);
  const [amountFrom, setAmountFrom] = useState(0);
  const [amountTo, setAmountTo] = useState(0);

  const swapTokens = () => {
    const tempToken = selectedTokenFrom;
    setSelectedTokenFrom(selectedTokenTo);
    setSelectedTokenTo(tempToken);

    const tempAmount = amountFrom;
    setAmountFrom(amountTo);
    setAmountTo(tempAmount);
  };

  const calculateValue = (amount, fromToken, toToken) => {
    if (!fromToken || !toToken) return 0;
    return (amount * fromToken.price) / toToken.price;
  };

  const handleAmountFromChange = (value) => {
    const amount = parseFloat(value) || 0;
    console.log(amount + "From");
    setAmountFrom(amount);
    const convertedValue = calculateValue(
      amount,
      selectedTokenFrom,
      selectedTokenTo
    );
    console.log(convertedValue + "To");
    setAmountTo(convertedValue.toFixed(2));
  };

  const handleAmountToChange = (value) => {
    const amount = parseFloat(value) || 0;
    console.log(amount + "From");
    setAmountTo(amount);
    const convertedValue = calculateValue(
      amount,
      selectedTokenFrom,
      selectedTokenTo
    );
    console.log(convertedValue + "To");
    setAmountFrom(convertedValue.toFixed(2));
  };

  useEffect(() => {
    const newAmountTo = calculateValue(
      amountFrom,
      selectedTokenFrom,
      selectedTokenTo
    );
    setAmountTo(newAmountTo);
  }, [selectedTokenFrom, selectedTokenTo, amountFrom]);

  return (
    <Box>
      <Box position="relative" w={"full"}>
        <Box backgroundColor={"#1B1B1B"} p={5} rounded={20} mb={1}>
          <FormLabel>Sell</FormLabel>
          <Flex justifyContent="space-between" alignItems="center">
            <Flex gap={2} alignItems="center">
              <AmountInput
                amount={amountFrom}
                onAmountChange={handleAmountFromChange}
              />
            </Flex>
            <TokenSelectedButton
              selectedToken={selectedTokenFrom}
              setSelectedToken={setSelectedTokenFrom}
            />
          </Flex>
          {amountFrom !== 0 && (
            <Text>{(amountFrom * selectedTokenFrom.price).toFixed(2)}$</Text>
          )}
        </Box>
        <Button
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
          rounded="10px"
          background={"#1B1B1B"}
          border={"3px black solid"}
          _hover={""}
          _focus={{ background: "#1B1B1B" }}
          _active={{ background: "#1B1B1B" }}
          w={1}
          onClick={swapTokens}
        >
          <TriangleDownIcon />
        </Button>
        <Box backgroundColor={"#1B1B1B"} p={5} rounded={20} mb={1}>
          <FormLabel>Buy</FormLabel>
          <Flex justifyContent="space-between" alignItems="center">
            <Flex gap={2} alignItems="center">
              <AmountInput
                amount={amountTo}
                onAmountChange={handleAmountToChange}
              />
            </Flex>
            <TokenSelectedButton
              selectedToken={selectedTokenTo}
              setSelectedToken={setSelectedTokenTo}
            />
          </Flex>
          {amountTo !== 0 && (
            <Text>{(amountTo * selectedTokenFrom.price).toFixed(2)}$</Text>
          )}
        </Box>
      </Box>
      <Button
        alignItems={"center"}
        rounded={20}
        h={"60px"}
        backgroundColor={"#311C31"}
        w={"full"}
        color={"#FC72FF"}
      >
        Connect Wallet
      </Button>
    </Box>
  );
};
export default SwapForm;
