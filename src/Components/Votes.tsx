import { Box, Flex, Text } from "@chakra-ui/react";

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
    </Flex>
  );
};

export default Votes;
