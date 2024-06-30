let prodMode =
  window.location.href ===
  'https://jay-of-spades.github.io/Secrets-Of-Hexcliff-Hall/'
    ? true
    : false;
const basePath = prodMode ? '/Secrets-Of-Hexcliff-Hall' : '';

let crestIMG = [
  `${basePath}/assets/img/entranceHall/acorn.jpg`,
  `${basePath}/assets/img/entranceHall/stag.jpg`,
  `${basePath}/assets/img/entranceHall/lion.jpg`,
  `${basePath}/assets/img/entranceHall/feather.jpg`,
];

let audioFiles = [
  `${basePath}/assets/sound/03_entrance/01entrance.m4a`,
  `${basePath}/assets/sound/03_entrance/02entrance.m4a`,
  `${basePath}/assets/sound/03_entrance/03entrance.m4a`,
  `${basePath}/assets/sound/03_entrance/04entrance.m4a`,
  `${basePath}/assets/sound/03_entrance/05entrance.m4a`,
  `${basePath}/assets/sound/03_entrance/06entrance.m4a`,
  `${basePath}/assets/sound/03_entrance/07entrance.m4a`,
  `${basePath}/assets/sound/03_entrance/08entrance.m4a`,
  `${basePath}/assets/sound/03_entrance/09entrance.m4a`,
  `${basePath}/assets/sound/03_entrance/10entrance.m4a`,
  `${basePath}/assets/sound/03_entrance/11entrance.m4a`,
  `${basePath}/assets/sound/03_entrance/12entrance.m4a`,
  `${basePath}/assets/sound/03_entrance/13entrance.m4a`,
  `${basePath}/assets/sound/03_entrance/14entrance.m4a`,
  `${basePath}/assets/sound/03_entrance/15entrance.m4a`,
  `${basePath}/assets/sound/03_entrance/16entrance.m4a`,
  `${basePath}/assets/sound/03_entrance/17entrance.m4a`,
  `${basePath}/assets/sound/03_entrance/18entrance.m4a`,
];

let crestPieces = [
  { name: 'acorn', found: false, img: crestIMG[0], crestLocation: NaN },
  { name: 'stag', found: false, img: crestIMG[1], crestLocation: NaN },
  { name: 'lion', found: false, img: crestIMG[2], crestLocation: NaN },
  { name: 'feather', found: false, img: crestIMG[3], crestLocation: NaN },
];
let affirmativeResponse = [];
let negativeResponse = [];
let phrases = document.querySelectorAll('.phrase');
let narrationAudio = document.getElementById('narrationAudio');
let current = 0;
let currentSound = null;
let crestPiecesFound = 0;
let crestPiecesTotal = 4;
let allCrestsFound = false;
let crests = document.querySelectorAll('.quest-item');
let questItemWrapper = document.querySelector('.quest-item-wrapper');
let puzzleWrapper = document.querySelector('.puzzle-wrapper');
let puzzleFrames = document.querySelectorAll('.puzzle-frame');
let gameItems = document.querySelectorAll('.game-item');
let gameItemsArr = Array.from(gameItems);
let clueIcon = document.querySelector('.clue-icon');
let framesWithCrests = 0;
let framesWithMatchingCrests = 0;
let crestsArranged = false;
let instructionAudio = document.getElementById('instructionAudio');
let instructionImage = document.getElementById('instructionImage');
let instructionIcon = document.querySelector('.showInstruction');
let modal = document.getElementById('instructionModal');
let pausePlayBtn = document.querySelector('.pause-play-btn');
let closeButton = document.querySelector('.exit-btn');
let instructionTimeStamps = [13, 20, 38, 51, 63, 77, 83, 86, 95, 105];
let instructionImgSequence = [
  `${basePath}/assets/img/entranceHall/instructions/01instructions.jpg`,
  `${basePath}/assets/img/entranceHall/instructions/02instructions.jpg`,
  `${basePath}/assets/img/entranceHall/instructions/03instructions.gif`,
  `${basePath}/assets/img/entranceHall/instructions/04instructions.jpg`,
  `${basePath}/assets/img/entranceHall/instructions/05instructions.jpg`,
  `${basePath}/assets/img/entranceHall/instructions/06instructions.jpg`,
  `${basePath}/assets/img/entranceHall/instructions/07instructions.gif`,
  `${basePath}/assets/img/entranceHall/instructions/08instructions.jpg`,
  `${basePath}/assets/img/entranceHall/instructions/09instructions.jpg`,
  `${basePath}/assets/img/entranceHall/instructions/10instructions.jpg`,
];
let exitOpening = document.querySelector('.exit-opening');
let btnIntro = document.querySelector('.button-intro');
let openInstruction = document.querySelector('.open-instruction');

//begin - instructions
function resetAudio() {
  instructionAudio.currentTime = 0;
  instructionAudio.pause();
  pausePlayBtn.src = `${basePath}/assets/img/icons/pause-play.png`;
  instructionImage.src = `${basePath}/assets/img/hexcliffHall.jpg`;
}

instructionIcon.addEventListener('click', openModal);

openInstruction.addEventListener('click', openModal);

closeButton.addEventListener('click', closeModal);
exitOpening.addEventListener('click', function () {
  btnIntro.style.backgroundColor = 'transparent';
  btnIntro.style.display = 'none';
  closeModal();
});

function openModal() {
  modal.style.display = 'block';
  btnIntro.style.display = 'none';
  instructionAudio.play();
}

function closeModal() {
  modal.style.display = 'none';
  resetAudio();
  instructionAudio.removeEventListener('timeupdate', function () {});
}

instructionAudio.addEventListener('timeupdate', instructionSequence);

function instructionSequence() {
  const currentTime = instructionAudio.currentTime;
  if (
    currentTime >= instructionTimeStamps[0] &&
    currentTime < instructionTimeStamps[1]
  ) {
    instructionImage.src = `${instructionImgSequence[0]}`;
  } else if (
    currentTime >= instructionTimeStamps[1] &&
    currentTime < instructionTimeStamps[2]
  ) {
    instructionImage.src = `${instructionImgSequence[1]}`;
  } else if (
    currentTime >= instructionTimeStamps[2] &&
    currentTime < instructionTimeStamps[3]
  ) {
    instructionImage.src = `${instructionImgSequence[2]}`;
  } else if (
    currentTime >= instructionTimeStamps[3] &&
    currentTime < instructionTimeStamps[4]
  ) {
    instructionImage.src = `${instructionImgSequence[3]}`;
  } else if (
    currentTime >= instructionTimeStamps[4] &&
    currentTime < instructionTimeStamps[5]
  ) {
    instructionImage.src = `${instructionImgSequence[4]}`;
  } else if (
    currentTime >= instructionTimeStamps[5] &&
    currentTime < instructionTimeStamps[6]
  ) {
    instructionImage.src = `${instructionImgSequence[5]}`;
  } else if (
    currentTime >= instructionTimeStamps[6] &&
    currentTime < instructionTimeStamps[7]
  ) {
    instructionImage.src = `${instructionImgSequence[6]}`;
  } else if (
    currentTime >= instructionTimeStamps[7] &&
    currentTime < instructionTimeStamps[8]
  ) {
    instructionImage.src = `${instructionImgSequence[7]}`;
  } else if (
    currentTime >= instructionTimeStamps[8] &&
    currentTime < instructionTimeStamps[9]
  ) {
    instructionImage.src = `${instructionImgSequence[8]}`;
  } else if (currentTime >= instructionTimeStamps[9]) {
    instructionImage.src = `${instructionImgSequence[9]}`;
  }
}
pausePlayBtn.addEventListener('click', function () {
  if (instructionAudio.paused) {
    instructionAudio.play();
    pausePlayBtn.src = `${basePath}/assets/img/icons/play.png`;
  } else {
    instructionAudio.pause();
    pausePlayBtn.src = `${basePath}/assets/img/icons/pause.png`;
  }
});

//end - instructions

//begin - game play
for (let i = 1; i <= 16; i++) {
  let number = i.toString().padStart(2, '0');
  let filePath = `${basePath}/assets/sound/rightChoice/${number}correct.mp3`;
  affirmativeResponse.push(filePath);
}

for (let i = 1; i <= 15; i++) {
  let number = i.toString().padStart(2, '0');
  let filePath = `${basePath}/assets/sound/wrongChoice/${number}wrong.mp3`;
  negativeResponse.push(filePath);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function assignCrestPiecesToGameItems() {
  shuffleArray(gameItemsArr);

  for (let i = 0; i < crestPieces.length; i++) {
    crestPieces[i].crestLocation = gameItemsArr[i];
    console.log(crestPieces[i].crestLocation);
  }
}

assignCrestPiecesToGameItems();

gameItems.forEach(item => {
  item.addEventListener('click', function () {
    handleGameItemClick(this);
  });
  item.addEventListener('mouseenter', () => {
    item.classList.add('geelbox');
  });

  item.addEventListener('mouseleave', () => {
    item.classList.remove('geelbox');
  });
});

function playRandomSound(soundArray) {
  if (currentSound && !currentSound.paused) {
    currentSound.pause();
  }

  const randomIndex = Math.floor(Math.random() * soundArray.length);
  currentSound = new Audio(soundArray[randomIndex]);
  currentSound.play();
}

function handleGameItemClick(clickedItem) {
  let foundCrest = false;
  for (let i = 0; i < crestPieces.length; i++) {
    if (crestPieces[i].crestLocation === clickedItem && !crestPieces[i].found) {
      crestPieces[i].found = true;
      playRandomSound(affirmativeResponse);
      clickedItem.classList.add('blauwbox');
      crests[
        crestPiecesFound
      ].style.backgroundImage = `url(${crestPieces[i].img})`;
      crestPiecesFound++;
      questItemWrapper.style.display = 'flex';
      if (crestPiecesFound === crestPiecesTotal) {
        puzzleWrapper.style.opacity = '1';
        clueIcon.style.opacity = '1';
        clueIcon.style.pointerEvents = 'all';
        crests.forEach(crest => {
          crest.setAttribute('draggable', true);
          crest.addEventListener('dragstart', dragStart);
          crest.addEventListener('dragend', dragEnd);
        });
        gameItems.forEach(item => {
          item.classList.remove('geelbox');
          item.classList.remove('blauwbox');
          item.classList.remove('roodbox');
          item.style.pointerEvents = 'none';
        });
        allCrestsFound = true;
      }
      foundCrest = true;
      break;
    }
  }
  if (!foundCrest) {
    playRandomSound(negativeResponse);
    clickedItem.classList.add('roodbox');
  }
}

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.style.backgroundImage);
  setTimeout(() => (e.target.style.visibility = 'hidden'), 0);
}

function dragEnd(e) {
  e.target.style.visibility = '';
}

// Add event listeners to puzzle frames
puzzleFrames.forEach((frame, index) => {
  if (index !== 2) {
    // Exclude puzzleFrame[2]
    frame.addEventListener('dragover', dragOver);
    frame.addEventListener('dragenter', dragEnter);
    frame.addEventListener('dragleave', dragLeave);
    frame.addEventListener('drop', drop);
    framesWithCrests++;
  }
});

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add('hovered');
}

function dragLeave(e) {
  e.target.classList.remove('hovered');
}

function drop(e) {
  e.preventDefault();
  e.target.classList.remove('hovered');

  const data = e.dataTransfer.getData('text/plain');
  let crestFrame =
    e.target.querySelector('.quest-item-frame') ||
    e.target.closest('.quest-item-frame');

  if (crestFrame) {
    const frameIndex = Array.from(puzzleFrames).indexOf(
      crestFrame.closest('.puzzle-frame')
    );
    let crestIndex;
    switch (frameIndex) {
      case 0:
        crestIndex = 0;
        break;
      case 1:
        crestIndex = 1;
        break;
      case 3:
        crestIndex = 2;
        break;
      case 4:
        crestIndex = 3;
        break;
      default:
        return;
    }

    if (data.includes(crestPieces[crestIndex].name)) {
      crestFrame.style.backgroundImage = data;
      framesWithMatchingCrests++;

      if (framesWithMatchingCrests === crestPiecesTotal) {
        let lastCrestFrame = puzzleFrames[2].querySelector('.quest-item-frame');
        if (lastCrestFrame) {
          lastCrestFrame.style.backgroundImage = `url(${basePath}/assets/img/entranceHall/skeletonKey.jpg')`;

          let nextIcon = document.querySelector('.next-icon');
          nextIcon.style.opacity = '1';
          nextIcon.style.pointerEvents = 'all';
          nextIcon.classList.add('groenbox', 'c-pntr', 'blink2');
          clueIcon.style.opacity = '0';
          crests.forEach(crest => {
            crest.style.backgroundImage = '';
          });
          let closingSound = new Audio(
            `${basePath}/assets/sound/skeletonKeyFound.mp3`
          );
          closingSound.play();
          crestsArranged = true;
        }
      }
    }
  }
}

function highlightAndPlayPhrase() {
  if (current > 0) {
    phrases[current - 1].classList.remove('highlight');
  }

  if (current < phrases.length) {
    phrases[current].classList.add('highlight');
    narrationAudio.src = audioFiles[current];
    narrationAudio.play();
    current++;
  } else {
    narrationAudio.pause();
  }
}

narrationAudio.addEventListener('ended', function () {
  highlightAndPlayPhrase();
});

function showEntranceRiddle() {
  document.querySelector('.showClue').style.display = 'flex';
  document.querySelector('.showClue').style.pointerEvents = 'all';
  questItemWrapper.style.display = 'none';
  crests.forEach(questItem => {
    questItem.style.pointerEvents = 'none';
  });
  puzzleWrapper.style.display = '0';
  current = 0;
  highlightAndPlayPhrase();
}

function closeEntranceRiddle() {
  document.querySelector('.showClue').style.display = 'none';
  document.querySelector('.showClue').style.pointerEvents = 'none';
  questItemWrapper.style.display = 'flex';
  crests.forEach(questItem => {
    questItem.style.pointerEvents = 'all';
  });
  puzzleWrapper.style.opacity = '1';
  if (currentSound && !currentSound.paused) {
    currentSound.pause();
  }
  narrationAudio.pause();
  current = 0;
}
