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
    const scanTitle = document.getElementsByTagName("h1")[0];

    const performScan = (upperQuery) => {
      // 1. Remove header
      scanTitle.innerHTML = "";
      if (tagKeys.includes(upperQuery)) {
        stopVideo();
        stopAudio();
        let media = data[upperQuery];
        songTitle.innerHTML = media.name;
        songArtist.innerHTML = `By ${media.artist}`;
        songImage.src = media.imageSrc;

        if (
          media.src.toLowerCase().endsWith(".mp4") ||
          media.src.toLowerCase().endsWith(".MOV")
        ) {
          playVideo(media.src);
        } else {
          playAudio(media.src);
        }
      } else {
        alert("Tag is not registered");
      }
      inputField.value = "";
      inputBuffer = "";
    };

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

    const urlParams = new URLSearchParams(window.location.search);
    const songId = urlParams.get("id");

    if (songId) {
      // scan the song if we have an id
      performScan(songId);
    }
    inputField.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const currentQuery = inputField.value;
        const upperQuery = currentQuery.toUpperCase();
        performScan(upperQuery);
      }
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
