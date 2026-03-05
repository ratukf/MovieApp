"use client";

import { useMovieStore } from "@/store/movieStore";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  overview: Yup.string().required("Overview is required"),
  vote_average: Yup.number()
    .required("Rating is required")
    .min(0, "Rating must be at least 0")
    .max(10, "Rating must be at most 10"),
});

const MovieForm = ({ initialValues, onSubmit }) => {
  const { genres } = useMovieStore();
  const formik = useFormik({
    initialValues: initialValues || {
      title: "",
      overview: "",
      vote_average: "",
      genre_ids: [],
    },
    validationSchema,
    onSubmit,
  });

  const handleGenreChange = (genreId) => {
    const current = formik.values.genre_ids ?? [];
    const updated = current.includes(genreId)
      ? current.filter((id) => id !== genreId)
      : [...current, genreId];
    formik.setFieldValue("genre_ids", updated);
  };

  return (
    <div>
      <div>
        <label>Title</label>
        <input
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title && (
          <p>{formik.errors.title}</p>
        )}
      </div>

      <div>
        <label>Overview</label>
        <textarea
          name="overview"
          value={formik.values.overview}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.overview && formik.errors.overview && (
          <p>{formik.errors.overview}</p>
        )}
      </div>

      <div>
        <label>Rating</label>
        <input
          type="number"
          name="vote_average"
          min="0"
          max="10"
          step="0.1"
          value={formik.values.vote_average}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.vote_average && formik.errors.vote_average && (
          <p>{formik.errors.vote_average}</p>
        )}
      </div>

      <div>
        <label>Genres</label>
        <div>
          {genres.map((genre) => (
            <label key={genre.id}>
              <input
                type="checkbox"
                checked={(formik.values.genre_ids ?? []).includes(genre.id)}
                onChange={() => handleGenreChange(genre.id)}
              />
              {genre.name}
            </label>
          ))}
        </div>
        {formik.touched.genre_ids && formik.errors.genre_ids && (
          <p>{formik.errors.genre_ids}</p>
        )}
      </div>

      <button type="submit" onClick={formik.handleSubmit}>
        Save
      </button>
    </div>
  );
};

export { MovieForm };
