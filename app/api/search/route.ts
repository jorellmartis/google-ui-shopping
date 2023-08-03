import { PageResults, SearchParams } from "@/typings";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {searchTerm, pages , ...params} =  await request.json();
    const searchParams : SearchParams = params;
    // const body = {
    // };
    if(!searchTerm){  
        return NextResponse.next(
            new Response("No Search Term", {
                status: 400,
            })
        );
    }

    const filters: any = [];
    Object.entries(searchParams).forEach(([key, value]) => {
        if(value) {
            // not applying filters if price is more than max
            if(key == "max_price"){
                if ((value = "500")) return;
            }
            filters.push({
                key, //key:key
                value: key === "sort_by" ? value : Number(value),
            });
        }
    });

    const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(process.env.OXYLABS_USERNAME + ":" + process.env.OXYLABS_PASSWORD).toString("base64")}`,
        },
        cache: "no-store",
        body: JSON.stringify({
            source: 'google_shopping_search',
            domain: 'com',
            query: searchTerm,
            pages: Number(pages) || 1,
            parse: true,
            context: filters
        }),
    });

    const data = await response.json();
    // if (!data || !Array.isArray(data.results) || data.results.length === 0) {
    //     return NextResponse.json({});
    // }
    const pageResults: PageResults[] = data.results;
    return NextResponse.json(pageResults);
}