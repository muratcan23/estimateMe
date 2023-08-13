import { Flex, HStack, Img, Text } from "@chakra-ui/react";

type UserProps = {
  username: string;
};

const User: React.FC<UserProps> = ({ username }) => {
  return (
    <Flex
      w="100%"
      h="10%"
      bg="#8F5F3F"
      alignItems="center"
      justifyContent="center"
    >
      <HStack h="44px" w="44px" bg="#8F7F3F" mr="auto" ml="10px">
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/2048px-User_font_awesome.svg.png"
          border="2px solid black"
          borderRadius="5px"
        ></Img>
        <Text fontFamily="heading" fontSize="2xl" fontWeight="bold">
          {username}
        </Text>
      </HStack>
    </Flex>
  );
};

export default User;
