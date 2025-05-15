import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export default function SecondStep({ bio, handleInputChange }) {
  return (
    <div className="flex flex-col items-start">
      <h2 className="text-2xl lg:text-3xl mb-6 font-semibold">
        Select your Date of Birth
      </h2>
      <div className="relative w-[70%] sm:w-96"></div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[200px] justify-start text-right font-normal bg-white outline-none focus:border-[#F2C146] hover:bg-none border-[3px] p-2 rounded-lg cursor-pointer",
              !bio.date && "text-muted-foreground"
            )}
          >
            {bio.date ? (
              format(bio.date, "PPP")
            ) : (
              <span>Select Date of Birth 📅</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={bio.date}
            key="date"
            onSelect={(e) => handleInputChange("date", e)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {/* <input
        type="date"
        value={bio.date}
        id="date"
        onChange={handleInputChange}
        className="text-base bg-white text-gray-800 placeholder-gray-400 outline-none my-4 rounded-md px-4 py-2 ring ring-gray-200 focus:ring-[#F2C146]
                cursor-pointer caret-transparent"
      /> */}
    </div>
  );
}
