/**
 * 5.2 TrimLeft
 *
 * Implement `TrimLeft<T>` which takes an exact string type and returns a new string with the whitespace beginning removed.
 *
 * @example
 * type trimed = TrimLeft<'  Hello World  '> // 'Hello World  '
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

// Your implementation here

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]
