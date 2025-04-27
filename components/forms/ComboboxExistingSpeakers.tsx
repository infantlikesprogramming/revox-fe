"use client";
import React, { useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ControllerRenderProps } from "react-hook-form";
import { db } from "@/database/drizzle";
import { people as peopleSchema } from "@/database/schema";

interface ComboboxProps {
  field: ControllerRenderProps<any, any>;
  remove: () => void;
  allPeople: Person[];
  last: boolean;
}
const ComboboxExistingSpeakers = ({
  field,
  remove,
  allPeople,
  last,
}: ComboboxProps) => {
  const people: any = [];
  for (const person of allPeople) {
    people.push({
      value: person,
      label: person.personName + " - " + person.org,
    });
  }
  const [open, setOpen] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState("");
  return (
    <div className="flex flex-col gap-2 md:gap-1">
      <div className="flex flex-wrap gap-1 sm:gap-2 items-center">
        <p>Tên diễn giả và tổ chức:</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="sm:w-100 w-full justify-between bg-yellow-50"
            >
              {field.value
                ? people.find(
                    (person) => field.value === JSON.stringify(person.value),
                  )?.label
                : "Tìm diễn giả ..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0">
            <Command>
              <CommandInput placeholder="Tìm diễn giả..." />
              <CommandList>
                <CommandEmpty>Không tìm thấy diễn giả.</CommandEmpty>
                <CommandGroup className="text-black">
                  {people.map((person) => (
                    <CommandItem
                      key={person.value.id}
                      value={person.value.shortSummary}
                      onSelect={(currentValue) => {
                        setCurrentValue(currentValue);
                        field.onChange(JSON.stringify(person.value));
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value === JSON.stringify(person.value)
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />

                      {person.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {currentValue !== "" && (
        <div className="">
          <p className="bg-[#B3B3B3] px-4 py-1 rounded-md max-w-100 ">
            {currentValue}
          </p>
        </div>
      )}
      <div>
        <Button
          className="bg-[#FF272B]  hover:bg-[#AF1E21]"
          type="button"
          onClick={remove}
          hidden={!last}
        >
          Hủy
        </Button>
      </div>
    </div>
  );
};
export default ComboboxExistingSpeakers;
