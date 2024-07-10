import React, { useEffect, useState } from "react";
import { Box, Button, Flex, FormLabel, Text } from "@chakra-ui/react";
import AmountInput from "./AmountInput";
import { ArrowDownIcon } from "@chakra-ui/icons";
import TokenSelectedButton from "./TokenSelectedButton";
import { calculateValue } from "../../services/tokenService";
import { useRecoilState } from "recoil";
import { selectedTokenFromAtom, selectedTokenToAtom } from "../../atoms/tokenAtom";

const SwapForm = () => {
  const [selectedTokenFrom, setSelectedTokenFrom] = useRecoilState(
    selectedTokenFromAtom
  );
  const [selectedTokenTo, setSelectedTokenTo] = useRecoilState(
    selectedTokenToAtom
  );
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

  const handleAmountFromChange = (value) => {
    const amount = parseFloat(value) || 0;
    setAmountFrom(amount);
    const convertedValue = calculateValue(
      amount,
      selectedTokenFrom,
      selectedTokenTo
    );
    setAmountTo(convertedValue.toFixed(2));
  };

  const handleAmountToChange = (value) => {
    const amount = parseFloat(value) || 0;
    setAmountTo(amount);
    const convertedValue = calculateValue(
      amount,
      selectedTokenFrom,
      selectedTokenTo
    );
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
          <ArrowDownIcon />
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
    </Box>
  );
};
export default SwapForm;
