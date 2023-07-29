import { ChakraProvider, Flex, Text } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Flex h="70vh" w="75%" border="2px solid green" mx="10%" mt="50px">
        <Text>EstimateME</Text>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
