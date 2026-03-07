import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "../features/user/components/SignIn.jsx";
import LogIn from "../features/user/components/LogIn.jsx";
import Modal from "../components/Modal.jsx";
import useAllGames from "../features/game/hooks/useAllGames.js";
import CardLevel from "../features/game/component/CardLevel.jsx";
import useCurrentUser from "../features/user/hooks/useCurrentUser.js";
import useLogout from "../features/user/hooks/LogOut.js";

function HomePage() {
  const { data: currentUser, isLoading, isError } = useCurrentUser();
  const logOutMutation = useLogout();
  const { data: allGames } = useAllGames();
  const [authMode, setAuthMode] = useState("login");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const navigate = useNavigate();
  const handleLevelSelect = (level) => {
    setSelectedLevel(() => level);
    navigate(`/game/${level}`);
  };

  if (!currentUser && !isLoading && !isError) {
    return (
      <Modal isOpen={true} onClose={() => setIsAuthOpen(false)}>
        <Modal.Content>
          {authMode === "login" ? (
            <LogIn
              onCloseModal={() => setIsAuthOpen(false)}
              onSwitchToSignUp={() => setAuthMode("signup")}
            />
          ) : (
            <SignIn
              onCloseModal={() => setIsAuthOpen(false)}
              onSwitchToLogin={() => setAuthMode("login")}
            />
          )}
        </Modal.Content>
      </Modal>
    );
  }
  const handleLogout = () => {
    logOutMutation.mutate();
  };

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between p-2">
        {" "}
        <h1 className="">Select a level</h1>
        {currentUser && (
          <button
            className="bg-red-500 text-white p-1 rounded"
            onClick={handleLogout}
          >
            Log Out
          </button>
        )}
      </div>
      <div className="flex flex-wrap justify-between  gap-4">
        {allGames &&
          allGames.games.map((levelData) => (
            <CardLevel
              key={levelData.level}
              levelData={levelData}
              onClick={() => handleLevelSelect(levelData.level)}
            />
          ))}
      </div>
    </main>
  );
}

export default HomePage;
