// 🎂 Birthday Gift Website Configuration
// Edit these values to personalize the website for your friend

const CONFIG = {
    // Quiz Configuration
    quiz: {
        questions: [
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
        ],
        timeLimit: 180, // 3 minutes in seconds
        passingScore: 3 // Minimum correct answers needed
    },

    // Puzzle Configuration
    puzzle: {
        timeLimit: 120, // 2 minutes in seconds
        gridSize: 3 // 3x3 puzzle
    },

    // Personal Message
    message: {
        title: "🎂 Happy Birthday Parna! 🦋",
        content: `Dear Parna,

On this special day, I wanted to create something magical just for you. Our friendship has been one of the most beautiful journeys of my life, filled with laughter, shared dreams, and countless precious moments.

From our college days in the Mechanical lab to all our journeys, every memory we've shared holds a special place in my heart. Your honesty, your smile, and the way you see the world have always inspired me. I know that whenever I feel low, I can talk to you without hesitation — you make me feel so comfortable and understood.

Of course, sometimes I do get disappointed in you too, but those feelings never last long, because what we share is much deeper and stronger than that. For your birthday, I wanted to try something new. I know this isn’t perfect — it’s my first attempt — but it’s made entirely for you, from the heart. There may be flaws, but remember that this little gift is a reflection of how much you mean to me.

I hope it brings a smile to your face and reminds you of how special you are. You deserve all the happiness, love, and success in the world.

Happy Birthday, my dear friend! May your day be as magical and beautiful as you are.

With love and gratitude,
Rishita 💖✨`
    },

    // Memory Gallery Configuration
    gallery: {
        leftImages: [
            "Images/Image1.jpeg",
            "Images/Image2.jpeg",
            "Images/Image3.jpeg",
            "Images/Image4.jpeg",
            "Images/Image5.jpeg",
            "Images/Image6.jpeg"
        ],
        rightImages: [
            "Images/Image7.jpeg",
            "Images/Image8.jpeg",
            "Images/Image9.jpeg",
            "Images/Image10.jpeg",
            "Images/Image11.jpeg"
        ]
    },

    // Audio Configuration
    audio: {
        backgroundMusic: "https://pixabay.com/music/beautiful-plays-just-relax-11157/",
        autoPlay: false
    },

    // Visual Effects Configuration
    effects: {
        butterflyCount: 5,
        flowerCount: 4,
        particleCount: 5,
        enableGlow: true,
        enableFloating: true
    },

    // Timing Configuration
    timing: {
        loadingScreenDuration: 2000, // 2 seconds
        questionTransitionDelay: 1500, // 1.5 seconds
        stageTransitionDelay: 1000, // 1 second
        typewriterSpeed: 50 // milliseconds per character
    }
};

// Export configuration for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} 