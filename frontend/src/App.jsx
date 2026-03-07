import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";

const HomePage = () => <Home />;
const GamePage = () => <Game />;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:level" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
