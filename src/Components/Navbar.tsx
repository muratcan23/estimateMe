import { Flex, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      w="100%"
      h="10vh"
      whiteSpace="-moz-pre-wrap"
      bg="#d2d8e2"
      justifyContent="center"
      alignItems="center"
    >
      <Flex>
        <Text
          fontFamily="monospace"
          fontSize="44px"
          letterSpacing="2px"
          color="black"
        >
          Estimate
        </Text>
        <Text fontFamily="heading" fontSize="20px" color="black">
          Me
        </Text>
      </Flex>
    </Flex>
  );
};

export default Navbar;
