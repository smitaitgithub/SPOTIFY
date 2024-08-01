console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "Let me Love You", filePath: "songs/1.mp3", coverPath: "covers/cover1.jpg"},
    {songName: "Stay", filePath: "songs/2.mp3", coverPath: "covers/cover2.jpg"},
    {songName: "Attention", filePath: "songs/3.mp3", coverPath: "covers/cover3.jpg"},
    {songName: "Up At Night", filePath: "songs/4.mp3", coverPath: "covers/cover4.jpg"},
    {songName: "Cold Water", filePath: "songs/5.mp3", coverPath: "covers/cover5.jpg"},
    {songName: "Honest", filePath: "songs/6.mp3", coverPath: "covers/cover6.jpg"},
    {songName: "Yummy", filePath: "songs/7.mp3", coverPath: "covers/cover7.jpg"},
    {songName: "Hold On", filePath: "songs/8.mp3", coverPath: "covers/cover8.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play();
 
//Handle play/pause click
masterPlay.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime<= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-solid', 'fa-circle-play');
        masterPlay.classList.add('fa-solid', 'fa-circle-pause');
        gif.style.opacity = 1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-solid', 'fa-circle-pause');
        masterPlay.classList.add('fa-solid', 'fa-circle-play');
        gif.style.opacity = 0;
    }

})
//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update Seeker
    let progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;

})

myProgressBar.addEventListener('change' , ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=> {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-solid', 'fa-circle-pause');
        element.classList.add('fa-solid', 'fa-circle-play');
    })

}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-solid', 'fa-circle-play');
        e.target.classList.add('fa-solid', 'fa-circle-pause');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-solid', 'fa-circle-play');
        masterPlay.classList.add('fa-solid', 'fa-circle-pause');
    })

    
})
document.getElementById('next').addEventListener('click' , ()=>{
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-solid', 'fa-circle-play');
    masterPlay.classList.add('fa-solid', 'fa-circle-pause');
})

document.getElementById('previous').addEventListener('click' , ()=>{
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-solid', 'fa-circle-play');
    masterPlay.classList.add('fa-solid', 'fa-circle-pause');
    
    
    

})