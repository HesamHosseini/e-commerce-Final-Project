import Image from "next/image";
import React from "react";
import { AiFillPhone } from "react-icons/ai";
import { TiLocationOutline } from "react-icons/ti";
function Footer() {
  return (
    <div className=" flex w-full items-center justify-between px-4 py-5 bg-gray-800 text-myWhite-1 mt-10">
   
      <div className="flex flex-col rtl">
        <div className="flex flex-row justify-start">
          <Image src="/footerItems/enamad.png" width="100px" height="100px" />
          <Image src="/footerItems/rezi.png" width="100px" height="100px" />
        </div>
        <div className="flex flex-col font-IRYekan  text-sm justify-center gap-4 my-3">
          <div className="flex flex-row items-center gap-3">
            <AiFillPhone />
            <span>۰۲۱۳۳۶۲۵۶۱</span>
          </div>
          <div className="flex flex-row items-center gap-3">
            <TiLocationOutline />
            <span className="w-[10rem]">تهران - میدان جمهوری جنب داروخانه</span>
          </div>
        </div>
      </div>
      <div className="rtl pr-4 font-IRYekan text-sm flex flex-col justify-between gap-5">
        <li
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="list-disc cursor-pointer"
        >
          برگشت به بالا
        </li>
        <li className="list-disc cursor-pointer">دسته بندی ها</li>
        <li className="list-disc cursor-pointer">خانه </li>
        <li className="list-disc cursor-pointer">ارتباط با ما</li>
      </div>
    </div>
  );
}

export default Footer;
