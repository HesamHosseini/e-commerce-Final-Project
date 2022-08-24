import { data } from "autoprefixer";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsLock, BsPerson } from "react-icons/bs";
import { useSelector } from "react-redux";
import MainLayout from "../../Layouts/MainLayout";

function ProceedToPayment() {
  const router = useRouter();
  const userStatus = useSelector((state) => state.loginStatusReducer.value);

  const [formInputs, setFormInputs] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    email: "",
  });

  console.log(formInputs);

  useEffect(() => {
    userStatus.logedIn
      ? setFormInputs({
          firstName: userStatus.userData.userInfo.first_name,
          lastName: userStatus.userData.userInfo.last_name,
          phoneNumber: userStatus.userData.userInfo.phone,
          email: userStatus.userData.userInfo.email,
          address: userStatus.userData.userInfo.address,
        })
      : null;
  }, [userStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(userStatus.userData.token);
    const response = await fetch(
      "https://e-commerce.iran.liara.run/user/change_user_info/",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${userStatus.userData.token}`,
        },
        body: JSON.stringify({
          firstName: `${formInputs.firstName}`,
          lastName: `${formInputs.lastName}`,
          phone: `${formInputs.phoneNumber}`,
          address: `${formInputs.address}`,
        }),
      }
    );
    const ans = await response.json();
    router.push("/");
  };

  return (
    <MainLayout>
      <div className="rtl font-IRYekanBold text-[10px] p-3">
        لطفا قبل از تکمیل فرایند خرید اطلاعات خود را بررسی و تکمیل کنید
      </div>
      <form className="grid grid-cols-12 my-3 mx-3">
        <div className="col-span-12 gap-10 md:col-span-6 flex-center flex-col">
          <div className="flex flex-col items-start w-full max-w-xl my-4 ">
            <input
              type="text"
              id="firstName"
              placeholder="John Doe"
              value={formInputs.firstName}
              onChange={(e) => {
                const temp = { ...formInputs };
                temp.firstName = e.target.value;
                setFormInputs(temp);
              }}
              className="font-IRYekan rtl peer px-4 py-3 w-full rounded-xl
            border border-slate-600 placeholder-transparent"
            />
            <label
              for="firstName"
              className="rtl w-full font-IRYekan rounded-xl ml-4 -mt-11 flex px-4 items-center  text-xs  text-blue-600  
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-8
            peer-placeholder-shown:text-base 
            duration-300"
            >
              <BsPerson />
              نام
            </label>
          </div>
          <div className="flex flex-col items-start w-full max-w-xl my-4">
            <input
              type="text"
              id="lastName"
              placeholder="John Doe"
              value={formInputs.lastName}
              onChange={(e) => {
                const temp = { ...formInputs };
                temp.lastName = e.target.value;
                setFormInputs(temp);
              }}
              className="font-IRYekan rtl peer px-4 py-3 w-full rounded-xl
            border border-slate-600 placeholder-transparent"
            />
            <label
              for="lastName"
              className="rtl w-full font-IRYekan rounded-xl ml-4 -mt-11 flex px-4 items-center  text-xs  text-blue-600  
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-8
            peer-placeholder-shown:text-base 
            duration-300"
            >
              <BsPerson />
              نام خانوادگی
            </label>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 gap-4  py-10 md:py-0 ">
          <div className="col-span-12 gap-10 md:col-span-6 flex-center flex-col">
            <div className="flex flex-col items-start w-full max-w-xl my-4">
              <input
                id="email"
                type="email"
                placeholder="email"
                value={formInputs.email}
                onChange={(e) => {
                  const temp = { ...formInputs };
                  temp.email = e.target.value;
                  setFormInputs(temp);
                }}
                className="font-IRYekan rtl peer px-4 py-3 w-full rounded-xl
            border border-slate-600 placeholder-transparent "
              />
              <label
                for="email"
                className="rtl w-full font-IRYekan rounded-xl ml-4 -mt-11 flex px-4 items-center  text-xs  text-blue-600  
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-8
            peer-placeholder-shown:text-base 
            duration-300"
              >
                <BsPerson />
                ایمیل
              </label>
            </div>
            <div className="flex flex-col items-start w-full max-w-xl my-4">
              <input
                id="phoneNumber"
                type="text"
                placeholder="phoneNumber"
                value={formInputs.phoneNumber}
                onChange={(e) => {
                  const temp = { ...formInputs };
                  temp.phoneNumber = e.target.value;
                  setFormInputs(temp);
                }}
                className="font-IRYekan rtl peer px-4 py-3 w-full rounded-xl
            border border-slate-600 placeholder-transparent"
              />
              <label
                for="phoneNumber"
                className="rtl w-full font-IRYekan rounded-xl ml-4 -mt-11 flex px-4 items-center  text-xs  text-blue-600  
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-8
            peer-placeholder-shown:text-base 
            duration-300"
              >
                <BsPerson />
                تلفن همراه
              </label>
            </div>
          </div>
        </div>
        <div className="col-span-12 my-10">
          <button
            type="submit"
            onClick={handleSubmit}
            className="  bg-primary-1 hover:bg-primary-0  w-full flex-center rounded-xl font-IRYekanBold text-myWhite-1 hover:text-myWhite-2 transition-all duration-150 cursor-pointer h-10"
          >
            ثبت سفارش و پرداخت
          </button>
          <textarea
            value={formInputs.address}
            onChange={(e) => {
              const temp = { ...formInputs };
              temp.address = e.target.value;
              setFormInputs(temp);
            }}
            className=" w-full min-h-[30px] h-32 rtl font-IRYekan border rounded-xl p-3"
            maxlength="400"
            placeholder="آدرس خود به همراه کد پستی و پلاک را وارد کنید"
          ></textarea>
        </div>
      </form>
    </MainLayout>
  );
}

export default ProceedToPayment;
