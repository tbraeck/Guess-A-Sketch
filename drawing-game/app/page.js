'use client';

import { useEffect, useState } from 'react';
import DrawingCanvas from './components/DrawingCanvas';
import GameControls from './components/GameControls';
import Timer from './components/Timer';
import WordPrompt from './components/WordPrompt';

export default function Home() {
  const [prompt, setPrompt] = useState(null);
  const timerDuration = 60; // Timer duration in seconds
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  const [guess, setGuess] = useState('');

  // Fetch the initial prompt when the component mounts
  useEffect(() => {
    const fetchInitialPrompt = async () => {
      const res = await fetch('http://localhost:4000/word_prompts');
      const data = await res.json();
      console.log(data, "word prompt data is here");
      setPrompt(data[0].prompt); // Set the prompt from the fetched data
    };

    fetchInitialPrompt();
  }, []);

  // Function to reset the game and get a new prompt
  const resetGame = async () => {
    const res = await fetch('http://localhost:4000/word_prompts');
    const data = await res.json();
    setPrompt(data[0].prompt); // Set the new prompt
    setTimeLeft(timerDuration); // Reset the timer
    setGuess(''); // Clear the guess when resetting the game
  };

  const handleSaveDrawing = async (drawingData) => {
    try {
      const response = await fetch('http://localhost:4000/api/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: drawingData }), // Send the drawing data
      });

      const data = await response.json();
      setGuess(data.guess); // Set the guess received from OpenAI
      speakGuess(data.guess); // Speak the guess
    } catch (error) {
      console.error('Error sending drawing to OpenAI:', error);
    }
  };

  // Function to use the Web Speech API for voice output
  const speakGuess = (text) => {
    if (!text) return; // Do nothing if there's no text
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <h1>Drawing Game</h1>
      <WordPrompt prompt={prompt || 'Loading...'} />
      <DrawingCanvas onSave={handleSaveDrawing} />
      <Timer duration={timeLeft} />
      <GameControls onReset={resetGame} />
      {guess && <p>Guess: {guess}</p>} {/* Display the guess on the screen */}
    </div>
  );
}
