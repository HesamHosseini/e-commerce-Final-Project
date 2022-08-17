import React from "react";
import MainLayout from "../../Layouts/MainLayout";

function Cart() {
    
  return (
    <MainLayout>
      <div className="w-full flex-center">
        <table>
          <tr>ردیف</tr>
          <tr>نام کالا</tr>
          <tr>قیمت هر عدد</tr>
          <tr>قیمت هر عدد با تخفیف</tr>
          <tr>قیمت کل با تخفیف</tr>
        </table>
      </div>
    </MainLayout>
  );
}

export default Cart;
