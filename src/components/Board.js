import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import axios from "axios";

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function Board() {
  const [gameState, setGameState] = useState(new Chess());
  const [gameStatus, setGameStatus] = useState("");

  useEffect(() => {
    if(gameState.isCheck()) {
      console.log("In Check!")
      setGameStatus("InCheck!");
    }
    else{
      setGameStatus("");
    }
    if (gameState.isGameOver()) {
      if (gameState.isCheckmate()) {
        console.log("Game over: Checkmate!");
        setGameStatus("Game Over: Checkmate!");
      } 
      else {
        console.log("Game over: Draw!");
        setGameStatus("Game over: Draw!");
      }
    }
    console.log(gameState.fen());
  }, [gameState]);

  const sendFenToAlphaZero = ()=> {
    axios.post('https://localhost:5000/move',{fen : gameState.fen()})
      .then((response) => {
        setGameState(response.data.fen);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  };


  function onDrop(sourceSquare, targetSquare) {
    if(gameState.fen().split(" ")[1] === 'w'){
      const move = gameState.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });
  
      // illegal move
      if (move === null) return;
  
      const newGameState = new Chess(gameState.fen());
      setGameState(newGameState);
      console.log(move);
      
    }
    else{
      sendFenToAlphaZero();
    }
  }

  function resetBoard() {
    setGameState(new Chess());
    setGameStatus("");
  }

  return (
    <div>
      <Chessboard position={gameState.fen()} onPieceDrop={onDrop} boardWidth={500} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="body1" color="error">
          {gameStatus}
        </Typography>
        <Button
          variant="contained"
          onClick={resetBoard}
          style={{
            top: "10px",
            backgroundColor: "#F0D9B5",
            color: "#000000",
            "&:hover": {
              backgroundColor: "#D9B088",
            },
          }}
        >
          {"\u25A0"} Reset
        </Button>
      </div>
    </div>
  );
  
}

export default Board;


