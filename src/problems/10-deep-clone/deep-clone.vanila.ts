// bun test src/problems/10-deep-clone/test/deep-clone.test.ts

import { detectType } from '@course/utils'

type TCollection = Map<any, any> | Set<any> | Record<any, any> | Array<any>

function getTarget(type: string): TCollection {
  switch (type) {
    case 'map':
      return new Map()
    case 'set':
      return new Set()
    case 'array':
      return []
    case 'object':
      return {}
    default:
      throw new Error(`Unsupported type: ${type}`)
  }
}

function entries(target: TCollection): Iterable<[key: any, value: any]> {
  const isMapSetOrArray = target instanceof Map || target instanceof Set || target instanceof Array
  return isMapSetOrArray ? target.entries() : Object.entries(target)
}

function set(target: TCollection, key: any, value: any) {
  if (target instanceof Map) {
    target.set(key, value)
  } else if (target instanceof Set) {
    target.add(value)
  } else if (target instanceof Array) {
    // Will create array keys as numbers an TS enforces it
    target[key as number] = value
  } else {
    target[key] = value
  }
}

export const deepClone = <T>(a: T, cache = new Map()): T => {
  const type = detectType(a)

  if (!a || typeof a !== 'object') {
    return a
  }

  switch (type) {
    case 'date':
      return new Date(a as unknown as Date) as T
    case 'object':
    case 'map':
    case 'set':
    case 'array': {
      if (cache.has(a)) {
        return cache.get(a)
      }

      const target = getTarget(type)
      cache.set(a, target)

      for (const [key, value] of entries(a)) {
        set(target, key, deepClone(value, cache))
      }

      return target as T
    }
    default:
      throw new Error(`Unsupported type: ${type}`)
  }
}

// --- Examples ---
// Uncomment to test your implementation:
console.log('=== DEEP CLONE ===')

const obj = { a: { b: 1 }, c: [2, 3] }
console.log('Obj1 :', obj)
const cloned = deepClone(obj)
console.log('Obj1 cloned:', cloned)

console.log('cloned.a.b = 99')
cloned.a.b = 99
console.log('obj.a.b: ', obj.a.b) // Expected: 1 (unaffected)
console.log(obj.a.b)
console.log('cloned.a.b: ', cloned.a.b) // Expected: 99

const map = new Map([['key', { value: 1 }]])
const clonedMap = deepClone(map)
console.log('Cloned map:')
console.log(clonedMap.get('key')) // Expected: { value: 1 }
console.log(clonedMap.get('key') !== map.get('key')) // Expected: true

console.log('Circular: ')
const circular: any = { a: 1 }
circular.self = circular
const clonedCircular = deepClone(circular)
console.log(clonedCircular.self === clonedCircular) // Expected: true
