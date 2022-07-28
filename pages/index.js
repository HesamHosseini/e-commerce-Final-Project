import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import CategorySummery from "../Components/MainScreen/CategorySummery";
import MySwiper from "../Components/MainScreen/MySwiper/MySwiper";
import SearchCard from "../Components/MainScreen/SearchCard";
import ShoppingCartGirl from "../Components/MainScreen/ShoppingCartGirl";
import StoreGirl from "../Components/MainScreen/StoreGirl";
import MainLayout from "../Layouts/MainLayout";

export default function Home({ data }) {
  console.log(data[0].image);
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
          <CategorySummery categories={data} />
        </div>
        <div></div>
      </div>
    </MainLayout>
  );
}
export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:8000/store/category");
  const data = await res.json();
  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}
