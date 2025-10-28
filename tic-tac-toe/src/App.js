import { useState } from "react";
import "./App.css";

/* Square  */
function Square({ value, onClick, highlight }) {
    return (
        <button
            className={`square${highlight ? " square--win" : ""}`}
            onClick={onClick}
            style={{
                color: value === "X" ? "hotpink" : value === "O" ? "purple" : "black"
            }}
        >
            {value}
        </button>
    );
}


/* Board */
function Board({ squares, onPlay, winningLine }) {
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares).winner) return;
        const next = squares.slice();
        const xIsNext = next.filter(Boolean).length % 2 === 0;
        next[i] = xIsNext ? "X" : "O";
        onPlay(next, i);
    }

    return (
        <>
            <div className="board-row">
                <Square value={squares[0]} onClick={() => handleClick(0)} highlight={winningLine.includes(0)} />
                <Square value={squares[1]} onClick={() => handleClick(1)} highlight={winningLine.includes(1)} />
                <Square value={squares[2]} onClick={() => handleClick(2)} highlight={winningLine.includes(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onClick={() => handleClick(3)} highlight={winningLine.includes(3)} />
                <Square value={squares[4]} onClick={() => handleClick(4)} highlight={winningLine.includes(4)} />
                <Square value={squares[5]} onClick={() => handleClick(5)} highlight={winningLine.includes(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onClick={() => handleClick(6)} highlight={winningLine.includes(6)} />
                <Square value={squares[7]} onClick={() => handleClick(7)} highlight={winningLine.includes(7)} />
                <Square value={squares[8]} onClick={() => handleClick(8)} highlight={winningLine.includes(8)} />
            </div>
        </>
    );
}

/* Game */
export default function App() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [moveCoords, setMoveCoords] = useState([null]);

    const currentSquares = history[currentMove];
    const { winner, line } = calculateWinner(currentSquares);
    const xIsNext = currentMove % 2 === 0;
    const isDraw = !winner && currentSquares.every(Boolean);

    const status = winner
        ? `Winner: ${winner}`
        : isDraw
            ? "Draw"
            : `Next player: ${xIsNext ? "X" : "O"}`;

    function handlePlay(nextSquares, clickedIndex) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);

        const [row, col] = indexToRC(clickedIndex);
        const nextCoords = [...moveCoords.slice(0, currentMove + 1), { row, col }];
        setMoveCoords(nextCoords);
    }

    function jumpTo(move) {
        setCurrentMove(move);
    }

    function reset() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        setMoveCoords([null]);
    }

    const moves = history.map((_, move) => {
        const desc = move
            ? `Go to move #${move} (${moveCoords[move]?.row}, ${moveCoords[move]?.col})`
            : "Go to game start";
        const isCurrent = move === currentMove;
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)} style={{ fontWeight: isCurrent ? 700 : 400 }}>
                    {desc}
                </button>
            </li>
        );
    });

    return (
        <div className="game">
            <div>
                <div className="status">{status}</div>
                <Board squares={currentSquares} onPlay={handlePlay} winningLine={line} />
                <button className="reset" onClick={reset}>Reset</button>
            </div>
            <ol className="moves">{moves}</ol>
        </div>
    );
}

/* helpers */
function calculateWinner(s) {
    const lines = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for (const [a,b,c] of lines) {
        if (s[a] && s[a] === s[b] && s[a] === s[c]) return { winner: s[a], line: [a,b,c] };
    }
    return { winner: null, line: [] };
}

function indexToRC(i) {
    const row = Math.floor(i / 3) + 1;
    const col = (i % 3) + 1;
    return [row, col];
}