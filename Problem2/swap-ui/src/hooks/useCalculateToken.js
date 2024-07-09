// hooks/useCalculateValue.js
import { useState, useEffect } from "react";

const useCalculateToken = (amount, fromToken, toToken) => {
  const [convertedValue, setConvertedValue] = useState(0);

  useEffect(() => {
    const calculate = () => {
      if (fromToken && toToken) {
        const newValue = (amount * fromToken.price) / toToken.price;
        setConvertedValue(newValue.toFixed(2));
      } else {
        setConvertedValue(0);
      }
    };
    calculate();
  }, [amount, fromToken, toToken]);

  return convertedValue;
};

export default useCalculateToken;
