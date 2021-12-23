const carousel = document.querySelector('#carousel');
const videobg = document.querySelector('#videobg');

let nMaxSongs = 0;
let carouselIndex = 0;
let tempSongs = [];

const uploadClasses = (el, classes) => classes.forEach(cl => el.classList.add(cl));
const carouselSongCSS = [
    'carouselSong', 'glasscard-1', 'p2', 'txt-center', 'glasscard-1',
    'btn', 'floating', 'w80'
];

// Setting video background speed
videobg.playbackRate = 1;

const getSongsJson = function(){
    return new Promise((resolve, reject) => {
        fetch('../assets/songs.json')
        .then(res => res.json())
        .then(data => {
            nMaxSongs = data.songs.length;
            tempSongs = data.songs.splice(carouselIndex, 4);
            if(carouselIndex < nMaxSongs) resetCarousel();
            fillCarousel();
            resolve();
        }).catch(()=>reject('Error loading songs.json!'))
    });
} 

getSongsJson().then();

function fillCarousel(){
    for (let i = 0; i < tempSongs.length; i++) {
        const carouselSong = document.createElement('div');
        carouselSong.innerHTML = 
        `
            <p class="txt-black txt-normal txt-shadow-1 font-normal">${tempSongs[i].name}</p>
            <img class="w90" src="../assets/img/covers/${tempSongs[i].src}.jpeg"/>
            <audio src=../assets/songs/${tempSongs[i].src}.mp3></audio>
        `;
        uploadClasses(carouselSong, carouselSongCSS);
        carouselSong.style.animation = `fadein ${Math.random() * (1 - 0.5) + 0.5}s ease-in-out forwards`;
        carouselSong.addEventListener('mouseover', () => playSong(carouselSong));
        carouselSong.addEventListener('mouseout', () => playSong(carouselSong, true));
        carousel.appendChild(carouselSong);
    }
}

function resetCarousel(){
    const carouselSongs = carousel.querySelectorAll('.carouselSong');
    carouselSongs.forEach(el => carousel.removeChild(el));
}

function playSong(element, stop){
    const song = element.querySelectorAll('audio')[0];
    song.play();

    if(stop && stop === true){
        const allSongs = document.querySelectorAll('audio');
        allSongs.forEach(el => el.pause());
    }
}

function prevSong(){
    if(carouselIndex >= 4){
        carouselIndex -= 4;
        getSongsJson(carouselIndex);
    }
}

function nextSong(){
    if(carouselIndex < nMaxSongs){
        carouselIndex += 4;
        getSongsJson(carouselIndex);
    }
}

function aboutAnim(){
    const profileCard = document.querySelector('#profileCard');
    const picbox = profileCard.querySelector('#picbox');
    picbox.style.animation = "showinfo 1s forwards";
    picbox.classList.add('dropshadow-2');
    profileCard.querySelector('#text').style.animation = "fadein 1s forwards";
}