import SearchCard from "../Components/MainScreen/SearchCard";
import ShoppingCartGirl from "../Components/MainScreen/ShoppingCartGirl";
import StoreGirl from "../Components/MainScreen/StoreGirl";
import Main from "../Layouts/MainLayout";

export default function Home() {
  return (
    <Main>
      <div className="flex flex-row my-4 items-center">
        <div className="md:grow-[2] flex justify-center items-center ">
          <div className="w-full">
            <StoreGirl />
          </div>
        </div>
        <div className=" md:grow-[10] bg-red-100 flex flex-col items-center ">
          <div className="w-full flex flex-row gap-4">
            <div className="grow-[1]">
              <SearchCard />
            </div>
            <div className="grow-[2]">
              <ShoppingCartGirl />
            </div>
          </div>
          <div>bottom</div>
        </div>
      </div>
    </Main>
  );
}
