import { useState } from 'react'

export function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const winner = checkWinner(board)
  const isDraw = !winner && board.every(Boolean)

  const handleClick = (i: number) => {
    if (board[i] || winner) return
    const newBoard = [...board]
    newBoard[i] = isXNext ? 'X' : 'O'
    setBoard(newBoard)
    setIsXNext(!isXNext)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
  }

  return (
    <div style={{ marginTop: '10px', marginBottom: '10px', padding: '12px', border: '1px dashed var(--border-hover)', borderRadius: '8px', display: 'inline-block' }}>
      <div style={{ color: 'var(--cyan)', marginBottom: '12px', fontWeight: 'bold' }}>
        {winner ? `→ WINNER: ${winner}!` : isDraw ? "→ IT'S A DRAW!" : `→ Turn: Player ${isXNext ? 'X' : 'O'}`}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 45px)', gap: '6px' }}>
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: '45px', height: '45px',
              background: cell ? 'var(--surface)' : 'var(--surface-hi)',
              border: '1px solid var(--border-hover)',
              color: cell === 'X' ? 'var(--cyan)' : 'var(--purple)',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: winner || cell ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              borderRadius: '4px',
              transition: 'background 0.2s',
            }}
          >
            {cell}
          </button>
        ))}
      </div>
      {(winner || isDraw) && (
        <button 
          onClick={resetGame}
          className="btn-term"
          style={{ marginTop: '16px', fontSize: '0.75rem', padding: '4px 10px' }}
        >
          [ restart_game ]
        </button>
      )}
    </div>
  )
}
