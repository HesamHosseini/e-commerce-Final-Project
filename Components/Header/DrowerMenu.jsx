import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDrowerState } from "../../redux/slices/headerSlice";
import styles from "./DrowerMenu.module.css";
import { GrFormClose } from "react-icons/gr";
import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineExpandMore, MdPhonelink } from "react-icons/md";
import { Disclosure, Transition } from "@headlessui/react";
import CustumDiscosure from "../CustumDiscosure/CustumDiscosure";

function DrowerMenu(props) {
  const isOpen = useSelector((state) => state.header.value.drowerState);
  const dispatch = useDispatch();

  return (
    <>
      <div
        onClick={() => {
          dispatch(setDrowerState(2));
        }}
        className={`${
          isOpen == 0
            ? "hidden"
            : isOpen == 2
            ? "hidden"
            : isOpen == 1
            ? "block"
            : ""
        } backdrop-blur-sm w-[100vw] top-0 left-0 z-10 h-[100vh] fixed bg-[#0003]`}
      ></div>
      <div
        className={`${
          isOpen == 0
            ? "hidden"
            : isOpen == 1
            ? `${styles.DrowerAnimationIn} flex`
            : isOpen == 2
            ? `${styles.DrowerAnimationOut} flex`
            : ""
        } w-[50vw] min-w-max font-IRYekan z-20 h-[100vh] bg-myWhite-1 p-4 top-0 fixed flex-col  items-center`}
      >
        <div
          className="self-end text-h1"
          onClick={() => {
            dispatch(setDrowerState(2));
          }}
        >
          <GrFormClose></GrFormClose>
        </div>
        <div id="menuItems">
          <div className="flex-center  ">
            <i className="text-h4">
              <BiSearchAlt />
            </i>

            <input
              className="px-12 py-3 rtl text-[12px] rounded-md focus-visible:border-primary-1 focus-visible:border-2 focus-visible: outline-none shadow-none"
              placeholder="دنبال چی میگردی"
            />
          </div>
          <div className="rtl">
            <CustumDiscosure
              // route={"/categories"}
              items={[
                { name: "کالای دیجیتال", icon: <MdPhonelink /> },
                {
                  name: "خودرو، ابزار و تجهیزات صنعتی",
                  icon: <MdPhonelink />,
                },
                { name: "مد و پوشاک", icon: <MdPhonelink /> },
                ,
                ,
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DrowerMenu;

// <div></div>
// <div></div>
