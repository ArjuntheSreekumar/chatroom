import React, { useEffect, useState } from 'react';
import './Events.css'; // Make sure you have the relevant CSS file for styling

function Events() {
  const [showEvents, setShowEvents] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null)); // 3x3 Tic-Tac-Toe board
  const [xIsNext, setXIsNext] = useState(true); // Toggle between players X and O
  const [winner, setWinner] = useState(null); // Track the winner

  useEffect(() => {
    // Show events after 500ms delay for slide-down animation
    const timer = setTimeout(() => setShowEvents(true), 500);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  // Function to calculate winner of the Tic-Tac-Toe game
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // Handle click for Tic-Tac-Toe grid
  const handleClick = (index) => {
    const boardCopy = [...board];
    if (winner || boardCopy[index]) return; // Prevent further clicks if there's a winner or cell is already clicked
    boardCopy[index] = xIsNext ? 'X' : 'O';
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
    const win = calculateWinner(boardCopy);
    if (win) setWinner(win);
  };

  // Reset the Tic-Tac-Toe game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <div className="App">
      <div className="events-section">
        <div className="events-header">
          <h1>EVENTS</h1>
          <div className="tic-tac-toe">
            {/* Tic Tac Toe Board */}
            <div className="board">
              {board.map((cell, index) => (
                <div
                  key={index}
                  className="cell"
                  onClick={() => handleClick(index)}
                >
                  {cell}
                </div>
              ))}
            </div>

            {/* Oval Shape below the board */}
            <div className="oval-shape"></div>

            {winner ? (
              <div className="winner-announcement">
                <h2>{winner} Wins!</h2>
                <div className="play-again-container">
                  <button 
                    onClick={resetGame} 
                    className="play-again-button" 
                    aria-label="Play Again"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            ) : (
              <div className="turn-info">
                <h2>Next Player: {xIsNext ? 'X' : 'O'}</h2>
              </div>
            )}
          </div>
        </div>

        {/* Events List */}
        <div className="events-list">
          {['Event 1 - Aug 5', 'Event 2 - Aug 10', 'Event 3 - Aug 15'].map((event, index) => (
            <div
              className={`event-item ${showEvents ? 'show' : ''}`}
              key={index}
            >
              <div className="line"></div> {/* Continuous Line */}
              <div className="event-text">
                <h2 className="event-title">{event}</h2> {/* Title of the event */}
                <p>The CET Build Club is a dynamic group that focuses on construction and engineering projects.</p>
                <p>Details</p>
              </div>
              <div className="event-image"></div> {/* Placeholder for event images */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
