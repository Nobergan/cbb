const screenW = window.innerWidth;
const isMobile = screenW < 991;

const options = {
  text: {
    pl: "Włącz dźwięk",
    ru: "Включите звук",
    en: "Enable sound",
    es: "Poner el sonido",
    ar: "تمكين الصوت",
    de: "Sound einschalten",
    it: "Abilita l'audio",
  },
  imgSrc: "https://usahomerelief.net/video/volumeUp.svg",
};

const fullScreenSvg = `
	<svg id="icon" viewBox="0 0 512 512" width="100%" fill="#fff" xmlns="http://www.w3.org/2000/svg" id="fi_3580126"><g id="Solid"><path d="m104 72h48a24 24 0 0 0 24-24 24 24 0 0 0 -24-24h-104a24 24 0 0 0 -24 24v104a24 24 0 0 0 48 0v-48l116 116a22.627 22.627 0 0 0 32 0 22.627 22.627 0 0 0 0-32z"></path><path d="m220 292a22.627 22.627 0 0 0 -32 0l-116 116v-48a24 24 0 0 0 -48 0v104a24 24 0 0 0 24 24h104a24 24 0 0 0 24-24 24 24 0 0 0 -24-24h-48l116-116a22.627 22.627 0 0 0 0-32z"></path><path d="m464 24h-104a24 24 0 0 0 -24 24 24 24 0 0 0 24 24h48l-116 116a22.627 22.627 0 0 0 0 32 22.627 22.627 0 0 0 32 0l116-116v48a24 24 0 0 0 48 0v-104a24 24 0 0 0 -24-24z"></path><path d="m464 336a24 24 0 0 0 -24 24v48l-116-116a22.627 22.627 0 0 0 -32 0 22.627 22.627 0 0 0 0 32l116 116h-48a24 24 0 0 0 -24 24 24 24 0 0 0 24 24h104a24 24 0 0 0 24-24v-104a24 24 0 0 0 -24-24z"></path></g></svg>
`;

const containerCss = `
	position: absolute; 
	width: ${isMobile ? "80px" : "100px"}; 
	height: ${isMobile ? "68px" : "80px"}; 
	flex-direction: column;
	justify-content: center;
	align-items: center;
	top: calc(50% - 50px); 
	left: calc(50% - ${isMobile ? "40px" : "50px"}); 
	z-index: 100; 
	border-radius: 5px;
	background-color: rgba(0,0,0, 0.5);
	cursor: pointer;

`;

const imgCss = `
	width:40%; 
	margin-bottom: 10px;
`;

const textCss = `
	font-size: 10px;
	color: #fff;
	margin: 0;
`;

const videoContainerCss = `
	position: relative;
`;

const styleElem = document.createElement("style");
styleElem.innerHTML = `
	#volume,
	#fullscreen {
		animation-name: videoIcon;
		animation-duration: 1s;
		animation-iteration-count: infinite;
	}

	@keyframes videoIcon {
		0% {
			transform: scale(1, 1)
		}

		50% {
			transform: scale(1.1, 1.1)
		}

		100% {
			transform: scale(1, 1)
		}
	}
`;

function fullScreenEnable(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullscreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitEnterFullscreen) {
    element.webkitEnterFullscreen();
    element.play();
  }
}

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

const createVideoContainer = id => {
  const video = document.getElementById(id);
  if (!video) return;

  const videoContainer = document.createElement("div");
  videoContainer.className = "video-container";
  videoContainer.style.cssText = videoContainerCss;

  const volumeCont = document.createElement("div");
  const img = document.createElement("img");
  const p = document.createElement("p");
  const lang = document.documentElement.lang;
  const fullscreenIconContainer = document.createElement("div");
  fullscreenIconContainer.classList.add("full-screen-icon-container");
  fullscreenIconContainer.id = "fullscreen";
  fullscreenIconContainer.innerHTML = fullScreenSvg;

  fullscreenIconContainer.style.cssText = containerCss;

  function volumechangeHandler() {
    if (!iOS()) {
      volumeCont.style.display = !video.muted && !!video.volume ? "none" : "flex";
      fullscreenIconContainer.style.display = volumeCont.style.display === "flex" ? "none" : "flex";
    }
  }

  function iOS() {
    return (
      ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  }

  function enableSound() {
    video.muted = false;
    video.volume = video.volume === 0 ? 0.5 : video.volume;
  }

  const { text, imgSrc } = options;

  volumeCont.className = "volume";
  volumeCont.id = "volume";
  volumeCont.style.cssText = containerCss;
  volumeCont.style.paddingTop = `${isMobile ? "10px" : "0"}`;

  if (iOS()) {
    volumeCont.style.display = "none";
    fullscreenIconContainer.style.display = "flex";
  } else {
    volumeCont.style.display = "flex";
    fullscreenIconContainer.style.display = "none";
  }

  p.innerText = text[lang] || text.en;
  p.style.cssText = textCss;

  img.className = "unmute-btn";
  img.src = imgSrc;
  img.style.cssText = imgCss;

  volumeCont.append(img, p);
  video.before(videoContainer);
  video.before();
  videoContainer.append(video, volumeCont, fullscreenIconContainer);
  video.volume = 0.6;

  video.addEventListener("volumechange", volumechangeHandler);
  volumeCont.addEventListener("click", enableSound);
  const icon = document.getElementById("icon");

  icon.addEventListener("click", () => {
    return fullScreenEnable(video);
  });
  video.muted = true;
  video.play();
};

createVideoContainer("video");
createVideoContainer("video2");

document.body.append(styleElem);
