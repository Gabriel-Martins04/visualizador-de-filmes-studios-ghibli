import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";

function App() {
	return (
		<>
			<BrowserRouter basename="/visualizador-de-filmes-studios-ghibli">
				<Router />
			</BrowserRouter>
		</>
	);
}

export default App;
