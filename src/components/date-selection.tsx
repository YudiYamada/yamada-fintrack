import { addMonths } from "date-fns";
import { useState } from "react";

import { DatePickerWithRange } from "./ui/date-picker-with-range";

function DataSelection() {
  const [date, setDate] = useState({
    from: new Date(),
    to: addMonths(new Date(), 1),
  });

  return <DatePickerWithRange value={date} onChange={setDate} />;
}

export default DataSelection;
