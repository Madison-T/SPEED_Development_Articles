// src/components/SubmissionForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function SubmissionForm() {
  const { register, handleSubmit, reset } = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles`, data);
      alert("Article submitted successfully!");
      reset(); // Clear the form after successful submission
    } catch (error) {
      console.error("Error submitting article:", error);
      alert("Failed to submit article");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Title Field */}
      <input {...register("title")} placeholder="Title" />
      <p>
        {/* Authors Field */}
        <input {...register("authors")} placeholder="Authors (comma separated)" />
      </p>
      <p>
        {/* journal Field */}
        <input {...register("journal")} placeholder="journal" />
      </p>
      <p>
        {/* Publication Year Field */}
        <input {...register("pubYear")} placeholder="Publication Year" type="number" />
      </p>
      <p>
        {/* Volume Field */}
        <input {...register("volume")} placeholder="Volume" />
      </p>
      <p>
        {/* Pages Field */}
        <input {...register("pages")} placeholder="Pages" />
      </p>
      <p>
        {/* DOI Field */}
        <input {...register("doi")} placeholder="DOI" />
      </p>
      <p>
        {/* Claim Field */}
        <textarea {...register("claim")} placeholder="Claim" />
      </p>
      <p>
        {/* evidenceStrength Field */}
        {/* SE Practice Dropdown */}
        <label htmlFor="evidenceStrength">Evidence Strength</label>
        <select {...register("evidenceStrength")}>
          <option value="">Select Evidence Strength</option>
          <option value="Strong">Strong</option>
          <option value="Moderate">Moderate</option>
          <option value="Weak">Weak</option>
        </select>
      </p>
      <p>
        {/* SE Practice Dropdown */}
        <label htmlFor="sePractice">S.E. Practice</label>
        <select {...register("sePractice")}>
          <option value="">Select a practice</option>
          <option value="TDD">Test Driven Development (TDD)</option>
          <option value="Agile">Agile Development</option>
          <option value="CodeReview">Code Review</option>
          <option value="CI">Continuous Integration (CI)</option>
        </select>
      </p>

      <input type="submit" value="Submit" />
    </form>
  );
}

