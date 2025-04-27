import React from "react";
import NewSpeechForm from "@/components/forms/NewSpeechForm";
import { db } from "@/database/drizzle";
import { people, topics } from "@/database/schema";
import { testTrans } from "@/transcriptF";
import Link from "next/link";
const Page = async () => {
  const allPeople = await db.select().from(people);
  const allTopics = await db.select().from(topics);
  return (
    <div className="text-black flex flex-col items-center mt-12 px-15 md:px-25 lg:px-35">
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-[18px]">Thêm bản dịch mới</p>
          <p className="text-sm">
            Hướng dẫn: Để tạo bản dịch từ bản ghi YouTube, nhập URL video, hệ
            thống sẽ tự động tạo thông tin. Hãy chép lời của video vào (dùng một
            trong những đường link sau:{" "}
            <Link
              href="https://kome.ai/tools/youtube-transcript-generator"
              target="_blank"
            >
              link 1
            </Link>
            ,{" "}
            <Link href="https://youtubetotranscript.com/" target="_blank">
              link 2
            </Link>
            ,{" "}
            <Link href="https://www.youtube-transcript.io/" target="_blank">
              link 3
            </Link>
            ). Thêm diễn giả, tìm trong cơ sở dữ liệu; nếu không có, thêm mới
            với tên, tổ chức và bối cảnh tùy chọn. A.I. sẽ tạo tóm tắt, bạn có
            thể chỉnh sửa. Chọn hoặc thêm chủ đề mới sau khi kiểm tra. Thêm bối
            cảnh phụ nếu muốn.
          </p>
        </div>
        <NewSpeechForm allPeople={allPeople} allTopics={allTopics} />
      </div>
    </div>
  );
};
export default Page;
