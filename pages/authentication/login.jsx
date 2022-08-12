import React, { useEffect, useState } from "react";
import MyButton from "../../Components/Button/MyButton";
import { AiOutlineLogin } from "react-icons/ai";
import { getCookie, setCookie } from "cookies-next";
import MyInput from "../../Components/MyInput/MyInput";
import {
  emailValidation,
  passwordValidation,
  useNameValidation,
} from "./ٰvalidation";
import axios from "axios";

function Login() {
  // const a = Date.now();
  // const expireDate = Date(a + 3600);
  // console.log(a);
  // const data = [{ name: "ali" }, { name: "gholi" }, { name: "mamad" }];

  const [userNameInput, setUserNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginValidation, setLoginValidation] = useState({
    email: 0,
    password: 0,
  });

  useEffect(() => {
    useNameValidation(userNameInput, loginValidation, setLoginValidation);
  }, [userNameInput]);

  useEffect(() => {
    passwordValidation(passwordInput, loginValidation, setLoginValidation);
  }, [passwordInput]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    console.log(datt);
  };

  return (
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
              لطفا ایمیل خود را صحیح وارد نمایید
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
        <div className="flex-center bg-primary-1 hover:text-myWhite-1 rounded-xl ">
          <i className=" bg-primary-1 flex-center">
            <AiOutlineLogin />
          </i>
          <MyButton bgColor="bg-primary-1" size="large" title="ثبت نام" />
        </div>
      </div>
    </div>
  );
}

export default Login;
