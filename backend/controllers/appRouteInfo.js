const v1 = {
  authentication: {
    "sign up new user": "api/user/signup",
    login: "api/user/login",
    logout: "api/user/logout",
  },
  "user operation": {
    "get all users": "api/users",
    "remove single user by id": "api/users/:id",
    "remove single user by email": "api/users/deleteByEmail/:email",
  },
  "game operation": {
    "start game": "api/game",
    "validate user guess (game + character id)":
      "api/game/:gameId/character/:characterId",
    "get game status by id": "api/game/status/:gameId",
    "get leaderboard by level": "api/game/leaderboard/:level",
    "delete game by id": "api/game/delete/:id",
  },
};

async function appApiInfo(req, res) {
  //  const email = "test@example.com";
  try {
    //  const user = await deleteUserByEmail(email);
    return res.status(200).json({ ...v1 });
  } catch (error) {
    console.log(error);
  }
}

export default appApiInfo;
