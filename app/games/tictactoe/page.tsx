"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Home, HelpCircle, Zap, Eye } from "lucide-react"
import Link from "next/link"

type CellState = "empty" | "X" | "O" | "superposition" | "entangled"
type GameState = "playing" | "won" | "draw" | "quantum"

interface QuantumCell {
  state: CellState
  superposition?: { X: number; O: number }
  entangled?: number[]
  measured: boolean
}

export default function QuantumTicTacToePage() {
  const [board, setBoard] = useState<QuantumCell[]>(
    Array(9)
      .fill(null)
      .map(() => ({
        state: "empty",
        measured: false,
      })),
  )
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X")
  const [gameState, setGameState] = useState<GameState>("playing")
  const [winner, setWinner] = useState<"X" | "O" | null>(null)
  const [quantumMode, setQuantumMode] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [moveCount, setMoveCount] = useState(0)

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ]

  const checkWinner = (currentBoard: QuantumCell[]) => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo
      if (
        currentBoard[a].state !== "empty" &&
        currentBoard[a].state === currentBoard[b].state &&
        currentBoard[b].state === currentBoard[c].state &&
        currentBoard[a].measured &&
        currentBoard[b].measured &&
        currentBoard[c].measured
      ) {
        return currentBoard[a].state as "X" | "O"
      }
    }
    return null
  }

  const makeMove = (index: number) => {
    if (board[index].state !== "empty" || gameState !== "playing") return

    const newBoard = [...board]

    if (quantumMode && moveCount < 6) {
      // Quantum move - create superposition
      newBoard[index] = {
        state: "superposition",
        superposition: { X: 0.5, O: 0.5 },
        measured: false,
      }
      setQuantumMode(false)
    } else {
      // Classical move
      newBoard[index] = {
        state: currentPlayer,
        measured: true,
      }
    }

    setBoard(newBoard)
    setMoveCount(moveCount + 1)

    // Check for winner
    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
      setGameState("won")
    } else if (newBoard.every((cell) => cell.state !== "empty")) {
      setGameState("draw")
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    }
  }

  const measureQuantumCell = (index: number) => {
    if (board[index].state !== "superposition") return

    const newBoard = [...board]
    // Simulate quantum measurement - random collapse
    const result = Math.random() > 0.5 ? "X" : "O"
    newBoard[index] = {
      state: result,
      measured: true,
    }

    setBoard(newBoard)

    // Check for winner after measurement
    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
      setGameState("won")
    }
  }

  const resetGame = () => {
    setBoard(
      Array(9)
        .fill(null)
        .map(() => ({
          state: "empty",
          measured: false,
        })),
    )
    setCurrentPlayer("X")
    setGameState("playing")
    setWinner(null)
    setQuantumMode(false)
    setMoveCount(0)
  }

  const getCellDisplay = (cell: QuantumCell) => {
    switch (cell.state) {
      case "empty":
        return ""
      case "superposition":
        return "⟨X|O⟩"
      case "X":
        return "X"
      case "O":
        return "O"
      default:
        return ""
    }
  }

  const getCellStyle = (cell: QuantumCell) => {
    switch (cell.state) {
      case "superposition":
        return "bg-purple-500/20 border-purple-400 text-purple-300 animate-pulse"
      case "X":
        return "bg-blue-500/20 border-blue-400 text-blue-300"
      case "O":
        return "bg-red-500/20 border-red-400 text-red-300"
      default:
        return "bg-slate-700 border-slate-600 hover:bg-slate-600 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Quantum Tic Tac Toe
              </span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience quantum mechanics through gameplay! Use superposition and measurement to win.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Game Board */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">
                      {gameState === "playing" && `Player ${currentPlayer}'s Turn`}
                      {gameState === "won" && `Player ${winner} Wins!`}
                      {gameState === "draw" && "It's a Draw!"}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                        Move {moveCount}
                      </Badge>
                      {moveCount < 6 && (
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Quantum Phase</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {board.map((cell, index) => (
                      <button
                        key={index}
                        onClick={() => makeMove(index)}
                        disabled={cell.state !== "empty" || gameState !== "playing"}
                        className={`
                          aspect-square text-2xl font-bold border-2 rounded-lg transition-all duration-200
                          ${getCellStyle(cell)}
                          ${cell.state === "empty" && gameState === "playing" ? "cursor-pointer" : "cursor-not-allowed"}
                        `}
                      >
                        {getCellDisplay(cell)}
                      </button>
                    ))}
                  </div>

                  {/* Quantum Controls */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {moveCount < 6 && gameState === "playing" && (
                        <Button
                          onClick={() => setQuantumMode(!quantumMode)}
                          variant={quantumMode ? "default" : "outline"}
                          className={
                            quantumMode
                              ? "bg-gradient-to-r from-purple-500 to-pink-500"
                              : "border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                          }
                        >
                          <Zap className="mr-2 h-4 w-4" />
                          {quantumMode ? "Quantum Mode ON" : "Enable Quantum Move"}
                        </Button>
                      )}

                      {board.some((cell) => cell.state === "superposition") && (
                        <Button
                          onClick={() => {
                            board.forEach((cell, index) => {
                              if (cell.state === "superposition") {
                                measureQuantumCell(index)
                              }
                            })
                          }}
                          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Measure All
                        </Button>
                      )}

                      <Button
                        onClick={resetGame}
                        variant="outline"
                        className="border-slate-500 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset Game
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <Link href="/club-activity">
                        <Button
                          variant="outline"
                          className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10 bg-transparent"
                        >
                          <Home className="mr-2 h-4 w-4" />
                          Back to Activities
                        </Button>
                      </Link>

                      <Button
                        onClick={() => setShowHelp(!showHelp)}
                        variant="outline"
                        className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                      >
                        <HelpCircle className="mr-2 h-4 w-4" />
                        How to Play
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Game Info & Help */}
            <div className="space-y-6">
              {/* Quantum Concepts */}
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Quantum Concepts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-purple-300 mb-2">Superposition</h4>
                    <p className="text-sm text-gray-400">
                      A quantum move exists in multiple states simultaneously until measured.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-300 mb-2">Measurement</h4>
                    <p className="text-sm text-gray-400">
                      Observing a quantum state causes it to collapse into a definite classical state.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-300 mb-2">Probability</h4>
                    <p className="text-sm text-gray-400">
                      Quantum outcomes are probabilistic, not deterministic like classical physics.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* How to Play */}
              {showHelp && (
                <Card className="bg-slate-800/50 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">How to Play</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-gray-300">
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-1">Classical Moves</h4>
                      <p>Click any empty cell to place your mark (X or O).</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-300 mb-1">Quantum Moves</h4>
                      <p>
                        Enable "Quantum Mode" to place a superposition state ⟨X|O⟩ that exists as both X and O
                        simultaneously.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-300 mb-1">Measurement</h4>
                      <p>Click "Measure All" to collapse all superposition states into definite X or O values.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-300 mb-1">Winning</h4>
                      <p>
                        Get three of your marks in a row, column, or diagonal after all quantum states are measured.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Game Stats */}
              <Card className="bg-slate-800/50 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Game Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Move:</span>
                    <span className="text-white">{moveCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Quantum Moves Available:</span>
                    <span className="text-white">{Math.max(0, 6 - moveCount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Superposition Cells:</span>
                    <span className="text-white">{board.filter((cell) => cell.state === "superposition").length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Game Phase:</span>
                    <span className="text-white">{moveCount < 6 ? "Quantum" : "Classical"}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
