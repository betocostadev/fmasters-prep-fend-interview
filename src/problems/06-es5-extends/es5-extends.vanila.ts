// bun test src/problems/06-es5-extends/test/es5-extends.test.ts

export const myExtends = (SuperType: Function, SubType: Function) => {
  // Step 1: Create a new constructor function MyType(this, ...args)
  function ExtendedType(...args: any[]) {
    const target = Object.create(SubType.prototype)
    SuperType.apply(target, args)
    SubType.apply(target, args)
    return target
  }
  // Step 2: Set up prototype chain
  Object.setPrototypeOf(SubType.prototype, SuperType.prototype)
  // Step 3: Set up static/constructor inheritance
  Object.setPrototypeOf(ExtendedType, SuperType)
  // Step 4: Return MyType
  return ExtendedType
}

// --- Examples ---
// Uncomment to test your implementation:

function Animal(this: any, name: string) {
  this.name = name
}
Animal.prototype.greet = function () {
  return `Hello, ${this.name}`
}

function Dog(this: any) {
  this.breed = 'Labrador'
}
Dog.prototype.bark = function () {
  return `${this.name} says Woof!`
}
//
const DogExtended = myExtends(Animal, Dog)
const dog = new (DogExtended as any)('Meg')
console.log(dog.name) // Expected: "Meg"
console.log(dog.breed) // Expected: "Labrador"
console.log(dog.greet()) // Expected: "Hello, Meg"
console.log(dog.bark()) // Expected: "Meg says Woof!"
console.log('Is dog instance of Animal?', dog instanceof Animal) // Expected: true
