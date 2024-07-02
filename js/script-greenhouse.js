const prodMode = window.location.href.includes('jay-of-spades.github.io/');
const basePath = prodMode ? '/Secret-Of-Hexcliff-Hall' : '';

let audioFiles = [
  `${basePath}/assets/sound/06_greenhouse/findingElementometer.mp3`,
  `${basePath}/assets/sound/06_greenhouse/01confirmEl/01Choice_Earth.mp3`,
  `${basePath}/assets/sound/06_greenhouse/01confirmEl/02Choice_Fire.mp3`,
  `${basePath}/assets/sound/06_greenhouse/01confirmEl/03Choice_Water.mp3`,
  `${basePath}/assets/sound/06_greenhouse/01confirmEl/04Choice_Metal.mp3`,
  `${basePath}/assets/sound/06_greenhouse/chooseAnElement.mp3`,
  `${basePath}/assets/sound/06_greenhouse/instruction.mp3`,
  `${basePath}/assets/sound/06_greenhouse/harmonizedElements.mp3`,
];

let instructionImgSequence = [
  [
    `${basePath}/assets/img/greenhouse/instruction/02instruction.jpg`,
    `${basePath}/assets/img/greenhouse/instruction/03instruction.jpg`,
    `${basePath}/assets/img/greenhouse/instruction/04instruction.png`,
    `${basePath}/assets/img/greenhouse/instruction/05instruction.jpg`,
    `${basePath}/assets/img/greenhouse/instruction/06instruction.jpg`,
    `${basePath}/assets/img/greenhouse/instruction/07instruction.jpg`,
    `${basePath}/assets/img/greenhouse/instruction/08instruction.jpg`,
    `${basePath}/assets/img/greenhouse/instruction/09instruction.jpg`,
    `${basePath}/assets/img/greenhouse/instruction/10instruction.jpg`,
    `${basePath}/assets/img/greenhouse/instruction/11instruction.jpg`,
    `${basePath}/assets/img/greenhouse/instruction/12instruction.jpg`,
  ],
  [
    `${basePath}/assets/img/greenhouse/elementInstruction/01ele.jpg`,
    `${basePath}/assets/img/greenhouse/elementInstruction/02ele.jpg`,
    `${basePath}/assets/img/greenhouse/elementInstruction/03ele.jpg`,
    `${basePath}/assets/img/greenhouse/elementInstruction/04ele.jpg`,
    `${basePath}/assets/img/greenhouse/elementInstruction/05ele.jpg`,
    `${basePath}/assets/img/greenhouse/elementInstruction/06ele.png`,
    `${basePath}/assets/img/greenhouse/elementInstruction/07ele.jpg`,
    `${basePath}/assets/img/greenhouse/elementInstruction/08ele.jpg`,
  ],
];

let instructionTimeStamps = [
  [4, 12, 18, 32, 42, 53, 73, 83, 95, 115, 128],
  [14, 18, 35, 61, 73, 82, 100, 111],
];

console.log('Timestamps: ', instructionTimeStamps);
console.log('Image Sequence: ', instructionImgSequence);

let instructionAudio = document.getElementById('instructionAudio');
let instructionImage = document.getElementById('instructionImage');
let instructionIcon = document.querySelector('.showInstruction');
let pausePlayBtn = document.querySelector('.pause-play-btn');
let closeButton = document.querySelector('.exit-btn');
let exitOpening = document.querySelector('.exit-opening');
let btnIntro = document.querySelector('.button-intro');
let openInstruction = document.querySelector('.open-instruction');
let affirmativeResponse = [];
let negativeResponse = [];
let currentSound = null;
let gameItems = document.querySelectorAll('.game-item');
let questPots = document.querySelectorAll('.quest-pot');
let elements = ['earth', 'metal', 'fire', 'water'];
let questPotLocations = [];
let showElementometer = document.querySelector('#showElementometer');
let isElementometerFound = false;
let elementometerIMG = `${basePath}/assets/img/greenhouse/elementometer.jpg`;
let elementFreeItems = Array.from(gameItems).filter(
  item => !item.classList.contains('quest-pot')
);
let elementometerLocationRandomizer = Math.floor(
  Math.random() * elementFreeItems.length
);
let elementometerLocation = elementFreeItems[elementometerLocationRandomizer];
let puzzleWrapper = document.querySelector('.puzzle-wrapper');
let questItemWrapper = document.querySelector('.quest-item-wrapper');
let questItems = document.querySelectorAll('.quest-item');
let earthChoice = document.querySelector('#earth-choice');
let fireChoice = document.querySelector('#fire-choice');
let waterChoice = document.querySelector('#water-choice');
let metalChoice = document.querySelector('#metal-choice');
let chosenElement = null;
let chosenQuestPot = null;
let plantsToHeal = 4;
let anElementIsChosen = false;
let currentModal = {
  modal: null,
  instructionAudio: null,
  instructionImage: null,
  instructionImgSrc: null,
  pausePlayBtn: null,
  exitBtn: null,
};

let loadChoices = function () {
  puzzleWrapper.style.opacity = '1';
  questItemWrapper.style.display = 'flex';
  clueIcon.style.pointerEvents = 'all';
  clueIcon.style.opacity = '1';
  clueIcon.style.cursor = 'pointer';
};

let clueIcon = document.querySelector('.clue-icon');
let elementometerContainer = document.querySelector('#elementometer-container');
let puzzleFrames = document.querySelectorAll('.puzzle-frame');
console.log(elementometerLocation);

// Instruction Modal

instructionIcon.addEventListener('click', () =>
  openModal('#instructionModal', 0)
);

openInstruction.addEventListener('click', () =>
  openModal('#instructionModal', 0)
);

exitOpening.addEventListener('click', function () {
  btnIntro.style.backgroundColor = 'transparent';
  btnIntro.style.display = 'none';
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

// Start of Game
// First Stage: Finding the Elementometer
function playRandomSound(soundArray) {
  if (currentSound && !currentSound.paused) {
    currentSound.pause();
  }

  const randomIndex = Math.floor(Math.random() * soundArray.length);
  currentSound = new Audio(soundArray[randomIndex]);
  console.log(currentSound);
  currentSound.play();
}

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

questPots.forEach(pot => {
  pot.style.pointerEvents = 'none';
});

gameItems.forEach(item => {
  item.addEventListener('click', function () {
    handleGameItemClick(this);
  });
  item.addEventListener('mouseenter', addGeelBoxClass.bind(null, item));

  item.addEventListener('mouseleave', removeGeelBoxClass.bind(null, item));
});

function addGeelBoxClass(clickedItem) {
  if (isElementometerFound && !clickedItem.classList.contains('quest-pot')) {
    return;
  } else {
    clickedItem.classList.add('geelbox');
  }
}

function removeGeelBoxClass(clickedItem) {
  if (isElementometerFound && !clickedItem.classList.contains('quest-pot')) {
    return;
  } else {
    clickedItem.classList.remove('geelbox');
  }
}

function handleGameItemClick(clickedItem) {
  if (isElementometerFound) {
    return;
  }

  if (clickedItem === elementometerLocation) {
    removeBlinkers();
    questPots.forEach(pot => {
      pot.style.pointerEvents = 'all';
    });
    gameItems.forEach(item => {
      item.classList.remove('geelbox');
      item.classList.remove('roodbox');
    });
    clickedItem.classList.remove('geelbox');
    instructionIcon.style.display = 'none';
    isElementometerFound = true;
    openModalElementometer();
  } else {
    playRandomSound(negativeResponse);
    clickedItem.classList.add('roodbox');
    setTimeout(() => {
      clickedItem.classList.remove('roodbox');
    }, 10000);
  }
}

function removeBlinkers() {
  console.log('removeBlinkers called', elementFreeItems);
  elementFreeItems.forEach(item => {
    item.classList.remove('c-pntr');
    item.classList.remove('blink');
  });
}

// Instruction Modal for Elementometer

function openModalElementometer() {
  if (currentSound && !currentSound.paused) {
    currentSound.pause();
  }
  //Only here are the pots assigned their elements and questItems clickable
  elementalizingPots();
  openModal('#instructionElementometer', 1, loadChoices);
}

// Second Stage: Diagnosing the Plants using the Elementometer
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function elementalizingPots() {
  shuffleArray(elements);

  questPots.forEach((pot, index) => {
    if (index < elements.length) {
      pot.dataset.element = elements[index];
      console.log(pot.dataset.element);
    }
  });

  questItems.forEach(item => {
    item.style.pointerEvents = 'all';
  });
}

earthChoice.addEventListener('click', function () {
  diagnoseSickElement('earth', this);
});
fireChoice.addEventListener('click', function () {
  diagnoseSickElement('fire', this);
});
waterChoice.addEventListener('click', function () {
  diagnoseSickElement('water', this);
});
metalChoice.addEventListener('click', function () {
  diagnoseSickElement('metal', this);
});

function diagnoseSickElement(element, clickedItem) {
  chosenElement = element;
  clickedItem.classList.remove('sepiaBox');
  questItems.forEach(item => {
    item.style.pointerEvents = 'none';
  });
  let elementAudio;
  if (element === 'earth') {
    elementAudio = new Audio(audioFiles[1]);
  } else if (element === 'fire') {
    elementAudio = new Audio(audioFiles[2]);
  } else if (element === 'water') {
    elementAudio = new Audio(audioFiles[3]);
  } else if (element === 'metal') {
    elementAudio = new Audio(audioFiles[4]);
  } else {
    return;
  }
  elementAudio.play();
  anElementIsChosen = true;
}

questPots.forEach(pot => {
  pot.addEventListener('click', function () {
    if (!isElementometerFound) {
      return;
    } else {
      if (!anElementIsChosen) {
        let elementometerAudio = new Audio(audioFiles[5]);
        elementometerAudio.play();
      } else {
        let potElement = pot.dataset.element;
        handleQuestPotClick(this, potElement);
      }
    }
  });
});

function handleQuestPotClick(clickedPot, potElement) {
  if (!chosenElement) {
    return;
  }

  if (chosenElement === potElement) {
    playRandomSound(affirmativeResponse);
    clickedPot.classList.remove('fumesBg');
    plantsToHeal--;
    if (plantsToHeal === 0) {
      questItemWrapper.style.display = 'none';
      hideElementometer();
      questItems.forEach(item => {
        item.style.pointerEvents = 'none';
      });
    } else {
      anElementIsChosen = false;
      questItems.forEach(item => {
        if (!item.classList.contains('sepiaBox')) {
          item.style.display = 'none';
        } else {
          item.style.pointerEvents = 'all';
          return;
        }
      });
    }
  } else {
    playRandomSound(negativeResponse);
    anElementIsChosen = false;
    questItems.forEach(item => {
      item.classList.add('sepiaBox');
      item.style.pointerEvents = 'all';
      return;
    });
  }
}

function hideElementometer() {
  elementometerContainer.style.display = 'none';
  elementometerContainer.style.opacity = '0';
  elementometerContainer.style.pointerEvents = 'none';
  elementometerContainer.style.cursor = 'default';
  elementometerContainer.style.zIndex = '0';
  document.querySelector('.puzzle-wrapper2').style.opacity = '1';
  puzzleFrames.forEach(frame => {
    frame.style.display = 'block';
  });
  if (currentSound && !currentSound.paused) {
    currentSound.pause();
  }
  let harmonyAudio = new Audio(audioFiles[7]);
  questPots.forEach(pot => {
    pot.style.pointerEvents = 'none';
  });
  clueIcon.style.pointerEvents = 'none';
  clueIcon.style.opacity = '0';
  instructionIcon.style.opacity = '0';
  harmonyAudio.play();
  harmonyAudio.addEventListener('ended', function () {
    let nextIcon = document.querySelector('.next-icon');
    nextIcon.style.opacity = '1';
    nextIcon.style.pointerEvents = 'all';
    nextIcon.classList.add('groenbox', 'c-pntr', 'blink2');
    clueIcon.style.opacity = '0';
  });
}
// End Game
