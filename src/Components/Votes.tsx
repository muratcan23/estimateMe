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

const POINTS = [0, 1, 2, 3, 4, 5, 8, 13, "?"];

type VoteEntry = {
  username: string;
  vote: string;
};

type IDISAGREMENT_RATE_CATEGORY = "LOW" | "MEDIUM" | "HIGH";

type VotesProps = {};
const Votes: React.FC<VotesProps> = () => {
  const [voteEntries, setVoteEntries] = useState<VoteEntry[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLInputElement>(null);
  const [vote, setVote] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [disagreementRateCategory, setDisagreementRateCategory] =
    useState<IDISAGREMENT_RATE_CATEGORY>("LOW");

  const handleButtonClick = (buttonValue: string | number) => {
    onOpen();
    setVote(buttonValue.toString());
  };

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

    if (disagreementRate >= 1.5) {
      setDisagreementRateCategory("HIGH");
    } else if (disagreementRate >= 0.5) {
      setDisagreementRateCategory("MEDIUM");
    }
  };

  // Calculate summary
  const calculateSummary = () => {
    const summary: { [vote: string]: number } = {}; // Explicitly define the type

    for (const entry of voteEntries) {
      if (entry.vote in summary) {
        summary[entry.vote]++;
      } else {
        summary[entry.vote] = 1;
      }
    }

    return summary;
  };

  return (
    <Flex flex="1" alignItems="center" justifyContent="center">
      <Flex
        h="86vh"
        w="95%"
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
          <Flex mb="auto" mr="auto" ml="40px">
            {POINTS.map((point) => (
              <Box
                key={point}
                as="button"
                h="35px"
                w="40px"
                borderRadius="5px"
                bg="#7E8D6B"
                _hover={{ bg: "#217A54" }}
                m="10px 0 auto 15px"
                onClick={() => handleButtonClick(point)}
              >
                <Text color="white" fontSize="2xl">
                  {point}
                </Text>
              </Box>
            ))}
          </Flex>
          <Flex
            h="50px"
            w="100%"
            mt="30px"
            mr="auto"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              h="35px"
              as="button"
              ml="25px"
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
                  <HStack key={index} spacing="15px" h="100%">
                    <HStack
                      alignItems="center"
                      justifyContent="center"
                      ml="10px"
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
                      <Text color="yellow" fontSize="18px">
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
            {isVisible && (
              <Flex
                border="1px solid white"
                flexDirection="column"
                ml="auto"
                mr="-20px"
                h="100%"
                w="30%"
              >
                <Flex bg="grey" h="40px" alignItems="center">
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
                    Average -
                    <span style={{ color: "yellow" }}>
                      {calculateAverage()}
                    </span>
                  </Text>
                </Flex>

                <Flex mt="10px" ml="10px">
                  <Text color="white" fontSize="18px" fontWeight="semibold">
                    Disagreement Rate -
                    <span
                      style={{
                        color:
                          disagreementRateCategory === "LOW"
                            ? "#67D775"
                            : disagreementRateCategory === "MEDIUM"
                            ? "yellow"
                            : disagreementRateCategory === "HIGH"
                            ? "red"
                            : "inherit",
                      }}
                    >
                      {disagreementRateCategory}
                    </span>
                  </Text>
                </Flex>
                <Flex ml="10px" mt="20px">
                  {/* Display vote summary */}
                  <Flex flexDirection="column" p="1px">
                    <Text fontWeight="bold" color="white" fontSize="18px">
                      Vote Summary:
                    </Text>
                    <Divider />

                    <Box mt={2}>
                      {Object.entries(calculateSummary()).map(
                        ([vote, count]) => (
                          <Flex
                            key={vote}
                            alignItems="center"
                            border="1px solid white"
                            borderRadius="7px"
                            p="1px"
                            bg="green.700"
                            m="7px"
                          >
                            {/* You can adjust the Flexbox styles as needed */}
                            <Text color="yellow">
                              {vote === "have no idea"
                                ? `No Idea voted ${count} time${
                                    count === 1 ? "" : "s"
                                  }`
                                : `${count} vote${
                                    count === 1 ? "" : "s"
                                  } for ${vote} point${count === 1 ? "" : "s"}`}
                            </Text>
                          </Flex>
                        )
                      )}
                    </Box>
                  </Flex>
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
