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
			<h1 className="font-bold">{film.title}</h1>

			<p>
				<span>Director:</span> {film.director}
			</p>
			<p>
				<span>Producer:</span> {film.producer}
			</p>
			<p>
				<span>Release date:</span> {film.release_date}
			</p>
			<p>
				<span>Rotten Tomatoes's score:</span> {film.rt_score}
			</p>
			<p className="font-bold">Description:</p>
			<p className="max-w-[75%]">{film.description}</p>
		</main>
	);
};
