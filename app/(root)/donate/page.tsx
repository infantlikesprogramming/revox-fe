import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div className="mt-20 flex flex-col gap-10 items-center px-10">
      <div>
        <p className="font-bold text-lg">Donate/Quyên Góp</p>
        <p className="mt-5">
          Revox hoạt động bằng cách sử dụng chi phí để duy trì máy chủ và vận
          hành công nghệ AI. Nếu bạn thấy trang web hữu ích, hãy cân nhắc ủng hộ
          để giúp chúng tôi tiếp tục mang tri thức đến gần hơn với cộng đồng.
          Mỗi đóng góp của các bạn, dù nhỏ, đều rất ý nghĩa. Cảm ơn các bạn đã
          đồng hành cùng Revox nhé!
        </p>
      </div>

      <div>
        <div className="p-5">
          <p>Số tài khoản: 999990862469818</p>
          <p>Ngân hàng: HDBank</p>
        </div>
        <Image
          src="/images/donate-qr.JPG"
          alt="donate image"
          width={300}
          height={300}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};
export default Page;
