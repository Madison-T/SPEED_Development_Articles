import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/authContext"; // Import Auth context
import SortableTable from "../../components/table/SortableTable";
import axios from "axios";

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

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const ViewArticlesPage = ({ articles }: ArticlesProps) => {
  const { isLoggedIn, userType } = useAuth(); // Get login state and role
  const router = useRouter();

  // Allow only 'User' or 'Admin' roles
  useEffect(() => {
    if (!isLoggedIn || (userType !== "User" && userType !== "Admin")) {
      router.push("/access-denied"); // Redirect to Access Denied page
    }
  }, [isLoggedIn, userType]);

  return (
    <div className="container">
      <h1>Articles</h1>
      <SortableTable
        headers={[
          { key: "title", label: "Title" },
          { key: "authors", label: "Authors" },
          { key: "source", label: "Source" },
          { key: "pubYear", label: "Publication Year" },
          { key: "doi", label: "DOI" },
          { key: "claim", label: "Claim" },
          { key: "evidenceStrength", label: "Evidence Strength" },
          { key: "sePractice", label: "S.E. Practice" },
        ]}
        data={articles}
      />
    </div>
  );
};

// Fetch articles from the backend (Server-Side)
export const getServerSideProps = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles`);
    return { props: { articles: res.data } };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return { props: { articles: [] } };
  }
};

export default ViewArticlesPage;
