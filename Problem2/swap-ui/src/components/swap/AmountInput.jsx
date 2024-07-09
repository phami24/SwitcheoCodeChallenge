import React from "react";
import { Input } from "@chakra-ui/react";

const AmountInput = ({ amount, onAmountChange }) => {
  return (
    <Input
      width="60"
      height="12"
      fontSize="xx-large"
      value={amount}
      onChange={(e) => onAmountChange(e.target.value)}
      border={0}
      focusBorderColor="transparent"
      textColor={"#ccc"}
      pl={0}
    />
  );
};

export default AmountInput;
