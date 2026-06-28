// bun test src/problems/41-calculator/test/calculator.utils.test.ts
import { useState } from 'react'
import css from './calculator.module.css'
// import flex from '@course/styles'
// import cx from '@course/cx'
// import { BUTTONS, INVALID_VALUE } from './calculator.utils'
import { BUTTONS } from './calculator.utils'

// Buttons are static
const buttons = BUTTONS.values().map((button) => {
  return (
    <button className={css.btn} key={button.label} data-operator={button.label}>
      {button.label}
    </button>
  )
})

export const Calculator = () => {
  // Step 1: State — single string state for the display value, initialized to '0'
  const [displayVal, setDisplayVal] = useState<string>('0')
  // Step 2: handleButtonClick — use event delegation on the keypad section:
  //   - Read `data-label` from the clicked button
  //   - Look up the button in BUTTONS map and call its `action(state, label)`
  //   - Update state with the result
  // Step 3: Render — output display + keypad section with BUTTONS.values() mapped to <button> elements
  //   - Each button has `data-label` attribute and className styling
  //   - Disable all buttons except 'AC' when state === INVALID_VALUE

  // Use a single function that has all the buttons actions
  // On a big application with this, makes the performance better than adding
  // on each of the buttons

  const handleButtonClick: React.MouseEventHandler = ({ target }) => {
    if (target instanceof HTMLElement && target.dataset.operator) {
      const operator = target.dataset.operator
      const button = BUTTONS.get(operator)
      if (button) {
        setDisplayVal((state) => button.action(state, operator))
      }
    }
  }
  return (
    <section className={css.calculator} onClick={handleButtonClick}>
      <output>{displayVal}</output>
      {buttons}
    </section>
  )
}
