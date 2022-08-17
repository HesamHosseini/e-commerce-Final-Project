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
function singleProductId({ loadedProduct, categories }) {


  
  // *************** state managment
  const Cart = useSelector(state => state.cartSliceReducer.value)
  const loginStatus = useSelector((state) => state.loginStatusReducer.value);
  const [productCounter, setProductCounter] = useState(null);

console.log(loadedProduct)
  const dispatch = useDispatch()
// *************** useEffect functions
  useEffect(() => {
    
    const availableInCart = Cart.find(item => item.id === loadedProduct.id)
      if (availableInCart) {

        setProductCounter(availableInCart.count)
   } else setProductCounter(null)
  }, [Cart]);



  const handleClick = (product) => {
    if (loginStatus.logedIn) {
      dispatch(addToCart(product))
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



  return (
    <MainLayout>
      <div className="grid grid-cols-12 rtl my-12 mx-4 font-IRYekan">
        <div className={`col-span-12 md:col-span-6 lg:col-span-5 justify-center items-center `}>
          <img src={loadedProduct.main_image} className="border shadow rounded-2xl" />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-7 m-4 gap-4 flex-col flex justify-evenly">
          <div>{loadedProduct.name}</div>
          <div className="flex items-center flex-row gap-4">
            <div>دسته بندی :</div>
            <div>
              {
                categories.filter((item) => item.id == loadedProduct.category)[0].parent?
                  .name
              }
            </div>
            <BsForward
              className={
                categories.filter((item) => item.id == loadedProduct.category)[0]
                  .parent === null
                  ? "hidden"
                  : ""
              }
            />
            <div>
              {categories.filter((item) => item.id == loadedProduct.category)[0].name}
            </div>
          </div>
          <div className={`${loadedProduct.final_price !== loadedProduct.price ? "line-through decoration-2 decoration-primary-1" : ""} flex items-center gap-4 ` }>
            <div>قیمت :‌</div>
            <div className="">

            {ePersian(Math.floor(loadedProduct.price)  )}
            </div>
            <span className="flex items-center">تومان
            <FaRegMoneyBillAlt className="-rotate-45" />
</span>
          </div>
          <div
            className={`${
              loadedProduct.final_price === loadedProduct.price ? "hidden" : ""
            } rtl flex-center gap-3  text-primary-1 text-h6`}
          >
            <span> قیمت با تخفیف :</span>
            <span>{ePersian(Math.floor(loadedProduct.final_price))}</span>

            <span className="flex-center gap-1">
              <span>تومان</span>
              <FaRegMoneyBillAlt className="-rotate-45" />
            </span>
          </div>
          <div className="flex flex-row items-center  gap-4">
            <div className={`${productCounter? "hidden" : ""}`}>
            <MyButton task={() => {
              handleClick(loadedProduct)
            }} bgColor={"bg-primary-1"} title="افزودن به سبد خرید" size={"large"} />
            </div>
            <div className={`${productCounter? "flex-center" : "hidden"} rounded-md border border-primary-1 gap-5`}>
              <i onClick={() => {
                handleClick(loadedProduct)
              }} className=" cursor-pointer  text-h4 bg-primary-1 text-myWhite-1  hover:bg-primary-0  transition-all duration-100 ">
                <AiOutlinePlus/>
              </i>
              <span className="cursor-default select-none  text-p16 ">{productCounter}</span>
              <i onClick={() => {
                dispatch(removeFromCart(loadedProduct))
              }} className=" cursor-pointer hover:bg-primary-0  transition-all duration-100 text-h4 bg-primary-1 text-myWhite-1">
<AiOutlineMinus/></i>
          </div>
          </div>
        
        </div>
      </div>
      <div className="mx-4 font-IRYekan rtl:">
        <div className="rtl text-secondary-2 font-IRYekanBold text-h4">توضیحات : </div>
        <span className="rtl flex-center gap-7 text-myBlack-1 text-p16">
          {loadedProduct.description}
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
    "http://localhost:8000/store/product",
    {
      headers: {
        Authorization: "Token daa15a1f35ec2dcdaa608ca1380a173e4d39e410",
      },
    }
  );
  const products = await productsPromis.data;
  const ProductIds = await products.map((product) => ({
    params: {
      singleProductId: `${product.id}`,
    },
  }));
  return {
    paths: ProductIds,
    fallback: false, // false or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const { singleProductId } = params;
  let loadedProduct;
  try {
    const productsPromis = await axios.get(
      `http://localhost:8000/store/product/id/${singleProductId}`,
      {
        headers: {
          Authorization: "Token daa15a1f35ec2dcdaa608ca1380a173e4d39e410",
        },
      }
    );
    loadedProduct = await productsPromis.data;
  } catch (e) {
    loadedProduct = null;
  }
  const categoryPromise = await axios.get(
    "http://localhost:8000/store/category"
  );
  const categories = await categoryPromise.data;
  return {
    props: {
      loadedProduct,
      categories,
    }, // will be passed to the page component as props
  };
}
