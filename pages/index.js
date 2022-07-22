import Head from "next/head";
import Image from "next/image";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import Test from "../Components/Header/Drower";

export default function Home() {
  return (
    <div>
      <Header />
      <Footer />
      <Test />
    </div>
  );
}
