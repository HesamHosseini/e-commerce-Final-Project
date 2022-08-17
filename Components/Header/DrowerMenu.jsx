import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDrowerState } from "../../redux/slices/headerSlice";
import styles from "./DrowerMenu.module.css";
import { GrFormClose } from "react-icons/gr";
import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineExpandMore, MdOutlineUnfoldMore, MdPhonelink } from "react-icons/md";
import { Disclosure, Listbox, Transition } from "@headlessui/react";
import CustumDiscosure from "../CustumDiscosure/CustumDiscosure";
import Link from "next/link";
import { IoIosLogIn } from "react-icons/io";

function DrowerMenu(props) {
  const isOpen = useSelector((state) => state.header.value.drowerState);
  const loginStatus = useSelector((state) => state.loginStatusReducer.value);
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
            <div className="leftItems flex-center gap-4 text-h1 py-3 ">
              {loginStatus.logedIn ? (
                <div className="text-[10px] z-30 font-IRYekan text-myBlack-1 w-32 flex-center flex-col bg-red-500">
                  <div>
                    <Listbox
                      value={loginStatus.userData.userInfo.username}
                      className="w-full"
                    >
                      <div className="relative mt-1 w-full">
                        <Listbox.Button className="font-IRYekan relative w-full cursor-default flex-center rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                          <span className="flex-center gap-3 truncate">
                            <span>عزیز خوش آمدید</span>
                            <span>
                              {loginStatus.userData.userInfo.username}
                            </span>
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <MdOutlineUnfoldMore
                              className="h-5 w-5 text-myBlack-1"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Listbox.Options className="z-[2] absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-3  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm sm:text-sm">
                            <Listbox.Option
                              onClick={() => {
                                deleteCookie("token");
                                router.reload();
                              }}
                              className={({ active }) =>
                                `font-IRYekan relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-secondary-2 text-myBlack-1"
                                    : "text-gray-900"
                                }`
                              }
                              value={"خروج از حساب"}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={` truncate flex items-center gap-4 ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    <i>
                                      <BiExit />
                                    </i>
                                    <span>{"خروج از حساب"}</span>
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                      <BiCheck
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                            <Listbox.Option
                              className={({ active }) =>
                                `font-IRYekan relative cursor-default select-none py-3 pl-10 pr-4 ${
                                  active
                                    ? "bg-secondary-2 text-myBlack-1"
                                    : "text-gray-900"
                                }`
                              }
                              value={"سبد خرید"}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={` truncate h-10 flex items-center gap-4 ${
                                      selected ? "font-[14px]" : "font-[14px]"
                                    }`}
                                  >
                                    <span className="relative inline-block cursor-pointer ">
                                      <i className="text-[20px]">
                                        <BsCart4 />
                                      </i>
                                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                        99
                                      </span>
                                    </span>
                                    <span>{"سبد خرید"}</span>
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                      <BiCheck
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>
              ) : (
                <Link href="/authentication/login">
                  <div className="text-p16 font-IRYekan border border-primary-1 p-3 rounded-lg cursor-pointer flex-center gap-4 text-secondary-1 hover:text-myWhite-1 transition-all  duration-500 hover:p-4 hover:bg-primary-1">
                    <i className="text-secondary-1 text-h5">
                      <IoIosLogIn />
                    </i>
                    <span>ورود به حساب کابری</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DrowerMenu;

// <div></div>
// <div></div>
