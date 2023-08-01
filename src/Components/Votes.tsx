import { Button, Flex, Wrap, WrapItem } from "@chakra-ui/react";

const Votes = () => {
  return (
    <Flex justifyContent="flex-start" alignItems="flex-start">
      <Wrap
        h="50px"
        mt="20px"
        // mr="600px"
        spacing="12px"
        border="2px solid white"
      >
        <WrapItem>
          <Button colorScheme="orange" size="lg">
            0
          </Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="orange" size="lg">
            1
          </Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="orange" size="lg">
            2
          </Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="orange" size="lg">
            3
          </Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="orange" size="lg">
            4
          </Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="orange" size="lg">
            5
          </Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="orange" size="lg">
            8
          </Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="orange" size="lg">
            13
          </Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme="orange" size="lg">
            ?
          </Button>
        </WrapItem>
      </Wrap>
    </Flex>
  );
};

export default Votes;
