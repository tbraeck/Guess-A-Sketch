const GameControls = ({ onReset }) => {
    return (
      <div>
        <button onClick={onReset}>Get New Word Prompt</button>
      </div>
    );
  };
  
  export default GameControls;
  