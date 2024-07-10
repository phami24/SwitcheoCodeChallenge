// TokenSelectedButton.js
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import TokenItems from "./TokenItems";
import ListPopularToken from "./ListPopularToken";
import { fetchTokenData } from "./../../services/tokenService"; // Import the service function

const TokenSelectedButton = ({ selectedToken, setSelectedToken }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const [tokens, setTokens] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTokenData(); // Call the service function
        const filteredTokens = filterDuplicateTokens(data);
        setTokens(filteredTokens);
      } catch (error) {
        console.error("Error fetching token data:", error);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const filterDuplicateTokens = (tokens) => {
    const seen = new Set();
    return tokens.filter((token) => {
      if (seen.has(token.currency)) {
        return false;
      } else {
        seen.add(token.currency);
        return true;
      }
    });
  };

  const filteredTokens = tokens.filter((token) =>
    token.currency.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Button
        ref={btnRef}
        onClick={onOpen}
        backgroundColor={selectedToken ? "black" : "#fc72ff"}
        color={selectedToken ? "inherit" : "white"}
        borderRadius={20}
        padding="3"
        minWidth="auto"
      >
        {selectedToken ? (
          <Flex alignItems="center" gap="1">
            <Image
              src={`/assets/tokens/${selectedToken.currency}.svg`}
              alt="Token"
              boxSize="24px"
              borderRadius="full"
            />
            <Text>{selectedToken.currency}</Text>
            <ChevronDownIcon />
          </Flex>
        ) : (
          <Box fontWeight={"bold"} display="flex" alignItems="center">
            Select Token <ChevronDownIcon ml={2} />
          </Box>
        )}
      </Button>

      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent
          backgroundColor="#1B1B1B"
          color="white"
          border="1px solid #565858"
          borderRadius="20px"
          h={"fit-content"}
        >
          <ModalHeader borderBottom="1px solid #565858">
            <Text>Select a token</Text>
            <Box mt={2}>
              <Input
                placeholder="Tìm kiếm tên hoặc dán địa chỉ"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            <TokenItems setSelectedToken={setSelectedToken} onClose={onClose} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ListPopularToken
              tokens={filteredTokens}
              setSelectedToken={setSelectedToken}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TokenSelectedButton;
