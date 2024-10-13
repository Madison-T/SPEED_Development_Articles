// src/pages/articles/index.tsx
import { GetServerSideProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import axios from "axios";

interface ArticlesInterface {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  pubYear: string;
  doi: string;
  claim: string;
  volume: string;
  pages: string;
  evidenceStrength: string;
  sePractice: string; // Added SE Practice field
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "journal", label: "journal" },
    { key: "pubYear", label: "Publication Year" },
    { key: "volume", label: "Volume" },
    { key: "pages", label: "Pages" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidenceStrength", label: "Evidence Strength" },
    { key: "sePractice", label: "S.E. Practice" }, // Added S.E. Practice column
  ];

  return (
    <div className="container">
      <h1>Articles Index Page</h1>
      <p>Page containing a table of articles:</p>
      <SortableTable headers={headers} data={articles} />
    </div>
  );
};

// Fetch articles from the backend (Server-Side)
export const getServerSideProps: GetServerSideProps<ArticlesProps> = async () => {
  try {
    // Log the backend URL for debugging
    console.log('Backend URL:', process.env.NEXT_PUBLIC_BACKEND_URL);
    
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles`);
    const articles = res.data;

    return {
      props: {
        articles,
      },
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      props: {
        articles: [],
      },
    };
  }
};

export default Articles;