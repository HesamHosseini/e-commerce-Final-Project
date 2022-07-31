import Image from "next/image";
import React from "react";
import searchImg from "../../public/Digital-painting/digital-search.svg";
function SearchCard(props) {
  return (
    <div className="flex-col shadow-lg flex-center bg-primary-1 rounded-3xl rtl text-myWhite-1 font-IRYekan text-p16">
      <div>
        <Image src={searchImg} />
      </div>
      <div className="flex-center flex-col gap-2 pb-7 sm:text-sm ">
        <span className="text-[12px] md:text-p16">دنبال چی میگردی</span>
        <span className="text-[12px] md:text-p16">همونو سرچ کن !</span>
      </div>
    </div>
  );
}

export default SearchCard;
