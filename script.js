// Quiz Questions and Answers
const quizQuestions = [
    {
        question: "Which college lab made us get to know each other more closely?",
        options: ["Physics", "Chemistry", "Mechanical", "Electrical"],
        correct: 2
    },
    {
        question: "One thing that you think I like in you the most:",
        options: ["Smile", "Eyes", "Honesty", "Childishness"],
        correct: 2
    },
    {
        question: "One dream place in India we both wanted to go:",
        options: ["Delhi", "Goa", "Kerala", "Kashmir"],
        correct: 2
    },
    {
        question: "Which is my favourite color as of now?",
        options: ["Red", "Blue", "Pink", "Black"],
        correct: 1
    },
    {
        question: "Do you remember which color woolen hat I wore when we visited Hyderabad?",
        options: ["Blue", "Pink", "Brown", "Red"],
        correct: 3
    }
];

// Personal Birthday Message
const personalMessage = `Dear Parna,

On this special day, I wanted to create something magical just for you. Our friendship has been one of the most beautiful journeys of my life, filled with laughter, shared dreams, and countless precious moments.

From our college days in the Mechanical lab to all our journeys, every memory we've shared holds a special place in my heart. Your honesty, your smile, and the way you see the world have always inspired me. I know that whenever I feel low, I can talk to you without hesitation — you make me feel so comfortable and understood.

Of course, sometimes I do get disappointed in you too, but those feelings never last long, because what we share is much deeper and stronger than that. For your birthday, I wanted to try something new. I know this isn’t perfect — it’s my first attempt — but it’s made entirely for you, from the heart. There may be flaws, but remember that this little gift is a reflection of how much you mean to me.

I hope it brings a smile to your face and reminds you of how special you are. You deserve all the happiness, love, and success in the world.

Happy Birthday, my dear friend! May your day be as magical and beautiful as you are.

With love and gratitude,
Rishita 💖✨`;

// Game State
let currentStage = 'quiz';
let currentQuestion = 0;
let quizScore = 0;
let quizTimer = null;
let puzzleTimer = null;
let quizTimeLeft = 60; // 1 minute in seconds
let puzzleTimeLeft = 60; // 1 minute in seconds

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const quizStage = document.getElementById('quizStage');
const puzzleStage = document.getElementById('puzzleStage');
const finalStage = document.getElementById('finalStage');
const audioToggle = document.getElementById('audioToggle');
const background = document.getElementById('background');

// Quiz Elements
const questionText = document.getElementById('questionText');
const optionsContainer = document.querySelector('.options');
const currentQuestionSpan = document.getElementById('currentQuestion');
const quizTimerSpan = document.getElementById('quizTimer');
const quizContent = document.getElementById('quizContent');
const quizResult = document.getElementById('quizResult');
const resultMessage = document.getElementById('resultMessage');
const retryQuizBtn = document.getElementById('retryQuiz');

// Puzzle Elements
const puzzleBoard = document.getElementById('puzzleBoard');
const puzzleTimerSpan = document.getElementById('puzzleTimer');
const puzzleResult = document.getElementById('puzzleResult');
const puzzleResultMessage = document.getElementById('puzzleResultMessage');
const retryPuzzleBtn = document.getElementById('retryPuzzle');

// Final Stage Elements
const personalMessageDiv = document.getElementById('personalMessage');
const startAgainBtn = document.getElementById('startAgain');

// Initialize the application
function init() {
    hideLoadingScreen();
    setupEventListeners();
    loadQuiz();
    loadProgress();
}

// Hide loading screen
function hideLoadingScreen() {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);
}

// Setup event listeners
function setupEventListeners() {
    audioToggle.addEventListener('click', toggleAudio);
    retryQuizBtn.addEventListener('click', retryQuiz);
    retryPuzzleBtn.addEventListener('click', retryPuzzle);
    startAgainBtn.addEventListener('click', startAgain);

    // Start Over buttons for each stage
    const startOverQuiz = document.getElementById('startOverQuiz');
    if (startOverQuiz) startOverQuiz.addEventListener('click', startAgain);
    const startOverPuzzle = document.getElementById('startOverPuzzle');
    if (startOverPuzzle) startOverPuzzle.addEventListener('click', startAgain);
    const startOverFinal = document.getElementById('startOverFinal');
    if (startOverFinal) startOverFinal.addEventListener('click', startAgain);
}

// Audio control
function toggleAudio() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        audioToggle.textContent = '🔊';
    } else {
        backgroundMusic.pause();
        audioToggle.textContent = '🔇';
    }
}

// Load quiz
function loadQuiz() {
    if (currentQuestion < quizQuestions.length) {
        const question = quizQuestions[currentQuestion];
        questionText.textContent = question.question;
        
        const options = optionsContainer.querySelectorAll('.option');
        options.forEach((option, index) => {
            option.textContent = question.options[index];
            option.dataset.correct = index === question.correct;
            option.className = 'option';
            option.style.pointerEvents = 'auto';
            option.style.background = '';
            option.style.borderColor = '';
            
            // Remove old event listeners and add new ones
            option.replaceWith(option.cloneNode(true));
        });
        
        // Re-select options after cloning
        const newOptions = optionsContainer.querySelectorAll('.option');
        newOptions.forEach((option, index) => {
            option.addEventListener('click', () => selectOption(index));
        });
        
        currentQuestionSpan.textContent = currentQuestion + 1;
        startQuizTimer();
    }
}

// Start quiz timer
function startQuizTimer() {
    quizTimeLeft = 60;
    updateQuizTimer();
    
    quizTimer = setInterval(() => {
        quizTimeLeft--;
        updateQuizTimer();
        
        if (quizTimeLeft <= 0) {
            clearInterval(quizTimer);
            timeUp();
        }
    }, 1000);
}

// Update quiz timer display
function updateQuizTimer() {
    const minutes = Math.floor(quizTimeLeft / 60);
    const seconds = quizTimeLeft % 60;
    quizTimerSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Select quiz option
function selectOption(selectedIndex) {
    const options = optionsContainer.querySelectorAll('.option');
    const correctIndex = quizQuestions[currentQuestion].correct;
    
    // Disable all options
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Show correct/incorrect feedback
    if (selectedIndex === correctIndex) {
        options[selectedIndex].classList.add('correct');
        quizScore++;
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[correctIndex].classList.add('correct');
    }
    
    // Wait before moving to next question
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            loadQuiz();
        } else {
            finishQuiz();
        }
    }, 1500);
}

// Finish quiz
function finishQuiz() {
    clearInterval(quizTimer);
    
    if (quizScore >= 3) {
        showStageTransition('quiz', 'puzzle');
        setTimeout(() => {
            loadPuzzle();
        }, 1000);
    } else {
        showQuizResult();
    }
    
    saveProgress();
}

// Show quiz result
function showQuizResult() {
    quizContent.classList.add('hidden');
    quizResult.classList.remove('hidden');
    resultMessage.textContent = "Oops! Looks like you need to try again 😔";
}

// Retry quiz
function retryQuiz() {
    currentQuestion = 0;
    quizScore = 0;
    quizContent.classList.remove('hidden');
    quizResult.classList.add('hidden');
    
    // Reset all option styles
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach(option => {
        option.style.pointerEvents = 'auto';
        option.style.background = '';
        option.style.borderColor = '';
        option.classList.remove('correct', 'incorrect');
    });
    
    loadQuiz();
}

// Time up
function timeUp() {
    showQuizResult();
    resultMessage.textContent = "Time's up! You need to try again 😔";
}

// Load puzzle
function loadPuzzle() {
    createPuzzle();
    startPuzzleTimer();
}

// Create puzzle
function createPuzzle() {
    puzzleBoard.innerHTML = '';
    
    // Preload the image to ensure it's available
    const testImg = new Image();
    testImg.onload = function() {
        console.log('Image loaded successfully, creating puzzle pieces...');
        createPuzzlePieces(this);
    };
    testImg.onerror = function() {
        console.error('Failed to load image, creating fallback puzzle...');
        createFallbackPuzzle();
    };
    // Using your actual friendship photo
    console.log('Loading image: your-friendship-photo.jpeg');
    testImg.src = 'your-friendship-photo.jpeg';
}

// Create puzzle pieces after image is loaded
function createPuzzlePieces(img) {
    // Removed puzzleStatus message, not needed for UI
    
    // Set the puzzle board size based on the image
    const pieceSize = 200; // Each piece will be 200x200 pixels
    puzzleBoard.style.width = `${pieceSize * 3}px`;
    puzzleBoard.style.height = `${pieceSize * 3}px`;
    
    // Calculate piece dimensions from the image
    const pieceWidth = img.naturalWidth / 3;
    const pieceHeight = img.naturalHeight / 3;
    
    // Create 9 puzzle pieces (3x3 grid, not shuffled, all face down)

    let flippedCount = 0;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece card-face-down';
            piece.style.position = 'relative';
            const pieceIndex = row * 3 + col;
            piece.dataset.correctPosition = pieceIndex;
            piece.dataset.currentPosition = pieceIndex;

            // Create a canvas for each piece to handle the image slice
            const pieceCanvas = document.createElement('canvas');
            pieceCanvas.width = pieceSize;
            pieceCanvas.height = pieceSize;
            const pieceCtx = pieceCanvas.getContext('2d');

            if (img.complete) {
                pieceCtx.drawImage(
                    img,
                    col * pieceWidth,
                    row * pieceHeight,
                    pieceWidth,
                    pieceHeight,
                    0, 0,
                    pieceSize,
                    pieceSize
                );
                piece.dataset.img = pieceCanvas.toDataURL();
            }

            // Card back style
            piece.style.background = 'linear-gradient(135deg, #764ba2 60%, #667eea 100%)';
            piece.style.border = '2px solid #fff';
            piece.style.cursor = 'pointer';
            piece.innerHTML = `<span style="font-size:2rem;opacity:0.5;">🂠</span>`;

            // Flip logic
            piece.addEventListener('click', function() {
                if (piece.classList.contains('card-face-down')) {
                    piece.classList.remove('card-face-down');
                    piece.classList.add('card-face-up');
                    piece.style.background = `url(${piece.dataset.img})`;
                    piece.style.backgroundSize = 'cover';
                    piece.innerHTML = '';
                    flippedCount++;
                    if (flippedCount === 9) {
                        // All pieces revealed, proceed immediately
                        clearInterval(puzzleTimer);
                        puzzleTimeUp();
                    }
                }
            });

            puzzleBoard.appendChild(piece);
        }
    }

    // ...existing code...
    console.log('Puzzle created with', puzzleBoard.children.length, 'pieces');
}

// Create fallback puzzle if image fails to load
function createFallbackPuzzle() {
    for (let i = 0; i < 9; i++) {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.dataset.correctPosition = i;
        piece.dataset.currentPosition = i;
        piece.draggable = true;
        piece.textContent = i + 1;
        piece.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
        
        // Add Fix/Unfix switch
        const fixSwitch = document.createElement('button');
        fixSwitch.className = 'fix-switch';
        fixSwitch.textContent = 'Fix';
        fixSwitch.style.position = 'absolute';
        fixSwitch.style.right = '5px';
        fixSwitch.style.bottom = '5px';
        fixSwitch.style.zIndex = '10';
        fixSwitch.style.fontSize = '0.8rem';
        fixSwitch.style.padding = '2px 8px';
        fixSwitch.style.borderRadius = '8px';
        fixSwitch.style.background = 'rgba(76,175,80,0.8)';
        fixSwitch.style.color = '#fff';
        fixSwitch.style.border = 'none';
        fixSwitch.style.cursor = 'pointer';

        fixSwitch.addEventListener('click', function(e) {
            e.stopPropagation();
            if (piece.classList.contains('fixed')) {
                piece.classList.remove('fixed');
                piece.draggable = true;
                piece.style.cursor = 'grab';
                fixSwitch.textContent = 'Fix';
            } else {
                piece.classList.add('fixed');
                piece.draggable = false;
                piece.style.cursor = 'default';
                fixSwitch.textContent = 'Unfix';
            }
        });

        piece.appendChild(fixSwitch);

        // Add drag and drop event listeners
        piece.addEventListener('dragstart', handleDragStart);
        piece.addEventListener('dragover', handleDragOver);
        piece.addEventListener('drop', handleDrop);
        piece.addEventListener('dragend', handleDragEnd);

        puzzleBoard.appendChild(piece);
    }
    
    shufflePuzzle();
    console.log('Fallback puzzle created with', puzzleBoard.children.length, 'pieces');
}

// Shuffle puzzle
function shufflePuzzle() {
    const pieces = Array.from(puzzleBoard.children);
    const shuffled = pieces.sort(() => Math.random() - 0.5);
    
    pieces.forEach((piece, index) => {
        piece.dataset.currentPosition = index;
        piece.style.order = index;
    });
    
    console.log('Puzzle shuffled, pieces in order:', pieces.map(p => p.dataset.currentPosition));
}

// Drag and drop variables
let draggedPiece = null;
let draggedPieceIndex = null;

// Handle drag start
function handleDragStart(e) {
    if (this.classList.contains('fixed')) return;
    draggedPiece = this;
    draggedPieceIndex = parseInt(this.dataset.currentPosition);
    this.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'move';
}

// Handle drag over
function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

// Handle drop
function handleDrop(e) {
    e.preventDefault();
    if (draggedPiece) {
        const targetPiece = e.target.closest('.puzzle-piece');
        if (
            targetPiece &&
            targetPiece !== draggedPiece &&
            !targetPiece.classList.contains('fixed') &&
            !draggedPiece.classList.contains('fixed')
        ) {
            // Swap the pieces
            const targetIndex = Array.from(puzzleBoard.children).indexOf(targetPiece);
            const draggedIndex = Array.from(puzzleBoard.children).indexOf(draggedPiece);
            if (targetIndex > -1 && draggedIndex > -1) {
                swapPieces(draggedIndex, targetIndex);
                checkPuzzleComplete();
            }
        }
    }
}

// Handle touch move for mobile devices
function handleTouchMove(e) {
    e.preventDefault();
    if (!draggedPiece) return;
    const touch = e.touches[0];
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (targetElement) {
        const targetPiece = targetElement.closest('.puzzle-piece');
        if (
            targetPiece &&
            targetPiece !== draggedPiece &&
            !targetPiece.classList.contains('fixed') &&
            !draggedPiece.classList.contains('fixed')
        ) {
            const targetIndex = Array.from(puzzleBoard.children).indexOf(targetPiece);
            const draggedIndex = Array.from(puzzleBoard.children).indexOf(draggedPiece);
            if (targetIndex > -1 && draggedIndex > -1) {
                swapPieces(draggedIndex, targetIndex);
                checkPuzzleComplete();
            }
        }
    }
}

// Handle drag end
function handleDragEnd(e) {
    this.style.opacity = '1';
    draggedPiece = null;
    draggedPieceIndex = null;
}

// Swap puzzle pieces
function swapPieces(index1, index2) {
    const pieces = Array.from(puzzleBoard.children);
    const piece1 = pieces[index1];
    const piece2 = pieces[index2];
    
    // Prevent swapping if either piece is fixed
    if (piece1.classList.contains('fixed') || piece2.classList.contains('fixed')) {
        return;
    }

    // Update data attributes
    piece1.dataset.currentPosition = index2;
    piece2.dataset.currentPosition = index1;

    // Update visual order
    piece1.style.order = index2;
    piece2.style.order = index1;

    // Add visual feedback
    piece1.classList.add('swapped');
    piece2.classList.add('swapped');

    // Check and lock correct pieces
    [piece1, piece2].forEach(piece => {
        const currentPos = parseInt(piece.dataset.currentPosition);
        const correctPos = parseInt(piece.dataset.correctPosition);
        if (currentPos === correctPos && !piece.classList.contains('fixed')) {
            // Green border blink animation
            piece.classList.add('green-blink');
            setTimeout(() => {
                piece.classList.remove('green-blink');
                piece.classList.add('fixed');
                piece.draggable = false;
                piece.style.cursor = 'default';
            }, 500);
        }
    });

    setTimeout(() => {
        piece1.classList.remove('swapped');
        piece2.classList.remove('swapped');
    }, 300);

    console.log('Pieces swapped:', index1, 'and', index2);
}

// Check if puzzle is complete
function checkPuzzleComplete() {
    const pieces = puzzleBoard.querySelectorAll('.puzzle-piece');
    const isComplete = Array.from(pieces).every(piece => {
        const currentPos = parseInt(piece.dataset.currentPosition);
        const correctPos = parseInt(piece.dataset.correctPosition);
        return currentPos === correctPos;
    });
    
    console.log('Puzzle complete check:', isComplete);
    return isComplete;
}

// Start puzzle timer
function startPuzzleTimer() {
    puzzleTimeLeft = 60;
    updatePuzzleTimer();
    
    puzzleTimer = setInterval(() => {
        puzzleTimeLeft--;
        updatePuzzleTimer();
        
        if (puzzleTimeLeft <= 0) {
            clearInterval(puzzleTimer);
            puzzleTimeUp();
        }
    }, 1000);
}

// Update puzzle timer
function updatePuzzleTimer() {
    const minutes = Math.floor(puzzleTimeLeft / 60);
    const seconds = puzzleTimeLeft % 60;
    puzzleTimerSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Finish puzzle
function finishPuzzle() {
    clearInterval(puzzleTimer);
    showStageTransition('puzzle', 'final');
    setTimeout(() => {
        loadFinalStage();
    }, 1000);
}

// Puzzle time up
function puzzleTimeUp() {
    // Show the full picture overlay and custom message
    const overlay = document.createElement('div');
    overlay.className = 'puzzle-overlay';
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = puzzleBoard.offsetWidth + 'px';
    overlay.style.height = puzzleBoard.offsetHeight + 'px';
    overlay.style.zIndex = '100';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.background = 'rgba(255,255,255,0.85)';
    overlay.innerHTML = `
        <div style='display:flex;align-items:center;justify-content:center;width:100%;position:relative;'>
            <div class='party-popper left' style='position:absolute;left:-60px;top:40%;font-size:3rem;'>🎉</div>
            <img src='your-friendship-photo.jpeg' alt='Full Puzzle' style='max-width:100%;max-height:100%;border-radius:15px;box-shadow:0 0 30px #764ba2;'>
            <div class='party-popper right' style='position:absolute;right:-60px;top:40%;font-size:3rem;'>🎉</div>
        </div>
        <div style='margin-top:30px;font-size:1.5rem;color:#764ba2;font-family:"Dancing Script",cursive;text-align:center;'>
            Hope you enjoyed it!<br>
            <span style='font-size:1.2rem;color:#333;'>Ok , now comes the final one....</span>
        </div>
        <div style='margin-top:20px;margin-bottom:40px;text-align:center;'>
            <span style='font-size:2.5rem;'>👏👏👏👏👏</span>
        </div>
    `;
    puzzleBoard.style.position = 'relative';
    puzzleBoard.appendChild(overlay);

    // Hide retry button and message, only show overlay
    puzzleResult.classList.remove('hidden');
    puzzleResultMessage.textContent = "";
    retryPuzzleBtn.style.display = 'none';

    // Move to next step after 5 seconds
    setTimeout(() => {
        finishPuzzle();
    }, 5000);
}

// Retry puzzle
function retryPuzzle() {
    puzzleResult.classList.add('hidden');
    loadPuzzle();
}

// Load final stage
function loadFinalStage() {
    typewriterEffect(personalMessageDiv, personalMessage);
}

// Typewriter effect
function typewriterEffect(element, text) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    
    type();
}

// Show stage transition
function showStageTransition(fromStage, toStage) {
    const fromElement = document.getElementById(fromStage + 'Stage');
    const toElement = document.getElementById(toStage + 'Stage');
    
    fromElement.classList.remove('active');
    toElement.classList.add('active');
    
    currentStage = toStage;
}

// Start again
function startAgain() {
    // Show entry overlay again
    const entryOverlay = document.getElementById('entryOverlay');
    if (entryOverlay) {
        entryOverlay.style.display = 'flex';
    }
    // Hide all stages
    quizStage.classList.remove('active');
    puzzleStage.classList.remove('active');
    finalStage.classList.remove('active');
    // Reset quiz and puzzle state
    currentStage = 'quiz';
    currentQuestion = 0;
    quizScore = 0;
    quizContent.classList.remove('hidden');
    quizResult.classList.add('hidden');
    puzzleResult.classList.add('hidden');
    saveProgress();
}

// Save progress
function saveProgress() {
    const progress = {
        stage: currentStage,
        question: currentQuestion,
        score: quizScore
    };
    localStorage.setItem('birthdayGiftProgress', JSON.stringify(progress));
}

// Load progress
function loadProgress() {
    const saved = localStorage.getItem('birthdayGiftProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        currentStage = progress.stage;
        currentQuestion = progress.question;
        quizScore = progress.score;
        
        // Show appropriate stage
        quizStage.classList.remove('active');
        puzzleStage.classList.remove('active');
        finalStage.classList.remove('active');
        
        if (currentStage === 'quiz') {
            quizStage.classList.add('active');
            if (currentQuestion < quizQuestions.length) {
                loadQuiz();
            } else {
                finishQuiz();
            }
        } else if (currentStage === 'puzzle') {
            puzzleStage.classList.add('active');
            loadPuzzle();
        } else if (currentStage === 'final') {
            finalStage.classList.add('active');
            loadFinalStage();
        }
    }
}

// Add shake animation for puzzle
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    @keyframes green-blink {
        0% { box-shadow: 0 0 0px 0px #4caf50; border: 3px solid transparent; }
        50% { box-shadow: 0 0 20px 10px #4caf50; border: 3px solid #4caf50; }
        100% { box-shadow: 0 0 0px 0px #4caf50; border: 3px solid #4caf50; }
    }
    .puzzle-piece.green-blink {
        animation: green-blink 0.5s linear 1;
    }
    .puzzle-piece.fixed {
        border: 3px solid #4caf50 !important;
        cursor: default !important;
        opacity: 1 !important;
        z-index: 2;
        box-shadow: none !important;
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add some extra magical effects
function addMagicalEffects() {
    // Add sparkle effect on hover for buttons
    const buttons = document.querySelectorAll('.btn, .option');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
            button.style.boxShadow = '0 10px 25px rgba(255, 255, 255, 0.3)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
            button.style.boxShadow = '';
        });
    });
}

// Call magical effects after initialization
setTimeout(addMagicalEffects, 3000); 