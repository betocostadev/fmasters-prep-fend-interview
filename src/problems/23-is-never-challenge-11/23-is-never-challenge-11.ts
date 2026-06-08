/**
 * 3.3 IsNever
 *
 * Implement a type `IsNever<T>`, which takes input type `T`.
 * If the type of `T` is `never`, return `true`, otherwise return `false`.
 *
 * @example
 * type A = IsNever<never> // true
 * type B = IsNever<string> // false
 * type C = IsNever<undefined> // false
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

// Making a tuple with `T` and `never` prevents distributive conditional types, which is necessary for this problem.
// Otherwise, the conditional type would distribute over unions, and we would get incorrect results for cases like `never | string`.
type IsNever<T> = [T] extends [never] ? true : false

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>,
]
