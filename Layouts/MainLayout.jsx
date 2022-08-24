import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import { BsCart4 } from "react-icons/bs";
import { useRouter } from "next/router";
function MainLayout({ children }) {
  const router = useRouter();
  const Cart = useSelector((state) => state.cartSliceReducer.value);
  const ProceedCondition = Cart.length <= 0 ? false : true;
  return (
    <>
      <Header />
      <Link href={"/cart"}>
        <div
          className={`${ProceedCondition ? "fixed" : "hidden"} ${
            router.pathname === "/proceedToPayment" ||
            router.pathname === "/cart"
              ? "hidden"
              : "fixed"
          }  flex-center cursor-pointer rounded-lg text-myWhite-1 font-IRYekan text-[14px] bg-red-400 bottom-10 right-10 p-5`}
        >
          <i>
            <BsCart4 />
          </i>
          <span>سبد خرید </span>
        </div>
      </Link>

      {children}
      <Footer />
    </>
  );
}

export default MainLayout;
