/**
 * Entry point — boots the Express app on PORT (default 3000).
 */
const express = require("express");
const apiRoutes = require("./routes/api");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", apiRoutes);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`target-repo listening on :${port}`);
  });
}

module.exports = app;
