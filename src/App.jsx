import { useState, useEffect } from 'react';
import StreetViewViewer from './components/StreetViewViewer';
import GuessMap from './components/GuessMap';
import RoundSummary from './components/RoundSummary';
import MemoryModePicker from './components/MemoryModePicker';
import LocationInput from './components/LocationInput';
import memoryDataJson from './memoryData.json';
import './App.css';

/**
 * Main App Component
 * Manages game state, modes, and turn-taking
 */
function App() {
  // Game state
  const [gameMode, setGameMode] = useState(null); // 'memory' or 'guess'
  const [gameState, setGameState] = useState('menu'); // 'menu', 'setup', 'viewing', 'guessing', 'results'
  const [roomCode, setRoomCode] = useState(null);
  
  // Current round data
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentCaption, setCurrentCaption] = useState('');
  const [guessedLocation, setGuessedLocation] = useState(null);
  
  // Memory mode data
  const [usedMemoryIds, setUsedMemoryIds] = useState([]);
  
  // Scoring
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [roundNumber, setRoundNumber] = useState(0);

  // Initialize room code from URL or localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlRoomCode = urlParams.get('room');
    
    if (urlRoomCode) {
      setRoomCode(urlRoomCode);
      loadRoomState(urlRoomCode);
    } else {
      const savedRoomCode = localStorage.getItem('whereWereWeRoomCode');
      if (savedRoomCode) {
        setRoomCode(savedRoomCode);
        loadRoomState(savedRoomCode);
      }
    }
  }, []);

  // Save room state to localStorage whenever it changes
  useEffect(() => {
    if (roomCode) {
      saveRoomState(roomCode);
    }
  }, [roomCode, gameState, scores, roundNumber, usedMemoryIds]);

  const loadRoomState = (code) => {
    const savedState = localStorage.getItem(`whereWereWeRoom_${code}`);
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        setScores(state.scores || { player1: 0, player2: 0 });
        setRoundNumber(state.roundNumber || 0);
        setUsedMemoryIds(state.usedMemoryIds || []);
      } catch (e) {
        console.error('Failed to load room state:', e);
      }
    }
  };

  const saveRoomState = (code) => {
    const state = {
      scores,
      roundNumber,
      usedMemoryIds,
      lastUpdated: Date.now(),
    };
    localStorage.setItem(`whereWereWeRoom_${code}`, JSON.stringify(state));
    localStorage.setItem('whereWereWeRoomCode', code);
  };

  const createRoom = () => {
    const newRoomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setRoomCode(newRoomCode);
    
    // Update URL
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('room', newRoomCode);
    window.history.pushState({}, '', newUrl);
    
    localStorage.setItem('whereWereWeRoomCode', newRoomCode);
  };

  const selectMode = (mode) => {
    setGameMode(mode);
    setGameState('setup');
  };

  const startMemoryRound = (memory) => {
    setCurrentLocation({ lat: memory.lat, lng: memory.lng });
    setCurrentCaption(memory.caption);
    setUsedMemoryIds([...usedMemoryIds, memory.id]);
    setGameState('viewing');
    setRoundNumber(roundNumber + 1);
  };

  const startGuessRound = (location) => {
    setCurrentLocation(location);
    setCurrentCaption('');
    setGameState('viewing');
    setRoundNumber(roundNumber + 1);
  };

  const submitGuess = (location) => {
    setGuessedLocation(location);
    setGameState('results');
  };

  const nextRound = () => {
    setCurrentLocation(null);
    setCurrentCaption('');
    setGuessedLocation(null);
    setGameState('setup');
  };

  const backToMenu = () => {
    setGameMode(null);
    setGameState('menu');
    setCurrentLocation(null);
    setCurrentCaption('');
    setGuessedLocation(null);
  };

  const resetGame = () => {
    setGameMode(null);
    setGameState('menu');
    setCurrentLocation(null);
    setCurrentCaption('');
    setGuessedLocation(null);
    setUsedMemoryIds([]);
    setScores({ player1: 0, player2: 0 });
    setRoundNumber(0);
    
    if (roomCode) {
      localStorage.removeItem(`whereWereWeRoom_${roomCode}`);
    }
  };

  // Render different screens based on game state
  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">Where Were We? 💕</h1>
        <p className="app-subtitle">A game of shared memories and wanderlust</p>
        
        {roomCode && (
          <div className="room-code-display">
            Room Code: <span className="code">{roomCode}</span>
          </div>
        )}
        
        {gameState !== 'menu' && (
          <div className="nav-buttons">
            <button className="nav-btn" onClick={backToMenu}>
              ← Back to Menu
            </button>
            <button className="nav-btn reset" onClick={resetGame}>
              🔄 Reset Game
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="app-main">
        {/* Menu Screen */}
        {gameState === 'menu' && (
          <div className="menu-screen">
            <div className="menu-content">
              <div className="welcome-text">
                <h2>Think you know where I wandered off to? 🌍</h2>
                <p>Test your memory of our shared adventures or guess new spots!</p>
              </div>

              <div className="mode-selection">
                <button 
                  className="mode-btn memory-mode"
                  onClick={() => selectMode('memory')}
                >
                  <div className="mode-icon">💭</div>
                  <div className="mode-title">Memory Mode</div>
                  <div className="mode-description">
                    Relive our shared adventures from preloaded memories
                  </div>
                </button>

                <button 
                  className="mode-btn guess-mode"
                  onClick={() => selectMode('guess')}
                >
                  <div className="mode-icon">🎯</div>
                  <div className="mode-title">Guess My Spot</div>
                  <div className="mode-description">
                    Take turns picking locations and guessing where they are
                  </div>
                </button>
              </div>

              {!roomCode && (
                <div className="room-setup">
                  <button className="create-room-btn" onClick={createRoom}>
                    Create Room & Get Code 🎮
                  </button>
                  <p className="room-help">
                    Share the room code with your partner to play together!
                  </p>
                </div>
              )}

              {roundNumber > 0 && (
                <div className="score-summary">
                  <h3>Current Session</h3>
                  <p>Rounds Played: {roundNumber}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Setup Screen - Pick location or memory */}
        {gameState === 'setup' && gameMode === 'memory' && (
          <MemoryModePicker
            memories={memoryDataJson.memories}
            onSelectMemory={startMemoryRound}
            usedMemoryIds={usedMemoryIds}
          />
        )}

        {gameState === 'setup' && gameMode === 'guess' && (
          <LocationInput
            onLocationSubmit={startGuessRound}
            playerName="Player"
          />
        )}

        {/* Viewing & Guessing Screen */}
        {gameState === 'viewing' && currentLocation && (
          <div className="game-screen">
            <div className="game-round-info">
              <h2>Round {roundNumber}</h2>
              <p>Think you know where this is?</p>
            </div>
            
            <div className="game-layout">
              <div className="game-panel street-view-panel">
                <StreetViewViewer location={currentLocation} />
              </div>
              
              <div className="game-panel guess-panel">
                <GuessMap onGuessSubmit={submitGuess} />
              </div>
            </div>
          </div>
        )}

        {/* Results Screen */}
        {gameState === 'results' && currentLocation && guessedLocation && (
          <RoundSummary
            actualLocation={currentLocation}
            guessedLocation={guessedLocation}
            caption={currentCaption}
            onNextRound={nextRound}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Made with 💖 for couples who love to explore together</p>
        <p className="footer-note">
          Note: Replace YOUR_API_KEY in index.html with your Google Maps API key
        </p>
      </footer>
    </div>
  );
}

export default App;


