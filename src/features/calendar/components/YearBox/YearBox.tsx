import { Box, Flex, GridItem, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import {
  nextYear,
  prevYear,
  selectYear,
} from "features/calendar/calendarSlice";

export default function YearBox() {
  const year = useAppSelector(selectYear);
  const dispatch = useAppDispatch();
  return (
    <GridItem className="yearBox">
      <Flex justify="space-between" backdropBlur="md" align="center" grow="1" h="100%">
        <Box
          fontSize="2em"
          as={FaCaretLeft}
          onClick={() => dispatch(prevYear())}
        />
        <Text fontSize="3em" p="2">
          {year}
        </Text>
        <Box
          fontSize="2em"
          as={FaCaretRight}
          onClick={() => dispatch(nextYear())}
        />
      </Flex>
    </GridItem>
  );
}
