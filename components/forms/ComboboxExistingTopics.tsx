"use client";
import React from "react";
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

interface ComboboxProps {
  field: ControllerRenderProps<any, any>;
  remove: () => void;
  allTopics: Topic[];
}
const ComboboxExistingTopics = ({
  field,
  remove,
  allTopics,
}: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState("");
  const topics: any = [];
  for (const topic of allTopics) {
    topics.push({
      value: topic,
      label: topic.topicName,
    });
  }
  return (
    <div className="flex flex-col gap-2 md:gap-1">
      <div className="flex flex-wrap gap-1 sm:gap-2 items-center">
        <p>Chủ đề:</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-64 justify-between bg-yellow-50"
            >
              {field.value
                ? topics.find(
                    (topic) => JSON.stringify(topic.value) === field.value,
                  )?.label
                : "Tìm chủ đề ..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0">
            <Command>
              <CommandInput placeholder="Tìm chủ đề ..." />
              <CommandList>
                <CommandEmpty>Không tìm thấy chủ đề.</CommandEmpty>
                <CommandGroup className="text-black">
                  {topics.map((topic) => (
                    <CommandItem
                      key={topic.value.id}
                      value={topic.value.topicName}
                      onSelect={(currentValue) => {
                        setCurrentValue(currentValue);
                        field.onChange(JSON.stringify(topic.value));
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          JSON.stringify(topic.value) === field.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />

                      {topic.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button
          className="bg-[#FF272B]  hover:bg-[#AF1E21]"
          type="button"
          onClick={remove}
        >
          Hủy
        </Button>
      </div>
      {/*{currentValue !== "" && (*/}
      {/*  <div className="">*/}
      {/*    <p className="bg-[#B3B3B3] px-4 py-1 rounded-md inline ">*/}
      {/*      {currentValue}*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
};
export default ComboboxExistingTopics;
