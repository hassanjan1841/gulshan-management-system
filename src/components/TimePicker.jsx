"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TimePicker = ({ value, onChange }) => {
  const [time, setTime] = useState(value || "12:00");
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");

  useEffect(() => {
    const [h, m] = time.split(":");
    setHour(h);
    setMinute(m);
  }, [time]);

  useEffect(() => {
    if (value) {
      setTime(value);
    }
  }, [value]);

  const handleTimeChange = (newTime) => {
    setTime(newTime);
    onChange && onChange(newTime);
  };

  const handleHourChange = (newHour) => {
    const newTime = `${newHour}:${minute}`;
    handleTimeChange(newTime);
  };

  const handleMinuteChange = (newMinute) => {
    const newTime = `${hour}:${newMinute}`;
    handleTimeChange(newTime);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1 space-y-1">
          <Label htmlFor="hours">Hours</Label>
          <Select value={hour} onValueChange={handleHourChange}>
            <SelectTrigger id="hours">
              <SelectValue placeholder="Hour" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 24 }, (_, i) => (
                <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                  {i.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 space-y-1">
          <Label htmlFor="minutes">Minutes</Label>
          <Select value={minute} onValueChange={handleMinuteChange}>
            <SelectTrigger id="minutes">
              <SelectValue placeholder="Minute" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 60 }, (_, i) => (
                <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                  {i.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
