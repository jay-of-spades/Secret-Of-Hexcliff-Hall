document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startNarration');
  const playWrapper = document.querySelector('.play-wrapper');
  const playButton = document.querySelector('.pause-play-btn');
  let btnIntro = document.querySelector('.button-intro');
  let btnHex = document.querySelector('.btn-hex');
  const phrases = document.querySelectorAll('.phrase');
  const narrationAudio = document.getElementById('narrationAudio');
  let hexcliffLogo = document.querySelector('.hexcliff-logo');
  let current = 0;

  const audioFiles = [
    '../assets/sound/01_inherit/01inherit.m4a',
    '../assets/sound/01_inherit/02inherit.m4a',
    '../assets/sound/01_inherit/03inherit.m4a',
    '../assets/sound/01_inherit/04inherit.m4a',
    '../assets/sound/01_inherit/05inherit.m4a',
    '../assets/sound/01_inherit/06inherit.m4a',
    '../assets/sound/01_inherit/07inherit.m4a',
    '../assets/sound/01_inherit/08inherit.m4a',
    '../assets/sound/02_platform/01platform.m4a',
    '../assets/sound/02_platform/02platform.m4a',
    '../assets/sound/02_platform/03platform.m4a',
    '../assets/sound/02_platform/04platform.m4a',
    '../assets/sound/02_platform/05platform.m4a',
    '../assets/sound/02_platform/06platform.m4a',
    '../assets/sound/02_platform/07platform.m4a',
    '../assets/sound/02_platform/08platform.m4a',
    '../assets/sound/02_platform/09platform.m4a',
    '../assets/sound/02_platform/10platform.m4a',
    '../assets/sound/02_platform/11platform.m4a',
    '../assets/sound/02_platform/12platform.m4a',
    '../assets/sound/02_platform/13platform.m4a',
    '../assets/sound/02_platform/14platform.m4a',
    '../assets/sound/02_platform/15platform.m4a',
    '../assets/sound/02_platform/16platform.m4a',
    '../assets/sound/02_platform/17platform.m4a',
    '../assets/sound/02_platform/18platform.m4a',
    '../assets/sound/02_platform/19platform.m4a',
    '../assets/sound/02_platform/20platform.m4a',
    '../assets/sound/02_platform/21platform.m4a',
    '../assets/sound/02_platform/22platform.m4a',
  ];

  function highlightAndPlayPhrase() {
    if (current > 0) {
      phrases[current - 1].classList.remove('highlight');
    }

    if (current < phrases.length) {
      phrases[current].classList.add('highlight');
      narrationAudio.src = audioFiles[current - 1];
      let promise = narrationAudio.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            console.log('Autoplay started');
          })
          .catch(error => {
            console.log('Autoplay was prevented: ', error);
          });
      }
      current++;
    } else {
      narrationAudio.pause();
      btnHex.style.pointerEvents = 'all';
      hexcliffLogo.style.opacity = '1';
    }
  }

  narrationAudio.addEventListener('ended', function () {
    highlightAndPlayPhrase(); // Move to the next phrase when the audio for the current phrase ends
  });

  // Start with the first phrase
  highlightAndPlayPhrase();

  startButton.addEventListener('click', function () {
    playWrapper.style.opacity = '1';
    playWrapper.style.pointerEvents = 'all';
    playWrapper.style.cursor = 'pointer';
    playButton.style.cursor = 'pointer';
    btnIntro.style.backgroundColor = 'transparent';
    btnIntro.style.display = 'none';
    startButton.style.display = 'none';
  });

  playButton.addEventListener('click', function () {
    console.log('play button clicked');
    highlightAndPlayPhrase();
  });
});
