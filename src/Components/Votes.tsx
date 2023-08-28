import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Divider,
  Flex,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import User from "./User";

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
    value: "have no idea",
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
  const [isVisible, setIsVisible] = useState(false);
  const [disagreementRateCategory, setDisagreementRateCategory] =
    useState("low");

  const [revealedVotes, setRevealedVotes] = useState<{
    [username: string]: boolean;
  }>({});

  const handleButtonClick = (buttonValue: string | number) => {
    onOpen();
    setVote(buttonValue.toString());
  };

  //See results
  const toggleVisibleResults = () => {
    setIsVisible(!isVisible);
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

    // Calculate disagreement rate
    const calculateDisagreementRate = () => {
      const votes = voteEntries
        .map((entry) => parseFloat(entry.vote))
        .filter((vote) => !isNaN(vote));
      const average = parseFloat(calculateAverage()); // Convert average to number

      const absoluteDifferences = votes.map((vote) => Math.abs(vote - average));
      const totalAbsoluteDifference = absoluteDifferences.reduce(
        (total, diff) => total + diff,
        0
      );

      const disagreementRate = totalAbsoluteDifference / votes.length;
      return disagreementRate;
    };

    const disagreementRate = calculateDisagreementRate();
    let disagreementRateCategory = "low";

    if (disagreementRate >= 1.5) {
      setDisagreementRateCategory("high");
    } else if (disagreementRate >= 0.5) {
      setDisagreementRateCategory("medium");
    }
  };

  // show voted or not
  const handleRevealVote = (username: string) => {
    setRevealedVotes((prevRevealedVotes) => ({
      ...prevRevealedVotes,
      [username]: !prevRevealedVotes[username],
    }));
  };

  return (
    <Flex flex="1" alignItems="center" justifyContent="center">
      <Flex
        h="75vh"
        w="90%"
        border="4px solid #d2d8e2"
        borderRadius="4px"
        alignItems="center"
        flexDirection="column"
        margin="3%"
      >
        {voteEntries.length > 0 ? (
          <User username={voteEntries[0].username} />
        ) : (
          <User username="User" />
        )}
        <Flex
          h="125px"
          w="100%"
          mt="15px"
          alignItems="center"
          flexDirection="column"
        >
          //mapped data buttons
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
              onClick={toggleVisibleResults}
            >
              <Text
                fontSize="18px"
                style={{ color: isVisible ? "yellow" : "white" }}
              >
                {isVisible ? "Hide votes" : "Reveal votes"}
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
          <HStack w="95%" mt="20px" ml="20px" mr="auto">
            //Users and votes
            <Flex
              alignItems="flex-start"
              flexDirection="column"
              mr="auto"
              mb="auto"
              w="50%"
              h="100%"
              border="1px solid white"
            >
              {voteEntries.map((entry, index) => (
                <>
                  {/* <HStack key={index} spacing="15px" h="100%">
                    <HStack
                      alignItems="center"
                      justifyContent="center"
                      ml="7px"
                    >
                      <Text color="white" fontSize="18px">
                        Username :
                      </Text>
                      <Text color="#0BC6E3" fontSize="18px">
                        {entry.username}
                      </Text>
                    </HStack>

                    <HStack
                      alignItems="center"
                      justifyContent="center"
                      ml="10px"
                    >
                      <Text color="white" fontSize="18px">
                        Vote :
                      </Text>
                      <Text color="#0BC6E3" fontSize="18px">
                        {entry.vote}
                      </Text>
                    </HStack>
                  </HStack> */}
                  <HStack key={index} spacing="15px" h="100%">
                    <HStack
                      alignItems="center"
                      justifyContent="center"
                      ml="7px"
                    >
                      <Text color="white" fontSize="18px">
                        Username :
                      </Text>
                      <Text color="tomato" fontSize="18px">
                        {entry.username}
                      </Text>
                    </HStack>
                    <HStack
                      alignItems="center"
                      justifyContent="center"
                      ml="10px"
                    >
                      <Text color="white" fontSize="18px">
                        Vote :
                      </Text>
                      <Text color="#0BC6E3" fontSize="18px">
                        {isVisible
                          ? entry.vote
                          : entry.vote === "have no idea"
                          ? "?"
                          : "✓"}{" "}
                      </Text>
                    </HStack>
                  </HStack>

                  {index !== voteEntries.length - 1 && <Divider mt="10px" />}
                </>
              ))}
            </Flex>
            //Results
            {isVisible && (
              <Flex
                border="1px solid white"
                flexDirection="column"
                ml="auto"
                mr="-20px"
                h="100%"
                w="30%"
              >
                <Flex bg="grey" h="15%" alignItems="center">
                  <Text
                    color="white"
                    ml="10px"
                    fontWeight="medium"
                    fontSize="xl"
                  >
                    Estimation Results
                  </Text>
                </Flex>

                <Flex mt="10px" ml="10px">
                  <Text color="white" fontSize="18px" fontWeight="semibold">
                    Average -{" "}
                    <span style={{ color: "tomato" }}>
                      {calculateAverage()}{" "}
                    </span>
                  </Text>
                </Flex>

                <Flex mt="10px" ml="10px">
                  <Text color="white" fontSize="18px" fontWeight="semibold">
                    Disagreement Rate -{disagreementRateCategory}
                  </Text>
                </Flex>
                <Flex ml="10px" mt="20px">
                  <Text color="white" fontWeight="bold" fontSize="18px">
                    Vote Summary
                  </Text>

                  <Text>votes used:</Text>
                </Flex>
              </Flex>
            )}
          </HStack>
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
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Votes;
