/**
 * 2.7 Diff
 *
 * Get an `Object` that is the difference between `O` & `O1`.
 *
 * @example
 * type Foo = { name: string; age: string }
 * type Bar = { name: string; age: string; gender: number }
 *
 * type Result = Diff<Foo, Bar> // { gender: number }
 */

import type { Equal, Expect } from '@course/types'

/* _____________ Your Code Here _____________ */

type Diff<T1 extends {}, T2 extends {}> = {}

/* _____________ Test Cases _____________ */

type Foo = { name: string; age: string }
type Bar = { name: string; age: string; gender: number }


type Coo = { name: string; gender: number }

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]
