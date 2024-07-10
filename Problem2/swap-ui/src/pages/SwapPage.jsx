import React, { useState } from "react";
import { Box, Flex, Button, useDisclosure } from "@chakra-ui/react";
import SwapForm from "../components/swap/SwapForm";
import { Account } from "../components/wallet/account";
import { WalletOptions } from "../components/wallet/wallet-options";
import { useAccount } from "wagmi";

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return null;
}

const SwapPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  localStorage.setItem("chakra-ui-color-mode", "dark");

  return (
    <Flex
      backgroundColor={"#131313"}
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      {/* Form body */}
      <Box>
        <SwapForm />
        <Button
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
      <ConnectWallet />
    </Flex>
  );
};

export default SwapPage;
