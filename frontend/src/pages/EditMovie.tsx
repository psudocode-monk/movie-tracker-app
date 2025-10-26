import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

export default function EditMovie() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>() // now using movie ID param
  const [movie, setMovie] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)

  // Fetch movie details by ID
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/get-movie/${id}`,
          { withCredentials: true }
        )
        setMovie(res.data)
      } catch (err: any) {
        console.error("Cannot fetch movie:", err)
        if (err.response?.status === 404)
          setError("Movie not found or deleted.")
        else setError("Failed to fetch movie details.")
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchMovie()
  }, [id])

  // Update movie
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!movie) return

    try {
      setUpdating(true)
      await axios.put(
        `http://localhost:8000/api/update-movie/${movie._id}`,
        movie,
        { withCredentials: true }
      )
      navigate("/show-movies")
    } catch (err: any) {
      console.error("Update failed:", err)
      setError("Failed to update movie. Try again.")
    } finally {
      setUpdating(false)
    }
  }

  // Controlled input change
  const handleChange = (field: string, value: string | number) => {
    setMovie((prev: any) => ({ ...prev, [field]: value }))
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Loading movie data...
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center p-6">
        <p className="text-red-500 text-lg mb-6">{error}</p>
        <button
          onClick={() => navigate("/show-movies")}
          className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all"
        >
          Back to Movies
        </button>
      </div>
    )

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-xl bg-black/60 backdrop-blur-md border border-emerald-400 rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl font-bold text-center text-emerald-400 mb-8">
          Edit Movie
        </h1>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          {[
            ["title", "Title"],
            ["director", "Director"],
            ["budget", "Budget"],
            ["location", "Location"],
            ["duration", "Duration"],
            ["yearOrTime", "Year / Time"],
            ["genre", "Genre"],
            ["rating", "Rating (0-10)"],
          ].map(([key, label]) => (
            <input
              key={key}
              type={key === "budget" || key === "rating" ? "number" : "text"}
              placeholder={label}
              className="px-4 py-3 rounded bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              value={movie?.[key] ?? ""}
              onChange={(e) =>
                handleChange(
                  key,
                  key === "budget" || key === "rating"
                    ? Number(e.target.value)
                    : e.target.value
                )
              }
              required={key !== "description"}
            />
          ))}

          <textarea
            placeholder="Description"
            className="px-4 py-3 rounded bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
            rows={4}
            value={movie?.description ?? ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-emerald-400 text-black font-semibold rounded-lg hover:bg-emerald-300 transition"
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Movie"}
          </button>
        </form>

        <button
          onClick={() => navigate("/show-movies")}
          className="mt-6 w-full py-2 border border-emerald-400 text-emerald-400 rounded-lg hover:bg-emerald-400 hover:text-black transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
