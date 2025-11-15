import { useQueryClient } from "@tanstack/react-query";
import { format, formatDate } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { useAuthContext } from "@/contexts/auth";

import { DatePickerWithRange } from "./ui/date-picker-with-range";

const formatDateToQueryParam = (date: string | Date) => {
  return format(date, "yyyy-MM-dd");
};

function DataSelection() {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [date, setDate] = useState({
    from: searchParams.get("from")
      ? new Date(searchParams.get("from") + "T00:00:00")
      : new Date(),
    to: searchParams.get("to")
      ? new Date(searchParams.get("to") + "T00:00:00")
      : new Date(),
  });

  useEffect(() => {
    if (!date?.from || !date?.to) return;
    const queryParams = new URLSearchParams();
    queryParams.set("from", formatDateToQueryParam(date.from));
    queryParams.set("to", formatDateToQueryParam(date.to));
    navigate(`/?${queryParams.toString()}`);
    queryClient.invalidateQueries({
      queryKey: [
        "balance",
        user?.id,
        formatDate(date.from, "yyyy-MM-dd"),
        formatDate(date.to, "yyyy-MM-dd"),
      ],
    });
  }, [navigate, date, queryClient, user?.id]);

  return <DatePickerWithRange className="" value={date} onChange={setDate} />;
}

export default DataSelection;
