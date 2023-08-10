import { Flex } from "@chakra-ui/react";

import User from "./User";
import Votes from "./Votes";

const Board = () => {
  return (
    <Flex flex="1" alignItems="center" justifyContent="center">
      <Flex
        h="75vh"
        w="90%"
        border="4px solid #8F7F3F"
        borderRadius="4px"
        alignItems="center"
        flexDirection="column"
        margin="3%"
      >
        <User />
        <Votes />
      </Flex>
    </Flex>
  );
};

export default Board;
