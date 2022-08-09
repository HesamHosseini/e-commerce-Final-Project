import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Image from "next/image";
import Link from "next/link";
function CategorySummery({ categories }) {
  console.log(categories);
  return (
    <div className="w-full rounded-xl bg-slate-50 shadow-md">
      <Swiper
        className="w-full flex-center"
        modules={[]}
        spaceBetween={30}
        effect="fade"
      >
        {categories.map((category) => {
          return category.parent === null ? (
            <SwiperSlide className="bg-primary-1 cursor-pointer  rounded-[50%] !w-20 !h-20 md:!w-28 md:!h-28     font-IRYekan flex-center  hover:bg-primary-2 transition-all ">
              <Link href={`/categories/${category.slug}`}>
                <div className=" my-auto flex-center flex-col justify-evenly">
                  <Image src={category.image} width={24} height={24} />
                  <div className=" w-18 md:w-24  rtl text-center text-[9px] md:text-sm">
                    {category.name}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ) : null;
        })}
      </Swiper>
    </div>
  );
}

export default CategorySummery;
