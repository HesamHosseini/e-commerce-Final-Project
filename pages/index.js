import { Swiper, SwiperSlide } from "swiper/react";
import MySwiper from "../Components/MainScreen/MySwiper/MySwiper";
import SearchCard from "../Components/MainScreen/SearchCard";
import ShoppingCartGirl from "../Components/MainScreen/ShoppingCartGirl";
import StoreGirl from "../Components/MainScreen/StoreGirl";
import MainLayout from "../Layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12  md:col-span-3 ">
          <StoreGirl />
        </div>
        <div className="col-span-12 md:col-span-9 flex-center flex-col gap-4">
          <div className="grid grid-cols-12 w-full gap-4">
            <div className="col-span-4 ">
              <SearchCard />
            </div>
            <div className="col-span-8">
              <ShoppingCartGirl />
            </div>
          </div>
          <div className=" w-full rounded-3xl">
            <MySwiper />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
