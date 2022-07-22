import { useRouter } from "next/router";
import React from "react";

function singleProduct(props) {
  const router = useRouter();

  return <div>product Id : {router.query.singleProduct}</div>;
}

export default singleProduct;
