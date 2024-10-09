import { FormEvent, useState } from "react";
import formStyles from "../../styles/Form.module.scss";

const NewArticle = () => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [pubYear, setPubYear] = useState<number>(0);
  const [doi, setDoi] = useState("");
  const [claim, setClaim] = useState("");
  const [evidence, setEvidence] = useState("");
  const [volume, setVolume] = useState("");   // Added volume
  const [pages, setPages] = useState("");     // Added pages

  const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(
      JSON.stringify({
        title,
        authors,
        source,
        publication_year: pubYear,
        doi,
        claim,
        evidence,
        volume,  // Added volume
        pages,   // Added pages
      })
    );
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

  // Return the full form
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
            <div key={`author ${index}`} className={formStyles.arrayItem}>
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

        <label htmlFor="source">Source:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="source"
          id="source"
          value={source}
          onChange={(event) => {
            setSource(event.target.value);
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
            if (val === "") {
              setPubYear(0);
            } else {
              setPubYear(parseInt(val));
            }
          }}
        />

        <label htmlFor="volume">Volume:</label> {/* Added volume field */}
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

        <label htmlFor="pages">Pages:</label> {/* Added pages field */}
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

        <label htmlFor="claim">Claim:</label> {/* Added claim */}
        <textarea
          className={formStyles.formTextArea}
          name="claim"
          value={claim}
          onChange={(event) => setClaim(event.target.value)}
        />

        <label htmlFor="evidence">Evidence:</label> {/* Added evidence */}
        <textarea
          className={formStyles.formTextArea}
          name="evidence"
          value={evidence}
          onChange={(event) => setEvidence(event.target.value)}
        />

        <button className={formStyles.formItem} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewArticle;
