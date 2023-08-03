import { PageResults } from "@/typings"
import Link from "next/link";

type Props = {
    results : PageResults[];
    term: string;
}
const ResultsList = ({results , term}: Props) => {
  return (
    <div className="flex md: px-5">
        <div>
            {results.map((pageResults) => (
                <div key={pageResults?.job_id}>
                    {pageResults?.content?.results?.filters?.map((filter, i)=>(
                        <div key={i} className="border rounded-r-lg md: rounded-lg p-5">
                            <p className="font-bold">{filter?.name}</p>
                            <div className="flex flex-col mb-2">
                                {filter?.values.map((value , _) =>(
                                    <Link 
                                    prefetch={false}
                                    key={_} 
                                    href={`https://www.google.com${value.url}`} >
                                        {value.value}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {results.map((pageResult, i) => (
                <div key={pageResult?.job_id}>
                    {i!==0 && <hr className="w-full col-span-full"/>}
                    <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 py-5">
                        <div className="flex space-x-2 items-center divide-x-2">
                            <h1>Shop On Google</h1>
                            <h2 className="text-xl font-semibold pl-2">
                                Search Results for Page {i+1}
                            </h2>
                            
                        </div>
                    <h3 className="font-extralight">
                        Showing Results for "{decodeURIComponent(term)}"
                    </h3>
                    </div>
                    {pageResult?.content?.results?.organic?.map((item) =>(
                        <Link href={item?.url?.includes("url?url=") ? 
                        // if url is external we split only the ext url
                        item?.url?.split("url?url=")?.[1] : 
                        item?.url?.split("?")?.[0] //getting google shopping id
                        }
                        className={`border rounded-2xl flex flex-col  md:rounded-lg md:hover:shadow-lg transition duration-200 ease-linear p-4 ${item?.url?.includes("url?url=") && "italic"}
                        `}
                        key={item?.pos} 
                        prefetch={false}
                        >
                            <div className="border-b flex-1">
                                <p>{item?.title}</p>
                            </div>
                            <div>
                                <p>{item?.price_str} {item?.currency}</p>
                                <p>{item?.merchant?.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    </div>

  )
}

export default ResultsList