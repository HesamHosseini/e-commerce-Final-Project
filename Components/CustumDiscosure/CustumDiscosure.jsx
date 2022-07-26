import { Disclosure, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineExpandMore } from "react-icons/md";

function CustumDiscosure({ items, Children, route }) {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl ">
      <Disclosure as="div" className="">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between text-myWhite-1 rounded-lg bg-secondary-2 px-4 py-2 text-left text-sm font-medium  hover:bg-secondary-1 focus:outline-none focus-visible:ring focus-visible:ring-secondary-2 focus-visible:ring-opacity-75">
              <span>دسته بندی ها</span>
              <MdOutlineExpandMore
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-myWhite-1`}
              />
            </Disclosure.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              {items.map((item) => (
                <Link
                  key={item.name}
                  href={`${route}/${item.name}`}
                  className="hover:"
                >
                  <Disclosure.Panel className="my-5 cursor-pointer hover:bg-blue-100 border flex justify-between px-5 py-2 text-secondary-1 items-center text-sm  border-secondary-2 rounded-2xl text-gray-500">
                    <div> {item.name}</div>
                    <div>{item.icon} </div>
                  </Disclosure.Panel>
                </Link>
              ))}
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export default CustumDiscosure;
