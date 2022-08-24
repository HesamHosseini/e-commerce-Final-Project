import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../Layouts/MainLayout";
import { IoTrashBin } from "react-icons/io";
import { BsCreditCard2Back } from "react-icons/bs";

import { BsTrash } from "react-icons/bs";
import {
  AiFillCloseCircle,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import {
  addToCart,
  deleteFromCart,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import { dataParse, ePersian } from "../../utils/functions";
import { getCookie } from "cookies-next";
import {
  setUserData,
  setUserLoginStatus,
} from "../../redux/slices/loginStatusSlice";
function Cart() {
  const loginStatus = useSelector((state) => state.loginStatusReducer.value);
  const dispatch = useDispatch();
  const [row, setRow] = useState(1);
  const cartItems = useSelector((state) => state.cartSliceReducer.value);
  const router = useRouter();

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

  if (loginStatus.logedIn) {
    return (
      //   {loginStatus.logedIn ?   : null}
      <MainLayout>
        <div className="w-full px-5 ">
          <div className="rtl font-IRYekanBold text-h6 py-5">سبد خرید شما </div>
          <div className="overflow-x-auto overflow-y-hidden ">
            <table className="w-full min-w-[700px] table-auto rtl font-IRYekan text-p16">
              <thead>
                <tr className="text-[10px] ">
                  <th className="border">ردیف</th>
                  <th className="border">نام محصول</th>
                  <th className="border">قیمت یک عدد بدون تخفیف</th>
                  <th className="border">قیمت یک عدد با تخفیف تخفیف</th>
                  <th className="border">قیمت کل با تخفیف </th>
                  <th className="border">عملیات ها</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr className=" text-center border-b text-[16px]">
                    <td>{ePersian(index + 1)}</td>
                    <td>{item.name}</td>
                    <td className>
                      <span>{ePersian(Math.floor(item.price))}</span>
                      <span className="text-[10px] text-red-500 px-2">
                        تومان
                      </span>
                    </td>
                    <td className>
                      <span>{ePersian(Math.floor(item.final_price))}</span>
                      <span className="text-[10px] text-red-500 px-2">
                        تومان
                      </span>
                    </td>
                    <td className>
                      <span>{ePersian(item.final_price * item.count)}</span>
                      <span className="text-[10px] text-red-500 px-2">
                        تومان
                      </span>
                    </td>
                    <td className="flex-center">
                      <div className="flex-center gap-1 ">
                        <div className="flex-center border border-primary-1 rounded-md gap-3">
                          <i
                            onClick={() => {
                              if (item.remaining >= 1) {
                                const temp = { ...item };
                                temp.remaining--;
                                console.log(temp);
                                dispatch(addToCart(temp));
                              }
                            }}
                            className="bg-primary-1 w-full h-full text-h5 text-myWhite-1 cursor-pointer hover:bg-primary-0  transition-all duration-100"
                          >
                            <AiOutlinePlus />
                          </i>
                          <span>{item.count}</span>
                          <i
                            onClick={() => {
                              dispatch(removeFromCart(item));
                            }}
                            className="bg-primary-1 w-full h-full text-h5  text-myWhite-1 cursor-pointer hover:bg-primary-0  transition-all duration-100"
                          >
                            <AiOutlineMinus />
                          </i>
                        </div>
                        <div
                          onClick={() => {
                            dispatch(deleteFromCart(item));
                          }}
                          className="bg-secondary-1 p-[5px] rounded-md cursor-pointer"
                        >
                          <i className="  text-myWhite-1">
                            <BsTrash />
                          </i>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table
              table
              className="l w-full min-w-[700px] table-auto mx-auto border-t border-b border-l  rtl font-IRYekan text-p16"
            >
              <tbody>
                <tr className="border-b">
                  <td className="border-l text-center">
                    {" "}
                    سود شما از این خرید :
                  </td>
                  <td className="border-l text-center">
                    <span>
                      {ePersian(
                        cartItems.reduce(function (prev, cur) {
                          return cur.price * cur.count + prev;
                        }, 0) -
                          cartItems.reduce(function (prev, cur) {
                            return cur.final_price * cur.count + prev;
                          }, 0)
                      )}
                    </span>
                    <span className="text-[10px] text-red-500 px-2">تومان</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="border-l text-center">قیمت نهایی فاکتور :</td>
                  <td className="border-l text-center">
                    <span>
                      {ePersian(
                        cartItems.reduce(function (prev, cur) {
                          return cur.final_price * cur.count + prev;
                        }, 0)
                      )}
                    </span>
                    <span className="text-[10px] text-red-500 px-2">تومان</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rtl grid grid-cols-12 my-16">
            <Link href="/proceedToPayment">
              <div className="col-span-12 flex-center gap-3 bg-primary-1 rounded-md py-3 hover:animate-bounce cursor-pointer	 text-myWhite-1 md:col-span-2 font-IRYekan text-center ">
                <span>تکمیل سفارش</span>
                <i>
                  <BsCreditCard2Back />
                </i>
              </div>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  } else
    return (
      <>
        <div className="bg-secondary-2 flex-col gap-3 font-IRYekanBold text-h4 text-myWhite-1  h-screen w-screen flex-center">
          <div className="text-[100px] text-red-600">
            <i>
              <AiFillCloseCircle />
            </i>
          </div>
          <div>برای مشاهده سبد خرید خود میباسیست ابتدا وارد شوید</div>
          <div className="text-h6">جهت ورود روی دکمه زیر کلیک کنید </div>
          <Link href="/authentication/login">
            <div className="bg-primary-1 shadow-lg p-2 rounded-lg cursor-pointer hover:bg-primary-0 hover:text-opacity-75 transition-all duration-150">
              ورود و ثبت نام
            </div>
          </Link>
        </div>
      </>
    );
}

export default Cart;
