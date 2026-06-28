import { useRef, useState } from 'react'
// import flex from '@course/styles'
import css from './square-game.module.css'
import cx from '@course/cx'
// import styles from './square-game.module.css'

const GAME_SIZE = 3
const LAST_ELEMENT = GAME_SIZE ** 2 - 1

/**
 * Expected data:
 * state = [
 *   [1, 2, 3],
 *   [4, null, 5],
 *   [7, 8, 6]
 * ]
 * - 2D array of numbers and one null (empty cell)
 * - Click a cell adjacent to null to swap them
 */

type TSquareGameProps = {
  initState?: Array<Array<number | null>>
}

function createGameState(): Array<Array<number | null>> {
  const state = Array.from(
    {
      length: GAME_SIZE ** 2,
    },
    (_, index) => (index === LAST_ELEMENT ? null : index + 1),
  )
  state.sort(() => Math.random() - 0.5)
  // Convert to 2D array
  return Array.from(
    {
      length: GAME_SIZE,
    },
    (_, index) => state.slice(index * GAME_SIZE, (index + 1) * GAME_SIZE),
  )
}

function isWin(state: Array<Array<number | null>>) {
  // Check if every value is in order [1, 2, 3, 4, 5, 6, 7, 8, null]
  return state.flat().every((value, index) => {
    if (value == null) {
      return index === LAST_ELEMENT // 8
    }
    return value === index + 1
  })
}

// Validate movements x y coords from and to
function validate([x1, y1]: [number, number], [x2, y2]: [number, number]) {
  const isValidVerticalMove = x1 === x2 && (y1 === y2 - 1 || y1 === y2 + 1)
  const isValidHorizontalMove = y1 === y2 && (x1 === x2 - 1 || x1 === x2 + 1)
  return isValidVerticalMove || isValidHorizontalMove
}

export const SquareGame = ({ initState }: TSquareGameProps = {}) => {
  // Step 1: State — useState initialized with initState ?? getGameState(GAME_SIZE)
  const [gameState, setGameState] = useState<Array<Array<number | null>>>(
    initState ?? createGameState(),
  )

  const emptyReference = useRef<HTMLDivElement | null>(null)
  // Step 2: handleCellClick — event delegation handler:
  //   - Read data-row and data-col from clicked element
  //   - Find empty position with getEmptyPosition(state)
  //   - Validate move with validate([row, col], [emptyRow, emptyCol])
  //   - If valid, structuredClone state, swap cells, setState
  // Step 3: Render:
  //   - Display win status using isWin(state)
  //   - Board div with onClickCapture, map state rows and cells
  //   - Each cell div has data-row, data-col, conditional styling for null vs filled
  return (
    <div className={cx(css.gameField)}>
      {gameState.map((row, rowIndex) => {
        return row.map((col, colIndex) => {
          return (
            <div
              ref={col === null ? emptyReference : null}
              className={cx(css.grid__cell)}
              data-row={rowIndex}
              data-col={colIndex}
              data-empty={col === null}
            >
              {col === null ? '' : col}
            </div>
          )
        })
      })}
    </div>
  )
}
