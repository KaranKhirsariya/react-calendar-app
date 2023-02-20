import { Center, GridItem, Text } from "@chakra-ui/react";
import { useAppDispatch } from "app/hooks";
import { clsx } from "clsx";
import { mapMonthEndToColors } from "constantz";
import { dateSelected } from "features/calendar/calendarSlice";

export type DateOfMonthProps = {
  hasTasks: boolean;
  onClick: (date: number) => void;
  isSelected: boolean;
  date: number;
  label: number;
  isToday: boolean;
};

export default function DateOfMonth(dateOfMonth: DateOfMonthProps) {
  const dispatch = useAppDispatch();
  return (
    <GridItem
      className={clsx(
        "dateItem",
        dateOfMonth.isToday && "today",
        dateOfMonth.hasTasks && "hasTasks",
        dateOfMonth.isSelected && "selected",
        `date-${dateOfMonth.date}`
      )}
      // fontWeight={dateOfMonth.isToday ? "bold" : "normal"}
      // borderBottomEndRadius={2}
      // borderBottomWidth={dateOfMonth.hasTasks ? 5 : 0}
      // borderColor="pink"
      // borderStyle="solid"
      // color={mapMonthEndToColors[dateOfMonth.date] || "black"}
      // outline={dateOfMonth.isSelected ? "2px solid red" : "1px solid pink"}
    >
      <Center
        h="100%"
        onClick={() => {
          dispatch(dateSelected(dateOfMonth.date));
          dateOfMonth.onClick(dateOfMonth.date);
        }}
      >
        <Text color={mapMonthEndToColors[dateOfMonth.label] }>
          {dateOfMonth.label}
        </Text>
      </Center>
      <div className="taskDot"></div>
    </GridItem>
  );
}
