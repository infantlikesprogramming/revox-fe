import React from "react";
import Header from "@/components/Header";
import SpeechList from "@/components/SpeechList";

export default function Home() {
  return (
    <div className="w-full">
      <div className="mt-20 mx-15 text-blue-200">
        <h1 className=" text-green-950 font-semibold text-lg my-10">
          Về Revox
        </h1>
        <p className="mt-5 max-w-4xl">
          Revox là một trang web độc đáo được thiết kế để mang kiến thức toàn
          cầu đến gần hơn với cộng đồng người Việt. Sử dụng trí tuệ nhân tạo
          tiên tiến, Revox dịch các bài nói chuyện, cuộc phỏng vấn trên YouTube
          từ tiếng Anh sang tiếng Việt, giúp những người chưa thành thạo tiếng
          Anh dễ dàng tiếp cận nội dung giá trị từ các nhân vật quan trọng trên
          thế giới. Mỗi video được cung cấp cả bản dịch văn bản và bản audio của
          bản dịch, tạo điều kiện cho người dùng vừa đọc vừa nghe theo cách
          thuận tiện nhất.
        </p>

        <p className="mt-5 max-w-4xl">
          Với slogan “Phá rào cản ngôn ngữ, khai tri thức”, Revox không chỉ đơn
          thuần là một công cụ dịch thuật mà còn là cầu nối mở ra kho tàng tri
          thức toàn cầu. Từ những bài diễn thuyết truyền cảm hứng, các cuộc thảo
          luận sâu sắc, đến những chia sẻ kinh nghiệm quý báu, tất cả đều được
          chuyển ngữ một cách tự nhiên và dễ hiểu. Dù sử dụng AI để đảm bảo tốc
          độ và hiệu quả, Revox không tránh khỏi những sai sót nhỏ trong quá
          trình dịch thuật. Tuy nhiên, đội ngũ phát triển luôn nỗ lực cải thiện
          để mang đến trải nghiệm tốt nhất cho người dùng.
        </p>

        <p className="mt-5 max-w-4xl">
          Revox hướng tới việc trao quyền cho mọi người, bất kể rào cản ngôn
          ngữ, để họ có thể học hỏi, khám phá và phát triển. Đây là một công cụ
          lý tưởng cho những ai khao khát mở rộng tầm hiểu biết mà không bị giới
          hạn bởi khả năng ngoại ngữ. Hãy cùng Revox phá bỏ rào cản và chạm đến
          tri thức!
        </p>
      </div>
    </div>
  );
}
