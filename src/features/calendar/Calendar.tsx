import { Grid } from "@chakra-ui/react";
import DatesBox from "./components/DatesBox";
import MonthsBox from "./components/MonthsBox";
import WeeksBox from "./components/WeeksBox";
import YearBox from "./components/YearBox";
import "./Calendar.style.scss";

function Calendar() {
  return (
    <Grid className="calendar" gap={2} p={2}>
      <YearBox />
      <MonthsBox />
      <DatesBox />
      <WeeksBox />
    </Grid>
  );
}

export default Calendar;
