import Image from "next/image";
import React from "react";
import girl from "../../public/Digital-painting/StoreGirl.svg";
import MyButton from "../Button/MyButton";
import styles from "./StoreGirl.module.css";
function StoreGirl(props) {
  return (
    <div className="flex rounded-3xl flex-col bg-secondary-2 w-full text-myWhite-2">
      <div className="flex-center flex-col">
        <h1 className="text-h4 font-IRYekanBold rtl">به ما اعتماد کنید</h1>
        <div className="flex-col flex-center gap-3">
          <li
            className={`${styles.listItems} rtl font-IRYekan text-p16 text-myWhite-1`}
          >
            بازگشت ۷ روزی کالا
          </li>
          <li
            className={`${styles.listItems} rtl font-IRYekan text-p16 text-myWhite-1`}
          >
            بازگشت ۷ روزی کالا
          </li>
          <li
            className={`${styles.listItems} rtl font-IRYekan text-p16 text-myWhite-1`}
          >
            بازگشت ۷ روزی کالا
          </li>
          <li
            className={`${styles.listItems} rtl font-IRYekan text-p16 text-myWhite-1`}
          >
            بازگشت ۷ روزی کالا
          </li>
          <li
            className={`${styles.listItems} rtl font-IRYekan text-p16 text-myWhite-1`}
          >
            بازگشت ۷ روزی کالا
          </li>
          <li
            className={`list-none rtl font-IRYekan text-p16 text-myWhite-2 flex justify-start w-full`}
          >
            <MyButton
              bgColor="bg-primary-1"
              size="small"
              title="بیشتر بخوانید"
            />
          </li>
        </div>
      </div>
      <div className="flex-center">
        <Image src={girl} />
      </div>
    </div>
  );
}

export default StoreGirl;
