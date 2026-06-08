import { AbstractComponent, type TComponentConfig } from '@course/utils'
import css from './star-rating.module.css'
import styles from './star-rating.module.css'
import flex from '@course/styles'
import cx from '@course/cx'

const STAR = '⭐️'
const STARS_COUNT = 5

type TStarRatingProps = {
  value: number
  onValueChange?: (value: number) => void
  readOnly?: boolean
}

export class StarRating extends AbstractComponent<TStarRatingProps> {
  private value: number = 0

  /**
   * Step 1: Constructor
   * - Call super() with spread config + className: [css.container] and listeners: ['click']
   * - Initialize this.value from config.value
   */
  constructor(config: TComponentConfig<TStarRatingProps>) {
    super({
      ...config,
      className: [styles.container],
      listeners: ['click'],
    })
    this.value = config.value
  }

  /**
   * Step 2: Handle click event
   * - Return early if this.config.readOnly
   * - Use (event.target as HTMLElement).closest('button') to find the clicked button
   * - Read the star value from button.dataset.starValue (convert to Number)
   * - If valid: update this.value, call this.config.onValueChange, call this.render()
   */
  onClick({ target }: MouseEvent): void {
    if (this.config.readOnly) return

    if (target instanceof HTMLElement && target.dataset.rating) {
      const value = Number(target.dataset.rating)
      if (!isNaN(value)) {
        this.value = value
        this.config.onValueChange?.(this.value)
        this.render()
      }
    }
  }

  /**
   * Step 3: Return HTML template
   * - Create a stars string by mapping over STARS_COUNT (Array.from({ length: STARS_COUNT }))
   * - Each star is a <button> with:
   *     - role="radio"
   *     - aria-label="Rating of N"
   *     - aria-selected="${value == this.value}"
   *     - data-rating="${value}"
   *     - data-checked="${value <= this.value}"
   * - Wrap stars in a container <div> with:
   *     - role="radiogroup"
   *     - aria-label="Star rating"
   *     - aria-readonly="${this.config.readOnly ?? false}"
   * - Include a hidden <input type="hidden" value="${this.value}" aria-hidden="true" />
   */
  toHTML(): string {
    const stars = Array.from({ length: STARS_COUNT }, (_, index) => this.getStar(index + 1))

    return `
        <input type="number" value="${this.value}" readonly hidden />
        <div class="${cx(css.container, flex.flexRowCenter)}" 
                role="radiogroup" 
                aria-label="Star rating" 
                aria-readonly="${String(this.config.readOnly ?? false)}">
                <span>${stars.join('')}
            </div>`
  }

  getStar = (value: number) => {
    // The ideal would be to use the Radio Button pattern, but it takes some time to style
    // So we will use buttons with ARIA attributes to mimic the behavior for now
    return `<button role="radio" 
            class="${css.star}"
            aria-selected="${value === this.value}"
            data-rating="${value}"
            data-checked="${value <= this.value}" 
            aria-label="Rating of ${value}">
            ${STAR}
            </button>`
  }

  /**
   * Step 4: Set ARIA attributes on the container after render
   * - Return early if !this.container
   * - Set role="radiogroup" on this.container
   * - Set aria-label="Star Rating" on this.container
   * - Set aria-readonly to String(this.config.readOnly ?? false) on this.container
   */
  afterRender(): void {
    if (!this.container) return

    this.container.setAttribute('role', 'radiogroup')
    this.container.setAttribute('aria-label', 'Star Rating')
    this.container.setAttribute('aria-readonly', String(this.config.readOnly ?? false))
  }
}
