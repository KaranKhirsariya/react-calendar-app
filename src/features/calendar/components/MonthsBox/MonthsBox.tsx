import { Center, Grid, GridItem, Text } from "@chakra-ui/react";
import { mapMonthEndToColors } from "constantz";
import dayjs from "dayjs";
import { useAppSelector } from "../../../../app/hooks";
import { monthChanged, selectYear } from "../../calendarSlice";
import { useAppDispatch } from "./../../../../app/hooks";
import { selectMonth } from "./../../calendarSlice";
import { clsx } from "clsx";
const monthIndices = Array.from({ length: 12 }, (_, i) => i);

function MonthsBox() {
  const year = useAppSelector(selectYear);
  const dispatch = useAppDispatch();
  const selectedMonthIndex = useAppSelector(selectMonth);

  return (
    <>
      <Grid
        templateRows="repeat(3, minmax(0, 1fr))"
        templateColumns="repeat(7, minmax(0, 1fr))"
        gridAutoFlow="column"
        gap={1}
        className="monthsBox"
      >
        {monthIndices.map((idx) => {
          const d = dayjs(new Date(year, idx, 1));
          return (
            <GridItem
              key={idx}
              className={clsx(
                "monthItem",
                `last-day-${d.daysInMonth()}`,
                selectedMonthIndex === idx && "selected"
              )}
              colStart={d.day() + 1}
              onClick={() => dispatch(monthChanged(idx))}
            >
              <Center h="100%">
                <Text color={mapMonthEndToColors[d.daysInMonth()]}>
                  {monthNames[idx]}
                </Text>
              </Center>
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
}

export default MonthsBox;

const monthNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
