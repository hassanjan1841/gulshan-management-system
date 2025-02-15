import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function DatePickerWithYearDropdown({ field, className }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <DatePicker
      {...field}
      selected={field.value}
      onChange={(date) => field.onChange(date)}
      placeholderText="Due Date"
      className={className}
      dateFormat="yyyy-MM-dd"
      showYearDropdown
      scrollableYearDropdown
      yearDropdownItemNumber={100}
      dropdownMode="select"
      minDate={new Date(currentYear - 100, 0, 1)}
      maxDate={new Date()}
    />
  );
}
