import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ControllerRenderProps,
  FieldArrayWithId,
  UseFormReturn,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";

interface Props {
  fields: FieldArrayWithId<any, any, any>[];
  remove: (index: number) => void;
  form: UseFormReturn<any, any>;
}

const NewTopics = ({ fields, remove, form }: Props) => {
  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-1 my-2">
          <div className="flex flex-wrap gap-2 md:gap-5 ">
            <div className="flex gap-1 items-center">
              <p>Chủ đề:</p>
              <FormField
                control={form.control}
                name={`newTopics.${index}.topicName`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. Lịch sử"
                        value={field.value ?? ""}
                        className="w-60 md:w-70"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="bg-[#FF272B]  hover:bg-[#AF1E21]"
              type="button"
              onClick={() => remove(index)}
            >
              Hủy
            </Button>
          </div>

          <div className="flex flex-col gap-1 ">
            <p>Anh minh hoa:</p>
            <FormField
              control={form.control}
              name={`newTopics.${index}.topicImage`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload onFileChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default NewTopics;
