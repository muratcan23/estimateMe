import { ChakraProvider } from "@chakra-ui/react";
import Votes from "./Components/Votes";

function App() {
  return (
    <ChakraProvider>
      <Votes />
    </ChakraProvider>
  );
}

export default App;
