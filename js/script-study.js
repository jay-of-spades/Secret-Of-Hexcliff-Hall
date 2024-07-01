const prodMode = window.location.href.includes('jay-of-spades.github.io/');
const basePath = prodMode ? '/Secrets-Of-Hexcliff-Hall' : '';

let instructionImgSequence = [
  [
    `${basePath}/assets/img/study/instructions/00instruction.jpg`,
    `${basePath}/assets/img/study/instructions/01instruction.jpg`,
    `${basePath}/assets/img/study/instructions/02instruction.jpg`,
    `${basePath}/assets/img/study/instructions/03instruction.jpg`,
    `${basePath}/assets/img/study/instructions/04instruction.jpg`,
    `${basePath}/assets/img/study/instructions/05instruction.jpg`,
    `${basePath}/assets/img/study/instructions/06instruction.jpg`,
    `${basePath}/assets/img/study/instructions/07instruction.jpg`,
    `${basePath}/assets/img/study/instructions/08instruction.jpg`,
    `${basePath}/assets/img/study/instructions/09instruction.jpg`,
    `${basePath}/assets/img/study/instructions/10instruction.jpg`,
    `${basePath}/assets/img/study/instructions/11instruction.jpg`,
    `${basePath}/assets/img/study/instructions/12instruction.jpg`,
    `${basePath}/assets/img/study/instructions/13instruction.jpg`,
    `${basePath}/assets/img/study/instructions/14instruction.jpg`,
    `${basePath}/assets/img/study/instructions/15instruction.jpg`,
    `${basePath}/assets/img/study/instructions/16instruction.jpg`,
    `${basePath}/assets/img/study/instructions/17instruction.jpg`,
    `${basePath}/assets/img/study/instructions/18instruction.jpg`,
    `${basePath}/assets/img/study/instructions/19instruction.jpg`,
    `${basePath}/assets/img/study/instructions/20instruction.jpg`,
    `${basePath}/assets/img/study/instructions/21instruction.jpg`,
    `${basePath}/assets/img/study/instructions/22instruction.jpg`,
  ],
];

let instructionTimeStamps = [
  [
    0, 9, 16, 27, 37, 53, 70, 82.578459, 94.631696, 103, 111.165712, 115,
    123.99984, 131.047158, 137.016991, 141.892733, 145.163709, 153.774407,
    148.537332, 162.398085, 179.351857, 192.030624, 211.251688,
  ],
];

let instructionAudio = document.getElementById('instructionAudio');
let instructionImage = document.getElementById('instructionImage');
let instructionIcon = document.querySelector('.showInstruction');
let pausePlayBtn = document.querySelector('.pause-play-btn');
let closeButton = document.querySelector('.exit-btn');
let exitOpening = document.querySelector('.exit-opening');
let btnIntro = document.querySelector('.button-intro');
let openInstruction = document.querySelector('.open-instruction');
let currentModal = {
  modal: null,
  instructionAudio: null,
  instructionImage: null,
  instructionImgSrc: null,
  pausePlayBtn: null,
  exitBtn: null,
};
let clueIcon = document.querySelector('.clue-icon');
let randomPassages = [
  'What a fine morning.',
  'Stars twinkled above the quiet town.',
  'A gentle breeze whispered through the trees.',
  'Laughter echoed in the hallway.',
  'The clock ticked softly in the background.',
  'Sunlight streamed through the window.',
  'A cat napped lazily on the windowsill.',
  'The smell of fresh coffee filled the air.',
  'Rain pattered gently against the roof.',
  'Birds chirped cheerfully outside.',
  'The book lay open, pages fluttering.',
  'A car honked in the distance.',
  'Footsteps echoed on the cobblestone street.',
  'The fire crackled warmly.',
  'The moon shone brightly in the night sky.',
  'A dog barked somewhere nearby.',
  'Leaves rustled in the wind.',
  'The door creaked open slowly.',
  'The kettle whistled on the stove.',
  "A child's giggle filled the room.",
  'The waves crashed against the shore.',
  'A pen scratched across paper.',
  'Music played softly in the background.',
  'The clock struck midnight.',
  'A butterfly flitted past the window.',
  'The room was filled with silence.',
  'The phone rang abruptly.',
  'A train whistled in the distance.',
  'The sky was a canvas of colors at sunset.',
  'Footprints marked the freshly fallen snow.',
  'The air smelled of rain.',
  'A bell chimed in the distance.',
  'The garden was alive with color.',
  'The wind howled outside the house.',
  "Keys jingled in someone's pocket.",
  'The path wound through the forest.',
  'An apple fell from the tree.',
  'The swing moved gently in the breeze.',
  'A book dropped to the floor with a thud.',
  "The clock's hands moved slowly.",
  'Lightning flashed across the sky.',
  'The stairs creaked underfoot.',
  'The coffee was warm in her hands.',
  'Children played in the park.',
  'The painting hung crooked on the wall.',
  'A frog jumped into the pond.',
  'The city buzzed with life.',
  'The candle flickered in the dark room.',
  'A shadow moved across the wall.',
  'The room was filled with the scent of lilacs.',
  'She tucked a flower behind her ear.',
  'A squirrel scampered up a tree.',
  'The beach was deserted at dawn.',
  'The gate swung shut with a clang.',
  'The train pulled into the station.',
  'A spider spun its web in the corner.',
  'He folded the newspaper neatly.',
  'The room was bathed in the soft glow of the lamp.',
  'An owl hooted in the distance.',
  'He traced the words in the book with his finger.',
  'The garden gate creaked as it opened.',
  'A leaf drifted slowly to the ground.',
  'The road stretched out ahead.',
  'She brushed a tear from her cheek.',
  'The wind rustled the curtains.',
  'A car pulled into the driveway.',
  'The clock in the town square chimed three.',
  'He whistled a tune as he walked.',
  'The room echoed with laughter.',
  'A vase of flowers brightened the table.',
  'The old tree stood tall and strong.',
  'She gazed at the stars above.',
  'The air was crisp and cool.',
  'A bird sang from the treetop.',
  'The sun dipped below the horizon.',
  'Footprints led down to the beach.',
  'A cat curled up in the warm sunlight.',
  'The bell rang, signaling the end of the day.',
  'Raindrops raced down the windowpane.',
  'The bookshelf was lined with old, leather-bound books.',
  'The café was cozy and inviting.',
  'A boat bobbed gently on the water.',
  'The wind carried the scent of the ocean.',
  'She picked up a shell from the sand.',
  'The fireplace crackled on a cold night.',
  'The old clock kept time, steadfast and true.',
  'The path was lined with blooming flowers.',
  'He looked out over the bustling city.',
  'The stars seemed to twinkle with secrets.',
  'A deer peeked out from behind the trees.',
  'The lighthouse stood guard over the bay.',
  'The old bridge arched gracefully over the river.',
  'She danced with joy in the rain.',
  'The leaves turned brilliant colors in the fall.',
  'The snow-capped mountains stood majestically in the distance.',
  'The bakery smelled of fresh bread and pastries.',
  "The night was quiet except for the cricket's song.",
  'He lit a candle and the room glowed softly.',
  'The old photograph brought back memories.',
  'The train chugged along the countryside.',
];

let passagesWithPageNumbers = randomPassages.map(passage => {
  return { line: passage, pageNumber: null };
});

document
  .querySelector('#instructionAudio')
  .addEventListener('pause', function () {
    console.log('Timestamp:', this.currentTime);
  });

console.log(passagesWithPageNumbers);

let pillarSongs = [
  {
    id: 1,
    name: 'Yesterday',
    lines: [
      'Yesterday, all my troubles seemed so far away',
      "Now it looks as though they're here to stay",
      'Oh, I believe in yesterday',
    ],
    pageNumber: [],
    pillarSongIntroSrc: `${basePath}/assets/sound/07study/pillarSongsIntro/01pillarSongs.m4a`,
    pillarSongsSrc: `${basePath}/assets/sound/07Study/pillarSongs/01pillarSongs.m4a`,
  },
  {
    id: 2,
    name: 'Imagine',
    lines: [
      "You may say I'm a dreamer",
      "But I'm not the only one",
      "I hope someday you'll join us",
    ],
    pageNumber: [],
    pillarSongIntroSrc: `${basePath}/assets/sound/07Study/pillarSongsIntro/02pillarSongs.m4a`,
    pillarSongsSrc: `${basePath}/assets/sound/07Study/pillarSongs/02pillarSongs.m4a`,
  },
  {
    id: 3,
    name: 'Billie Jean',
    lines: [
      'Billie Jean is not my lover',
      "She's just a girl who claims that I am the one",
      'But the kid is not my son',
    ],
    pageNumber: [],
    pillarSongIntroSrc: `${basePath}/assets/sound/07Study/pillarSongsIntro/03pillarSongs.m4a`,
    pillarSongsSrc: `${basePath}/assets/sound/07Study/pillarSongs/03pillarSongs.m4a`,
  },
  {
    id: 4,
    name: 'Bohemian Rhapsody',
    lines: [
      'Is this the real life?',
      'Is this just fantasy?',
      'Caught in a landslide, no escape from reality',
    ],
    pageNumber: [],
    pillarSongIntroSrc: `${basePath}/assets/sound/07Study/pillarSongsIntro/04pillarSongs.m4a`,
    pillarSongsSrc: `${basePath}/assets/sound/07Study/pillarSongs/04pillarSongs.m4a`,
  },
  {
    id: 5,
    name: 'Hey Jude',
    lines: [
      "Hey Jude, don't make it bad",
      'Take a sad song and make it better',
      'Remember to let her into your heart',
    ],
    pageNumber: [],
    pillarSongIntroSrc: `${basePath}/assets/sound/07Study/pillarSongsIntro/05pillarSongs.m4a`,
    pillarSongsSrc: `${basePath}/assets/sound/07Study/pillarSongs/05pillarSongs.m4a`,
  },
  {
    id: 6,
    name: 'Hit me baby one more time',
    lines: [
      'Oh baby, baby',
      'How was I supposed to know',
      'That something wasnt right here',
    ],
    pageNumber: [],
    pillarSongIntroSrc: `${basePath}/assets/sound/07Study/pillarSongsIntro/06pillarSongs.m4a`,
    pillarSongsSrc: `${basePath}/assets/sound/07Study/pillarSongs/06pillarSongs.m4a`,
  },
  {
    id: 7,
    name: 'I want it that way',
    lines: ['You are my fire', 'The one desire', 'Believe when I say'],
    pageNumber: [],
    pillarSongIntroSrc: `${basePath}/assets/sound/07Study/pillarSongsIntro/07pillarSongs.m4a`,
    pillarSongsSrc: `${basePath}/assets/sound/07Study/pillarSongs/07pillarSongs.m4a`,
  },
  {
    id: 8,
    name: 'My heart will go on',
    lines: [
      'Every night in my dreams',
      'I see you, I feel you',
      'That is how I know you go on',
    ],
    pageNumber: [],
    pillarSongIntroSrc: `${basePath}/assets/sound/07Study/pillarSongsIntro/08pillarSongs.m4a`,
    pillarSongsSrc: `${basePath}/assets/sound/07Study/pillarSongs/08pillarSongs.m4a`,
  },
  {
    id: 9,
    name: 'Smells like teen spirit',
    lines: [
      "With the lights out, it's less dangerous",
      'Here we are now, entertain us',
      'I feel stupid and contagious',
    ],
    pageNumber: [],
    pillarSongIntroSrc: `${basePath}/assets/sound/07Study/pillarSongsIntro/09pillarSongs.m4a`,
    pillarSongsSrc: `${basePath}/assets/sound/07Study/pillarSongs/09pillarSongs.m4a`,
  },
  {
    id: 10,
    name: 'Thriller',
    lines: [
      'Its close to midnight',
      'Something evils lurking in the dark',
      'Under the moonlight',
    ],
    pageNumber: [],
    pillarSongIntroSrc: `${basePath}/assets/sound/07Study/pillarSongsIntro/10pillarSongs.m4a`,
    pillarSongsSrc: `${basePath}/assets/sound/07Study/pillarSongs/10pillarSongs.m4a`,
  },
  {
    id: 11,
    name: 'Wonderwall',
    lines: [
      'Today is gonna be the day',
      'That theyre gonna throw it back to you',
      'By now you shouldve somehow',
    ],
    pageNumber: [],
    pillarSongIntroSrc: `${basePath}/assets/sound/07Study/pillarSongsIntro/11pillarSongs.m4a`,
    pillarSongsSrc: `${basePath}/assets/sound/07Study/pillarSongs/11pillarSongs.m4a`,
  },
  {
    id: 12,
    name: 'Like a virgin',
    lines: [
      'Like a virgin',
      'Touched for the very first time',
      'Like a virgin, when your heart beats, next to mine',
    ],
    pageNumber: [],
    pillarSongIntroSrc: `${basePath}/assets/sound/07Study/pillarSongsIntro/12pillarSongs.m4a`,
    pillarSongsSrc: `${basePath}/assets/sound/07Study/pillarSongs/12pillarSongs.m4a`,
  },
  {
    id: 13,
    name: 'Heart and soul',
    lines: [
      'I fell in love with you',
      'Heart and soul',
      'The way a fool would do, madly',
    ],
    pageNumber: [],
    pillarSongIntroSrc: `${basePath}/assets/sound/07Study/pillarSongsIntro/13pillarSongs.m4a`,
    pillarSongsSrc: `${basePath}/assets/sound/07Study/pillarSongs/13pillarSongs.m4a`,
  },
  {
    id: 14,
    name: 'I will survive',
    lines: [
      'At first I was afraid, I was petrified',
      'Kept thinking I could never live without you by my side',
      'But then I spent so many nights',
    ],
    pageNumber: [],
    pillarSongIntroSrc: `${basePath}/assets/sound/07Study/pillarSongsIntro/14pillarSongs.m4a`,
    pillarSongsSrc: `${basePath}/assets/sound/07Study/pillarSongs/14pillarSongs.m4a`,
  },
  {
    id: 15,
    name: 'November rain',
    lines: [
      'When I look into your eyes',
      'I can see a love restrained',
      "But darlin' when I hold you",
    ],
    pageNumber: [],
    pillarSongIntroSrc: `${basePath}/assets/sound/07Study/pillarSongsIntro/15pillarSongs.m4a`,
    pillarSongsSrc: `${basePath}/assets/sound/07Study/pillarSongs/15pillarSongs.m4a`,
  },
];

let currentItem = null;
let btnContainer = document.querySelector('.button-container');
let gameItems = document.querySelectorAll('.game-item');
let easyMode = document.querySelector('#easy-mode');
let hardMode = document.querySelector('#hard-mode');
let modeContainer = document.querySelector('.mode-container');
let isModeChosen = false;
let isEasyMode = false;
let selectedPillarSong;
let songsChoices = document.querySelector('.songs-choices');
let keep = document.querySelector('.keep');
let pass = document.querySelector('.pass');
let toss = document.querySelector('.toss');
let feedback = document.querySelector('#feedback');
let feedbackLine = document.querySelector('.feedback-line');
let feedbackLinePage = document.querySelector('.feedback-line-page');
let questItemWrapper = document.querySelector('.quest-item-wrapper');
let puzzleWrapper = document.querySelector('.puzzle-wrapper');
let questItems = document.querySelectorAll('.quest-item');
let jukebox = document.querySelector('.jukebox');
let frames = document.querySelectorAll('.frame');
let questItemFrames = document.querySelectorAll('.quest-item-frame');
let isQuestItemsFilled = false;
let playPillarSong = document.querySelector('#play-pillar-song');
let loseAndLaugh = document.querySelector('.lose-and-laugh');
let current = 0;
let farewell = document.querySelector('#farewell');
let farewellAudio = document.querySelector('#farewellAudio');
let phrases = document.querySelectorAll('.phrase');
let farewellTimestamps = [
  10.39561, 12.260549, 17.840754, 22.48466, 29.054841, 33.621724, 43.404911,
  49.003103, 55.799547, 63.587596, 70.060869, 80.467893, 85.861368, 91.087475,
  99.813261, 105.126054, 114.931966, 123.061774, 131.021934, 137.65669,
  145.071284, 152.481866, 156.768718, 161.47565, 166.836764, 171.10104,
  177.967812, 181.012788, 184.331544, 189.881907, 205.861959, 213.256405,
  215.299955, 224.230918, 230.30204, 233.868449, 239.189087, 246.516955,
  252.708438,
];

console.log('Farewell Timestamps:', farewellTimestamps, 'phrases:', phrases);

let hexcliffLogo = document.querySelector('.hexcliff-logo');

// Instruction Modal
console.log('Timestamps: ', instructionTimeStamps);
console.log('Image Sequence: ', instructionImgSequence);

document.querySelector('#farewellAudio').addEventListener('pause', function () {
  console.log('Timestamp:', this.currentTime);
});

instructionIcon.addEventListener('click', () =>
  openModal('#instructionModal', 0)
);

openInstruction.addEventListener('click', () =>
  openModal('#instructionModal', 0)
);

exitOpening.addEventListener('click', function () {
  btnIntro.style.backgroundColor = 'transparent';
  btnIntro.style.display = 'none';
  modeContainer.style.display = 'block';
  playPillarSong.disbaled = true;
  playPillarSong.style.opacity = '0';
  puzzleWrapper.style.opacity = '0';
  puzzleWrapper.style.pointerEvents = 'none';
  puzzleWrapper.style.cursor = 'none';
  closeModal('#instructionModal');
});

function openModal(modalId, index, xtrFxn) {
  const modal = document.querySelector(modalId);
  currentModal = {
    modal: modal,
    instructionAudio: modal.querySelector('#instructionAudio'),
    instructionImage: modal.querySelector('#instructionImage'),
    instructionImgSrc: modal.querySelector('#instructionImage').src,
    instructionImageSequence: instructionImgSequence[index],
    instructionTimestamps: instructionTimeStamps[index],
    pausePlayBtn: modal.querySelector('.pause-play-btn'),
    exitBtn: modal.querySelector('.exit-btn'),
  };

  modal.style.display = 'block';
  btnIntro.style.display = 'none';
  currentModal.instructionAudio.play();
  currentModal.instructionAudio.addEventListener('timeupdate', function () {
    instructionSequence(index);
  });
  currentModal.pausePlayBtn.addEventListener('click', pausePlay);
  currentModal.exitBtn.addEventListener('click', () =>
    closeModal(xtrFxn, index)
  );
}

function closeModal(xtrFxn, index) {
  if (currentModal.modal) {
    currentModal.modal.style.display = 'none';
    resetAudio();
    currentModal.modal.removeEventListener('timeupdate', function () {
      instructionSequence(index);
    });
    currentModal = {
      modal: null,
      instructionAudio: null,
      instructionImage: null,
      instructionImgSrc: null,
      pausePlayBtn: null,
      exitBtn: null,
    };
    if (modeContainer.classList.contains('d-none')) {
      modeContainer.classList.remove('d-none');
    }
    if (xtrFxn) {
      xtrFxn();
    }
  }
}

function resetAudio() {
  if (currentModal.instructionAudio) {
    currentModal.instructionAudio.currentTime = 0;
    currentModal.instructionAudio.pause();
    currentModal.pausePlayBtn.src = `${basePath}/assets/img/icons/pause-play.png`;
    currentModal.instructionImage.src = currentModal.instructionImgSrc;
  }
}

function instructionSequence(index) {
  if (currentModal.instructionAudio) {
    const currentTime = currentModal.instructionAudio.currentTime;
    for (let i = 0; i < instructionTimeStamps[index].length - 1; i++) {
      if (
        currentTime >= instructionTimeStamps[index][i] &&
        currentTime < instructionTimeStamps[index][i + 1]
      ) {
        currentModal.instructionImage.src = `${instructionImgSequence[index][i]}`;
        break;
      }
    }

    if (
      currentTime >=
      instructionTimeStamps[index][instructionTimeStamps[index].length - 1]
    ) {
      currentModal.instructionImage.src = `${
        instructionImgSequence[index][instructionImgSequence[index].length - 1]
      }`;
    }
  }
}

function pausePlay() {
  if (currentModal.instructionAudio.paused) {
    currentModal.instructionAudio.play();
    currentModal.pausePlayBtn.src = `${basePath}/assets/img/icons/play.png`;
  } else {
    currentModal.instructionAudio.pause();
    currentModal.pausePlayBtn.src = `${basePath}/assets/img/icons/pause.png`;
  }
}
//end - instructions

//begin - search for lines and pages
easyMode.addEventListener('click', function () {
  isModeChosen = true;
  isEasyMode = true;
  jukebox.style.display = 'block';
  toggleModes();
  startGame();
});
hardMode.addEventListener('click', function () {
  isModeChosen = true;
  isEasyMode = false;
  toggleModes();
  startGame();
});

gameItems.forEach(item => {
  item.addEventListener('click', function () {
    if (isModeChosen) {
      return;
    } else {
      playAudio(`${basePath}/assets/sound/07Study/gameMode.mp3`);
      hardMode.classList.add('blink2');
      hardMode.classList.add('geelbox');
      easyMode.classList.add('blink2');
      easyMode.classList.add('geelbox');
    }
  });
});

function toggleModes() {
  easyMode.classList.toggle('d-none');
  hardMode.classList.toggle('d-none');
}

function startGame() {
  assignRandomPageNumbers();
  selectRandomPillarSongs();
  markGameitem();
  if (easyMode) {
    jukebox.addEventListener('click', () =>
      playAudio(selectedPillarSong.pillarSongIntroSrc)
    );
  }
  questItems.forEach(item => {
    console.log('Quest item:', item.style.backgroundImage);
  });
}
function playAudio(src) {
  var audio = new Audio(src);
  audio.play().catch(e => console.error('Error playing audio:', e));
}

function assignRandomPageNumbers() {
  passagesWithPageNumbers.forEach(passage => {
    passage.pageNumber = generateRandomNumber(1, 99);
  });
  pillarSongs.forEach(song => {
    song.pageNumber = [
      generateRandomNumber(1, 99),
      generateRandomNumber(1, 99),
      generateRandomNumber(1, 99),
    ];
  });
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function selectRandomPillarSongs() {
  const pillarIndex = generateRandomNumber(0, pillarSongs.length - 1);
  selectedPillarSong = pillarSongs[pillarIndex];
  plugInSongLinesIntoGameItems();
}

function plugInSongLinesIntoGameItems() {
  let unusedItems = Array.from(gameItems);

  selectedPillarSong.lines.forEach((line, i) => {
    const randomIndex = generateRandomNumber(0, unusedItems.length - 1);
    const selectedGameItem = unusedItems[randomIndex];
    console.log('Selected Game Item:', selectedGameItem);
    unusedItems.splice(randomIndex, 1);
    console.log(
      `Setting line: ${line}, Page Number: ${selectedPillarSong.pageNumber[i]} to item`
    );

    selectedGameItem.dataset.line = line;
    selectedGameItem.dataset.pageNumber = selectedPillarSong.pageNumber[i];
  });
  unusedItems.forEach(item => {
    const randomPassageIndex = generateRandomNumber(
      0,
      passagesWithPageNumbers.length - 1
    );
    const passage = passagesWithPageNumbers[randomPassageIndex];

    item.dataset.line = passage.line;
    item.dataset.pageNumber = passage.pageNumber;
  });
}

function markGameitem() {
  gameItems.forEach(item => {
    item.addEventListener('click', function () {
      handleMarkedGameitem(this);
    });
    item.style.pointerEvents = 'all';
    item.style.cursor = 'pointer';
    item.addEventListener('mouseenter', addGeelBoxClass.bind(null, item));

    item.addEventListener('mouseleave', removeGeelBoxClass.bind(null, item));
  });
}

function handleMarkedGameitem(item) {
  if (!item.classList.contains('used')) {
    currentItem = item;
    const line = item.dataset.line;
    const pageNumber = item.dataset.pageNumber;
    feedbackLine.textContent = line;
    feedbackLinePage.textContent = pageNumber;
    if (isEasyMode) {
      handleEasyMode(item);
    } else {
      handleHardMode(item);
    }
  }
}

function addGeelBoxClass(item) {
  item.classList.add('geelbox');
}

function removeGeelBoxClass(item) {
  item.classList.remove('geelbox');
}

function handleEasyMode() {
  feedback.style.display = 'block';
  questItemWrapper.style.display = 'block';
  setupQuestItemHover();
  songsChoices.style.display = 'block';
}

function handleHardMode() {
  handleEasyMode();
  pass.style.display = 'none';
}

function setupQuestItemHover() {
  if (isQuestItemsFilled) {
    return;
  } else {
    questItems.forEach(item => {
      item.addEventListener('mouseenter', function () {
        const span = this.querySelector('.quest-item-span');
        if (span) {
          span.classList.add('d-block');
        }
      });

      item.addEventListener('mouseleave', function () {
        const span = this.querySelector('.quest-item-span');
        if (span) {
          span.classList.remove('d-block');
        }
      });
    });
  }
}

keep.addEventListener('click', function () {
  if (
    currentItem &&
    currentItem.dataset.line &&
    currentItem.dataset.pageNumber
  ) {
    addToQuestItems(currentItem.dataset.line, currentItem.dataset.pageNumber);
    currentItem.classList.add('used');
    currentItem.removeEventListener('click', function () {
      handleMarkedGameitem(currentItem);
    });
    closeSongChoices();
    currentItem = null;
  } else {
    console.log('No data in currentItem or currentItem is null');
  }
});

pass.addEventListener('click', function () {
  closeSongChoices();
});
toss.addEventListener('click', function () {
  if (currentItem) {
    currentItem.style.display = 'none';
    currentItem = null;
  }
  closeSongChoices();
});

function closeSongChoices() {
  songsChoices.style.display = 'none';
  feedback.style.display = 'none';
  feedbackLine.textContent = '';
  feedbackLinePage.textContent = '';
}

function addToQuestItems(line, pageNumber) {
  const filledItemCount = Array.from(questItems).filter(
    item => item.dataset.line
  ).length;

  console.log('Filled Item Count:', filledItemCount);

  if (filledItemCount < 3) {
    for (const item of questItems) {
      if (!item.dataset.line) {
        item.dataset.line = line;
        item.dataset.pageNumber = pageNumber;
        item.style.opacity = '1';
        item.classList.remove('sepiaBox');
        const span = item.querySelector('span');

        if (span) {
          span.innerHTML = `${pageNumber} - ${line}`;
        }
        console.log('Added to quest item:', item);
        console.log('Updated span:', span.textContent);
        break;
      }
    }
  }

  if (filledItemCount === 2) {
    console.log('All quest items filled. Proceeding to puzzle.');
    isQuestItemsFilled = true;
    playPillarSong.disbaled = false;
    playPillarSong.style.opacity = '0.5';
    playPillarSong.style.pointerEvents = 'cursor';
    puzzleWrapper.style.opacity = '1';
    puzzleWrapper.style.pointerEvents = 'all';

    frames.forEach(frame => {
      frame.style.pointerEvents = 'all';
    });
    questItems.forEach(item => {
      console.log('Quest item:', item.style.backgroundImage);
    });
    puzzleWrapper.style.zIndex = '1000';

    setupPuzzleInteraction();
  }
}
//end - search for lines and pages

//begin - puzzle
function addDragAndDropListeners() {
  const questItems = document.querySelectorAll('.quest-item');
  questItems.forEach((item, index) => {
    item.setAttribute('draggable', true);
    item.setAttribute('id', 'quest-item-' + (index + 1));
    item.addEventListener('dragstart', dragStart);
  });

  const puzzleFrames = document.querySelectorAll(
    '.puzzle-frame .quest-item-frame'
  );
  puzzleFrames.forEach(frame => {
    frame.addEventListener('dragover', dragOver);
    frame.addEventListener('drop', drop);
  });
}

function dragStart(event) {
  let backgroundImage = window.getComputedStyle(event.target).backgroundImage;
  event.target.setAttribute('data-background', backgroundImage);

  const span = event.currentTarget.querySelector('.quest-item-span');
  if (span) {
    span.style.display = 'none';
  }
  event.stopPropagation();
  event.dataTransfer.setData('text', event.target.id);
}

function dragEnd(event) {
  const span = event.currentTarget.querySelector('.quest-item-span');
  if (span) {
    span.style.display = 'block';
  }
}

function dragOver(event) {
  event.preventDefault();
}
function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData('text/plain');
  const draggedItem = document.getElementById(data);
  const backgroundImage = draggedItem.getAttribute('data-background');

  let dropTarget = event.target;
  if (!dropTarget.classList.contains('quest-item-frame')) {
    dropTarget = dropTarget.closest('.quest-item-frame');
  }
  if (!dropTarget) return;

  const frameParent = dropTarget.closest('.puzzle-frame');
  const numberElement = frameParent.querySelector('h2');
  if (numberElement) {
    numberElement.textContent = draggedItem.dataset.pageNumber;
    numberElement.style.background = 'none';
    numberElement.style.border = 'none';
    numberElement.style.zIndex = '1003';
    numberElement.style.color = 'var(--accent-color)';
    numberElement.style.textShadow = `1px 0px 5px var(--light-color-75), 
      -1px 0px 5px var(--light-color-75), 
      0px 2px 5px var(--light-color-75)`;
  }

  dropTarget.dataset.line = draggedItem.dataset.line;
  dropTarget.dataset.pageNumber = draggedItem.dataset.pageNumber;
  dropTarget.style.opacity = '0.6';

  if (backgroundImage && backgroundImage !== 'none') {
    dropTarget.style.backgroundImage = backgroundImage;
  } else {
    console.log('No background image found on dragged item.');
  }
  playFeedbackSound(dropTarget);

  checkIfPuzzleComplete();
}

function playFeedbackSound(dropTarget) {
  let audioSrc;
  if (dropTarget.id === 'drop-target-1') {
    audioSrc = `${basePath}/assets/sound/07Study/vault/01Pillar.mp3`;
  } else if (dropTarget.id === 'drop-target-2') {
    audioSrc = `${basePath}/assets/sound/07Study/vault/02Pillar.mp3`;
  } else if (dropTarget.id === 'drop-target-3') {
    audioSrc = `${basePath}/assets/sound/07Study/vault/03Pillar.mp3`;
  }

  if (audioSrc) {
    var audio = new Audio(audioSrc);
    audio.play();
  }
}

function setupPuzzleInteraction() {
  addDragAndDropListeners();
  playPillarSong.disabled = true;
}

function checkIfPuzzleComplete() {
  const questItemFrames = document.querySelectorAll(
    '.puzzle-frame .quest-item-frame'
  );
  const allFilled = Array.from(questItemFrames).every(
    frame => frame.dataset.line
  );

  if (allFilled) {
    playPillarSong.disabled = false;
    playPillarSong.style.opacity = '1';
    playPillarSong.style.pointerEvents = 'all';
    playPillarSong.style.cursor = 'pointer';
  }
}

playPillarSong.addEventListener('click', () => {
  const questItemFrames = document.querySelectorAll('.quest-item-frame');
  const framesArray = Array.from(questItemFrames);
  console.log('Expected Order:', selectedPillarSong.lines);
  console.log(
    "Player's Order:",
    framesArray.map(frame => frame.dataset.line)
  );

  const isCorrectOrder = framesArray.every((frame, index) => {
    return frame.dataset.line === selectedPillarSong.lines[index];
  });

  if (isCorrectOrder) {
    console.log('Correct order');
    btnContainer.style.display = 'none';
    questItemWrapper.style.display = 'none';
    puzzleWrapper.style.display = 'none';
    gameItems.forEach(item => {
      item.style.display = 'none';
    });
    const pillarSongAudio = new Audio(selectedPillarSong.pillarSongsSrc);
    pillarSongAudio.play();

    pillarSongAudio.addEventListener('ended', function () {
      jukebox.style.display = 'none';
      farewell.style.display = 'flex';
      farewellAudio.play();
    });
  } else {
    console.log('Incorrect order');
    const failAudio = new Audio(`${basePath}/assets/sound/07Study/fail.m4a`);
    failAudio.play();
    failAudio.addEventListener('ended', () => {
      loseAndLaugh.style.display = 'grid';
      const fertilizerAudio = new Audio(
        `${basePath}/assets/sound/07Study/fertilizer.mp3`
      );
      fertilizerAudio.play();
      fertilizerAudio.addEventListener('ended', () => {
        window.location.href = 'study.html';
      });
    });
  }
});
//end - puzzle

//begin - farewell
function highlightAndPlayPhrase() {
  if (current > 0) {
    phrases[current - 1].classList.remove('highlight');
  }

  if (current < phrases.length) {
    phrases[current].classList.add('highlight');
  }
}

function initializePhraseHighlighting() {
  farewellTimestamps.forEach(timestamp => {
    setTimeout(() => {
      current++;
      highlightAndPlayPhrase();
    }, timestamp * 1000);
  });
}

farewellAudio.addEventListener('play', function () {
  initializePhraseHighlighting();
});

farewellAudio.addEventListener('ended', function () {
  current = 0;
  phrases.forEach(phrase => {
    phrase.classList.remove('highlight');
  });
  farewell.style.display = 'none';
  hexcliffLogo.style.display = 'grid';
  hexcliffLogo.style.opacity = '1';
  console.log('Farewell audio ended');
});
//end - farewell
