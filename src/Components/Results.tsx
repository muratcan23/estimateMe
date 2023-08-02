import { Flex, Text } from "@chakra-ui/react";

const Results = () => {
  return (
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
          Average -
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
  );
};

export default Results;
