document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startNarration');
  const playWrapper = document.querySelector('.play-wrapper');
  const playButton = document.querySelector('.pause-play-btn');
  let btnIntro = document.querySelector('.button-intro');
  let btnHex = document.querySelector('.btn-hex');
  const phrases = document.querySelectorAll('.phrase');
  let hexcliffLogo = document.querySelector('.hexcliff-logo');
  let audioContext;
  let source;
  let isPlaying = false;
  let concatenatedBuffer;
  let prodMode =
    window.location.href ===
    'https://jay-of-spades.github.io/Secret-Of-Hexcliff-Hall/'
      ? true
      : false;
  let highlightTimeouts = [];
  let resumeTime = 0; // To store the time from which audio should resume

  // Determine the base path for the assets
  const basePath = prodMode ? '/Secret-Of-Hexcliff-Hall' : '';

  const audioFiles = [
    `${basePath}/assets/sound/01_inherit/01inherit.m4a`,
    `${basePath}/assets/sound/01_inherit/02inherit.m4a`,
    `${basePath}/assets/sound/01_inherit/03inherit.m4a`,
    `${basePath}/assets/sound/01_inherit/04inherit.m4a`,
    `${basePath}/assets/sound/01_inherit/05inherit.m4a`,
    `${basePath}/assets/sound/01_inherit/06inherit.m4a`,
    `${basePath}/assets/sound/01_inherit/07inherit.m4a`,
    `${basePath}/assets/sound/01_inherit/08inherit.m4a`,
    `${basePath}/assets/sound/02_platform/01platform.m4a`,
    `${basePath}/assets/sound/02_platform/02platform.m4a`,
    `${basePath}/assets/sound/02_platform/03platform.m4a`,
    `${basePath}/assets/sound/02_platform/04platform.m4a`,
    `${basePath}/assets/sound/02_platform/05platform.m4a`,
    `${basePath}/assets/sound/02_platform/06platform.m4a`,
    `${basePath}/assets/sound/02_platform/07platform.m4a`,
    `${basePath}/assets/sound/02_platform/08platform.m4a`,
    `${basePath}/assets/sound/02_platform/09platform.m4a`,
    `${basePath}/assets/sound/02_platform/10platform.m4a`,
    `${basePath}/assets/sound/02_platform/11platform.m4a`,
    `${basePath}/assets/sound/02_platform/12platform.m4a`,
    `${basePath}/assets/sound/02_platform/13platform.m4a`,
    `${basePath}/assets/sound/02_platform/14platform.m4a`,
    `${basePath}/assets/sound/02_platform/15platform.m4a`,
    `${basePath}/assets/sound/02_platform/16platform.m4a`,
    `${basePath}/assets/sound/02_platform/17platform.m4a`,
    `${basePath}/assets/sound/02_platform/18platform.m4a`,
    `${basePath}/assets/sound/02_platform/19platform.m4a`,
    `${basePath}/assets/sound/02_platform/20platform.m4a`,
    `${basePath}/assets/sound/02_platform/21platform.m4a`,
    `${basePath}/assets/sound/02_platform/22platform.m4a`,
  ];

  const startTimes = [
    0, 2.64562358276644, 7.8454421768707485, 9.562267573696145,
    14.808526077097506, 16.989750566893424, 18.52081632653061,
    25.462131519274376, 27.225396825396825, 32.309115646258505,
    35.58167800453515, 40.03845804988662, 43.914739229024946, 48.16253968253969,
    51.992380952380955, 56.054421768707485, 61.41678004535147,
    64.71256235827664, 66.40616780045352, 68.12299319727892, 69.7469387755102,
    77.94213151927437, 82.58467120181405, 85.0677551020408, 89.94249433106575,
    92.68099773242629, 96.23219954648525, 100.73541950113378,
    106.72471655328798, 108.74340136054421,
  ];

  async function fetchAudioBuffer(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      console.log(`Fetched and decoded audio data for ${url}`);
      return audioBuffer;
    } catch (error) {
      console.error(`Error fetching or decoding audio data for ${url}:`, error);
      return null;
    }
  }

  async function concatenateAudioBuffers() {
    const buffers = await Promise.all(audioFiles.map(fetchAudioBuffer));
    const validBuffers = buffers.filter(buffer => buffer !== null);
    if (validBuffers.length === 0) {
      throw new Error('No valid audio buffers available for concatenation.');
    }
    const totalLength = validBuffers.reduce(
      (sum, buffer) => sum + buffer.length,
      0
    );
    const concatenatedBuffer = audioContext.createBuffer(
      validBuffers[0].numberOfChannels,
      totalLength,
      validBuffers[0].sampleRate
    );
    let offset = 0;
    for (const buffer of validBuffers) {
      for (let i = 0; i < buffer.numberOfChannels; i++) {
        concatenatedBuffer.copyToChannel(buffer.getChannelData(i), i, offset);
      }
      offset += buffer.length;
    }
    return concatenatedBuffer;
  }

  async function initializeAudio() {
    console.log('initializeAudio called');
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    concatenatedBuffer = await concatenateAudioBuffers();
  }

  function playAudio(resumeTime = 0) {
    console.log('playAudio called', resumeTime);
    source = audioContext.createBufferSource();
    source.buffer = concatenatedBuffer;
    source.connect(audioContext.destination);
    source.start(0, resumeTime);
    isPlaying = true;
    playButton.src = 'assets/img/icons/pause.png';
    hexcliffLogo.style.opacity = '0';
    btnHex.style.opacity = '0';
    btnHex.style.pointerEvents = 'none';
    btnHex.style.cursor = 'default';
    btnHex.style.zIndex = '-1';

    source.onended = function () {
      isPlaying = false;
      playButton.src = 'assets/img/icons/play.png';
      hexcliffLogo.style.opacity = '1';
      btnHex.style.opacity = '1';
      btnHex.style.pointerEvents = 'all';
      btnHex.style.cursor = 'pointer';
      btnHex.style.zIndex = '1000';
      resumeTime = 0; // Reset resume time when playback ends
    };
  }

  function pauseAudio() {
    console.log('pauseAudio called');
    if (source) {
      source.stop();
      resumeTime = audioContext.currentTime; // Update resume time
      isPlaying = false;
      playButton.src = 'assets/img/icons/play.png';

      // Clear all scheduled highlight timeouts
      highlightTimeouts.forEach(timeout => clearTimeout(timeout));
    }
  }

  function togglePlayPause() {
    console.log('togglePlayPause called');
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio(resumeTime);
      highlightPhrases(resumeTime); // Resume highlighting when audio is played again
    }
  }

  function highlightPhrases(startTime = 0) {
    console.log('highlightPhrases called');
    highlightTimeouts.forEach(timeout => clearTimeout(timeout)); // Clear any existing timeouts

    // Calculate the offset time based on the resume time
    const offset = startTime * 1000;

    phrases.forEach((phrase, index) => {
      const phraseStartTime = startTimes[index - 1] * 1000; // Convert to milliseconds
      const delay = phraseStartTime - offset;

      if (delay >= 0) {
        // Schedule only future highlights
        const timeoutId = setTimeout(() => {
          console.log(
            `Highlighting phrase at index: ${index}, startTime: ${
              phraseStartTime / 1000
            }`
          );
          phrase.classList.add('highlight');

          // Remove highlight from previous phrase
          if (index > 0) {
            phrases[index - 1].classList.remove('highlight');
          }
        }, delay);

        highlightTimeouts.push(timeoutId);
      }
    });
  }

  async function startNarration() {
    try {
      console.log('startNarration called');
      await initializeAudio();
      highlightPhrases();
      togglePlayPause();
    } catch (error) {
      console.error('Error initializing narration:', error);
    }
  }

  startButton.addEventListener('click', async function () {
    console.log('startButton clicked');
    playWrapper.style.opacity = '1';
    playWrapper.style.pointerEvents = 'all';
    playWrapper.style.cursor = 'pointer';
    playButton.style.cursor = 'pointer';
    btnIntro.style.backgroundColor = 'transparent';
    btnIntro.style.display = 'none';
    startButton.style.display = 'none';
    await startNarration();
  });

  playButton.addEventListener('click', function () {
    togglePlayPause();
  });
});
