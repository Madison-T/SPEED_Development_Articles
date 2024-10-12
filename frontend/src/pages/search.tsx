// src/pages/search.tsx
import { useState } from "react";
import axios from "axios";
import SortableTable from "../components/table/SortableTable";
import formStyles from "../styles/Form.module.scss";

interface ArticlesInterface {
  id: string;
  title: string;
  authors: string[];
  source: string;
  pubYear: string;
  doi: string;
  claim: string;
  volume: string;
  pages: string;
  evidenceStrength: string;
  sePractice: string;
}

const SearchPage = () => {
  const [selectedPractice, setSelectedPractice] = useState<string>("");
  const [articles, setArticles] = useState<ArticlesInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles?sePractice=${selectedPractice}`
      );
      setArticles(res.data);
      if (res.data.length === 0) {
        setErrorMessage("No articles found.");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setErrorMessage("Failed to fetch articles.");
    }

    setLoading(false);
  };

  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubYear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidenceStrength", label: "Evidence Strength" },
    { key: "sePractice", label: "S.E. Practice" },
  ];

  return (
    <div className="container">
      <h1>Search for Software Engineering Practices</h1>

      {/* SE Practices Dropdown */}
      <div className={formStyles.formItem}>
        <label htmlFor="sePractice">Select a Software Engineering Practice:</label>
        <select
          className={formStyles.formItem}
          value={selectedPractice}
          onChange={(e) => setSelectedPractice(e.target.value)}
        >
          <option value="">Select a practice</option>
          <option value="TDD">Test Driven Development (TDD)</option>
          <option value="Agile">Agile Development</option>
          <option value="CodeReview">Code Review</option>
          <option value="CI">Continuous Integration (CI)</option>
        </select>
      </div>

      <button
        className={formStyles.formItem}
        onClick={handleSearch}
        disabled={!selectedPractice}
      >
        Search
      </button>

      {/* Error or Loading State */}
      {loading && <p>Loading...</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* Articles Table */}
      {articles.length > 0 && <SortableTable headers={headers} data={articles} />}
    </div>
  );
};

export default SearchPage;
