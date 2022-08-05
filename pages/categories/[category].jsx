import { Menu } from "@headlessui/react";
import axios from "axios";
import React from "react";

import MyListBox from "../../Components/MyListBox/MyListBox";
import MainLayout from "../../Layouts/MainLayout";
import { setCookie } from "cookies-next";
import CustumDiscosure from "../../Components/CustumDiscosure/CustumDiscosure";
import ToggleSwitch from "../../Components/ToggleSwitch/ToggleSwitch";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GrFormClose } from "react-icons/gr";
import { BiSearchAlt } from "react-icons/bi";
import { MdPhonelink } from "react-icons/md";
import { setMobileFilterOpen } from "../../redux/slices/CategoryFilterSlice";
import ProductCard from "../../Components/ProductCard/ProductCard";
import styles from "./category.module.css";
const listBoxItems = [
  { name: "asghar" },
  { name: "mamad" },
  { name: "hamed" },
  { name: "ali" },
  { name: "Gholi" },
  { name: "Hossein" },
];

function category({ data, params, singleCategory, shit }) {
  const dispatch = useDispatch();

  const filterState = useSelector((state) => state.categoryFilter.value);
  console.log(filterState);
  const a = Date.now() + 10000;
  const date = new Date(a);

  setCookie("mamad ", "token", { expires: date });

  return (
    <MainLayout>
      <div className=" z-[3]  flex-center flex-row w-full gap-3 md:gap-32 p-4 border-b-2 border-gray-100">
        <div>
          <MyListBox data={listBoxItems} hoverColor="bg-primary-1" />
        </div>
        <div>
          <MyListBox data={listBoxItems} />
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
      <div className="grid grid-cols-12 rtl">
        <div className="hidden md:flex md:col-span-3 bg-secondary-1 min-h-[50vh]  gap-4 items-center flex-col p-4">
          <div className="priceFilter flex-center flex-col gap-4 rtl font-IRYekan">
            <div className="text-myWhite-1">محدوده قیمت (به تومان):</div>
            <input
              type="number"
              placeholder="از "
              className="px-4 text-myBlack-1  
              rounded-2xl
              font-IRYekan text-[10px] md:text-p16 focus-visible:border-primary-1 focus-visible:border-2 focus-visible: outline-none shadow-none"
            />
            <input
              type="number"
              placeholder="تا"
              className="px-4 text-myBlack-1  
              rounded-2xl
              font-IRYekan text-[10px] md:text-p16 focus-visible:border-primary-1 focus-visible:border-2 focus-visible: outline-none shadow-none"
            />
            <div></div>
          </div>
          <div className="rtl flex-center flex-row font-IRYekan gap-3">
            <div className="text-myWhite-1">نمایش کالا های موجود </div>
            <div className="ltr">
              <ToggleSwitch />
            </div>
          </div>

          {/* <label htmlFor="avalibility">نمایش کالا های موجود </label>
            <input id="avalibility" type="checkbox" /> */}
        </div>
        <div className="col-span-12 md:col-span-9 grid grid-cols-12  bg-red-400">
          {data.map((item) => (
            <div className="col-span-3 gap-4">
              <ProductCard data={item} />
            </div>
          ))}
        </div>
      </div>

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
            } w-[50vw] min-w-max font-IRYekan z-20 h-[100vh] bg-myWhite-1 p-4 top-0 fixed flex-col  items-center`}
          >
            <div
              className="self-end text-h1"
              onClick={() => {
                dispatch(setMobileFilterOpen(2));
              }}
            >
              <GrFormClose></GrFormClose>
            </div>
            <div id="menuItems">
              <div className="flex-center  ">
                <i className="text-h4">
                  <BiSearchAlt />
                </i>

                <input
                  className="px-12 py-3 rtl text-[12px] rounded-md focus-visible:border-primary-1 focus-visible:border-2 focus-visible: outline-none shadow-none"
                  placeholder="دنبال چی میگردی"
                />
              </div>
              <div className="rtl">
                <CustumDiscosure
                  // route={"/categories"}
                  items={[
                    { name: "کالای دیجیتال", icon: <MdPhonelink /> },
                    {
                      name: "خودرو، ابزار و تجهیزات صنعتی",
                      icon: <MdPhonelink />,
                    },
                    { name: "مد و پوشاک", icon: <MdPhonelink /> },
                    ,
                    ,
                  ]}
                />
              </div>
            </div>
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

  // let daataa = [];

  // await singleCategory[0].children.map((element) => {
  //   daataa.push(
  //     fetch(`http://localhost:8000/store/product/category/slug/${element.slug}`)
  //   );
  // });
  // let results = await Promise.all(daataa);
  // const shit =  results.map(async (item) => await item.json());

  // const mamad = await fetch(
  //   `http://localhost:8000/store/product/category/slug/digital-and-electronic`
  // );
  // const shit = await mamad.json();
  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}
