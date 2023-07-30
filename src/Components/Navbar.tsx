import { Flex, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      w="100%"
      h="10vh"
      whiteSpace="-moz-pre-wrap"
      bg="#7E7543"
      justifyContent="center"
      alignItems="center"
    >
      <Flex>
        <Text
          fontFamily="monospace"
          fontSize="44px"
          letterSpacing="2px"
          color="#D2D8E2"
        >
          Estimate
        </Text>
        <Text fontFamily="heading" fontSize="20px" color="#CFD746">
          Me
        </Text>
      </Flex>
    </Flex>
  );
};

export default Navbar;
