import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import MainLayout from "../../Layouts/MainLayout";
import { BsForward } from "react-icons/bs";
import {ePersian} from "../../utils/functions"
import { FaRegMoneyBillAlt } from "react-icons/fa";
import MyButton from "../../Components/Button/MyButton";
function singleProductId({ loadedProduct, categories }) {

  console.log(loadedProduct)
  const handleClick = (e) => {
    console.log("shit")
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
          <div className="flex flex-row">
            <MyButton task={handleClick} bgColor={"bg-primary-1"} title="افزودن به سبد خرید" size={"large"} />
          <input type="number" placeholder="1" className="w-14 px-3 border rounded-xl"/>
          </div>
        
        </div>
      </div>
      <div className="mx-4 font-IRYekan rtl:">
        <div className="rtl text-secondary-2 font-IRYekanBold text-h4">توضیحات : </div>
        <span className="rtl flex-center gap-7 text-myBlack-1 text-p16">
          {loadedProduct.description}
        </span>
      </div>
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
  console.log(ProductIds);
  return {
    paths: ProductIds,
    fallback: true, // false or 'blocking'
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
