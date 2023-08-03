"use client"

import Image from "next/image"
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid"
import SearchButton from "@/components/UIKit/Buttons/SearchButton"
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { Select, SelectItem } from "@tremor/react";
import Avatar from "react-avatar";
import {useState} from "react"
import { useRouter } from "next/navigation";

const SORT_BY_MAP = {
    r: "Default",
    rv: "By Review",
    p: "By price (low to high)",
    pd: "By price (high to low)"
};

const Header = () => {
    //use states
    const [pages, setPages] = useState("")
    const [sort, setSort] = useState("r")
    const [min, setMin] = useState("")
    const [max, setMax] = useState("")
    //
    const router = useRouter();
    
  return (
    <header>
        <nav className="md:flex md:justify-between md:items-center md:p-5">
            <Image
                src="/Google-Logo.png"
                alt="Logo"
                width={200}
                height={200}
                className="object-contain mr-10"
            />
            <div className="w-full">
                <form action={(e) => {
                    const params = new URLSearchParams();
                    const searchTerm = e.get("searchTerm");
                    if (!e.get("searchTerm")) return;
                    if(pages) params.set("pages", pages.toString())
                    if(sort) params.set("sort_by", sort.toString())
                    if(min) params.set("min_price", min.toString())
                    if(max) params.set("max_price", max.toString())
                    router.push(`/search/${searchTerm}?${params.toString()}`)
                }}>
                    <div className="flex items-center gap-2 w-full px-4">
                        <div className="w-full flex space-x-2 items-center bg-white shadow-xl rounded-full border-0 px-6 py-4 md:max-w-5xl">
                            <MagnifyingGlassIcon className = "h-5 w-5 text-gray-400"/>
                            <input 
                                className="outline-none flex-1" 
                                type="text" 
                                name="searchTerm" 
                                placeholder="Search..." />
                        </div>
                        <SearchButton/>
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-4 max-w-md md:grid-cols-4 md:max-w-3xl">
                        <SearchSelect 
                        placeholder="No.of Pages"
                        onValueChange={(value) => setPages(value)}>
                            
                            {[...Array(100)].map((_, i) => (
                                <SearchSelectItem  key={i} value={(i+1).toString()}>
                                    {(i+1).toString()} pages
                                </SearchSelectItem>
                            ))}
                        </SearchSelect>

                        <Select className="min-w-4" placeholder="Sort by" onValueChange={(value) => setSort(value)}>
                            {Object.entries(SORT_BY_MAP).map(([key , value]) => (
                                <SelectItem key={key} value={key}>
                                    {value}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select className="min-w-4" placeholder="Min Price..." onValueChange={(value) => setMin(value)}>
                            {["","100", "250", "500"].map((_ , i) => (
                                <SelectItem key={i} value={_.toString()}>
                                    {i===0 ? "No Minimum" : `$${_.toString()}`}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select className="min-w-4" placeholder="Max Price..." onValueChange={(value) => setMax(value)}>
                            {["","100", "250", "500"].map((_ , i) => (
                                <SelectItem key={i} value={_.toString()}>
                                    {i===0 ? "No Maximum" : `$${_.toString()}`}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </form>
            </div>
            <div>
                <Avatar name="Jorell Martis" round size="50" />
            </div>
        </nav>
    </header>
  )
}

export default Header