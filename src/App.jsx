import { useState, useEffect } from 'react';
import './App.css';
import Game from './components/game';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [count, setCount] = useState(0);
  const [winner, setWinner] = useState(false);
  const [name, setName] = useState(null);
  const [history, setHistory] = useState([Array(9).fill(null)]);

  useEffect(() => {
  }, [squares, count]);

  function calculateWinner(squares) {
    const lines = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[b] && squares[c] && squares[a] === squares[b] && squares[a] === squares[c] && squares[b] === squares[c]) {
        return true;
      }
    }
    return false;
  }

  function handleClick(i) {
    if(winner){
      return;
    }
    const nextSquares = squares.slice();
    if (nextSquares[i] == null) {
      const currentPlayer = count % 2 === 0 ? 'X' : 'O';
      nextSquares[i] = currentPlayer;
      setSquares(nextSquares);
      const hist = [...history.slice(0, count + 1), nextSquares];
      setHistory(hist);
      const x = count + 1;
      setCount(x);
      const find = calculateWinner(nextSquares);
      if (find) {
        setWinner(true);
        setName(currentPlayer);
      }
    }
  }
  function makeInitial(){
    const temp=[];
    setCount(0);
    setSquares(temp);
    setWinner(false);
    setHistory([Array(9).fill(null)]);
  }
  function stateChange(index){
    setSquares(history[index]);
    setCount(index);
    if(calculateWinner(history[index])){
      setWinner(true)
    }
    else{
      setWinner(false);
    }
  }
  const moves = history.map((squares, index) => {
    let description;
    if (index > 0) {
      description = 'Go to move #' + index;
    }
    return (
      <li key={index}>
        <button onClick={() => stateChange(index)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <div className='flex flex-row'>
        <div>
          {winner && 
            <h1>Winner is {name}</h1>
          }
          <div className='flex flex-row'>
            <div className="board-row">
              <Game value={squares[0]} onSquareClick={() => handleClick(0)} />
              <Game value={squares[1]} onSquareClick={() => handleClick(1)} />
              <Game value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
              <Game value={squares[3]} onSquareClick={() => handleClick(3)} />
              <Game value={squares[4]} onSquareClick={() => handleClick(4)} />
              <Game value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
              <Game value={squares[6]} onSquareClick={() => handleClick(6)} />
              <Game value={squares[7]} onSquareClick={() => handleClick(7)} />
              <Game value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
          </div>
        </div>
        <div className='ml-[50px]'>
          <button onClick={makeInitial} className='bg-gray-300'>Go to Game Start</button>
          <div>
            <ol>{moves}</ol>
          </div>
        </div>  
      </div>
    </>
  );
}

export default App;
