import React, { useState } from 'react';
import './index.css';

function App() {
	const [showWelcome, setShowWelcome] = useState(true);

	return (
		<>
			{showWelcome && (
				<div className="welcome-overlay">
					<div className="sparkles">
						{[...Array(30)].map((_, i) => (
							<div key={i} className="sparkle" />
						))}
					</div>
					<div className="welcome-content">
						<div className="welcome-date">22/08/2025</div>
						<div className="welcome-message">Hey Dear Parna 💖 … I made something special for you.</div>
						<button className="welcome-btn" onClick={() => setShowWelcome(false)}>
							Tap to Begin the Journey 🎁
						</button>
					</div>
				</div>
			)}
			<div style={{ filter: showWelcome ? 'blur(2px)' : 'none' }}>
				{/* ...main app code goes here... */}
			</div>
		</>
	);
}

export default App;
