import db from "../Database/index.js";
function OtherRoutes(app) {
  /*GET enrollments */
  app.get("/api/enrollments", (req, res) => {
    const enrollments = db.enrollments;
    res.send(enrollments);
  });
  /*GET users */
  app.get("/api/users", (req, res) => {
    const users = db.users;
    res.send(users);
  });
  /*GET grades */
  app.get("/api/grades", (req, res) => {
    const grades = db.grades;
    res.send(grades);
  });
}
export default OtherRoutes;
