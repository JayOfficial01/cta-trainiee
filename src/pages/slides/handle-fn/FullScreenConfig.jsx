export function ShowFullScreen(viewFullScreen) {
  const elem = viewFullScreen.current;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen(); // Safari
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen(); // Firefox
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen(); // IE/Edge
  }
}

export function ExitFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else if (document.webkitFullscreenElement) {
    document.webkitExitFullscreen(); // For Safari
  }
}
