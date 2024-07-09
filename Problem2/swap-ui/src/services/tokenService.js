// TokenService.js
const fetchTokenData = async () => {
  try {
    const response = await fetch("https://interview.switcheo.com/prices.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching token data:", error);
    throw error; // Re-throw the error to handle it where you call the service
  }
};

const calculateValue = (amount, fromToken, toToken) => {
  if (!fromToken || !toToken) return 0;
  const value = (amount * fromToken.price) / toToken.price;
  return parseFloat(value.toFixed(2));
};

export { fetchTokenData , calculateValue };
