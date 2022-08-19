import Link from "next/link";
import React from "react";
import { BsCreditCard2Back } from "react-icons/bs";
import { useSelector } from "react-redux";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";

function MainLayout({ children }) {
  const Cart = useSelector((state) => state.cartSliceReducer.value);
  const ProceedCondition = Cart.length <= 0 ? false : true;
  return (
    <>
      <Header />
      <Link href={"/proceedToPayment"}>
        <div
          className={`${
            ProceedCondition ? "fixed" : "hidden"
          }  flex-center rounded-lg text-myWhite-1 font-IRYekan text-[14px] bg-red-400 bottom-10 right-10 p-5`}
        >
          <i>
            <BsCreditCard2Back />
          </i>
          <span>تکمیل خرید</span>
        </div>
      </Link>

      {children}
      <Footer />
    </>
  );
}

export default MainLayout;
