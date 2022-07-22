import Image from "next/image";
import React, { Fragment } from "react";
import { BsCart4 } from "react-icons/bs";
import { RiMenu3Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

function Header(props) {
  return (
    <Fragment>
      <div className="desktopMenu w-full items-center justify-around  bg-secondary-1   text-myWhite-1  font-IRYekanBold  py-2">
        <div className="leftItems flex-center gap-4 text-h1">
          <span className="relative inline-block">
            <BsCart4 />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[20px] font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              99
            </span>
          </span>

          <i></i>
          <i>
            <CgProfile />
          </i>
        </div>

        <div className="righttems  flex-center gap-4 ">
          <input
            className="h-[90%]  px-11 rounded rtl text-myBlack-1 font-IRYekan md:text-p16 lg:text-p18 focus-visible:border-primary-1 focus-visible:border-2 focus-visible: outline-none shadow-none"
            placeholder="دنبال چی میگردی"
          />
          <span className="md:text-h3 lg:text-h1">حسام کالا</span>
          <Image
            className="rounded-[50%]"
            height="50"
            width="50"
            src="/logo2.jpeg"
          />
        </div>
      </div>
      {/* ************************************ mobile Header
       ************************************* */}
      <div className="mobileMenu  justify-between px-20 py-3 text-h1 w-full items-center bg-secondary-1">
        <div className="flex-center gap-4">
          <Image
            className="rounded-[50%]"
            height="50"
            width="50"
            src="/logo2.jpeg"
          />
          <span className=" text-myWhite-1  font-IRYekanBold text-h3 ">
            حسام کالا
          </span>
        </div>

        <i
          className="text-myWhite-1 "
        >
          <RiMenu3Line />
        </i>
      </div>
    </Fragment>
  );
}

export default Header;
