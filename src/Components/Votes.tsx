import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Flex,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";

type ButtonItem = {
  text: string;
  value: string | number;
};

const ButtonData: ButtonItem[] = [
  {
    text: "0",
    value: 0,
  },
  {
    text: "1",
    value: 1,
  },
  {
    text: "2",
    value: 2,
  },
  {
    text: "3",
    value: 3,
  },
  {
    text: "4",
    value: 4,
  },
  {
    text: "5",
    value: 5,
  },
  {
    text: "8",
    value: 8,
  },
  {
    text: "13",
    value: 13,
  },
  {
    text: "?",
    value: "",
  },
];

type VotesProps = {};

const Votes: React.FC<VotesProps> = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [vote, setVote] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (buttonValue: string | number) => {
    if (typeof buttonValue === "number") {
      onOpen();
      setVote(buttonValue.toString());
    }
  };
  const handleAlertDialogClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.closest("form");
    if (!form) return;

    e.preventDefault();
    const enteredUsername = form.username.value;
    if (enteredUsername !== null && enteredUsername.trim() !== "") {
      setUsername(enteredUsername);
      onClose();
    } else {
      alert("You must enter a valid username.");
    }
  };

  return (
    <Flex
      h="125px"
      w="100%"
      mt="15px"
      alignItems="center"
      flexDirection="column"
    >
      <Flex mb="auto" mr="auto" ml="10px">
        {ButtonData.map((button) => (
          <Box
            key={button.text}
            as="button"
            h="35px"
            w="40px"
            borderRadius="5px"
            bg="#7E8D6B"
            _hover={{ bg: "#217A54" }}
            m="10px 0 auto 15px"
            onClick={() => handleButtonClick(button.value)}
          >
            <Text color="white" fontSize="2xl">
              {button.text}
            </Text>
          </Box>
        ))}
      </Flex>
      <Flex h="50px" w="100%" mt="auto" mr="auto">
        <Box
          h="35px"
          as="button"
          ml="25px"
          background="#4F608B"
          borderRadius="7px"
          p={1}
          _hover={{ bg: "green" }}
        >
          <Text color="white" fontSize="18px">
            Reveal votes
          </Text>
        </Box>
        <Box
          h="35px"
          as="button"
          ml="auto"
          mr="30px"
          bg="#9F9791"
          borderRadius="7px"
          p={1}
          _hover={{ bg: "gray" }}
        >
          <Text color="white" fontSize="18px">
            Reset Estimation
          </Text>
        </Box>
      </Flex>

      <Flex alignItems="flex-start" flexDirection="column" mt="auto">
        <HStack spacing="10px">
          {username && (
            <Text color="white" fontSize="20px" mt="10px">
              Username : {username}
            </Text>
          )}
          {vote && (
            <Text color="white" fontSize="20px" mt="10px">
              Vote: {vote}
            </Text>
          )}
        </HStack>
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <form>
              <AlertDialogHeader>Enter Your Username</AlertDialogHeader>
              <AlertDialogBody>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  ref={cancelRef}
                />
              </AlertDialogBody>
              <AlertDialogFooter>
                <button type="button" onClick={() => onClose()}>
                  Cancel
                </button>
                <button type="button" onClick={handleAlertDialogClose}>
                  OK
                </button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default Votes;
