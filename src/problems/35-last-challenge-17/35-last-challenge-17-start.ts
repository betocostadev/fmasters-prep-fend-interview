/**
 * 4.4 Last
 *
 * Implement a generic `Last<T>` that takes an Array `T` and returns its last element.
 *
 * @example
 * type arr1 = ['a', 'b', 'c']
 * type arr2 = [3, 2, 1]
 *
 * type tail1 = Last<arr1> // 'c'
 * type tail2 = Last<arr2> // 1
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

// Your implementation here

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<Last<[]>, never>>,
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]
