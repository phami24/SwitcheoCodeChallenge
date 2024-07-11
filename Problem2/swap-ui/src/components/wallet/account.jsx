import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  Avatar,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { useAccount, useEnsName } from "wagmi";
import { getBalance } from "@wagmi/core";
import { config } from "../../config/config";
import { MdCreditCard, MdImage } from "react-icons/md";

export function Account() {
  const { address } = useAccount();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const balance = await getBalance(config, { address });
        console.log(balance);
        setBalance(balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
    fetchBalance();
  }, [address]);

  return (
    <Box backgroundColor="#1B1B1B" color="white" borderRadius="lg">
      <Text mt={2} fontSize="2xl" fontWeight="bold">
        $0.00
      </Text>
      <Flex direction="column" align="">
        <Flex mt={4} gap={4}>
        <Button
          backgroundColor="#311C31"
          color="#FC72FF"
          width="200px"
          height="100px"
          flexDirection="column"
          borderRadius="lg"
          display="flex"
          alignItems="flex-start"
          pl={4} 
        >
          <Icon as={MdCreditCard} boxSize={6} mb={2} />
          Buy
        </Button>
        <Button
          backgroundColor="#311C31"
          color="#FC72FF"
          width="200px"
          height="100px"
          flexDirection="column"
          borderRadius="lg"
          display="flex"
          alignItems="flex-start"
          pl={4} 
        >
          <Icon as={MdImage} boxSize={6} mb={2} />
          View NFTs
        </Button>
        </Flex>
      </Flex>
      <Tabs colorScheme="pink" mt={5}>
        <TabList justifyContent="center">
          <Tab>Tokens</Tab>
          <Tab>NFTs</Tab>
          <Tab>Pools</Tab>
          <Tab>Activity</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex direction="column" align="center">
              <Text>No tokens yet</Text>
              <Button mt={4} backgroundColor="#FC72FF" color="white">
                Explore tokens
              </Button>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Text>NFTs content</Text>
          </TabPanel>
          <TabPanel>
            <Text>Pools content</Text>
          </TabPanel>
          <TabPanel>
            <Text>Activity content</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
