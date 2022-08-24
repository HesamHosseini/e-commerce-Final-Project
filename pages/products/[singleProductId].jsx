import axios from "axios";
import React, { useEffect, useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import { BsForward } from "react-icons/bs";
import {ePersian} from "../../utils/functions"
import { FaRegMoneyBillAlt } from "react-icons/fa";
import MyButton from "../../Components/Button/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import styles from "../authentication/login.module.css"
// import Swiper core and required modules
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import Image from "next/image";

function singleProductId({ loadedProduct, categories }) {


  
  // *************** state managment
  const Cart = useSelector(state => state.cartSliceReducer.value)
  const loginStatus = useSelector((state) => state.loginStatusReducer.value);
  const [productCounter, setProductCounter] = useState(null);
  const [singleProduct , setSingleProduct] = useState(loadedProduct)
  console.log(singleProduct)
  console.log(Cart);

  const dispatch = useDispatch()
// *************** useEffect functions

  useEffect(() => {
    
    const availableInCart = Cart.find(item => item.id === singleProduct.id)
      if (availableInCart) {

        setProductCounter(availableInCart.count)
   } else setProductCounter(null)
  }, [Cart]);



  const handleClick = () => {
    if (loginStatus.logedIn) {
      if (singleProduct.remaining >= 1) {
        const temp = { ...singleProduct }
        temp.remaining = singleProduct.remaining - 1
        setSingleProduct(temp)
        console.log(temp)
        dispatch(addToCart(temp))
      } else {
        toast.error(
          "متاسفانه تعداد بیشتر موجود نمیباشد",
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
    toast.error(
      "برای اضافه کردن کالا به سبد خرید ابتدا وارد شوید ",
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
  }

  const handleDecreaseClick = () => {
    const temp = { ...singleProduct }
        temp.remaining = singleProduct.remaining + 1
        setSingleProduct(temp)
    dispatch(removeFromCart(singleProduct))
}


  return (
    <MainLayout>
      <div className="grid grid-cols-12 rtl my-12 mx-4 font-IRYekan">
        <div className={`col-span-12 md:col-span-6 lg:col-span-5 justify-center items-center `}>
        <div className="w-full ">
      <Swiper
        className="w-full rounded-3xl"
        modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
            >
              {[...singleProduct.images  , singleProduct.main_image].map(image => (<SwiperSlide>

            <div className="w-full text-center  ">
              <Image width={300} height={300} src={image} />
            </div>
        </SwiperSlide>))}
      </Swiper>
    </div>        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-7 m-4 gap-4 flex-col flex justify-evenly">
          <div>{singleProduct.name}</div>
          <div className="flex items-center flex-row gap-4">
            <div>دسته بندی :</div>
            <div>
              {
                categories.filter((item) => item.id == singleProduct.category)[0].parent?
                  .name
              }
            </div>
            <BsForward
              className={
                categories.filter((item) => item.id == singleProduct.category)[0]
                  .parent === null
                  ? "hidden"
                  : ""
              }
            />
            <div>
              {categories.filter((item) => item.id == singleProduct.category)[0].name}
            </div>
          </div>
          <div className={`${singleProduct.final_price !== singleProduct.price ? "line-through decoration-2 decoration-primary-1" : ""} flex items-center gap-4 ` }>
            <div>قیمت :‌</div>
            <div>
            {ePersian(Math.floor(singleProduct.price)  )}
            </div>
            <span className="flex items-center">تومان
            <FaRegMoneyBillAlt className="-rotate-45" />
</span>
          </div>
          <div
            className={`${
              singleProduct.final_price === singleProduct.price ? "hidden" : ""
            } rtl flex-center gap-3  text-primary-1 text-h6`}
          >
            <span> قیمت با تخفیف :</span>
            <span>{ePersian(Math.floor(singleProduct.final_price))}</span>

            <span className="flex-center gap-1">
              <span>تومان</span>
              <FaRegMoneyBillAlt className="-rotate-45" />
            </span>
          </div>
          <div className="flex flex-row items-center  gap-4">
            <div className={`${productCounter? "hidden" : ""}  ${singleProduct.remaining===0 ? "hidden" : ""}`}>
            <MyButton task={() => {
              handleClick(singleProduct)
            }} bgColor={"bg-primary-1"} title="افزودن به سبد خرید" size={"large"} />
            </div>
            <div className={`${productCounter? "hidden" : ""}  ${singleProduct.remaining===0 ? "": "hidden"}`}>
            <MyButton task={() => {
                 toast.error(
          "کالای مورد نظر موجود نمیباشد",
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
            }} bgColor={"bg-slate-300"} title="ناموجود " size={"large"} />
            </div>
            <div className={`${productCounter? "flex-center" : "hidden"} rounded-md border border-primary-1 gap-5`}>
              <i onClick={() => {
                handleClick(singleProduct)
              }} className=" cursor-pointer  text-h4 bg-primary-1 text-myWhite-1  hover:bg-primary-0  transition-all duration-100 ">
                <AiOutlinePlus/>
              </i>
              <span className="cursor-default select-none  text-p16 ">{productCounter}</span>
              <i onClick={() => {
                handleDecreaseClick(singleProduct)
               
              }} className=" cursor-pointer hover:bg-primary-0  transition-all duration-100 text-h4 bg-primary-1 text-myWhite-1">
<AiOutlineMinus/></i>
          </div>
          </div>
        
        </div>
      </div>
      <div className="mx-4 font-IRYekan rtl:">
        <div className="rtl text-secondary-2 font-IRYekanBold text-h4">توضیحات : </div>
        <span className="rtl flex-center gap-7 text-myBlack-1 text-p16">
          {singleProduct.description}
        </span>
      </div>
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
    </MainLayout>
  );
}

export default singleProductId;

export async function getStaticPaths() {
  const productsPromis = await axios.get(
    "https://e-commerce.iran.liara.run/store/product");
  const products = await productsPromis.data;
  const ProductIds = await products.map((product) => ({
    params: {
      singleProductId: `${product.id}`,
    },
  }));
  return {
    paths: ProductIds,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { singleProductId } = params;
  let loadedProduct;
  try {
    const productsPromis = await axios.get(
      `https://e-commerce.iran.liara.run/store/product/id/${singleProductId}`
    );
    loadedProduct = await productsPromis.data;
  } catch (e) {
    loadedProduct = null;
  }
  const categoryPromise = await axios.get(
    "https://e-commerce.iran.liara.run/store/category"
  );
  const categories = await categoryPromise.data;
  return {
    props: {
      loadedProduct,
      categories,
    },
  };
}
