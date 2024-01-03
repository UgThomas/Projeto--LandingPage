document.addEventListener("DOMContentLoaded", async () => {
  const catalogContainer = document.getElementById("catalog");
  const response = await fetch("/catalog");
  const musicCatalog = await response.json();

  musicCatalog.forEach((song) => {
    const songElement = document.createElement("div");
    songElement.classList.add("song");
    songElement.innerHTML = `<strong>${song.title}</strong><br>Artist: ${song.artist}`;
    catalogContainer.appendChild(songElement);
  });
});
