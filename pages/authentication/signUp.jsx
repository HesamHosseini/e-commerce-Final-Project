import React, { useEffect, useState } from "react";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { FaKey } from "react-icons/fa";
import { ImHappy } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import styles from "./login.module.css";
import {
  SignUpPasswordValidation,
  SignUpUserNameValidation,
} from "./ٰvalidation";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import {
  setUserData,
  setUserLoginStatus,
} from "../../redux/slices/loginStatusSlice";
import { setCookie } from "cookies-next";
import { useDispatch } from "react-redux";
function SignUp(props) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [inputValidation, setInputValidation] = useState({
    password: 0,
    username: 0,
  });

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    SignUpUserNameValidation(
      usernameInput,
      setInputValidation,
      inputValidation
    );
  }, [usernameInput]);

  useEffect(() => {
    SignUpPasswordValidation(
      passwordInput,
      setInputValidation,
      inputValidation
    );
  }, [passwordInput]);

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (
      inputValidation.password === 2 &&
      inputValidation.username === 2 &&
      acceptPolicy === false
    ) {
      toast.error("لطفا قوانین مورد نظر را تایید کنید", {
        position: "top-right",
        className: styles.fontYekan,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (
      inputValidation.password === 1 ||
      inputValidation.username === 1
    ) {
      toast.error("فیلد های مورد نظر را دوباره برسی کنید", {
        position: "top-right",
        className: styles.fontYekan,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (
      inputValidation.password === 2 &&
      inputValidation.username === 2 &&
      acceptPolicy === true
    ) {
      const res = await fetch("https://e-commerce.iran.liara.run/user/register/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: `${usernameInput}`,
          password: `${passwordInput}`,
        }),
      });
      const registerRes = await res.json();

      const loginReq = await fetch("https://e-commerce.iran.liara.run/user/login/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: `${usernameInput}`,
          password: `${passwordInput}`,
        }),
      });

      const loginRes = await loginReq.json();
      if (loginRes.token) {
        setCookie("token", JSON.stringify(loginRes), {
          maxAge: 60 * 60 * 24 * 4,
        });
        dispatch(setUserData(loginRes));
        dispatch(setUserLoginStatus(true));
        router.push("/");
      }
    }
  };

  return (
    <div className="w-full h-screen flex-center !shadow-2xl  bg-secondary-2 font-IRYekan ">
      <form
        onSubmit={handleSignUpSubmit}
        className="w-[60%] !shadow-2xl bg-myWhite-2 flex-center justify-around py-10 flex-col rounded-2xl gap-10"
      >
        <h3 className="font-IRYekanBold text-myBlack-1">ثبت نام کاربر جدید</h3>

        <h3 className="font-IRYekanBold flex-center gap-4 text-xs">
          <ImHappy />
          خوش آمدید
        </h3>

        <div className=" gap-10 flex-center flex-col ">
          <div className="username">
            <div
              className={`${
                inputValidation.username === 2
                  ? "border-green-700 border"
                  : inputValidation.username === 1
                  ? "border-red-500 border"
                  : ""
              }  flex-center bg-myWhite-1 rounded-lg px-4`}
            >
              <i
                className={`${
                  inputValidation.username === 2
                    ? "text-green-700"
                    : inputValidation.username === 1
                    ? "text-red-500"
                    : ""
                } `}
              >
                <BsCheck />
              </i>
              <input
                className="bg-myWhite-1 rtl  w-full  p-2  focus-visible:outline-none "
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
              />

              <i
                className={`${
                  inputValidation.username === 2
                    ? "text-green-700"
                    : inputValidation.username === 1
                    ? "text-red-500"
                    : "text-myBlack-1"
                } `}
              >
                <AiOutlineUserAdd />
              </i>
            </div>
          </div>

          <div className="password ">
            <div
              className={`${
                inputValidation.password === 2
                  ? "border-green-700 border"
                  : inputValidation.password === 1
                  ? "border-red-500 border"
                  : ""
              }  flex-center bg-myWhite-1 rounded-lg px-4`}
            >
              <i
                className={`${
                  inputValidation.password === 2
                    ? "text-green-700"
                    : inputValidation.password === 1
                    ? "text-red-500"
                    : ""
                } `}
              >
                <BsCheck />
              </i>
              <input
                type="password"
                className="bg-myWhite-1 rtl  w-full  p-2  focus-visible:outline-none "
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              <i
                className={`${
                  inputValidation.password === 2
                    ? "text-green-700"
                    : inputValidation.password === 1
                    ? "text-red-500"
                    : "text-myBlack-1"
                } `}
              >
                <FaKey />
              </i>
            </div>
          </div>

          <div className="  w-full  font-IRYekan select-none flex items-center gap-4 text-[14px] text-slate-500">
            <input
              id="policy"
              type="checkBox"
              defaultChecked={acceptPolicy}
              onChange={() => setAcceptPolicy(!acceptPolicy)}
            />
            <label htmlFor="policy">شرایط و قوانین این سایت را میپذیرم</label>
          </div>
        </div>
        <div className="px-4 py-1 gap-3 select-none rounded-lg cursor-pointer flex-center bg-primary-0 text-myWhite-2 hover:text-myWhite-1 hover:bg-primary-1 transition-all duration-300 ">
          <i>
            <AiOutlineLogin />
          </i>
          <button type="submit">ثبت نام و ورود</button>
        </div>
      </form>
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
    </div>
  );
}

export default SignUp;
