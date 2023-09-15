import React, { useState, useEffect } from 'react';
import './TicTacToe.css';


function TicTacToe() {
  const emptyBoard = Array(9).fill("");

  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    if (winner) return null;


    if(board[index] !== "") {
      alert("Quadrado já escolhido.")
      return null;
    }
    setBoard(board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item));

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
  }

  const checkWinner = () => {
    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    possibleWaysToWin.forEach(cells => {
      if (cells.every(cell => cell === "O")) setWinner("O");
      if (cells.every(cell => cell === "X")) setWinner("X");
    });   
  }
    const checkDraw = () => {
      if (board.every(item => item !== "") && winner === null){
        setWinner("E")
      }
    }

  checkDraw();
  useEffect(checkWinner, [board]);

  const playAgain = () => {
    setCurrentPlayer("O");
    setBoard(emptyBoard);
    setWinner(null);
  }

  return (
    <main>
      <h1 className='title'>Jogo da velha</h1>
      <div className={`board ${winner ? "gamer-over" : ""}`}>
        {board.map((item, index) => (
          <div key={index} className={`cell ${item}`} onClick={() => handleCellClick(index)}>{item}</div>
        ))}
        
      </div>
      {winner &&
        <footer>
          {winner === "E" ? 
            <h2 className='winner-message'><span className={winner}>Empate!</span></h2>
            :
            <h2 className='winner-message'><span className={winner}>{winner} </span>ganhou!</h2>
          }          
          <button onClick={playAgain}>Jogar novamente</button>
        </footer>
      }
      
    </main>
  );
}

export default TicTacToe;
