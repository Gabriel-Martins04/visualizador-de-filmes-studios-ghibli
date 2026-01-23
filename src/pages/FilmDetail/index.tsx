import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Film } from "../Home";

export const FilmDetail = () => {
	const { id } = useParams<{ id: string }>();
	const [film, setFilm] = useState<Film>();

	useEffect(() => {
		const searchFilm = async (): Promise<void> => {
			try {
				const response = await fetch(
					`https://ghibliapi.vercel.app/films/${id}`,
				);
				const responseJson = await response.json();

				setFilm(responseJson);
			} catch (error) {
				console.log("Ocorreu um erro:", error);
			}
		};

		searchFilm();
	}, []);

	if (!film) {
		return <p className="text-5xl p-6">Loading...</p>;
	}

	return (
		<main className="flex flex-col gap-6 items-center text-3xl p-6">
			<h1>{film.title}</h1>

			<p>Director: {film.director}</p>
			<p>Producer: {film.producer}</p>
			<p>Release date: {film.release_date}</p>
			<p>Rotten Tomatoes's score: {film.rt_score}</p>
			<p>Description: {film.description}</p>
		</main>
	);
};
