import React, { useState } from "react"

const initialBoard: (string | null)[] = Array(9).fill(null)

function checkWinner(board: (string | null)[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ]
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return board.every(cell => cell) ? "Draw" : null
}

function getRandomMove(board: (string | null)[]) {
  const empty = board.map((v, i) => v ? null : i).filter(v => v !== null) as number[]
  if (empty.length === 0) return null
  return empty[Math.floor(Math.random() * empty.length)]
}

export default function TicTacToeAI() {
  const [board, setBoard] = useState<(string | null)[]>(initialBoard)
  const [isXNext, setIsXNext] = useState(true)
  const [quantumMode, setQuantumMode] = useState(false) // toggle for quantum moves
  const [quantumMoves, setQuantumMoves] = useState<number[]>([]) // positions of qubits
  const [waitingForMeasure, setWaitingForMeasure] = useState(false)
  
  const winner = checkWinner(board)

  function handleClick(idx: number) {
    if (board[idx] || winner || !isXNext || waitingForMeasure) return

    const newBoard = [...board]
    newBoard[idx] = "X"
    setBoard(newBoard)
    setIsXNext(false) // End player's turn immediately

    if (!quantumMode) {
      // Normal AI move
      setTimeout(() => {
        if (!checkWinner(newBoard)) {
          const aiMove = getRandomMove(newBoard)
          if (aiMove !== null) {
            const aiBoard = [...newBoard]
            aiBoard[aiMove] = "O"
            setBoard(aiBoard)
          }
        }
        if (!checkWinner(newBoard)) {
          setIsXNext(true) // Back to player's turn
        }
      }, 500)
    } else {
      // Quantum AI move
      setTimeout(() => {
        const possibleMoves = newBoard
          .map((v, i) => (v ? null : i))
          .filter(v => v !== null) as number[]
        
        if (possibleMoves.length > 0) {
          // AI picks 1 or 2 qubit positions randomly
          const shuffled = possibleMoves.sort(() => Math.random() - 0.5)
          const chosen = shuffled.slice(0, Math.min(2, shuffled.length))
          setQuantumMoves(chosen)
          setWaitingForMeasure(true) // Wait for measure before player's turn
        }
      }, 500)
    }
  }

  function measure() {
    if (!waitingForMeasure) return

    const collapsedBoard = [...board]
    quantumMoves.forEach(pos => {
      collapsedBoard[pos] = "O"
    })
    setBoard(collapsedBoard)
    setQuantumMoves([])
    setWaitingForMeasure(false)

    if (!checkWinner(collapsedBoard)) {
      setIsXNext(true) // Player's turn resumes
    }
  }

  function reset() {
    setBoard(initialBoard)
    setIsXNext(true)
    setQuantumMoves([])
    setWaitingForMeasure(false)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold mb-2">
        Tic Tac Toe {quantumMode ? "Quantum Mode" : "Normal Mode"}
      </h2>

      {/* Mode Toggle */}
      <div>
        <label className="mr-2">
          <input
            type="checkbox"
            checked={quantumMode}
            onChange={(e) => setQuantumMode(e.target.checked)}
          /> Ennable Quantum Move
        </label>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, idx) => {
          const isQubit = quantumMoves.includes(idx)
          return (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              className="w-16 h-16 text-2xl font-bold bg-slate-800 text-white rounded shadow"
              disabled={!!cell || !!winner || !isXNext || waitingForMeasure}
            >
              {isQubit ? "Q" : cell}
            </button>
          )
        })}
      </div>

      {/* Game Status */}
      <div className="mt-2 text-lg">
        {winner
          ? winner === "Draw"
            ? "It's a draw!"
            : winner === "X"
            ? "You win!"
            : "AI wins!"
          : quantumMode && waitingForMeasure
          ? "Click 'Measure' to collapse qubits!"
          : isXNext
          ? "Your turn (X)"
          : "AI is thinking..."}
      </div>

      {/* Measure Button */}
      {quantumMode && waitingForMeasure && !winner && (
        <button
          onClick={measure}
          className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Measure
        </button>
      )}

      {/* Restart Button */}
      <button
        onClick={reset}
        className="mt-2 px-4 py-2 bg-purple-600 text-white rounded"
      >
        Restart
      </button>
    </div>
  )
}
