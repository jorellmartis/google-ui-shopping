import ResultsList from "@/components/ResultsList";
import { getFetchURl } from "@/lib/helpers/getFetchUrl";
import { PageResults, SearchParams } from "@/typings";
import { redirect } from "next/navigation";

type Props = {
    searchParams: SearchParams;
    params:{
        term: string;
    }
}

const SearchPage = async({searchParams , params: {term}}: Props) => {
    !term && redirect("/");

  const response = await fetch(getFetchURl('api/search'),{
    method : "POST",
    body: JSON.stringify({ searchTerm : term, ...searchParams })
  })
  const results = (await response.json()) as PageResults[];
  console.log(results);
  
  return (
    <ResultsList results = {results} term = {term} />
  )
}

export default SearchPage