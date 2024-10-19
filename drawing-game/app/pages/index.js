'use client'
import { useEffect, useState } from 'react';
import DrawingCanvas from '../components/DrawingCanvas';
import GameControls from '../components/GameControls';
import Timer from '../components/Timer';
import WordPrompt from '../components/WordPrompt';

export default function Home() {
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
    const fetchInitialPrompt = async () => {
      const res = await fetch('http://localhost:4000/word_prompts'); 
      const data = await res.json();
      console.log(data, "word prompt data is here")
      setPrompt(data.prompt);
    };

    fetchInitialPrompt();
  }, []);

  const resetGame = async () => {
    const res = await fetch('http://localhost:4000/word_prompts');
    const data = await res.json();
    setPrompt(data.prompt);
  };

  const handleTimeUp = () => {
    alert('Time is up! Resetting the game...');
    resetGame();
  };

  return (
    <div>
      <h1>Drawing Game</h1>
      <Timer initialSeconds={60} onTimeUp={handleTimeUp} />
      <WordPrompt prompt={prompt || 'Loading...'} />
      <DrawingCanvas />
      <GameControls onReset={resetGame} />
    </div>
  );
}
