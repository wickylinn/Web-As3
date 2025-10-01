const songs = [
    { 
        title: "The Eagles - Hotel California", 
        file: "songs/The Eagles - Hotel California.mp3",
        artist: "The Eagles",
        year: "1976",
        genre: "Rock",
        info: "A legendary rock song with a famous guitar solo. One of the most popular songs of the 70s"
    },
    { 
        title: "Timur Mutsurayev - Candles are extinguished", 
        file: "songs/Timur Mutsuraev The Candles Went Out.mp3",
        artist: "Timur Mutsuraev",
        year: "2000",
        genre: "Chechen Folk",
        info: "A touching song in memory of the fallen. Performed with an acoustic guitar"
    },
    { 
        title: "Rihanna - Where Have You Been (DJ Tristan Orchestra Remix)", 
        file: "songs/DJ_Tristan_Rihanna_Where_Have_You_Been_Orchestra_Remix_DJ.mp3",
        artist: "Rihanna (DJ Tristan Remix)",
        year: "2011",
        genre: "Pop/Electronic",
        info: "An orchestral remix of Rihanna's hit. Epic sound with electronic elements"
    },
    { 
        title: "Kino - Gruppa Krovi", 
        file: "songs/01 - Group Blood.mp3",
        artist: "Victor Tsoi & Kino",
        year: "1988",
        genre: "Russian Rock",
        info: "Viktor Tsoi's iconic song. A symbol of a generation and the soundtrack to the film Needle"
    },
    { 
        title: "Aikyn Tolepbergen - Suigenim", 
        file: "songs/Aikyn Tolepbergen - Suigenim.mp3",
        artist: "Aikyn Tolepbergen",
        year: "2020",
        genre: "Kazakh Pop Song",
        info: "A modern Kazakh ballad about love. 'Сүйгенім' means 'Beloved'"
    },
    { 
        title: "Timati - Doroga v aeroport", 
        file: "songs/Timati feat. Sveta Road to the Airport.mp3",
        artist: "Тimati feat. Svеtа",
        year: "2015",
        genre: "Russian Pop/Rap",
        info: "A duet about a breakup at the airport. A combination of rap and pop melodies"
    }
];

const songList = document.getElementById("songList");
const searchInput = document.getElementById("search");
const player = document.getElementById("player");
const modal = document.getElementById("songInfoModal");
let currentSongIndex = null;

function displaySongs(filter = "") {
    songList.innerHTML = "";
    songs
        .filter(song => song.title.toLowerCase().includes(filter.toLowerCase()))
        .forEach((song, index) => {
            const div = document.createElement("div");
            div.className = "song";
            div.innerHTML = `
                <div class="song-left">
                    <img src="play.png" onclick="playSong(${index})" />
                    <span class="song-title" onclick="openSongInfo(${index})">${song.title}</span>
                </div>
                <button class="add" onclick="addToPlaylist(${index})">+</button>
            `;
            songList.appendChild(div);
        });
}

function playSong(index) {
    player.src = songs[index].file;
    player.play();
}

function addToPlaylist(index) {
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];
    
    const exists = playlist.some(song => song.title === songs[index].title);
    
    if (exists) {
        alert('This song is already in your playlist!');
        return;
    }
    
    playlist.push(songs[index]);
    localStorage.setItem('playlist', JSON.stringify(playlist));
    alert(`"${songs[index].title}" added to your playlist!`);
}

// Modal functions
function openSongInfo(index) {
    currentSongIndex = index;
    const song = songs[index];
    
    document.getElementById('modalSongTitle').textContent = song.title;
    document.getElementById('modalArtist').textContent = song.artist;
    document.getElementById('modalYear').textContent = song.year;
    document.getElementById('modalGenre').textContent = song.genre;
    document.getElementById('modalInfo').textContent = song.info;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeSongModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = 'auto';
    
    setTimeout(() => {
        modal.classList.remove('hide');
        currentSongIndex = null;
    }, 300);
}

document.getElementById('modalPlayBtn').addEventListener('click', () => {
    if (currentSongIndex !== null) {
        playSong(currentSongIndex);
        closeSongModal();
    }
});

document.getElementById('modalAddBtn').addEventListener('click', () => {
    if (currentSongIndex !== null) {
        addToPlaylist(currentSongIndex);
    }
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeSongModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeSongModal();
    }
});

searchInput.addEventListener("input", () => {
    displaySongs(searchInput.value);
});

displaySongs();