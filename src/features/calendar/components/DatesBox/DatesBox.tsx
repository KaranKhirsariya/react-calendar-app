import { Grid } from "@chakra-ui/react";
import { useAppSelector } from "app/hooks";
import dayjs, { Dayjs } from "dayjs";
import {
  selectDate,
  selectMonth,
  selectYear,
} from "features/calendar/calendarSlice";
import { useEffect, useMemo, useState } from "react";
import {
  TodoListResponse,
  TodoListsFindAllApiResponse,
  useTodoListsFindAllQuery,
} from "store/todoApi";
import DateOfMonth from "./DateOfMonth";
import TasksPopover from "./TasksPopover";

function DatesBox() {
  const year = useAppSelector(selectYear);
  const date = useAppSelector(selectDate);
  const month = useAppSelector(selectMonth);
  const [currentTodos, setCurrentTodos] = useState<TodoListResponse>();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { data: todoList } = useTodoListsFindAllQuery({
    month: month!,
    year: year + "",
  });
  const daysWithProps = useMemo(
    () => getDaysWithProps(year, month, date, todoList),
    [year, month, date, todoList]
  );

  const onDateClick = () => setPopoverOpen(true);

  useEffect(() => {
    if (month != null && date != null) {
      setCurrentTodos(
        todoList?.find(
          ({ dueDate, _count }) =>
            _count && dayjs(dueDate).isSame(new Date(year, month, date), "date")
        )
      );
    } else {
      // setCurrentTodos(undefined);
    }
  }, [todoList, date, month, year]);

  const onPopOverClose = () => {
    setPopoverOpen(false);
    // setCurrentTodos(undefined)
  };

  return (
    <>
      <Grid
        autoFlow="column"
        gridTemplateRows="repeat(7, 1fr)"
        gridTemplateColumns="repeat(5, 1fr)"
        gap={1}
        className="datesBox"
      >
        {daysWithProps.map((day, i) => (
          <DateOfMonth
            {...day}
            key={day.date + "" + day.isSelected}
            onClick={onDateClick}
          />
        ))}
      </Grid>
      <TasksPopover
        currentTodos={currentTodos}
        isOpen={popoverOpen}
        onClose={onPopOverClose}
      />
    </>
  );
}

export default DatesBox;

function getDaysWithProps(
  year: number,
  month: number | null,
  day: number | null,
  todoList: TodoListsFindAllApiResponse
) {
  if (month != null) {
    const firstDayOfMonth = dayjs(new Date(year, month, 1));
    let selectedDayOfMonth: Dayjs;
    if (day != null) {
      selectedDayOfMonth = dayjs(new Date(year, month, day));
    }
    return Array.from({ length: firstDayOfMonth.daysInMonth() }, (_, i) => {
      const ithDate = dayjs(new Date(year, month, i + 1));
      return {
        hasTasks:
          todoList?.some(
            ({ dueDate, _count: { ToDo } }) =>
              dayjs(dueDate).isSame(ithDate, "date") && ToDo
          ) || false,
        isToday: ithDate.isSame(dayjs(), "date"),
        date: i + 1,
        label: i + 1,
        isSelected:
          selectedDayOfMonth && ithDate.isSame(selectedDayOfMonth, "date"),
      };
    });
  } else {
    return [];
  }
}
