import Image from "next/image";
import React from "react";
import searchImg from "../../public/Digital-painting/digital-search.svg";
function SearchCard(props) {
  return (
    <div className="flex-col flex-center bg-primary-1 rounded-3xl rtl text-myWhite-1 font-IRYekan text-p16">
      <div>
        <Image src={searchImg} />
      </div>
      <div className="flex-center flex-col gap-2 pb-7">
        <span>دنبال چی میگردی</span>
        <span>همونو سرچ کن !</span>
      </div>
    </div>
  );
}

export default SearchCard;
