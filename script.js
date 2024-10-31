
console.log("hello");

let playCondition=1;
let ol = document.querySelector('ol');
let currentAudio = null; // Variable to keep track of the currently playing audio
let currentSign=null;
let songName= document.querySelector('.songNmae');
let play_pause= document.querySelector('.fa-circle-play');
let controlPlay= document.querySelector('.control-play');
console.log(controlPlay.classList[1]);
let first_song_contion=1;
let music=[];
let liClassList;
let songsUL=document.querySelector('ol').getElementsByTagName('ul');
// songsUL.innerHTML='';
console.log(songsUL);
let range=document.querySelector('#volume')
console.log(range);
let currFolder;
let card=document.querySelectorAll('.artists')
console.log(card);
let element;
let li;
let artists
function formatTime(seconds) {
    seconds = Math.floor(seconds);

    // Calculate minutes and remaining seconds
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    // Format both minutes and seconds to be two digits (00:00 format)
    let formattedMinutes = minutes.toString().padStart(2, '0');
    let formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function songs(folder) {
    let url = `http://127.0.0.1:3000/spotify/songs/${folder}/`;
    currFolder=folder;
    // songsUL.innerHTML ='';
    try {
        let fetching = await fetch(url);
        if (!fetching.ok) {
            throw new Error(`HTTP error! Status: ${fetching.status}`);
        }
        let songParse = await fetching.text();
        let newDiv = document.createElement('div');
        newDiv.innerHTML = songParse;
        let a = newDiv.getElementsByTagName('a');
        // playCondition=1;
        for (let index = 0; index < a.length; index++) {
            element = a[index];
            let href = element.href;
            // console.log(element);
            if (href.endsWith('.mp3')) {
                music.push(href);
                console.log(element);
                li = document.createElement('li'); 
                li.innerHTML = 
                    `<div class="songlist songlist1 flex align-item">
                        <i class="fa-regular fa-circle-play "></i>
                        <div class="contain songlist1">
                            <h4 class="title">
                                ${element.innerText}
                            </h4>
                            <h6 class="author">
                                ${currFolder}
                            </h6>
                        </div>
                    </div>`
                    // currentAudio = new Audio(href);
                    // currentAudio.play();
                if (first_song_contion){
                        // console.log('1');
                    currentAudio = new Audio(href);
                    currentAudio.pause();
                    songName.innerHTML=`<div class="songlist songlist1 flex align-item">
                            <i class="fa-solid fa-music s-play"></i>
                            <div class="contain songlist1">
                                <h4 class="title">
                                    <h2 style="color: #fff; font-size: xx-large;">${element.innerText}</h2>
                                    <h4 style="color: #ffffff96; font-size: medium;">Artist</h4>
                                </h4>
                            </div>
                        </div>
                        <b>00:00/00:00</b>`
                        timingsUpdate();
            
                        seeBarPosition();
                }
                first_song_contion=0;
                
                ol.append(li);
                let i_IN_li=li.getElementsByTagName('i');
                liClassList=i_IN_li[0].classList;
                // liClassList.add('fa-circle-play');
                // liClassList.remove('fa-circle-pause');
                li.addEventListener('click', (ev) => {
                    // Pause the current audio if there is one playing
                    if (currentAudio) {
                        currentAudio.pause();
                        currentAudio.currentTime = 0; 
                    }
                    if(playCondition){
                        liClassList.remove('fa-circle-play');
                        liClassList.add('fa-circle-pause');
                        controlPlay.classList.remove('fa-play');
                        controlPlay.classList.add('fa-pause');
                    }  
                    // console.log(liClassList);
                    // Create a new Audio instance for the clicked song
                    currentAudio = new Audio(href);
                    currentAudio.play(); // Play the new song
                    // console.log('mellooo');
                    player(element.innerHTML);
                    timingsUpdate();
                    seeBarPosition();
                });
               
                controlPlay.addEventListener('click',(ev)=>{
                    if(currentAudio.paused){
                        console.log('1')
                        currentAudio.play();
                        controlPlay.classList.remove('fa-play');
                        controlPlay.classList.add('fa-pause');
                    }
                    else if(currentAudio.played){
                        console.log('0')
                        currentAudio.pause();
                        controlPlay.classList.remove('fa-pause');
                        controlPlay.classList.add('fa-play');
                    }
                });
            }
            
        }
        
        return music;

    } catch (error) {
        console.error('Error fetching songs:', error);
    }
}

async function main() {
    let getsongs = await songs("A.R.Rahman");
    console.log(getsongs);

    document.querySelector('.control-next').addEventListener('click',()=>{
        // console.log('next');
        currentAudio.pause();
        let index=music.indexOf(currentAudio.src)
        if((index+1) > length){
            currentAudio.pause();
            currentAudio = new Audio(music[index+1]);
            currentAudio.play();
            // console.log(currentAudio)
        }
        if(index==music.length-1){
            currentAudio = new Audio(music[index]);
            currentAudio.play();
        }
        timingsUpdate()
        songName.innerHTML=`<div class="songlist songlist1 flex align-item">
            <i class="fa-solid fa-music s-play"></i>
            <div class="contain songlist1">
                <h4 class="title">
                    <h2 style="color: #fff; font-size: xx-large;">${currentAudio.src.split('/').splice(-1)[0]}</h2>
                    <h4 style="color: #ffffff96; font-size: medium;">Artist</h4>
                </h4>
            </div>
        </div>
        <b>00:00/00:00</b>`
        controlPlay.classList.remove('fa-play');
        controlPlay.classList.add('fa-pause');
    });

    document.querySelector('.control-previous').addEventListener('click',()=>{
        // console.log('prev');
        currentAudio.pause();
        // console.log(currentAudio.src)
        let index=music.indexOf(currentAudio.src);
        // console.log(index);
        if((index-1) >= length){
            currentAudio = new Audio(music[index-1]);
            currentAudio.play();
            // console.log(currentAudio)
        }
        if(index==0){
            currentAudio = new Audio(music[index]);
            currentAudio.play();
        }
        timingsUpdate()
        songName.innerHTML=`<div class="songlist songlist1 flex align-item">
            <i class="fa-solid fa-music s-play"></i>
            <div class="contain songlist1">
                <h4 class="title">
                    <h2 style="color: #fff; font-size: xx-large;">${currentAudio.src.split('/').splice(-1)[0]}</h2>
                    <h4 style="color: #ffffff96; font-size: medium;">Artist</h4>
                </h4>
            </div>
        </div>
        <b>00:00/00:00</b>`
        controlPlay.classList.remove('fa-play');
        controlPlay.classList.add('fa-pause');
    })

    range.addEventListener('change',(e)=>{
        currentAudio.volume=(e.target.value)/100;
        if(currentAudio.volume==0){
            // console.log(range.previousElementSibling.classList)
            range.previousElementSibling.classList.remove('fa-volume-high');
            range.previousElementSibling.classList.add('fa-volume-xmark');
        }
        else if(currentAudio.volume>0){
            if(currentAudio.volume>0 && currentAudio.volume<0.5){
                range.previousElementSibling.classList.add('fa-volume-low');
                range.previousElementSibling.classList.remove('fa-volume-xmark');
                range.previousElementSibling.classList.remove('fa-volume-high');
            }else{
                range.previousElementSibling.classList.add('fa-volume-high');
                range.previousElementSibling.classList.remove('fa-volume-xmark');
                range.previousElementSibling.classList.remove('fa-volume-low');
            }  
        }
    })

    range.previousElementSibling.addEventListener('click',(e)=>{
        if(range.previousElementSibling.classList.value=='fa-solid fa-volume-high' || range.previousElementSibling.classList.value=='fa-solid fa-volume-low' ){
            currentAudio.volume=0;
            range.previousElementSibling.classList.remove('fa-volume-high');
            range.previousElementSibling.classList.remove('fa-volume-low');
            range.previousElementSibling.classList.add('fa-volume-xmark');
        }
        
        else 
        {
            if(range.previousElementSibling.classList.value=='fa-solid fa-volume-xmark' && currentAudio.volume!=0){
                currentAudio.volume=1;
                range.previousElementSibling.classList.add('fa-volume-high');
                range.previousElementSibling.classList.remove('fa-volume-xmark');
                range.previousElementSibling.classList.remove('fa-volume-low');
            }
            if(range.previousElementSibling.classList.value=='fa-solid fa-volume-xmark' && currentAudio.volume==0){
                currentAudio.volume=(range.value)/100;
                if(currentAudio.volume>0 || currentAudio.volume<0.5){
                    range.previousElementSibling.classList.add('fa-volume-low');
                    range.previousElementSibling.classList.remove('fa-volume-xmark');
                    range.previousElementSibling.classList.remove('fa-volume-high');
                }if(currentAudio.volume>=0.5 && currentAudio.volume<=1){
                    range.previousElementSibling.classList.add('fa-volume-high');
                    range.previousElementSibling.classList.remove('fa-volume-xmark');
                    range.previousElementSibling.classList.remove('fa-volume-low');
                } 
            }
        }
    })

    populateCards();
    let artistCard=document.querySelector('.artistCard')
    Array.from(artistCard.children).forEach(e=>{
        console.log('hi');
        // console.log(e);
        e.addEventListener('click',async (event)=>{
            ol.innerHTML='';
            console.log(songsUL.innerHTML);
            getsongs = await songs(`${event.currentTarget.dataset.folder}`);
        })
    })
}

async function populateCards(){
    let url=`http://127.0.0.1:3000/spotify/songs/`
    let fetching = await fetch(url);
    let songParse = await fetching.text();
    let newDiv = document.createElement('div');
    newDiv.innerHTML = songParse;
    let anchorTags=newDiv.getElementsByTagName('a');
        for (let index = 0; index < anchorTags.length; index++) {
            const element = anchorTags[index];
            let hrefOfEachFolder=element.href;
            if(hrefOfEachFolder.includes('songs')){
                let NameOfEachFolder=hrefOfEachFolder.split('/').slice(-2)[0];
                // console.log(hrefOfEachFolder,NameOfEachFolder);
                let fetchJson=await fetch(`http://127.0.0.1:3000/spotify/songs/${NameOfEachFolder}/info.json`);
                let parseJson=await fetchJson.json();
                
                let artistCard=document.querySelector('.artistCard')
                console.log(artistCard.getElementsByClassName('.artists'));
                artistCard.innerHTML=artistCard.innerHTML +`
                        <div class="artists a-num11 flex" data-folder="${parseJson.CardTitle}">
                            <img src="http://127.0.0.1:3000/spotify/songs/${parseJson.CardTitle}/cover.jpg" alt="" class="artistImg margin-bottom">
                            <h3>${parseJson.CardTitle}</h3>
                            <h5 class="margin-bottom">${parseJson.cardDescribtion}</h5>
                            <div class="play-Button flex justify-content align-item">
                                <i class="fa-solid fa-play"></i>
                            </div>
                        </div>`
                Array.from(artistCard.children).forEach(element => {
                    element.addEventListener('click',async (e)=>{
                        console.dir(e.currentTarget)
                        ol.innerHTML='';
                        console.log(e.currentTarget.dataset);
                        getsongs = await songs(`${e.currentTarget.dataset.folder}`);
                    });
                });
                console.log(card);
            }
        }
}

function player(text){
    songName.innerHTML=`<div class="songlist songlist1 flex align-item">
                            <i class="fa-solid fa-music s-play"></i>
                            <div class="contain songlist1">
                                <h4 class="title">
                                    <h2 style="color: #fff; font-size: xx-large;">${text}</h2>
                                    <h4 style="color: #ffffff96; font-size: medium;">Artist</h4>
                                </h4>
                            </div>
                        </div>
                        <b>00:00/00:00</b>`
}
function timingsUpdate(){
    currentAudio.addEventListener('timeupdate',()=>{
        let timerForsong=document.querySelector("b")
        timerForsong.innerText=`${formatTime(currentAudio.currentTime)} : ${formatTime(currentAudio.duration)}` 
        document.querySelector('.seek-circle').style.left=(currentAudio.currentTime/currentAudio.duration)*100 + '%';
    });
}

function seeBarPosition() {
    document.querySelector('.seeek-bar').addEventListener('click',(e)=>{
        document.querySelector('.seek-circle').style.left=(e.offsetX/e.target.getBoundingClientRect().width * 100) + '%';
        currentAudio.currentTime=((currentAudio.duration)*(e.offsetX/e.target.getBoundingClientRect().width* 100))/100;
    });
}

function nextSong() {
    document.querySelector('.control-next').addEventListener('click',()=>{
        // console.log(music,currentAudio.src);
        currentAudio.pause();
        let index=music.indexOf(currentAudio.src.split('/').splice(-1)[0])
        if((index+1) > length){
            currentAudio = new Audio(music[index]);
            currentAudio.play();
            // console.log(currentAudio)
        }
        
        songName.innerHTML=`<div class="songlist songlist1 flex align-item">
            <i class="fa-solid fa-music s-play"></i>
            <div class="contain songlist1">
                <h4 class="title">
                    <h2 style="color: #fff; font-size: xx-large;">${currentAudio.src.split('/').splice(-1)[0]}</h2>
                    <h4 style="color: #ffffff96; font-size: medium;">Artist</h4>
                </h4>
            </div>
        </div>
        <b>00:00/00:00</b>`
        liClassList.remove('fa-circle-play');
        liClassList.add('fa-circle-pause');
        controlPlay.classList.remove('fa-play');
        controlPlay.classList.add('fa-pause');
    })
}
main();