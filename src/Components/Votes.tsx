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
    <Flex h="45px" w="100%" alignItems="center" justifyContent="flex-start">
      {ButtonData.map((button) => (
        <Box
          key={button.text}
          as="button"
          h="90%"
          w="2vw"
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
  );
};

export default Votes;
