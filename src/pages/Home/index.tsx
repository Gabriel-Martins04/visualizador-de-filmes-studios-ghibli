import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface Film {
	id: number;
	title: string;
	original_title: string;
	image: string;
	movie_banner: string;
	description: string;
	director: string;
	producer: string;
	release_date: number;
	running_time: number;
	rt_score: number;
	people: string[];
	species: string[];
	location: string[];
	vehicles: string[];
	url: string;
}

export const Home = () => {
	const [films, setFilms] = useState<Film[]>([]);

	useEffect(() => {
		const searchFilms = async (): Promise<void> => {
			try {
				const response = await fetch("https://ghibliapi.vercel.app/films/");
				const responseJson = await response.json();

				const tenFilms = responseJson
					.sort((a: Film, b: Film) => a.title.localeCompare(b.title))
					.slice(0, 10);

				setFilms(tenFilms);
			} catch (error) {
				console.log("Ocorreu um erro:", error);
			}
		};

		searchFilms();
	}, []);

	if (films.length === 0) {
		return <p className="text-5xl p-6">Loading...</p>;
	}

	return (
		<main>
			<p className="text-center text-2xl pt-5">
				Click on a movie to see more details
			</p>

			<section className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-6 p-6">
				{films.map((film: Film) => (
					<Link to={`/films/${film.id}`} key={film.id}>
						<h2 className="text-center pb-3 text-[19px]">{film.title}</h2>

						<img src={film.movie_banner} alt={film.title} />
					</Link>
				))}
			</section>
		</main>
	);
};
