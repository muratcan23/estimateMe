import { Box, Flex } from "@chakra-ui/react";
import HamburgerIcon from "./icons/HamburgerIcon";

const User = () => {
  return (
    <Flex w="100%" h="10%" bg="#8F7F3F">
      <Box
        as="button"
        _hover={{ background: "#5A5D56" }}
        borderRadius="4px"
        alignItems="center"
        justifyContent="center"
      >
        <HamburgerIcon color="white" />
      </Box>
    </Flex>
  );
};

export default User;
