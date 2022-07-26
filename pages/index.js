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
        <div className=" md:grow-[10] bg-red-100 flex flex-col justify-center items-center ">
          <div className="w-full">
            <ShoppingCartGirl />
          </div>
          <div>bottom</div>
        </div>
      </div>
    </Main>
  );
}
