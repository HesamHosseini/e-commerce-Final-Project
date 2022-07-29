import Image from "next/image";
import React from "react";
import { ePersian } from "../../utils/functions";
import { FaRegMoneyBillAlt } from "react-icons/fa";
const dataBase = {
  DBproducts: [
    { id: 1, price: 10000 },
    { id: 2, price: 20000 },
    { id: 3, price: 30000 },
  ],
};
function ProductCard({ data }) {
  console.log(data);
  return (
    <div className="w-full min-h-[300px] border flex-center gap-10 font-IRYekan text-sm flex-col shadow-xl p-5 bg-myWhite-1 text-myBlack-1 rounded-2xl">
      <Image width={"100%"} height={"100%"} src={data.main_image} />
      <div className="flex-center flex-col gap-4">
        <div>{data.name}</div>
        <div className="rtl flex-center gap-3">
          <span>قیمت :</span>
          <span
            className={`${
              data.final_price !== data.price
                ? "line-through decoration-red-600"
                : ""
            }`}
          >
            {ePersian(Math.floor(data.price))}
          </span>

          <span className="flex-center gap-1">
            <span
              className={`${
                data.final_price !== data.price
                  ? "line-through decoration-red-600"
                  : ""
              }`}
            >
              تومان
            </span>
            <FaRegMoneyBillAlt className="-rotate-45" />
          </span>
        </div>
        <div
          className={`${
            data.final_price === data.price ? "hidden" : ""
          } rtl flex-center gap-3  text-primary-1 text-p16`}
        >
          <span> قیمت با تخفیف :</span>
          <span>{ePersian(Math.floor(data.final_price))}</span>

          <span className="flex-center gap-1">
            <span>تومان</span>
            <FaRegMoneyBillAlt className="-rotate-45" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
