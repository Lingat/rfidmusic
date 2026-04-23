document.documentElement.setAttribute("data-bs-theme", "dark");
// A string to store the recent keystrokes

let inputBuffer = "";
fetch("./assets/tagToMusicMap.json")
  .then((response) => response.json()) // Parse the response as JSON
  .then((data) => {
    let tagKeys = Object.keys(data);
    let inputField = document.querySelector("input");
    const rfidAudio = document.getElementById("rfidAudio");
    const rfidVideo = document.getElementById("rfidVideo");

    const songTitle = document.getElementById("songTitle");
    const songArtist = document.getElementById("songArtist");
    const songImage = document.getElementById("songImage");
    const playAudio = (src) => {
      rfidAudio.src = src;
      rfidAudio.load();
      rfidAudio.play();
    };

    const playVideo = (src) => {
      rfidVideo.src = src;
      rfidVideo.load();
      rfidVideo.play();
    };

    const stopAudio = () => {
      rfidAudio.src = "";
      rfidAudio.pause();
    };

    const stopVideo = () => {
      rfidVideo.src = "";
      rfidVideo.pause();
    };

    inputField.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        // 2. Capture the current text
        const currentQuery = inputField.value;

        // 3. Perform your logic (e.g., checking tagKeys)
        const upperQuery = currentQuery.toUpperCase();
        if (tagKeys.includes(upperQuery)) {
          stopVideo();
          stopAudio();
          let media = data[upperQuery];
          songTitle.innerHTML = media.name;
          songArtist.innerHTML = `By ${media.artist}`;
          songImage.src = media.imageSrc;

          if (media.src.toLowerCase().endsWith(".mp4")) {
            playVideo(media.src);
          } else {
            playAudio(media.src);
          }
        } else {
          alert("Tag is not registered");
        }
        inputField.value = "";
        inputBuffer = "";
      }
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
