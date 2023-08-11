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

//ButtonData will be mapped
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

type VoteEntry = {
  username: string;
  vote: string;
};

type VotesProps = {};
const Votes: React.FC<VotesProps> = () => {
  const [voteEntries, setVoteEntries] = useState<VoteEntry[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [vote, setVote] = useState<string | null>(null);

  const handleButtonClick = (buttonValue: string | number) => {
    if (typeof buttonValue === "number") {
      onOpen();
      setVote(buttonValue.toString());
    }
  };
  //Calculate average
  const calculateAverage = () => {
    const votes = voteEntries
      .map((entry) => parseFloat(entry.vote))
      .filter((vote) => !isNaN(vote));
    const totalVotes = votes.reduce((total, vote) => total + vote, 0);
    const average = totalVotes / votes.length;
    return average.toFixed(2);
  };

  const handleAlertDialogClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.closest("form");
    if (!form) return;

    e.preventDefault();
    const enteredUsername = form.username.value;
    if (enteredUsername !== null && enteredUsername.trim() !== "") {
      setUsername(enteredUsername);
      // Add a new entry
      setVoteEntries((prevEntries) => [
        ...prevEntries,
        { username: enteredUsername, vote: vote || "" },
      ]);
      onClose();
    } else {
      alert("You must enter a valid username!");
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
          mt="15px"
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
          mt="15px"
          bg="#9F9791"
          borderRadius="7px"
          p={1}
          _hover={{ bg: "tomato" }}
          onClick={() => window.location.reload()}
        >
          <Text color="white" fontSize="18px">
            Reset Estimation
          </Text>
        </Box>
      </Flex>

      <Flex
        alignItems="flex-start"
        flexDirection="column"
        mr="auto"
        mt="40px"
        ml="15px"
        w="50%"
      >
        {voteEntries.map((entry, index) => (
          <HStack key={index} spacing="15px">
            <HStack alignItems="center" justifyContent="center">
              <Text color="white" fontSize="20px">
                Username :
              </Text>
              <Text color="#0BC6E3" fontSize="24px">
                {entry.username}
              </Text>
            </HStack>
            <HStack alignItems="center" justifyContent="center" ml="10px">
              <Text color="white" fontSize="20px">
                Vote :
              </Text>
              <Text color="#0BC6E3" fontSize="24px">
                {entry.vote}
              </Text>
            </HStack>
          </HStack>
        ))}
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="#B4B26D">
            <form>
              <AlertDialogHeader textColor="#F0F2F5">
                Enter Your Username
              </AlertDialogHeader>
              <AlertDialogBody>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  ref={cancelRef}
                />
              </AlertDialogBody>
              <AlertDialogFooter>
                <Box
                  h="35px"
                  w="35px"
                  as="button"
                  onClick={handleAlertDialogClose}
                  textColor="yellow"
                  bg="#BA3257"
                  p="2px"
                  mr="auto"
                  border="2px solid black"
                  borderRadius="50%"
                  _hover={{ bg: "white", textColor: "black" }}
                >
                  OK
                </Box>
                <Box
                  as="button"
                  onClick={() => onClose()}
                  textColor="yellow"
                  bg="gray"
                  p="2px"
                  ml="auto"
                  border="2px solid black"
                  borderRadius="5px"
                  _hover={{ bg: "white", textColor: "black" }}
                >
                  Cancel
                </Box>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Flex
        w="500px"
        h="250px"
        border="1px solid white"
        m="10px 30px 0 auto"
        flexDirection="column"
      >
        <Flex bg="grey" w="100%" h="15%" alignItems="center">
          <Text color="white" ml="10px" fontWeight="medium" fontSize="xl">
            Estimation Results
          </Text>
        </Flex>

        <Flex mt="10px" ml="10px">
          <Text color="white" fontSize="md" fontWeight="semibold">
            Average - <span color="tomato">{calculateAverage()} </span>
          </Text>
        </Flex>
        <Flex mt="10px" ml="10px">
          <Text color="white" fontSize="md" fontWeight="semibold">
            Disagreement -
          </Text>
        </Flex>
        <Flex ml="10px" mt="20px">
          <Text color="white" fontWeight="bold" fontSize="18px">
            Vote Summary
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Votes;
