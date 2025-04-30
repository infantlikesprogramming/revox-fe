"use client";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { z } from "zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ComboboxExistingSpeakers from "@/components/forms/ComboboxExistingSpeakers";
import {
  createNewSpeech,
  activateServer,
} from "@/lib/admin/actions/translation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NewSpeakers from "@/components/forms/NewSpeakers";
import ComboboxExistingTopics from "@/components/forms/ComboboxExistingTopics";
import NewTopics from "@/components/forms/NewTopics";
import { Textarea } from "@/components/ui/textarea";
import UrlField from "@/components/forms/UrlField";
import ImageUpload from "@/components/ImageUpload";
import { Loader2 } from "lucide-react";
import { sleep } from "gel/dist/utils";
export const maxDuration = 20; // This function can run for a maximum of 20 seconds

const formSchema = z.object({
  url: z.string().trim().url(),
  transcript: z.string().trim(),
  existingSpeakers: z.array(
    z.object({
      choice: z.string().nonempty({ message: "Hãy chọn diễn giả." }),
    }),
  ),
  newSpeakers: z
    .array(
      z.object({
        fullname: z
          .string()
          .nonempty({ message: "Xin hãy cho tên của diễn giả." }),
        org: z
          .string()
          .nonempty({ message: "Xin hãy cho tên tổ chức của diễn giả." }),
        context: z.string().optional(),
        longSummary: z.string().nonempty(),
        shortSummary: z.string().nonempty(),
        speakerImage: z
          .string()
          .nonempty({ message: "Hãy chọn ảnh cho diễn giả." }),
      }),
    )
    .max(31), // Allow empty strings
  existingTopics: z.array(
    z.object({
      choice: z.string().nonempty({ message: "Hãy chọn diễn giả." }),
    }),
  ),
  newTopics: z.array(
    z.object({
      topicName: z.string().nonempty({ message: "Hãy chọn tên chủ đề." }),
      topicImage: z.string().nonempty({ message: "Hãy chọn ảnh cho chủ đề." }),
    }),
  ),
  speechImage: z
    .string()
    .nonempty({ message: "Hãy chọn ảnh cho bài nói chuyện." }),
  context: z.string().optional(),
  code: z.string().nonempty(),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  allPeople: Person[];
  allTopics: Topic[];
}

const NewSpeechForm = ({ allPeople, allTopics }: Props) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [activating, setActivating] = useState(false);
  useEffect(() => {
    const fetchHello = async () => {
      if (!activating) return;
      try {
        await activateServer();
      } finally {
        setActivating(false);
      }
    };
    fetchHello();
  }, [activating]);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      transcript: "",
      existingSpeakers: [],
      newSpeakers: [],
      existingTopics: [],
      newTopics: [],
      speechImage: "",
      context: "",
      code: "Code",
    },
  });
  const {
    fields: existPeopleFields,
    append: existPeopleAppend,
    remove: existPeopleRemove,
  } = useFieldArray({ control: form.control, name: "existingSpeakers" });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "newSpeakers",
  });

  const {
    fields: newTopicsFields,
    append: newTopicsAppend,
    remove: newTopicsRemove,
  } = useFieldArray({
    control: form.control,
    name: "newTopics",
  });

  const {
    fields: existingTopicsFields,
    append: existingTopicsAppend,
    remove: existingTopicsRemove,
  } = useFieldArray({ control: form.control, name: "existingTopics" });

  const existPeopleRemoveHandler = (index: number) => () =>
    existPeopleRemove(index);

  const newPeopleRemoveHandler = (index: number) => remove(index);
  const newPeopleAddHandler = () =>
    append({
      fullname: "",
      org: "",
      context: "",
      longSummary: "",
      shortSummary: "",
      speakerImage: "",
    });

  const newTopicsRemoveHandler = (index: number) => newTopicsRemove(index);
  const existingTopicsRemoveHandler = (index: number) => () =>
    existingTopicsRemove(index);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    const result = await createNewSpeech(values);
    console.log(result.message);
    if (result.success) {
      toast.success("Translation requested successfully", {
        description: result.message,
      });

      router.push("/user/admin");
    } else {
      toast.error("Oops, something went wrong", {
        description: result.message,
      });
    }
    setSubmitting(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 text-sm flex flex-col gap-5"
      >
        <div>
          <Button
            type="button"
            disabled={activating}
            className="bg-[#DFA332]  hover:bg-[#C5902D] active:bg-[#966e23]"
            onClick={() => {
              setActivating(true);
            }}
          >
            {activating ? (
              <span>Hãy chờ 30 giây nhé</span>
            ) : (
              <span>Kích hoạt server</span>
            )}
          </Button>
        </div>
        <UrlField form={form} />
        <FormField
          name="transcript"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-sm font-semibold">
                Bản chép lời:
              </FormLabel>
              <FormControl>
                <Textarea
                  required
                  {...field}
                  value={field.value ?? ""}
                  placeholder="Hãy copy bản chép lời vào đây."
                  className="min-h-20 max-h-40 max-sm:h-50"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <p className="text font-semibold">Diễn giả hoặc người nói chuyện</p>
          {existPeopleFields.map((field, index) => (
            <div key={field.id} className="flex flex-wrap gap-2 items-center">
              <Controller
                name={`existingSpeakers.${index}.choice`}
                control={form.control}
                rules={{ required: "Speakers are required" }}
                render={({ field }) => (
                  <ComboboxExistingSpeakers
                    field={field}
                    remove={existPeopleRemoveHandler(index)}
                    allPeople={allPeople}
                    last={index === existPeopleFields.length - 1}
                  />
                )}
              />
              {form.formState.errors.existingSpeakers && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.existingSpeakers.message}
                </p>
              )}
            </div>
          ))}
          <div>
            <Button
              className="mt-1 bg-[#56B24A] hover:bg-[#57BA4A]"
              type="button"
              onClick={() => existPeopleAppend({ choice: "" })}
            >
              Thêm diễn giả
            </Button>
          </div>
          <NewSpeakers
            fields={fields}
            remove={newPeopleRemoveHandler}
            add={newPeopleAddHandler}
            form={form}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text font-semibold">Chủ đề</p>
          {existingTopicsFields.map((field, index) => (
            <div key={field.id} className="flex flex-wrap gap-2 items-center">
              <Controller
                name={`existingTopics.${index}.choice`}
                control={form.control}
                rules={{ required: "Topic is required" }}
                render={({ field }) => (
                  <ComboboxExistingTopics
                    field={field}
                    remove={existingTopicsRemoveHandler(index)}
                    allTopics={allTopics}
                  />
                )}
              />
              {form.formState.errors.existingTopics && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.existingTopics.message}
                </p>
              )}
            </div>
          ))}
          <div>
            <Button
              className="mt-1 bg-[#56B24A] hover:bg-[#57BA4A]"
              type="button"
              onClick={() => existingTopicsAppend({ choice: "" })}
            >
              Thêm chủ đề
            </Button>
          </div>
          <NewTopics
            fields={newTopicsFields}
            remove={newTopicsRemoveHandler}
            form={form}
          />
          <div>
            <Button
              className=" bg-[#56B24A] hover:bg-[#57BA4A]"
              type="button"
              onClick={() => newTopicsAppend({ topicName: "", topicImage: "" })}
            >
              Thêm chủ đề mới
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text font-semibold">Ảnh bài nói chuyện</p>
          <FormField
            control={form.control}
            name={`speechImage`}
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

        <FormField
          name="context"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-sm font-semibold">Bối cảnh:</FormLabel>
              <FormControl>
                <Textarea
                  required
                  {...field}
                  value={field.value ?? ""}
                  placeholder="Ít hơn 5 ký tự sẽ được tính là không có bối cảnh cụ thể."
                  className="min-h-20 max-h-40"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="code"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal">Nhập mã:</FormLabel>
              <FormControl>
                <Input required {...field} placeholder="e.g. 123456" />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button
            className="blocks w-30 bg-[#452bb5] hover:bg-[#684beb] active:bg-[#684beb] "
            type="submit"
            disabled={submitting}
          >
            Gửi
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewSpeechForm;
