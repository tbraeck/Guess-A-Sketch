import { useEffect, useRef, useState } from 'react';

const DrawingCanvas = ({ onSave }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [guess, setGuess] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineWidth = 4;

    // Mouse down to start drawing
    const startDrawing = (e) => {
      context.beginPath();
      context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      setIsDrawing(true);
    };

    // Mouse move to continue drawing
    const draw = (e) => {
      if (!isDrawing) return;
      context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      context.stroke();
    };

    // Mouse up to stop drawing
    const stopDrawing = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
    };
  }, [isDrawing]);

  const handleSave = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL();
    onSave(dataUrl);
  };

  // Function to use the Web Speech API for voice output
  const speakGuess = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (guess) {
      speakGuess(guess); // Speak the guess when it changes
    }
  }, [guess]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        style={{ border: '1px solid black' }}
      ></canvas>
      <button onClick={handleSave}>Submit Drawing</button>
    </div>
  );
};

export default DrawingCanvas;
