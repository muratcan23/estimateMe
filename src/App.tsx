import { ChakraProvider } from "@chakra-ui/react";
import Board from "./Components/Board";

function App() {
  return (
    <ChakraProvider>
      <Board />
    </ChakraProvider>
  );
}

export default App;
