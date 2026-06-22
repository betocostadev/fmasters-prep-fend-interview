import css from './gallery.module.css'
import flex, { maxH1000px, maxW1000px } from '@course/styles'
import cx from '@course/cx'
import { useState, useEffect, useCallback } from 'react'

type TGalleryProps = {
  images: string[]
}

/**
 * Expected input:
 * <Gallery images={['url1.jpg', 'url2.jpg', 'url3.jpg']} />
 */
export const Gallery = ({ images }: TGalleryProps) => {
  // Step 1: Set up state
  // - currentIndex (number, default 0) to track the active slide
  const [currentIndex, setCurrentIndex] = useState(0)
  // Step 2: Create navigation handlers with useCallback
  const handlePrev = useCallback(() => setCurrentIndex((prev) => Math.max(0, prev - 1)), [])

  const handleNext = useCallback(
    () => setCurrentIndex((next) => Math.min(images.length - 1, next + 1)),
    [images.length],
  )

  // Step 3: Add keyboard navigation with useEffect
  // - Listen for 'keydown' on window
  // - ArrowLeft → handlePrev, ArrowRight → handleNext
  // - Clean up the event listener on unmount
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])

  // Step 4: Handle empty state
  if (images.length === 0) {
    return (
      <section className={cx(flex.w100, flex.maxW800px, flex.h600px, flex.pRel, css.container)}>
        <div className={cx(flex.flexRowCenter, flex.h100, css.empty, flex.fontX)}>
          No images to display
        </div>
      </section>
    )
  }

  // Step 5: Render the gallery
  // - <section> container with positioning classes
  // - Prev button (disabled when currentIndex === 0), positioned absolute left, aria-label="Previous image"
  // - <ul> with transform: translateX(-currentIndex * 100%) for sliding
  // - Each <li> contains an <img>; use lazy loading: src={currentIndex + 2 >= index ? image : undefined}
  // - Next button (disabled when currentIndex === images.length - 1), positioned absolute right, aria-label="Next image"
  // - Dot indicators: one <button> per image, active dot gets css.dotActive class
  //   - onClick sets currentIndex to that dot's index, aria-label="Go to image {index + 1}"

  const transformStyle = {
    transform: `translateX(-${currentIndex * 100}%)`,
  }

  return (
    <section className={cx(flex.pRel, css.gallery, maxW1000px)}>
      <button
        className={cx(css.button)}
        disabled={currentIndex === 0}
        onClick={handlePrev}
        aria-label="Previous image"
      >
        Prev
      </button>
      <ul style={transformStyle} className={cx(css.image__list)}>
        {images.map((image, index) => (
          <li className={cx(css.image)} key={`image-p-${index}`}>
            <img
              src={currentIndex + 2 >= index ? image : undefined}
              alt={`Displaying N${index + 1}`}
            />
          </li>
        ))}
      </ul>
      <button
        className={cx(css.button, css.nextbtn)}
        disabled={currentIndex === images.length - 1}
        onClick={handleNext}
        aria-label="Next image"
      >
        Next
      </button>

      <div
        className={cx(
          flex.justifyCenter,
          flex.flexGap8,
          flex.pAbs,
          flex.left0,
          flex.right0,
          flex.z1,
          css.indicators,
        )}
      >
        {images.map((_, index) => (
          <button
            key={`slide-dot-${index}`}
            className={cx(
              css.dot,
              flex.bgWhite5,
              flex.br128,
              currentIndex === index ? css.dotActive : '',
            )}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
