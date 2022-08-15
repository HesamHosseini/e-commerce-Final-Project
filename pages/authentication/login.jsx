import React, { useEffect, useState } from "react";
import MyButton from "../../Components/Button/MyButton";
import { AiOutlineLogin } from "react-icons/ai";
import { setCookie } from "cookies-next";
import MyInput from "../../Components/MyLoginInput/MyLoginInput";
import { passwordValidation, useNameValidation } from "./ٰvalidation";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  setUserData,
  setUserLoginStatus,
} from "../../redux/slices/loginStatusSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./login.module.css";
import Link from "next/link";

function Login() {
  const [userNameInput, setUserNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginValidation, setLoginValidation] = useState({
    email: 0,
    password: 0,
  });
  const router = useRouter();

  useEffect(() => {
    useNameValidation(userNameInput, loginValidation, setLoginValidation);
  }, [userNameInput]);

  useEffect(() => {
    passwordValidation(passwordInput, loginValidation, setLoginValidation);
  }, [passwordInput]);

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginValidation.email === 2 && loginValidation.password === 2) {
      const res = await fetch("http://localhost:8000/user/login/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: `${userNameInput}`,
          password: `${passwordInput}`,
        }),
      });
      const datt = await res.json();
      if (datt.token) {
        setCookie("token", JSON.stringify(datt), {
          maxAge: 60 * 60 * 24 * 4,
        });
        dispatch(setUserData(datt));
        dispatch(setUserLoginStatus(true));
        
        router.back();
      } else if (datt.status === "failed") {
        toast.error(
          "کاربری با این مشخصات یافت نشد لطفا نام کابری و رمز عبور خود را دوباره بررسی کنید",
          {
            className: styles.fontYekan,
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    } else {
      toast.error("لطفا فیلد ها را طور صحیح پر کنید", {
        className: styles.fontYekan,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="md:grid md:grid-cols-2 font-IRYekan">
        <div className="flex-center bg-primary-2 bg-opacity-60 flex-col hover:bg-opacity-100 transition-all ">
          <form
            className="w-full  flex-center flex-col gap-4"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <img
              className="w-32 h-32"
              src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg"
            />
            <div className="text-myWhite-1">ورود به حساب کاربری</div>
            <div
              className={`rounded-lg
          ${
            loginValidation.email === 0
              ? ""
              : loginValidation.email === 1
              ? " border-red-500 "
              : loginValidation.email === 2
              ? "border-green-400"
              : ""
          }
           rounded-lg border`}
            >
              <MyInput
                validationstate={loginValidation}
                placeHolder="نام کاربری"
                type="username"
                value={userNameInput}
                onChange={setUserNameInput}
              />
            </div>
            {loginValidation.email === 1 ? (
              <div className="font-IRYekan text-[14px] text-red-700">
                لطفا نام کاربری خود را صحیح وارد نمایید
              </div>
            ) : null}
            <div
              className={`rounded-lg
          ${
            loginValidation.password === 0
              ? ""
              : loginValidation.password === 1
              ? " border-red-500 "
              : loginValidation.password === 2
              ? "border-green-400"
              : ""
          }
           rounded-lg border`}
            >
              <MyInput
                validationstate={loginValidation}
                placeHolder="رمز عبور"
                type="password"
                value={passwordInput}
                onChange={setPasswordInput}
              />
            </div>
            {loginValidation.password === 1 ? (
              <div className="font-IRYekan text-[14px] text-red-700">
                لطفا رمز عبور خود را صحیح وارد نمایید
              </div>
            ) : null}
            <div>
              <MyButton
                type="submit"
                title="ورود"
                bgColor="bg-green-700"
                size="large"
              />
            </div>
          </form>
        </div>
        <div className="w-full h-[47vh] md:h-screen  hover:bg-secondary-1 transition-all bg-secondary-2  gap-4 flex flex-col flex-center">
          <div className="text-myWhite-1">تا به حال ثبت نام نکرده اید ؟</div>
          <Link href="/authentication/signUp">
            <div className="flex-center bg-primary-1 hover:text-myWhite-1 rounded-xl ">
              <i className=" bg-primary-1 flex-center">
                <AiOutlineLogin />
              </i>
              <MyButton bgColor="bg-primary-1" size="large" title="ثبت نام" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
