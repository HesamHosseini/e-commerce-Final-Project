import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsFillChatSquareTextFill, BsCheck } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
function MyInput({ placeHolder, type, value, onChange, validationstate }) {
  return (
    <div className="w-full  rtl flex-center justify-between bg-myWhite-1 rounded-lg gap-5 px-10">
      {type == "email" ? (
        <span
          className={`${
            validationstate.email === 0
              ? "text-myBlack-1"
              : validationstate.email === 1
              ? "text-red-500"
              : validationstate.email === 2
              ? "text-green-800"
              : null
          }`}
        >
          <HiOutlineMail />
        </span>
      ) : type == "password" ? (
        <span
          className={`${
            validationstate.password === 0
              ? "text-myBlack-1"
              : validationstate.password === 1
              ? "text-red-500"
              : validationstate.password === 2
              ? "text-green-800"
              : null
          }`}
        >
          <RiLockPasswordFill />
        </span>
      ) : type == "text" ? (
        <span>
          <BsFillChatSquareTextFill />
        </span>
      ) : type == "username" ? (
        <span>
          <AiOutlineUser />
        </span>
      ) : null}

      <input
        value={value}
        type={type}
        className="bg-myWhite-1  w-full  p-2  focus-visible:outline-none "
        placeholder={placeHolder}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="text-green-800 text-h6">
        {type === "email" && validationstate.email === 2 ? <BsCheck /> : null}
      </span>
      <span>
        {type == "password" && validationstate.password == 2 ? (
          <BsCheck />
        ) : null}
      </span>
    </div>
  );
}

export default MyInput;
