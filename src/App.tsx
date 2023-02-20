import { Center, ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import Calendar from "./features/calendar/Calendar";

function App() {
  return (
    <ChakraProvider>
      <Center w={["100%", null, "70%"]} h={["100%", null, "70%"]}>
        <Calendar />
      </Center>
    </ChakraProvider>
  );
}

export default App;
