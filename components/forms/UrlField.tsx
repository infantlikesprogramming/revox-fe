import React, { useEffect, useState } from "react";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldArrayWithId, UseFormReturn } from "react-hook-form";
import { Loader2 } from "lucide-react";
import fnv1a from "next/dist/shared/lib/fnv1a";
import { createYoutubeInfo } from "@/lib/admin/actions/translation";

interface Props {
  form: UseFormReturn<any, any>;
}

interface YoutubeInfo {
  title: string;
  uploader: string;
  publish_date: string;
  language: string;
  duration: string;
}

const UrlField = ({ form }: Props) => {
  const [youtubeInfo, setYoutubeInfo] = useState<YoutubeInfo>();
  const [url, setUrl] = useState("");
  const [getInfoState, setGetInfoState] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchUrlInfo = async () => {
      if (url == "") return;
      if (!getInfoState) return;
      try {
        setIsLoading(true);
        const response = await createYoutubeInfo({ url: url });
        setYoutubeInfo(response);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUrlInfo();
  }, [getInfoState]);
  return (
    <div className="flex flex-col gap-1">
      <p className="text font-semibold">Url (Link youtube)</p>
      <div className="flex flex-wrap justify-between gap-2">
        <FormField
          name="url"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1  grow">
              <FormControl>
                <Input
                  required
                  {...field}
                  placeholder="e.g. https://www.youtube.com/watch?v=idhere"
                  className=""
                  onChange={(e) => {
                    field.onChange(e);
                    setUrl(e.target.value);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="button"
          className="bg-[#DFA332]  hover:bg-[#C5902D]"
          onClick={() => {
            setGetInfoState(true);
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
      </div>
      {getInfoState && youtubeInfo !== null && (
        <div className="mt-2">
          <div className="bg-[#B3B3B3] px-4 py-1 rounded-md max-w-2xl">
            <p>
              <span className="font-semibold">Tiêu đề:</span>{" "}
              {youtubeInfo?.title}
            </p>
            <p>
              <span className="font-semibold">Ngôn ngữ:</span>{" "}
              {youtubeInfo?.language}
            </p>
            <p>
              <span className="font-semibold">Người đăng:</span>{" "}
              {youtubeInfo?.uploader}
            </p>
            <p>
              <span className="font-semibold">Độ dài :</span>{" "}
              {youtubeInfo?.duration}
            </p>
            <p>
              <span className="font-semibold">Ngày đăng:</span>{" "}
              {youtubeInfo?.publish_date}
            </p>
          </div>
          <Button
            className="bg-[#FF272B] mt-1  hover:bg-[#AF1E21]"
            type="button"
            onClick={() => {
              setGetInfoState(false);
              setYoutubeInfo(undefined);
            }}
          >
            Hủy
          </Button>
        </div>
      )}
    </div>
  );
};
export default UrlField;
