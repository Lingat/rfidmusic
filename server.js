const express = require("express");
const path = require("path");

const app = express();
const PORT = 3001;

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(express.static("public"));
// Route for index.html (optional but explicit)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/gallery.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "gallery.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
