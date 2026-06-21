import { AbstractComponent, type TComponentConfig } from '@course/utils'
import styles from './gallery.module.css'
import flex from '@course/styles'
import cx from '@course/cx'

export type TGalleryProps = {
  images: string[]
}

/**
 * Expected input:
 * {
 *   images: ['url1.jpg', 'url2.jpg', 'url3.jpg']
 * }
 *
 * Step 1: Extend AbstractComponent<TGalleryProps>
 * - Call super() with config, adding:
 *   - className: [styles.container, flex.maxW800px, flex.h600px]
 *   - listeners: ['click']
 * - Store private fields: list (UL), prevBtn, nextBtn, dots (button[]), currentIndex (number)
 * - Bind handleKeyDown and add window 'keydown' listener in init()
 * - Remove the listener in destroy()
 *
 * Step 2: Implement keyboard and click handlers
 * - handleKeyDown: ArrowLeft → handlePrev, ArrowRight → handleNext
 * - onClick: detect prev button, next button, or dot click and call appropriate handler
 * - handlePrev: goToSlide(Math.max(0, currentIndex - 1))
 * - handleNext: goToSlide(Math.min(images.length - 1, currentIndex + 1))
 *
 * Step 3: Implement goToSlide and updateView
 * - goToSlide: set currentIndex, call updateView
 * - updateView:
 *   - Set list transform: translateX(-currentIndex * 100%)
 *   - Update prev/next button disabled states
 *   - Update dot active classes (add/remove styles.dotActive)
 *   - Update img src for lazy loading (currentIndex + 2 >= index)
 *
 * Step 4: Implement afterRender
 * - Query and store DOM refs: list, prevBtn, nextBtn, dots array
 *
 * Step 5: Implement toHTML
 * - Handle empty state: return "No images to display" message
 * - Prev button with styles.buttonPrev, disabled if currentIndex === 0, aria-label="Previous image"
 * - <ul> with styles.list and inline transform style
 * - Each <li> with styles.item containing an <img> (lazy src logic)
 * - Next button with styles.buttonNext, disabled if last image, aria-label="Next image"
 * - Indicators div with dot buttons (styles.dot, styles.dotActive for current), each with aria-label="Go to image {index + 1}"
 */
export class Gallery extends AbstractComponent<TGalleryProps> {
  constructor(config: TComponentConfig<TGalleryProps>) {
    super(config)
  }

  toHTML(): string {
    return '<div>TODO: Implement</div>'
  }
}
