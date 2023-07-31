import { Box, Flex, Img } from "@chakra-ui/react";

const User = () => {
  return (
    <Flex w="100%" h="10%" bg="#8F7F3F">
      <Box h="42px" w="42px" bg="#8F7F3F">
        <Img src="https://cdn2.vectorstock.com/i/1000x1000/20/61/user-sign-orange-icon-on-black-vector-13392061.jpg"></Img>
      </Box>
    </Flex>
  );
};

export default User;
