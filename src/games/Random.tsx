import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const Random = () => {

  const [game, setGame] = useState<Chess>(new Chess());
  const [gameIsActive, setGameIsActive] = useState<boolean>(true);

  const makeMove = (move: Move): Move | null => {
    const gameCopy: Chess = new Chess();
    gameCopy.loadPgn(game.pgn());
    const result: Move | null = gameCopy.move(move);
    setGame(gameCopy);
    return result;
  }

  const randomMove = (): undefined => {
    console.log("Yo");
    const possibleMoves: string[] = game.moves();
    if (possibleMoves.length === 0) {
      console.log("Take that L");
      game.reset();
      location.reload();
      // setGameIsActive(false);
      return;
    }
    const randomIdx: number = Math.floor(Math.random() * possibleMoves.length);
    makeMove(possibleMoves[randomIdx]);
    // Exit if game is over
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) {
      game.reset();
      // setGameIsActive(false);
      return;
    }
  }
  
  const onDrop = (source: string, target: string): boolean => {
    const playerMove: Move = {
      from: source,
      to: target,
      promotion: 'q'
    }
    const move: Move | null = makeMove(playerMove);
    // Not a legal move
    if (move === null) return false;
    // If user move is legal, let computer make random move
    return true;
  }

  // On every render, move when it is no longer user's turn
  if (gameIsActive && game.turn() !== 'w') setTimeout(randomMove, 300);

  return (
    <div className='w-[400px]'>
      <Chessboard
        position={game.fen()}
        onPieceDrop={onDrop}
      />
    </div>
  )
}

export default Random;