/*
==========================================================
Week 6
Application Controller
==========================================================
*/

(() => {

"use strict";

/*=========================================================
Configuration
=========================================================*/

const CONFIG = window.AppConfig;

/*=========================================================
Application State
=========================================================*/

const state = {

    music: null,

    initialized: false,

    currentSection: null,

    transitioning: false

};

/*=========================================================
DOM Cache
=========================================================*/

const overlay = document.getElementById("welcomeOverlay");

const welcomeCard = document.getElementById("welcomeCard");

const openButton = document.getElementById("openButton");

const landingView = document.getElementById("landingView");

const detailView = document.getElementById("detailView");

const backButton = document.getElementById("backButton");

const polaroidCard = document.getElementById("polaroidCard");

const detailHeading = document.getElementById("detailHeading");

const detailMessage = document.getElementById("detailMessage");

const detailImage = document.getElementById("detailImage");

const featureButtons = document.querySelectorAll(".feature-btn");

/*=========================================================
Utility
=========================================================*/

function wait(ms){

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}

/*=========================================================
Howler
=========================================================*/

function initializeMusic(){

    if(state.music) return;

    state.music = new Howl({

        src:[CONFIG.audio.src],

        html5:true,

        loop:CONFIG.audio.loop,

        volume:CONFIG.audio.volume

    });

}

function startMusic(){

    initializeMusic();

    if(!state.music.playing()){

        state.music.play();

    }

}

function stopMusic(){

    if(state.music){

        state.music.stop();

    }

}

/*=========================================================
Welcome Overlay
=========================================================*/

async function openExperience(){

    if(state.initialized) return;

    state.initialized = true;

    startMusic();

    gsap.to(welcomeCard,{

        duration:.45,

        scale:.88,

        opacity:0,

        ease:"power2.out"

    });

    gsap.to(overlay,{

        duration:.8,

        opacity:0,

        delay:.25,

        ease:"power2.out",

        onComplete(){

            overlay.style.display="none";

        }

    });

    gsap.from(landingView,{

        duration:.9,

        opacity:0,

        y:40,

        ease:"power3.out"

    });

}

/*=========================================================
Render Detail
=========================================================*/

function renderSection(sectionName){

    const section = CONFIG.sections[sectionName];

    if(!section) return;

    state.currentSection = sectionName;

    detailHeading.textContent = section.heading;

    detailMessage.textContent = section.messageText;

    detailMessage.scrollTop = 0;

    detailImage.src = section.imagePath;

    detailImage.alt = section.label;

}

/*=========================================================
Animations
=========================================================*/

function animateLandingOut(){

    return new Promise(resolve=>{

        gsap.to(landingView,{

            duration:.45,

            opacity:0,

            scale:.95,

            y:-20,

            ease:"power2.out",

            onComplete(){

                landingView.classList.add("hidden");

                resolve();

            }

        });

    });

}

function animateLandingIn(){

    landingView.classList.remove("hidden");

    gsap.fromTo(

        landingView,

        {

            opacity:0,

            y:20,

            scale:.96

        },

        {

            opacity:1,

            y:0,

            scale:1,

            duration:.6,

            ease:"power3.out"

        }

    );

}

function animateDetailIn(){

    detailView.classList.remove("hidden");

    detailView.classList.add("flex");

    const tl = gsap.timeline();

    tl.set(polaroidCard,{

        rotate:-4,

        scale:.82,

        y:80,

        opacity:0

    });

    tl.fromTo(

        detailView,

        {

            opacity:0

        },

        {

            opacity:1,

            duration:.25

        }

    );

    tl.to(

        polaroidCard,

        {

            duration:.8,

            rotate:0,

            y:0,

            scale:1,

            opacity:1,

            ease:"back.out(1.6)"

        }

    );

    tl.from(

        "#detailHeading",

        {

            y:15,

            opacity:0,

            duration:.45

        },

        "-=.45"

    );

    tl.from(

        "#detailMessage",

        {

            y:20,

            opacity:0,

            duration:.55

        },

        "-=.35"

    );

}

function animateDetailOut(){

    return new Promise(resolve=>{

        const tl = gsap.timeline({

            onComplete(){

                detailView.classList.add("hidden");

                detailView.classList.remove("flex");

                resolve();

            }

        });

        tl.to(

            polaroidCard,

            {

                duration:.35,

                scale:.92,

                y:40,

                opacity:0,

                ease:"power2.in"

            }

        );

        tl.to(

            detailView,

            {

                opacity:0,

                duration:.2

            },

            "-=.18"

        );

    });

}

/*=========================================================
Navigation
=========================================================*/

async function goToSection(sectionName){

    if(state.transitioning) return;

    state.transitioning = true;

    renderSection(sectionName);

    await animateLandingOut();

    animateDetailIn();

    await wait(850);

    state.transitioning = false;

}

async function goBack(){

    if(state.transitioning) return;

    state.transitioning = true;

    await animateDetailOut();
    
    animateLandingIn();

    await wait(500);

    state.transitioning = false;

}

/*=========================================================
Events
=========================================================*/

function bindFeatureButtons(){

    featureButtons.forEach(button=>{

        button.addEventListener("click",()=>{

            const section = button.dataset.section;

            goToSection(section);

        });

    });

}

function bindBackButton(){

    backButton.addEventListener("click",goBack);

}

function bindKeyboard(){

    document.addEventListener("keydown",(event)=>{

        if(event.key==="Escape"){

            if(!detailView.classList.contains("hidden")){

                goBack();

            }

        }

    });

}

/*=========================================================
Micro Interactions
=========================================================*/

function initializeHoverEffects(){

    featureButtons.forEach(button=>{

        button.addEventListener("mouseenter",()=>{

            gsap.to(button,{

                duration:.25,

                scale:1.04,

                ease:"power2.out"

            });

        });

        button.addEventListener("mouseleave",()=>{

            gsap.to(button,{

                duration:.25,

                scale:1,

                ease:"power2.out"

            });

        });

        button.addEventListener("mousedown",()=>{

            gsap.to(button,{

                duration:.1,

                scale:.96

            });

        });

        button.addEventListener("mouseup",()=>{

            gsap.to(button,{

                duration:.15,

                scale:1.04

            });

        });

        button.addEventListener("touchstart",()=>{

            gsap.to(button,{

                duration:.12,

                scale:.96

            });

        },{

            passive:true

        });

        button.addEventListener("touchend",()=>{

            gsap.to(button,{

                duration:.18,

                scale:1

            });

        });

    });

}

/*=========================================================
Floating Polaroid Animation
=========================================================*/

function initializeFloatingCard(){

    gsap.to(polaroidCard,{

        y:-6,

        duration:2.8,

        repeat:-1,

        yoyo:true,

        ease:"sine.inOut"

    });

}

/*=========================================================
Image Loading
=========================================================*/

function preloadAssets(){

    Object.values(CONFIG.sections).forEach(section=>{

        const img = new Image();

        img.src = section.imagePath;

    });

}

/*=========================================================
Landing Animation
=========================================================*/

function animateLandingIcons(){

    gsap.from(".feature-card",{

        opacity:0,

        y:30,

        duration:.8,

        stagger:.12,

        ease:"back.out(1.5)",

        delay:.2

    });

}

/*=========================================================
Boot
=========================================================*/

function initializeApplication(){

    preloadAssets();

    bindFeatureButtons();

    bindBackButton();

    bindKeyboard();

    initializeHoverEffects();

    initializeFloatingCard();

    animateLandingIcons();

}

/*=========================================================
Open Experience
=========================================================*/

openButton.addEventListener("click",openExperience);

/*=========================================================
Prevent Accidental Image Drag
=========================================================*/

document.querySelectorAll("img").forEach(image=>{

    image.addEventListener("dragstart",(event)=>{

        event.preventDefault();

    });

});

/*=========================================================
Prevent Double Tap Zoom (Mobile)
=========================================================*/

let lastTouchEnd = 0;

document.addEventListener("touchend",(event)=>{

    const now = Date.now();

    if(now - lastTouchEnd <= 300){

        event.preventDefault();

    }

    lastTouchEnd = now;

},{
    passive:false
});

/*=========================================================
Visibility API
Pause music when page is hidden.
=========================================================*/

document.addEventListener("visibilitychange",()=>{

    if(!state.music) return;

    if(document.hidden){

        state.music.pause();

    }else{

        state.music.play();

    }

});

/*=========================================================
Resize Refresh (Future-proof)
=========================================================*/

window.addEventListener("resize",()=>{

    gsap.set(polaroidCard,{
        clearProps:"transform"
    });

});

/*=========================================================
Initialize
=========================================================*/

initializeApplication();

})();