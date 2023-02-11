data = {
    color: 'red',
    name: 'Jane Doe',
    type: 'Super Hero',
    animalLongKeyName: 'Shark',
    numebrs: 42,
    heroes: ['Wonder Woman: DC', 'Batman: DC', 'Thor: Marvel', 'Some other: Marvel']
};
const newArray = new Array(data.heroes) //Does not change the original
const originalHeroes = data.heroes //Changes the original on next line
//data.heroes.push('Superman: DC')

const spreadHeroes = [...data.heroes]
data.heroes.push('Superman: DC')
console.log(spreadHeroes)

/*
function printHeroes1(heroes){
    console.log("I am printng heroes")
    heroes.forEach(hero => console.log(hero));
}*/
//printHeroes1()

function printHeroes2(...heroes){ //Scoop
    console.log("I am printng heroes")
    heroes.forEach(hero => console.log(hero));
    console.log("\n\n")
}
printHeroes2(...data.heroes, 'Spiderman: Marvel')//Spread

printHeroes2(..."Test")
//

//Destructing Arrays
const [firstname, lastname] = ['Roman', 'kuba', 'Batman']
//const firstname = ['Roman'][0]
console.log(lastname, firstname)

//Objects
const {color, name, animalLongKeyName: animal} = data
console.log(color, name, animal)

function printName({name}){ //Destructuring
    console.log('The name is: ', name)
}

function printName2({name = 'Nope'}){ //Destructuring
    console.log('The name is: ', name)
}

printName(data)
printName({})
