import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import CategorySummery from "../Components/MainScreen/CategorySummery";
import MySwiper from "../Components/MainScreen/MySwiper/MySwiper";
import SearchCard from "../Components/MainScreen/SearchCard";
import ShoppingCartGirl from "../Components/MainScreen/ShoppingCartGirl";
import StoreGirl from "../Components/MainScreen/StoreGirl";
import ProductCard from "../Components/ProductCard/ProductCard";
import MainLayout from "../Layouts/MainLayout";
export default function Home({ categories, products }) {
  return (
    <MainLayout>
      <Head>
        <title>Hesam Kala</title>
        <link rel="shortcut icon" href="/logo2.jpeg" />
      </Head>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12  md:col-span-3 ">
          <StoreGirl />
        </div>
        <div className="col-span-12 md:col-span-9 flex-center flex-col gap-4">
          <div className="grid grid-cols-12 w-full gap-4">
            <div className="col-span-4 ">
              <SearchCard />
            </div>
            <div className="col-span-8  h-full flex-center ">
              <ShoppingCartGirl />
            </div>
          </div>
          <div className=" w-full rounded-3xl">
            <MySwiper />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 my-4">
        <div></div>
        <div className="col-span-10  flex-center ">
          <CategorySummery categories={categories} />
        </div>
        <div></div>
      </div>
      <div className="w-full bg-secondary-1 text-myWhite-1 p-5 ">
        <h1 className="rtl font-IRYekan">دسته بندی دیجیتال</h1>
        <div className="w-full  grid grid-cols-12 md:px-24 py-3 lg:gap-20 gap-4 justify-end">
          {products.map((product) => {
            return product.category === 1 ? (
              <div
                key={product.id}
                className="col-span-12 md:col-span-6 lg:col-span-4 "
              >
                <ProductCard data={product} />
              </div>
            ) : null;
          })}
        </div>
      </div>
    </MainLayout>
  );
}
export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:8000/store/category");
  const categories = await res.json();

  const productsPromis = await axios.get(
    "http://localhost:8000/store/product",
    {
      headers: {
        Authorization: "Token daa15a1f35ec2dcdaa608ca1380a173e4d39e410",
      },
    }
  );
  const products = await productsPromis.data;
  return {
    props: {
      categories,
      products,
    },
  };
}
