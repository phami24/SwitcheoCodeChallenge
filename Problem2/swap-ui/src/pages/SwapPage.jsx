import React from "react";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import SwapForm from "../components/swap/SwapForm";
import { WalletOptions } from "../components/wallet/wallet-options";
import { useAccount } from "wagmi";
import ConnectWallet from "../components/wallet/connect-wallet";


const SwapPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isConnected } = useAccount();
  localStorage.setItem("chakra-ui-color-mode", "dark");

  return (
    <Flex
      backgroundColor={"#131313"}
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
       <Box position="absolute" top="4" right="4">
        <ConnectWallet />
      </Box>
      {/* Form body */}
      <Box>
        <SwapForm />
        <Button
          hidden={isConnected}
          alignItems={"center"}
          rounded={20}
          h={"60px"}
          backgroundColor={"#311C31"}
          w={"full"}
          color={"#FC72FF"}
          onClick={onOpen}
        >
          Connect Wallet
        </Button>
      </Box>
      {/* Sidebar Wallet Options */}
      <WalletOptions isOpen={isOpen} onClose={onClose} />
      {/* <ConnectWallet /> */}
    </Flex>
  );
};

export default SwapPage;
