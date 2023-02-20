import { Center, Grid, GridItem, Text } from "@chakra-ui/react";
import { useAppSelector } from "app/hooks";
import clsx from "clsx";
import dayjs from "dayjs";
import { selectYear } from "features/calendar/calendarSlice";
import { Fragment, useMemo } from "react";
import { selectDate, selectMonth } from "./../../calendarSlice";

function WeeksBox() {
  const year = useAppSelector(selectYear);
  const date = useAppSelector(selectDate);
  const month = useAppSelector(selectMonth);
  const monthColumn = useMemo(
    () => (month != null ? dayjs(new Date(year, month, 1)).day() : null),
    [year, month]
  );
  return (
    <Grid
      templateRows="repeat(7, 1fr)"
      templateColumns="repeat(7, 1fr)"
      className="weeksBox"
    >
      {WeekMatrix.map((weekDays, i) => {
        return (
          <Fragment key={i}>
            {weekDays.map((day, j) => {
              return (
                <GridItem
                  key={day.idx}
                  className={clsx(
                    "weekItem",
                    `week-col-${j}`,
                    `week-row-${i}`,
                    `day-${day.idx}`,
                    date != null &&
                      month != null &&
                      j === monthColumn &&
                      i + 1 === date % 7 &&
                      "selected"
                  )}
                  
                >
                  <Center h="100%">
                    <Text color={day.idx === 6 ? "blackAlpha.500" : "blackAlpha.700"}>{day.label}</Text>
                  </Center>
                </GridItem>
              );
            })}
          </Fragment>
        );
      })}
    </Grid>
  );
}

export default WeeksBox;

const WeekDays = [
  { label: "MON", idx: 0 },
  { label: "TUE", idx: 1 },
  { label: "WED", idx: 2 },
  { label: "THU", idx: 3 },
  { label: "FRI", idx: 4 },
  { label: "SAT", idx: 5 },
  { label: "SUN", idx: 6 },
];
const WeekMatrix = WeekDays.map((_, i) => {
  const fresh = Object.values(WeekDays);
  return fresh.slice(i).concat(fresh.slice(0, i));
});
