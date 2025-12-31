console.log("Welcome to Spotify");

// ================= INITIALIZE =================
let songIndex = 0;

let songs = [
    { songName: "Let me Love You - Justin Bieber", filepath: "Music/1.mp3", coverPath: "Song_Cover_Page/let me love you.jpg" },
    { songName: "For a Reason", filepath: "Music/2.mp3", coverPath: "Song_Cover_Page/for a reason.jpg" },
    { songName: "Salam-e-Ishq", filepath: "Music/3.mp3", coverPath: "Song_Cover_Page/salaam-e-ishq.jpg" },
    { songName: "Tauba Tauba", filepath: "Music/4.mp3", coverPath: "Song_Cover_Page/salaam-e-ishq.jpg" },
    { songName: "Dooron Dooron", filepath: "Music/5.mp3", coverPath: "Song_Cover_Page/dooron dooron.jpg" },
    { songName: "Khaand Lagddi", filepath: "Music/6.mp3", coverPath: "Song_Cover_Page/Khaand Lagdi.jpg" },
    { songName: "Wavy", filepath: "Music/7.mp3", coverPath: "Song_Cover_Page/Wavy.jpg" },
    { songName: "Dhurandhar", filepath: "Music/8.mp3", coverPath: "Song_Cover_Page/dhurandhar.jpg" },
    { songName: "Aavan Jaavan", filepath: "Music/9.mp3", coverPath: "Song_Cover_Page/Aavan Jaavan.jpg" },
    { songName: "Preet Re", filepath: "Music/10.mp3", coverPath: "Song_Cover_Page/Preet Re.jpg" }
];

let audioElement = new Audio(songs[0].filepath);

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songitem'));
let currentTimeEl = document.getElementById('currentTime');
let durationEl = document.getElementById('currentDuration');
let volumeBar = document.getElementById('volumeBar');

masterSongName.innerText = songs[0].songName;

// ================= SONG LIST SETUP =================
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

    let tempAudio = new Audio(songs[i].filepath);
    tempAudio.addEventListener("loadedmetadata", () => {
        element.querySelector(".timestamp").childNodes[0].textContent =
            formatTime(tempAudio.duration) + " ";
    });
});

// ================= VOLUME =================
volumeBar.addEventListener('input', () => {
    audioElement.volume = volumeBar.value / 100;
});

// ================= PLAY / PAUSE =================
masterPlay.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
});

// ================= TIME & PROGRESS =================
audioElement.addEventListener('timeupdate', () => {
    if (!isNaN(audioElement.duration)) {
        myProgressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
        currentTimeEl.innerText = formatTime(audioElement.currentTime);
    }
});

audioElement.addEventListener('loadedmetadata', () => {
    durationEl.innerText = formatTime(audioElement.duration);
});

myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// ================= AUTO NEXT =================
audioElement.addEventListener('ended', () => {
    nextSong();
});

// ================= SONG ITEM PLAY =================
const makeAllPlays = () => {
    document.querySelectorAll('.songItemPlay').forEach(el => {
        el.classList.remove('fa-pause');
        el.classList.add('fa-play');
    });
};

document.querySelectorAll('.songItemPlay').forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);

        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');

        audioElement.src = songs[songIndex].filepath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();

        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    });
});

// ================= NEXT / PREVIOUS =================
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    playSong();
}

function prevSong() {
    songIndex = songIndex === 0 ? 0 : songIndex - 1;
    playSong();
}

function playSong() {
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;
}

document.getElementById('next').addEventListener('click', nextSong);
document.getElementById('previous').addEventListener('click', prevSong);

// ================= HELPER =================
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}
