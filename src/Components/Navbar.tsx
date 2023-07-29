import { Flex, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      w="100%"
      h="10vh"
      whiteSpace="-moz-pre-wrap"
      bg="#1E1914"
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
        <Text fontFamily="heading" fontSize="24px" color="#CFD746">
          Me
        </Text>
      </Flex>
    </Flex>
  );
};

export default Navbar;
