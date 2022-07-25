import React from "react";
import { useSelector } from "react-redux";

function categorySummery(props) {
  const data = useSelector((state) => state.header.value);
  console.log(data);
  return <div>this is categorySummery file</div>;
}

export default categorySummery;
