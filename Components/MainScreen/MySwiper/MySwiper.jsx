// import Swiper core and required modules
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

import banner1 from "../../../public/swiperPhoto/banner1.jpeg";
import banner2 from "../../../public/swiperPhoto/banner2.jpeg";
import banner3 from "../../../public/swiperPhoto/banner3.jpeg";
import banner4 from "../../../public/swiperPhoto/banner4.jpeg";
import Link from "next/link";

function MySwiper(data) {
  return (
    <div className="w-full ">
      <Swiper
        className="w-full rounded-3xl"
        modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <Link href="/categories">
            <div className="w-full text-center  cursor-pointer">
              <Image src={banner1} />
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full text-centerr ">
            <Image src={banner2} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full text-center ">
            <Image src={banner3} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full text-center">
            <Image src={banner4} />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default MySwiper;
