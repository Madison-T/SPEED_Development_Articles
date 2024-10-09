import React from "react";
import { useForm } from "react-hook-form";

export default function SubmissionForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(JSON.stringify(data));
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
        {/* Source Field */}
        <input {...register("source")} placeholder="Source" />
      </p>
      <p>
        {/* Publication Year Field */}
        <input {...register("pubyear")} placeholder="Publication Year" type="number" />
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
        {/* Evidence Field */}
        <textarea {...register("evidence")} placeholder="Evidence" />
      </p>
      <input type="submit" />
    </form>
  );
}
