"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { experimental_useFormStatus } from "react-dom"

const SearchButton = () => {
    const {pending} = experimental_useFormStatus();
  return (
    <button className="bg-blue-500 hover:bg-slate-500 rounded-full text-white p-4 disabled:opacity-50 transition ease-in duration-200">
        {pending && 'Search'}
        {!pending && <MagnifyingGlassIcon className="h-5 w-5"/>}
    </button>
  )
}

export default SearchButton