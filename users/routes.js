import * as dao from "./dao.js";
function UserRoutes(app) {
  const createUser = async (req, res) => {
    try {
      const user = await dao.createUser(req.body);
      res.json(user);
    } catch (e) {
      console.log(e);
      if (e.code === 11000) {
        console.log("user exists");
        res.json(200);
      }
    }
  };

  const signup = async (req, res) => {
    try {
      const user = await dao.findUserByUsername(req.body.username);
      if (user) {
        res.json(200);
      }
      const currentUser = await dao.createUser(req.body);
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } catch (e) {
      console.log(e);
    }
  };

  const signin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const currentUser = await dao.findUserByCredentials(username, password);
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } catch (e) {
      console.log(e);
    }
  };

  const signout = (req, res) => {
    try {
      req.session.destroy();
      res.json(200);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = async (req, res) => {
    try {
      const user = await dao.findUserById(req.params.userId);
      const status = await dao.deleteUser(user);
      req.session.destroy();
      res.json(status);
    } catch (e) {
      console.log(e);
    }
  };

  const findAllUsers = async (req, res) => {
    try {
      console.log("CALLED FINDALLUSERS");
      const users = await dao.findAllUsers();
      console.log(users);
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  };

  const findUserById = async (req, res) => {
    try {
      const user = await dao.findUserById(req.params.userId);
      res.json(user);
    } catch (e) {
      console.log(e);
    }
  };

  const updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const status = await dao.updateUser(userId, req.body);
      const currentUser = await dao.findUserById(userId);
      req.session["currentUser"] = currentUser;
      res.json(status);
    } catch (e) {
      console.log(e);
    }
  };
  const account = async (req, res) => {
    try {
      res.json(req.session["currentUser"]);
    } catch (e) {
      console.log(e);
    }
  };

  app.post("/api/users", createUser);
  app.get("/api/admin/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);
}
export default UserRoutes;
