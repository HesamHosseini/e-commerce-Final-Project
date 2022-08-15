import Image from "next/image";
import React, { Fragment, useEffect } from "react";
import { BsCart4 } from "react-icons/bs";
import { RiMenu3Line } from "react-icons/ri";
import { BiExit } from "react-icons/bi";
import DrowerMenu from "./DrowerMenu";
import { useDispatch, useSelector } from "react-redux";
import { setDrowerState } from "../../redux/slices/headerSlice";
import { deleteCookie, getCookie } from "cookies-next";
import { dataParse } from "../../utils/functions";
import Link from "next/link";
import { IoIosLogIn } from "react-icons/io";
import {
  setUserData,
  setUserLoginStatus,
} from "../../redux/slices/loginStatusSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Listbox, Transition } from "@headlessui/react";
import { MdOutlineUnfoldMore } from "react-icons/md";
import { useRouter } from "next/router";
import { GrLogin } from "react-icons/gr";

const test = [
  { name: "همه محصولات" },
  { name: "باتخفیف" },
  { name: "بدون تخفیف" },
];

function Header(props) {
  const router = useRouter();
  const loginStatus = useSelector((state) => state.loginStatusReducer.value);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loginStatus.logedIn === false) {
      const cookieData = getCookie("token");
      if (cookieData) {
        const data = dataParse(cookieData);
        dispatch(setUserLoginStatus(true));
        dispatch(setUserData(data));
      }
    }
  }, []);
  console.log(loginStatus);
  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="desktopMenu w-full items-center justify-around  bg-secondary-1   text-myWhite-1  font-IRYekanBold  py-2">
        <div className="leftItems flex-center gap-4 text-h1 py-3 ">
          {loginStatus.logedIn ? (
            <div className="text-[10px] z-30 font-IRYekan text-myBlack-1 w-32 flex-center flex-col bg-red-500">
              <div>
                <Listbox
                  value={loginStatus.userData.userInfo.username}
                  className="w-full"
                >
                  <div className="relative mt-1 w-full">
                    <Listbox.Button className="font-IRYekan relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                      <span className="block truncate">
                        <span>عزیز خوش آمدید</span>
                        <span>{loginStatus.userData.userInfo.username}</span>
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
              <div className="text-p16 font-IRYekan border border-primary-1 p-3 rounded-lg cursor-pointer flex-center gap-4 text-myWhite-1 transition-all  duration-500 hover:p-4 hover:bg-primary-1">
                <i className="text-myWhite-1 text-h5">
                  <IoIosLogIn />
                </i>
                <span>ورود به حساب کابری</span>
              </div>
            </Link>
          )}
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
      <div className="mobileMenu  justify-between px-10 py-3 text-h1 w-full items-center bg-secondary-1">
        <div className="flex-center gap-4">
          <Image
            className="rounded-[50%]"
            height="50"
            width="50"
            src="/logo2.jpeg"
          />
          <span className=" text-myWhite-1  font-IRYekanBold xsm:text-p18  sm:text-h5  ">
            حسام کالا
          </span>
        </div>

        <i className="text-myWhite-1 ">
          <RiMenu3Line
            onClick={() => {
              dispatch(setDrowerState(1));
            }}
          />
        </i>
      </div>
      <DrowerMenu />
    </Fragment>
  );
}

export default Header;
