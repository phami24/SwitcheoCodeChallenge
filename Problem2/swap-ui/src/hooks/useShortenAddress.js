import { useMemo } from "react";

export function useShortenAddress(address) {
  return useMemo(() => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);
}
