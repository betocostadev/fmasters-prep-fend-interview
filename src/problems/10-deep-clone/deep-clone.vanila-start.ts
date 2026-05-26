// bun test src/problems/10-deep-clone/test/deep-clone.test.ts
// TODO: Implement deepClone

import { detectType } from '@course/utils'

type TCollection = Map<any, any> | Set<any> | Record<any, any> | Array<any>

function getTarget(type: string): TCollection {}
function entries(target: TCollection): Iterable<[key: any, value: any]> {}
function set(target: TCollection, key: any, value: any) {}

export const deepClone = <T>(a: T, cache = new Map()): T => {
  const type = detectType(a)

  if (!a || typeof a !== 'object') {
    return a
  }

  switch (type) {
    case 'date':
    case 'object':
    case 'map':
    case 'set':
    case 'array':
    default:
      throw 'Unsupported type ' + a
  }
}

// --- Examples ---
// Uncomment to test your implementation:

// console.log('=== DEEP CLONE ===')

// const obj = { a: { b: 1 }, c: [2, 3] }
// console.log('Obj1 :', obj)
// const cloned = deepClone(obj)
// console.log('Obj1 cloned:', cloned)

// console.log('cloned.a.b = 99')
// cloned.a.b = 99
// console.log('obj.a.b: ', obj.a.b) // Expected: 1 (unaffected)
// console.log(obj.a.b)
// console.log('cloned.a.b: ', cloned.a.b) // Expected: 99

// const map = new Map([['key', { value: 1 }]])
// const clonedMap = deepClone(map)
// console.log('Cloned map:')
// console.log(clonedMap.get('key')) // Expected: { value: 1 }
// console.log(clonedMap.get('key') !== map.get('key')) // Expected: true
//
// console.log('Circular: ')
// const circular: any = { a: 1 }
// circular.self = circular
// const clonedCircular = deepClone(circular)
// console.log(clonedCircular.self === clonedCircular) // Expected: true
