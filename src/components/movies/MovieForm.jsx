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

const inputCls =
  "w-full rounded-xl bg-cinema-700 border borde-cinema-500 text-white text-sm px-4 py-2.5 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400/40 transition-all";
const labelCls = "block text-sm font-medium text-muted-400 mb-1.5";
const errorCls = "text-xs text-red-400 mt-1";

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
    <div className="space-y-5">
      {/* Title */}
      <div>
        <label className={labelCls}>Title</label>
        <input
          name="title"
          placeholder="e.g. Inception"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${inputCls} ${formik.touched.title && formik.errors.title ? "border-red-500/50" : ""}`}
        />
        {formik.touched.title && formik.errors.title && (
          <p className={errorCls}>{formik.errors.title}</p>
        )}
      </div>

      {/* Overview */}
      <div>
        <label className={labelCls}>Overview</label>
        <textarea
          name="overview"
          rows={4}
          placeholder="Brief description of the movie..."
          value={formik.values.overview}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${inputCls} resize-none ${formik.touched.overview && formik.errors.overview ? "border-red-500/50" : ""}`}
        />
        {formik.touched.overview && formik.errors.overview && (
          <p className={errorCls}>{formik.errors.overview}</p>
        )}
      </div>

      {/* Rating */}
      <div>
        <label className={labelCls}>Rating (0–10)</label>
        <input
          type="number"
          name="vote_average"
          min="0"
          max="10"
          step="0.1"
          placeholder="e.g. 8.5"
          value={formik.values.vote_average}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${inputCls} ${formik.touched.vote_average && formik.errors.vote_average ? "border-red-500/50" : ""}`}
        />
        {formik.touched.vote_average && formik.errors.vote_average && (
          <p className={errorCls}>{formik.errors.vote_average}</p>
        )}
      </div>

      {/* Genres */}
      <div>
        <label className={labelCls}>Genres</label>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => {
            const selected = (formik.values.genre_ids ?? []).includes(genre.id);
            return (
              <label
                key={genre.id}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm cursor-pointer transition-all duration-200 select-none ${
                  selected
                    ? "bg-accent-500/10 border-yellow-400/30 text-accent-400"
                    : "bg-cinema-700 borde-cinema-500 text-muted-400 hover:borde-cinema-400 hover:text-white"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={selected}
                  onChange={() => handleGenreChange(genre.id)}
                />
                {genre.name}
              </label>
            );
          })}
        </div>
        {formik.touched.genre_ids && formik.errors.genre_ids && (
          <p className={errorCls}>{formik.errors.genre_ids}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        onClick={formik.handleSubmit}
        className="w-full py-3 rounded-xl bg-accent-500 hover:bg-accent-400 text-black font-semibold text-sm transition-all duration-200 shadow-lg shadow-yellow-400/10 hover:shadow-yellow-400/20 active:scale-[0.98]"
      >
        Save Movie
      </button>
    </div>
  );
};

export { MovieForm };
