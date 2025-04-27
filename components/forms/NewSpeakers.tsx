import React, { useEffect, useState } from "react";
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
import { Loader2 } from "lucide-react";
import { info } from "next/dist/build/output/log";
import { cn } from "@/lib/utils";
import {
  createSpeakerInfo,
  createSpeakersInfo,
} from "@/lib/admin/actions/translation";

interface Props {
  fields: FieldArrayWithId<any, any, any>[];
  remove: (index: number) => void;
  add: () => void;
  form: UseFormReturn<any, any>;
}

interface speakerSummariesResponse {
  speaker_name: string;
  speaker_long_summary: string;
  speaker_short_summary: string;
}

interface speakerSummaries {
  name: string;
  organization: string;
  extra_information?: string;
  longSummary: string;
  shortSummary: string;
}

interface speakerSummariesRequest {
  name: string;
  organization: string;
  extra_information?: string;
}

const NewSpeakers = ({ fields, remove, form, add }: Props) => {
  const [personInfo, setPersonInfo] = useState<speakerSummaries[]>([]);

  const [curindex, setCurIndex] = React.useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAllLoading, setIsAllLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchSpeakerInfo = async () => {
      if (!isLoading) {
        setIsLoading(false);
        return;
      }
      if (!personInfo[curindex]) {
        setIsLoading(false);
        return;
      }
      try {
        const speakerInfo = await createSpeakerInfo({
          name: personInfo[curindex].name,
          organization: personInfo[curindex].organization,
          extra_information: personInfo[curindex].extra_information ?? " ",
        });
        const servicedInfo: speakerSummariesResponse = speakerInfo[0];
        // setPersonInfo((info: speakerSummaries[]) => ({
        //   name: personInfo[index].name,
        //   organization: personInfo[index].organization,
        //   extra_information: personInfo[index].extra_information,
        //   longSummary: servicedInfo.speaker_long_summary,
        //   shortSummary: servicedInfo.speaker_short_summary,
        // }));
        setPersonInfo((info) => {
          info[curindex] = {
            name: info[curindex].name,
            organization: info[curindex].organization,
            extra_information: info[curindex].extra_information,
            longSummary: servicedInfo.speaker_long_summary,
            shortSummary: servicedInfo.speaker_short_summary,
          };
          return info;
        });
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSpeakerInfo();
  }, [isLoading]);

  useEffect(() => {
    const fetchAllSpeakersInfo = async () => {
      if (!isAllLoading) {
        setIsAllLoading(false);
        return;
      }
      if (personInfo[0].name === "" && personInfo[0].organization === "") {
        setIsAllLoading(false);
        return;
      }
      try {
        const indexes: number[] = [];
        const speakerList: speakerSummariesRequest[] = personInfo
          .map(({ name, organization, extra_information }, index) => {
            indexes.push(index);
            console.log(index);
            return {
              name,
              organization,
              extra_information,
            };
          })
          .filter(
            ({ name, organization }) => name !== "" && organization !== "",
          );
        const speakersInfo = await createSpeakersInfo(speakerList);

        const servicedInfo: speakerSummariesResponse[] = speakersInfo;
        // setPersonInfo((info: speakerSummaries[]) => ({
        //   name: personInfo[index].name,
        //   organization: personInfo[index].organization,
        //   extra_information: personInfo[index].extra_information,
        //   longSummary: servicedInfo.speaker_long_summary,
        //   shortSummary: servicedInfo.speaker_short_summary,
        // }));
        for (let i = 0; i < speakerList.length; i++) {
          setPersonInfo((info) => {
            info[indexes[i]] = {
              name: info[indexes[i]].name,
              organization: info[indexes[i]].organization,
              extra_information: info[indexes[i]].extra_information,
              longSummary: servicedInfo[i].speaker_long_summary,
              shortSummary: servicedInfo[i].speaker_short_summary,
            };
            return info;
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsAllLoading(false);
      }
    };
    fetchAllSpeakersInfo();
  }, [isAllLoading]);

  return (
    <div className="flex flex-col gap-1">
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-1 my-5">
          <div className="flex flex-wrap gap-2 md:gap-5 ">
            <div className="flex gap-1 items-center">
              <p>Họ và tên:</p>
              <FormField
                control={form.control}
                name={`newSpeakers.${index}.fullname`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. Nguyễn Văn A"
                        value={personInfo[index].name}
                        onChange={(e) => {
                          field.onChange(e);
                          setPersonInfo((info) => {
                            info[index] = {
                              ...info[index],
                              name: e.target.value,
                            };
                            return info;
                          });
                        }}
                        className="w-50 md:w-60"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-1 items-center">
              <p>Tổ chức:</p>
              <FormField
                control={form.control}
                name={`newSpeakers.${index}.org`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. Google Deepmind"
                        value={personInfo[index].organization}
                        onChange={(e) => {
                          field.onChange(e);
                          setPersonInfo((info) => {
                            info[index] = {
                              ...info[index],
                              organization: e.target.value,
                            };
                            return info;
                          });
                        }}
                        className="w-50 md:w-60"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p>Thông tin:</p>
            <FormField
              control={form.control}
              name={`newSpeakers.${index}.context`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="max-h-40"
                      {...field}
                      placeholder="e.g. Giáo chủ Thiên Ma Giáo"
                      value={personInfo[index].extra_information}
                      onChange={(e) => {
                        field.onChange(e);
                        setPersonInfo((info) => {
                          info[index] = {
                            ...info[index],
                            extra_information: e.target.value,
                          };
                          return info;
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p>Giới thiệu ngắn:</p>
            <FormField
              control={form.control}
              name={`newSpeakers.${index}.shortSummary`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="max-h-40 max-sm:h-30"
                      {...field}
                      placeholder="e.g. Vô địch thiên hạ"
                      value={personInfo[index].shortSummary}
                      onChange={(e) => {
                        field.onChange(e);
                        setPersonInfo((info) => {
                          info[index] = {
                            ...info[index],
                            shortSummary: e.target.value,
                          };
                          return info;
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p>Giới thiệu dài</p>
            <FormField
              control={form.control}
              name={`newSpeakers.${index}.longSummary`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="max-h-40 max-sm:h-50"
                      {...field}
                      placeholder="e.g. Anh hùng đã có công lớn trong việc bảo vệ thành Tương Dương"
                      value={personInfo[index].longSummary}
                      onChange={(e) => {
                        field.onChange(e);
                        setPersonInfo((info) => {
                          info[index] = {
                            ...info[index],
                            longSummary: e.target.value,
                          };
                          return info;
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <p>Ảnh diễn giả:</p>
            <FormField
              control={form.control}
              name={`newSpeakers.${index}.speakerImage`}
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
          <div className="flex gap-1">
            <Button
              className="bg-[#DFA332]  hover:bg-[#C5902D]"
              type="button"
              disabled={isAllLoading || isLoading}
              onClick={() => {
                setCurIndex(index);
                setIsLoading(true);
              }}
            >
              {!isLoading ? (
                "Tạo thông tin"
              ) : (
                <div className="flex gap-1 items-center">
                  <Loader2 className="animate-spin" />
                  <p>Đang tạo ...</p>
                </div>
              )}
            </Button>
            <Button
              className="bg-[#FF272B]  hover:bg-[#AF1E21]"
              type="button"
              hidden={index !== fields.length - 1}
              onClick={() => {
                remove(index);
                setPersonInfo((info) => {
                  info.splice(index, 1);
                  return info;
                });
              }}
            >
              Hủy
            </Button>
          </div>
        </div>
      ))}

      <div className="flex gap-1">
        <Button
          className="bg-[#DFA332]  hover:bg-[#C5902D]"
          disabled={isAllLoading || isLoading}
          hidden={fields.length === 0}
          type="button"
          onClick={() => {
            setIsAllLoading(true);
          }}
        >
          {!isAllLoading ? (
            "Tạo thông tin cho tất cả"
          ) : (
            <div className="flex gap-1 items-center">
              <Loader2 className="animate-spin" />
              <p>Đang tạo thông tin cho tất cả ...</p>
            </div>
          )}
        </Button>
      </div>
      <div>
        <Button
          className=" bg-[#56B24A] hover:bg-[#57BA4A]"
          type="button"
          onClick={() => {
            add();
            personInfo.push({
              name: "",
              organization: "",
              longSummary: "",
              shortSummary: "",
            });
          }}
        >
          Thêm diễn giả mới
        </Button>
      </div>
    </div>
  );
};
export default NewSpeakers;
