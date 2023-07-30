import { Flex, Text } from "@chakra-ui/react";
import User from "./User";

const Board = () => {
  return (
    <Flex flex="1" alignItems="center" justifyContent="center">
      <Flex
        h="75vh"
        w="90%" // Adjust the width to 90% to leave some space on the left and right sides
        border="4px solid #8F7F3F"
        borderRadius="4px"
        alignItems="center"
        flexDirection="column" // To stack the User and Text components vertically
        margin="3%" // Add margin to create the gap
      >
        <User />
        <Text mt="10px">EstimateME</Text>{" "}
        {/* Add some margin between User and Text */}
      </Flex>
    </Flex>
  );
};

export default Board;
