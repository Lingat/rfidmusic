document.documentElement.setAttribute("data-bs-theme", "dark");
// A string to store the recent keystrokes
let inputBuffer = "";
fetch("./assets/tagToMusicMap.json")
  .then((response) => response.json()) // Parse the response as JSON
  .then((data) => {
    let tagKeys = Object.keys(data);
    let inputField = document.querySelector("input");
    const rfidAudio = document.getElementById("rfidAudio");
    const songTitle = document.getElementById("songTitle");
    const songArtist = document.getElementById("songArtist");
    const songImage = document.getElementById("songImage");

    inputField.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        // 2. Capture the current text
        const currentQuery = inputField.value;

        console.log("Searching for:", currentQuery);

        // 3. Perform your logic (e.g., checking tagKeys)
        const upperQuery = currentQuery.toUpperCase();
        if (tagKeys.includes(upperQuery)) {
          let song = data[upperQuery];
          songTitle.innerHTML = song.name;
          songArtist.innerHTML = `By ${song.artist}`;
          songImage.src = song.imageSrc;
          rfidAudio.src = song.src;

          rfidAudio.load();
          rfidAudio.play();
        } else {
          alert("Tag is not registered");
        }
        inputField.value = "";
        inputBuffer = "";
      }
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
