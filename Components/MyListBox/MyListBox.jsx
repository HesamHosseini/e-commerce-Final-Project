import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BiCheck } from "react-icons/bi";
import { MdOutlineUnfoldMore } from "react-icons/md";
import { useDispatch } from "react-redux";

export default function MyListBox({ data, func, state }) {
  const dispatch = useDispatch();

  return (
    <Listbox
      value={state}
      onChange={(e) => dispatch(func(e.name))}
      className="w-full"
    >
      <div className="relative mt-1 w-full">
        <Listbox.Button className="font-IRYekan relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
          <span className="block truncate">{state}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <MdOutlineUnfoldMore
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="z-[2] absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {data.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `font-IRYekan relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-secondary-2 text-myWhite-1" : "text-gray-900"
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {person.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <BiCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
