// src/pages/search.tsx
import { useState, ChangeEvent } from "react";
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
  const [filteredArticles, setFilteredArticles] = useState<ArticlesInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [filters, setFilters] = useState({
    author: "",
    pubYear: "",
    doi: "",
    claim: "",
    evidenceStrength: "",
  });

  const [sortKey, setSortKey] = useState<keyof ArticlesInterface | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    let filtered = articles;

    if (filters.author) {
      filtered = filtered.filter(article =>
        article.authors.some(author => author.toLowerCase().includes(filters.author.toLowerCase()))
      );
    }
    if (filters.pubYear) {
      filtered = filtered.filter(article => article.pubYear === filters.pubYear);
    }
    if (filters.doi) {
      filtered = filtered.filter(article => article.doi.includes(filters.doi));
    }
    if (filters.claim) {
      filtered = filtered.filter(article =>
        article.claim.toLowerCase().includes(filters.claim.toLowerCase())
      );
    }
    if (filters.evidenceStrength) {
      filtered = filtered.filter(article => article.evidenceStrength === filters.evidenceStrength);
    }

    setFilteredArticles(filtered);
  };

  const handleSearch = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles?sePractice=${selectedPractice}`
      );
      setArticles(res.data);
      setFilteredArticles(res.data);

      if (res.data.length === 0) {
        setErrorMessage("No articles found.");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setErrorMessage("Failed to fetch articles.");
    }

    setLoading(false);
  };

  const handleSort = (key: keyof ArticlesInterface) => {
    const sorted = [...filteredArticles].sort((a, b) => {
      if (a[key] < b[key]) return sortOrder === "asc" ? -1 : 1;
      if (a[key] > b[key]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredArticles(sorted);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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

      {/* Filter Section */}
      {articles.length > 0 && (
        <div className="filters">
          <h2>Filter Results</h2>
          <input
            className={formStyles.formItem}
            type="text"
            name="author"
            placeholder="Filter by Author"
            value={filters.author}
            onChange={handleFilterChange}
          />
          <input
            className={formStyles.formItem}
            type="text"
            name="pubYear"
            placeholder="Filter by Publication Year"
            value={filters.pubYear}
            onChange={handleFilterChange}
          />
          <input
            className={formStyles.formItem}
            type="text"
            name="doi"
            placeholder="Filter by DOI"
            value={filters.doi}
            onChange={handleFilterChange}
          />
          <input
            className={formStyles.formItem}
            type="text"
            name="claim"
            placeholder="Filter by Claim"
            value={filters.claim}
            onChange={handleFilterChange}
          />
          <select
            className={formStyles.formItem}
            name="evidenceStrength"
            value={filters.evidenceStrength}
            onChange={handleFilterChange}
          >
            <option value="">Filter by Evidence Strength</option>
            <option value="Strong">Strong</option>
            <option value="Moderate">Moderate</option>
            <option value="Weak">Weak</option>
          </select>
          <button className={formStyles.formItem} onClick={applyFilters}>
            Apply Filters
          </button>
        </div>
      )}

      {/* Sorting Section */}
      {filteredArticles.length > 0 && (
        <div className="sorting">
          <h2>Sort Results</h2>
          <select
            className={formStyles.formItem}
            onChange={(e) => handleSort(e.target.value as keyof ArticlesInterface)}
          >
            <option value="">Sort by...</option>
            <option value="title">Title</option>
            <option value="pubYear">Publication Year</option>
            <option value="evidenceStrength">Evidence Strength</option>
          </select>
          <button className={formStyles.formItem} onClick={toggleSortOrder}>
            Toggle Order ({sortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
        </div>
      )}

      {/* Articles Table */}
      {filteredArticles.length > 0 && (
        <SortableTable headers={headers} data={filteredArticles} />
      )}
    </div>
  );
};

export default SearchPage;