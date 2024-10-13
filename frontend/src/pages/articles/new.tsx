// src/pages/articles/new.tsx
import { FormEvent, useState } from "react";
import formStyles from "../../styles/Form.module.scss";
import axios from "axios";

const NewArticle = () => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [journal, setjournal] = useState("");
  const [pubYear, setPubYear] = useState<number>(0);
  const [doi, setDoi] = useState("");
  const [claim, setClaim] = useState("");
  const [evidenceStrength, setEvidenceStrength] = useState(""); // Changed to dropdown for evidence strength
  const [volume, setVolume] = useState("");
  const [pages, setPages] = useState("");
  const [sePractice, setSePractice] = useState(""); // Added SE Practice field

  const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newArticle = {
      title,
      authors,
      journal,
      pubYear,
      doi,
      claim,
      evidenceStrength, // Updated evidenceStrength field
      volume,
      pages,
      sePractice, // Include SE Practice field in the submission
    };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles`, newArticle);
      alert("Article submitted successfully");
    } catch (error) {
      console.error("Error submitting article:", error);
      alert("Failed to submit article");
    }
  };

  // Some helper methods for the authors array
  const addAuthor = () => {
    setAuthors(authors.concat([""]));
  };
  const removeAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };
  const changeAuthor = (index: number, value: string) => {
    setAuthors(
      authors.map((oldValue, i) => {
        return index === i ? value : oldValue;
      })
    );
  };

  return (
    <div className="container">
      <h1>New Article</h1>
      <form className={formStyles.form} onSubmit={submitNewArticle}>
        <label htmlFor="title">Title:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <label htmlFor="author">Authors:</label>
        {authors.map((author, index) => {
          return (
            <div key={`author_${index}`} className={formStyles.arrayItem}>
              <input
                type="text"
                name="author"
                value={author}
                onChange={(event) => changeAuthor(index, event.target.value)}
                className={formStyles.formItem}
              />
              <button
                onClick={() => removeAuthor(index)}
                className={formStyles.buttonItem}
                style={{ marginLeft: "3rem" }}
                type="button"
              >
                -
              </button>
            </div>
          );
        })}
        <button
          onClick={() => addAuthor()}
          className={formStyles.buttonItem}
          style={{ marginLeft: "auto" }}
          type="button"
        >
          +
        </button>

        <label htmlFor="journal">journal:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="journal"
          id="journal"
          value={journal}
          onChange={(event) => {
            setjournal(event.target.value);
          }}
        />

        <label htmlFor="pubYear">Publication Year:</label>
        <input
          className={formStyles.formItem}
          type="number"
          name="pubYear"
          id="pubYear"
          value={pubYear}
          onChange={(event) => {
            const val = event.target.value;
            setPubYear(val === "" ? 0 : parseInt(val));
          }}
        />

        <label htmlFor="volume">Volume:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="volume"
          id="volume"
          value={volume}
          onChange={(event) => {
            setVolume(event.target.value);
          }}
        />

        <label htmlFor="pages">Pages:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="pages"
          id="pages"
          value={pages}
          onChange={(event) => {
            setPages(event.target.value);
          }}
        />

        <label htmlFor="doi">DOI:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="doi"
          id="doi"
          value={doi}
          onChange={(event) => {
            setDoi(event.target.value);
          }}
        />

        <label htmlFor="claim">Claim:</label>
        <textarea
          className={formStyles.formTextArea}
          name="claim"
          value={claim}
          onChange={(event) => setClaim(event.target.value)}
        />

        <label htmlFor="evidenceStrength">Evidence Strength:</label>
        <select
          className={formStyles.formItem}
          value={evidenceStrength}
          onChange={(e) => setEvidenceStrength(e.target.value)}
        >
          <option value="">Select evidence strength</option>
          <option value="Strong">Strong</option>
          <option value="Moderate">Moderate</option>
          <option value="Weak">Weak</option>
        </select>

        <label htmlFor="sePractice">S.E. Practice:</label>
        <select
          className={formStyles.formItem}
          value={sePractice}
          onChange={(e) => setSePractice(e.target.value)}
        >
          <option value="">Select a practice</option>
          <option value="TDD">Test Driven Development (TDD)</option>
          <option value="Agile">Agile Development</option>
          <option value="CodeReview">Code Review</option>
          <option value="CI">Continuous Integration (CI)</option>
        </select>

        <button className={formStyles.formItem} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewArticle;
