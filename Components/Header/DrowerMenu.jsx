import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDrowerState } from "../../redux/slices/headerSlice";
import styles from "./DrowerMenu.module.css";

function DrowerMenu(props) {
  const isOpen = useSelector((state) => state.header.value.drowerState);
  const dispatch = useDispatch();
  console.log(isOpen);
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
        onClick={(e) => {
          console.log(e.target.id);
        }}

        className={`${
          isOpen == 0
            ? "hidden"
            : isOpen == 1
            ? styles.DrowerAnimationIn
            : isOpen == 2
            ? styles.DrowerAnimationOut
            : ""
        } w-[30vw]  z-20 h-[100vh] bg-slate-100 p-4 top-0 fixed `}
      ></div>
    </>
  );
}

export default DrowerMenu;

// <div></div>
// <div></div>
