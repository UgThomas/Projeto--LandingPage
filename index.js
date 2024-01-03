const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const mm = require("music-metadata");

const app = express();
const port = 3000;

const musicFolder = path.join(__dirname, "music"); // Pasta onde suas músicas estão

app.use(express.static(path.join(__dirname, "public")));

app.get("/catalog", async (req, res) => {
  try {
    const files = await fs.readdir(musicFolder);
    const musicCatalog = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(musicFolder, file);
        const metadata = await mm.parseFile(filePath);
        return {
          title: metadata.common.title || "Unknown Title",
          artist: metadata.common.artist || "Unknown Artist",
          path: filePath,
        };
      })
    );
    res.json(musicCatalog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
