import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/authContext"; // Import Auth context
import formStyles from "../../styles/Form.module.scss";
import axios from "axios";

const SubmitNewPage = () => {
  const { isLoggedIn, userType } = useAuth(); // Get login state and role
  const router = useRouter();

  // Access control: Only allow 'User' or 'Admin' roles
  useEffect(() => {
    if (!isLoggedIn || (userType !== "User" && userType !== "Admin")) {
      router.push("/access-denied"); // Redirect to Access Denied
    }
  }, [isLoggedIn, userType]);

  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([""]);
  const [source, setSource] = useState("");
  const [pubYear, setPubYear] = useState<number | "">("");
  const [doi, setDoi] = useState("");
  const [claim, setClaim] = useState("");
  const [evidenceStrength, setEvidenceStrength] = useState("");
  const [sePractice, setSePractice] = useState("");
  const [volume, setVolume] = useState("");
  const [pages, setPages] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newArticle = {
      title,
      authors,
      source,
      pubYear: Number(pubYear),
      doi,
      claim,
      evidenceStrength,
      sePractice,
      volume,
      pages,
    };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles`, newArticle);
      alert("Article submitted successfully");
      router.push("/articles"); // Redirect to articles page after submission
    } catch (error) {
      console.error("Error submitting article:", error);
      alert("Failed to submit article");
    }
  };

  const addAuthor = () => setAuthors([...authors, ""]);
  const removeAuthor = (index: number) => setAuthors(authors.filter((_, i) => i !== index));
  const updateAuthor = (index: number, value: string) =>
    setAuthors(authors.map((author, i) => (i === index ? value : author)));

  return (
    <div className="container">
      <h1>Submit New Article</h1>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={formStyles.formItem}
          required
        />

        <label>Authors:</label>
        {authors.map((author, index) => (
          <div key={index} className={formStyles.arrayItem}>
            <input
              type="text"
              value={author}
              onChange={(e) => updateAuthor(index, e.target.value)}
              className={formStyles.formItem}
              required
            />
            <button
              type="button"
              onClick={() => removeAuthor(index)}
              className={formStyles.buttonItem}
            >
              -
            </button>
          </div>
        ))}
        <button type="button" onClick={addAuthor} className={formStyles.buttonItem}>
          +
        </button>

        <label htmlFor="source">Source:</label>
        <input
          type="text"
          id="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className={formStyles.formItem}
          required
        />

        <label htmlFor="pubYear">Publication Year:</label>
        <input
          type="number"
          id="pubYear"
          value={pubYear}
          onChange={(e) => setPubYear(e.target.value ? parseInt(e.target.value) : "")}
          className={formStyles.formItem}
          min="1900"
          max={new Date().getFullYear()}
          required
        />

        <label htmlFor="volume">Volume:</label>
        <input
          type="text"
          id="volume"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className={formStyles.formItem}
        />

        <label htmlFor="pages">Pages:</label>
        <input
          type="text"
          id="pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          className={formStyles.formItem}
        />

        <label htmlFor="doi">DOI:</label>
        <input
          type="text"
          id="doi"
          value={doi}
          onChange={(e) => setDoi(e.target.value)}
          className={formStyles.formItem}
          required
        />

        <label htmlFor="claim">Claim:</label>
        <textarea
          id="claim"
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          className={formStyles.formItem}
          required
        />

        <label htmlFor="evidenceStrength">Evidence Strength:</label>
        <select
          id="evidenceStrength"
          value={evidenceStrength}
          onChange={(e) => setEvidenceStrength(e.target.value)}
          className={formStyles.formItem}
          required
        >
          <option value="">Select evidence strength</option>
          <option value="Strong">Strong</option>
          <option value="Moderate">Moderate</option>
          <option value="Weak">Weak</option>
        </select>

        <label htmlFor="sePractice">S.E. Practice:</label>
        <select
          id="sePractice"
          value={sePractice}
          onChange={(e) => setSePractice(e.target.value)}
          className={formStyles.formItem}
          required
        >
          <option value="">Select a practice</option>
          <option value="TDD">Test Driven Development (TDD)</option>
          <option value="Agile">Agile Development</option>
          <option value="CodeReview">Code Review</option>
          <option value="CI">Continuous Integration (CI)</option>
        </select>

        <button type="submit" className={formStyles.formItem}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitNewPage;
