import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Flex,
  useClipboard,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Account } from "./account";
import { useAccount, useDisconnect, useEnsName } from "wagmi";
import { useShortenAddress } from "../../hooks/useShortenAddress";
import { MdPowerOff } from "react-icons/md";
function ConnectWallet() {
  const { isConnected, address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { disconnect } = useDisconnect();
  const shortenedAddress = useShortenAddress(address || "");
  const { onCopy } = useClipboard(address);
  const toast = useToast();

  const copyAddress = () => {
    onCopy();
    toast({
      title: "Copied",
      status: "success",
      position: "top-right",
      isClosable: true,
    });
  };
  if (!isConnected) return null;
  return (
    <>
      <Button onClick={onOpen}>{ensName || shortenedAddress}</Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerContent backgroundColor="#1B1B1B" color="white">
          <DrawerHeader>
            <Flex justifyContent="space-between">
              <Box>
                <Button backgroundColor={"#1B1B1B"} onClick={copyAddress}>
                  {shortenedAddress}
                </Button>
              </Box>
              <Button>
                <MdPowerOff onClick={() => disconnect()} />
              </Button>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <Account />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ConnectWallet;
