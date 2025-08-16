# 🎂 Magical Birthday Gift Website 🦋

A personalized, interactive birthday gift website featuring a beautiful Avatar-inspired theme with glowing butterflies, floating flowers, and magical animations.

## ✨ Features

### 🌸 Stage 1: Friendship Quiz
- **5 personalized questions** about your friendship
- **3-minute countdown timer** with visual feedback
- **Progressive scoring** - need 3/5 correct to advance
- **Retry functionality** if score is too low
- **Smooth transitions** between questions

### 🧩 Stage 2: Interactive Puzzle
- **3x3 jigsaw puzzle** with numbered pieces
- **2-minute timer** for completion
- **Click-based gameplay** - click correct pieces in order
- **Visual feedback** for correct/incorrect selections
- **Retry option** if time runs out

### 💌 Stage 3: Personal Message & Memory Gallery
- **Heartfelt birthday message** with typewriter effect
- **Auto-scrolling image carousels** on both sides
- **Beautiful memory gallery** showcasing shared moments
- **"Start Again" button** to relive the experience

### 🎵 Bonus Features
- **Background music** with mute/unmute toggle
- **Progress saving** using browser localStorage
- **Responsive design** for all devices
- **Loading animations** between stages
- **Magical visual effects** throughout

## 🚀 How to Use

1. **Open `index.html`** in a web browser
2. **Complete the quiz** within 3 minutes (need 3/5 correct)
3. **Solve the puzzle** within 2 minutes
4. **Read the personal message** and enjoy the memory gallery
5. **Click "Start Again"** to experience it all over again

## 🎨 Customization

### Personalizing the Quiz
Edit the `quizQuestions` array in `script.js`:

```javascript
const quizQuestions = [
    {
        question: "Your custom question here?",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correct: 2  // Index of correct answer (0-3)
    },
    // Add more questions...
];
```

### Changing the Personal Message
Edit the `personalMessage` variable in `script.js`:

```javascript
const personalMessage = `Your heartfelt message here...`;
```

### Adding Real Photos
Replace the placeholder images in `index.html`:

```html
<!-- Replace these with your actual photo URLs -->
<img src="path/to/your/photo1.jpg" alt="Memory 1" class="memory-img">
<img src="path/to/your/photo2.jpg" alt="Memory 2" class="memory-img">
```

### Customizing Background Music
Replace the audio source in `index.html`:

```html
<audio id="backgroundMusic" loop>
    <source src="path/to/your/music.mp3" type="audio/mpeg">
</audio>
```

## 🎭 Visual Theme

The website features a magical Avatar-inspired design with:
- **Gradient backgrounds** in purple and blue tones
- **Animated butterflies** fluttering across the screen
- **Floating flowers** with gentle animations
- **Glowing light particles** creating a dreamy atmosphere
- **Glassmorphism effects** with backdrop blur
- **Smooth transitions** and hover animations

## 📱 Responsive Design

- **Mobile-friendly** layout that works on all devices
- **Adaptive grid systems** for quiz options and puzzle
- **Touch-friendly** interactions for mobile users
- **Optimized spacing** for different screen sizes

## 🔧 Technical Details

- **Pure HTML/CSS/JavaScript** - no external dependencies
- **CSS Grid and Flexbox** for modern layouts
- **CSS Animations** for smooth transitions
- **Local Storage** for progress persistence
- **Event-driven architecture** for clean code structure

## 🌟 Browser Compatibility

- **Chrome** (recommended)
- **Firefox**
- **Safari**
- **Edge**
- **Mobile browsers**

## 💡 Tips for Best Experience

1. **Use a modern browser** for optimal performance
2. **Enable JavaScript** for full functionality
3. **Allow audio** for background music
4. **Use headphones** for immersive audio experience
5. **Fullscreen mode** recommended for maximum impact

## 🎁 Making It Special

To make this gift truly personal:
- **Add real photos** from your friendship
- **Customize questions** with inside jokes
- **Write a heartfelt message** that's meaningful to your friend
- **Choose background music** that reminds you of them
- **Test thoroughly** to ensure everything works perfectly

## 📞 Support

If you need help customizing or have questions:
- Check that all files are in the same folder
- Ensure your web browser supports modern JavaScript
- Try refreshing the page if animations don't load
- Check browser console for any error messages

---

**Made with 💖 and ✨ for a special friend's birthday!**

*This website creates a magical, interactive experience that celebrates friendship and creates lasting memories.* 