const carousel = document.querySelector('#carousel');

let nMaxSongs = 0;
let carouselIndex = 0;
let tempSongs = [];

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
            <p>${tempSongs[i].name}</p>
            <img class="col-md-12 col-sm-12 col-12" src="../assets/img/covers/${tempSongs[i].src}.jpeg"/>
            <audio src=../assets/songs/${tempSongs[i].src}.mp3></audio>
        `;
        carouselSong.classList.add('carouselSong', 'col-md-4', 'col-sm-4', 'col-12');
        carouselSong.style.animation = `fadeIn ${Math.random() * (1 - 0.5) + 0.5}s ease-in-out forwards`;
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
    profileCard.querySelector('#picbox').style.animation = "showinfo 1s forwards";
    profileCard.querySelector('#picbox').style.setProperty("-webkit-filter", 'drop-shadow(6px 6px 12px rgba(17, 17, 17, 0.623))');
    profileCard.querySelector('#text').style.animation = "fadeIn 1s forwards";
}