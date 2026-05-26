// bun test src/problems/09-deep-equals/test/deep-equals.test.ts
/* Goal: Implement deepEquals(a, b) - Check wheter two values are structurally identical
Input: two values (any type)
Output: boolean

Requirements:
Primitives
- use strict equality ===
- Special case: handle NaN

Objects / Arrays
- Compare keys length
- Recursively compare values

No type Coercion
- "1" !== 1

Circular References
- Detect and handle cycles (optional, but strong solution)

*/
// How circular references break recursive functions
// const a = { name: 'Meg'}
// a.self = a // circular reference
// const b = { name: 'Meg'}
// b.self = b // circular reference
// deepEquals (a, b) - Loop

import { detectType } from '@course/utils'

export function deepEquals(a: any, b: any, cache = new Map()): boolean {
  // if (a === b || (cache.has(a) && cache.get(a)) === b) return true
  if (a === b || (cache.has(a) && cache.get(a))) return true

  const [typeA, typeB] = [detectType(a), detectType(b)]

  if (typeA !== typeB) {
    return false
  }

  if (typeof a !== 'object') {
    return a === b
  }

  // Deep
  const [keysA, keysB] = [new Set(Object.keys(a)), new Set(Object.keys(b))]

  if (keysA.symmetricDifference(keysB).size > 0) {
    // console.log(keysA.symmetricDifference(keysB))
    return false
  }

  // Here we need to use the cache to avoid an infinite loop in the comparisons
  cache.set(a, b)

  // Handles both objects and arrays
  for (const key of keysA) {
    // Pass the cache in the next recursion call
    if (!deepEquals(a[key], b[key], cache)) return false
  }

  return true
}

// --- Examples ---
// Uncomment to test your implementation:

console.log(deepEquals(1, 1)) // Expected: true
console.log(deepEquals('hello', 'hello')) // Expected: true
console.log(deepEquals(null, undefined)) // Expected: false
console.log(deepEquals([1, 2, 3], [1, 2, 3])) // Expected: true
console.log(deepEquals({ a: 1, b: 2 }, { b: 2, a: 1 })) // Expected: true
console.log(deepEquals({ a: 1 }, { a: 2 })) // Expected: false
// Extra
console.log('Extra comparisons:')
console.log(deepEquals('hello', ['hello']))
// Will get caught in the symmetric difference
console.log(deepEquals({ a: 'meg', b: 'maya' }, { a: 'meg' })) // false
console.log(deepEquals(NaN, false)) // false
console.log(deepEquals([1, 3, 4], [1, 3, 5])) // Expected: false

console.log('Recursive values')
const a: any = { value: 1 }
a.self = a
const b: any = { value: 1 }
b.self = b
console.log(deepEquals(a, b)) // Expected: true (circular)
