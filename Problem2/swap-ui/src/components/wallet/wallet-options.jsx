import React, { useState } from "react";
import {
  Button,
  Box,
  Flex,
  Heading,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { useConnect } from "wagmi";

export function WalletOptions({ isOpen, onClose }) {
  const { connectors, connect } = useConnect();
  const [loadingStates, setLoadingStates] = useState(
    connectors.map(() => false)
  );

  const handleConnect = async (index, connector) => {
    setLoadingStates((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });

    try {
      await connect({ connector });
    } catch (error) {
      console.error("Kết nối lỗi:", error);
    } finally {
      setLoadingStates((prev) => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
      onClose();
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <Box>
        <DrawerContent
          backgroundColor="#131313"
          m={2}
          borderRadius="md"
          border={"0.5px solid #242424"}
        >
          <DrawerCloseButton />
          <DrawerHeader>Connect a wallet</DrawerHeader>
          <DrawerBody>
            <Box p={4}>
              <Flex direction="column" gap={3}>
                {connectors.map((connector, index) => (
                  <Button
                    key={connector.id}
                    onClick={() => handleConnect(index, connector)}
                    size={"lg"}
                    backgroundColor={"#1B1B1B"}
                    isLoading={loadingStates[index]}
                    loadingText="Connecting..."
                  >
                    {connector.name}
                  </Button>
                ))}
              </Flex>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Box>
    </Drawer>
  );
}
