// bun test src/problems/05-throttle/test/throttle.test.ts

type AnyFn = (...args: any[]) => void

export function throttle<F extends AnyFn>(fn: F, delay: number): (...args: Parameters<F>) => void {
  let lastCall: number = 0
  return function throttled(this: unknown, ...args) {
    const now = Date.now()
    // console.log('Now - last call: ', now - lastCall)
    if (now - lastCall >= delay) {
      fn.apply(this, args)
      lastCall = now
    }
  }
}
// --- Examples ---
// Uncomment to test your implementation:

const log = throttle((msg: string) => console.log(msg), 300)
log('fire 1') // fires immediately → "a"
log('fire 2') // ignored (within 300ms)
log('fire 3') // ignored (within 300ms)
setTimeout(() => log('fire 4'), 400) // fires → "d" (300ms passed)
