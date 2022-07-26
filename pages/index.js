import Head from "next/head";
import Image from "next/image";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import Test from "../Components/Header/DrowerMenu";
import Main from "../Layouts/Main";
import { useRouter } from "next/router";
import ShoppingCartGirl from "../Components/MainScreen/ShoppingCartGirl";

export default function Home() {
  return (
    <Main>
      <ShoppingCartGirl />
    </Main>
  );
}
