import Image from "next/image";
import React from "react";
import shoppingCartGirlIMG from "../../public/Digital-painting/shoppingCartGirl.svg";
import MyButton from "../Button/MyButton";
function ShoppingCartGirl(props) {
  return (
    <div className="w-full  flex-row flex-center gap-20 bg-secondary-2 rounded-3xl font-IRYekan text-myBlack-1">
      <div className="">
        <Image src={shoppingCartGirlIMG} />
      </div>
      <div className="flex flex-col gap-4  ">
        <div className="rtl cursor-default">بهترین خرید ها در حسام کالا</div>
        <div>
          <MyButton
            bgColor="primary-1"
            size="small"
            title="شروع به خرید کنید"
          />
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartGirl;
