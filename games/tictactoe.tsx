import React, { useState } from "react"

const initialBoard = Array(9).fill(null)

function checkWinner(board: string[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],            // diags
  ]
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return board.every(Boolean) ? "Draw" : null
}

function getRandomMove(board: string[]) {
  const empty = board.map((v, i) => v ? null : i).filter(v => v !== null)
  if (empty.length === 0) return null
  return empty[Math.floor(Math.random() * empty.length)] as number
}

export default function TicTacToeAI() {
  const [board, setBoard] = useState(initialBoard)
  const [isXNext, setIsXNext] = useState(true)
  const winner = checkWinner(board)

  function handleClick(idx: number) {
    if (board[idx] || winner || !isXNext) return
    const newBoard = board.slice()
    newBoard[idx] = "X"
    setBoard(newBoard)
    setIsXNext(false)

    // AI move after short delay
    setTimeout(() => {
      const aiMove = getRandomMove(newBoard)
      if (aiMove !== null && !checkWinner(newBoard)) {
        newBoard[aiMove] = "O"
        setBoard([...newBoard])
        setIsXNext(true)
      }
    }, 500)
  }

  function reset() {
    setBoard(initialBoard)
    setIsXNext(true)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold mb-2">Tic Tac Toe vs AI</h2>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className="w-16 h-16 text-2xl font-bold bg-slate-800 text-white rounded shadow"
            disabled={!!cell || !!winner || !isXNext}
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="mt-2 text-lg">
        {winner
          ? winner === "Draw"
            ? "It's a draw!"
            : winner === "X"
            ? "You win!"
            : "AI wins!"
          : isXNext
          ? "Your turn (X)"
          : "AI is thinking..."}
      </div>
      <button
        onClick={reset}
        className="mt-2 px-4 py-2 bg-purple-600 text-white rounded"
      >
        Restart
      </button>
    </div>
  )
}