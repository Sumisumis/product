import { useNavigate } from "react-router-dom";
import { FiSearch, FiArrowRight } from "react-icons/fi";

type Props = { initialQuery?: string };

export default function SearchForm({ initialQuery = "" }: Props) {
  const navigate = useNavigate();
  return (
    <form className="search-form" role="search" onSubmit={(event) => {
      event.preventDefault();
      const query = String(new FormData(event.currentTarget).get("keyword") ?? "").trim();
      navigate(`/search-result?keyword=${encodeURIComponent(query)}`);
    }}>
      <FiSearch size={21} aria-hidden="true" />
      <input name="keyword" type="search" defaultValue={initialQuery}
        aria-label="スイーツ名・お店名で検索" placeholder="スイーツ名・お店名で検索" />
      <button type="submit" aria-label="検索する"><FiArrowRight size={21} /></button>
    </form>
  );
}
