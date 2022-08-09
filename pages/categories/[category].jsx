import axios from "axios";
import React, { useState } from "react";
import MyListBox from "../../Components/MyListBox/MyListBox";
import MainLayout from "../../Layouts/MainLayout";
import CustumDiscosure from "../../Components/CustumDiscosure/CustumDiscosure";
import ToggleSwitch from "../../Components/ToggleSwitch/ToggleSwitch";
import ProductCard from "../../Components/ProductCard/ProductCard";

// ************** icons
import { FaFilter } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import { BiSearchAlt } from "react-icons/bi";
import { MdPhonelink } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

// ************ reducers
import {
  setDiscountFilter,
  setMobileFilterOpen,
  setPriceOrder,
  setSubCategoryfilter,
} from "../../redux/slices/CategoryFilterSlice";

// ************ animation CSS module
import styles from "./category.module.css";
import Head from "next/head";

function category({ data, childCategories, thisCategory }) {
  const dispatch = useDispatch();
  const filterState = useSelector((state) => state.categoryFilter.value);

  const categoryFilterOptions = childCategories.map((category) => {
    return { name: category.name, id: category.id };
  });

  const handlePriceOrder = (product) => {
    const temp = [...product];
    switch (filterState.priceOrder) {
      case "همه":
        return product;
      case "ارزان به گران":
        return temp.sort((a, b) =>
          Math.floor(a.price) > Math.floor(b.price)
            ? 1
            : Math.floor(b.price) > Math.floor(a.price)
            ? -1
            : 0
        );
      case "گران به ارزان":
        return temp.sort((a, b) =>
          Math.floor(b.price) > Math.floor(a.price)
            ? 1
            : Math.floor(a.price) > Math.floor(b.price)
            ? -1
            : 0
        );
    }
  };

  const handleSubCategoryFilter = (products) => {
    if (filterState.subCategoryfilter === "همه دسته بندی ها") {
      return products;
    } else {
      const categoryID = childCategories.filter(
        (category) => category.name === filterState.subCategoryfilter
      )[0].id;
      return products.filter((product) => product.category == categoryID);
    }
  };

  const handleDiscountFilter = (products) => {
    switch (filterState.discountFilter) {
      case "همه محصولات":
        return products;
      case "بدون تخفیف":
        return products.filter((item) => item.price === item.final_price);
      case "باتخفیف":
        return products.filter((item) => item.price !== item.final_price);
    }
  };
  console.log(thisCategory.name);
  return (
    <MainLayout>
      <Head>
        <title>دسته بندی : {thisCategory.name}</title>
        <link rel="shortcut icon" href="/logo2.jpeg" />
      </Head>
      <div className="flex flex-col md:grid md:grid-cols-3  w-full gap-3 md:gap-32 p-4 border-b-2 border-gray-100">
        <div className="z-[5] ">
          <MyListBox
            data={[
              { name: "همه محصولات" },
              { name: "باتخفیف" },
              { name: "بدون تخفیف" },
            ]}
            state={filterState.discountFilter}
            func={setDiscountFilter}
          />
        </div>
        <div className="z-[3]">
          <MyListBox
            data={[{ name: "همه دسته بندی ها" }, ...categoryFilterOptions]}
            state={filterState.subCategoryfilter}
            func={setSubCategoryfilter}
          />
        </div>
        <button
          onClick={() => {
            dispatch(setMobileFilterOpen(1));
          }}
          className=" flex items-center justify-center md:hidden flex-row gap-3 font-IRYekan text-[10px] bg-gray-100 p-3 rounded-md border border-slate-500 "
        >
          <i>
            <FaFilter />
          </i>
          <span>فیلتر ها</span>
        </button>
      </div>
      <div className="rtl font-IRYekanBold text-h6 md:text-h4 px-5 text-myBlack-1 py-3 ">
        <span className="text-secondary-2">دسته بندی :</span>
        {thisCategory.name}
      </div>
      <div className="grid grid-cols-12 rtl">
        <div className="hidden md:flex md:col-span-3 bg-secondary-1 min-h-[50vh]  gap-4 items-center flex-col p-4">
          <div className="priceFilter flex-center flex-col gap-4 rtl font-IRYekan">
            <div className="text-myWhite-1">محدوده قیمت (به تومان):</div>
            <div className="z-[4] w-full">
              <MyListBox
                data={[
                  { name: "همه" },
                  { name: "گران به ارزان" },
                  { name: "ارزان به گران" },
                ]}
                state={filterState.priceOrder}
                func={setPriceOrder}
              />
            </div>
            <div></div>
          </div>
          <div className="rtl flex-center flex-row font-IRYekan gap-3">
            <div className="text-myWhite-1">نمایش کالا های موجود </div>
            <div className="ltr">
              <ToggleSwitch />
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9 grid grid-cols-12 gap-4">
          {handleDiscountFilter(
            handleSubCategoryFilter(handlePriceOrder(data))
          ).map((item) => (
            <div
              key={item.id}
              className="col-span-12 md:col-span-6  xl:col-span-4 gap-4 "
            >
              <ProductCard data={item} />
            </div>
          ))}
        </div>
      </div>

      {/* mobile filter sideBar  */}
      <div className="z-10">
        <>
          <div
            onClick={() => {
              dispatch(setMobileFilterOpen(2));
            }}
            className={`${
              filterState.mobileFilterOpen == 0
                ? "hidden"
                : filterState.mobileFilterOpen == 2
                ? "hidden"
                : filterState.mobileFilterOpen == 1
                ? "block"
                : ""
            } backdrop-blur-sm w-[100vw] top-0 left-0 z-10 h-[100vh] fixed bg-[#0003]`}
          ></div>
          <div
            className={`${
              filterState.mobileFilterOpen == 0
                ? "hidden"
                : filterState.mobileFilterOpen == 1
                ? `${styles.DrowerAnimationIn} flex`
                : filterState.mobileFilterOpen == 2
                ? `${styles.DrowerAnimationOut} flex`
                : ""
            } w-[50vw] min-w-max font-IRYekan z-20 h-[100vh] bg-secondary-1 p-4 top-0 fixed flex-col  items-center`}
          >
            <div
              className="self-end text-h1"
              onClick={() => {
                dispatch(setMobileFilterOpen(2));
              }}
            >
              <GrFormClose></GrFormClose>
            </div>
            <div className="text-myWhite-1">محدوده قیمت (به تومان):</div>
            <div className="z-[4] w-full">
              <MyListBox
                data={[
                  { name: "همه" },
                  { name: "گران به ارزان" },
                  { name: "ارزان به گران" },
                ]}
                state={filterState.priceOrder}
                func={setPriceOrder}
              />
            </div>
            <div></div>
          </div>
        </>
      </div>
    </MainLayout>
  );
}

export default category;

export async function getStaticPaths() {
  const res = await axios.get("http://localhost:8000/store/category");
  const categories = await res.data;

  const categoriesRoute = await categories.map((category) => ({
    params: {
      category: `${category.slug}`,
    },
  }));
  return {
    paths: categoriesRoute,
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const response2 = await axios.get(`http://localhost:8000/store/category`);
  const categories = response2.data;
  const singleCategory = categories.filter(
    (item) => item.slug == params.category
  );

  const response = await axios.get(
    `http://localhost:8000/store/product/category/slug/${params.category}`
  );
  const Mainproducts = await response.data;
  let data = [...Mainproducts];

  for (const childrenCategories of singleCategory[0].children) {
    const response = await axios
      .get(
        `http://localhost:8000/store/product/category/slug/${childrenCategories.slug}`
      )
      .then((res) => res.data);
    response.forEach((item) => {
      data.push(item);
    });
  }
  const thisCategory = categories.filter(
    (item) => item.slug == params.category
  )[0];

  return {
    props: {
      data,
      childCategories: singleCategory[0].children,
      thisCategory,
    }, // will be passed to the page component as props
  };
}
