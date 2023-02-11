//Reducing: gives you a way of reduicng the array to the one value/stricture you care for
data = {
    color: 'red',
    name: 'Jane Doe',
    type: 'Super Hero',
    animalLongKeyName: 'Shark',
    numebrs: 42,
    heroes: ['Wonder Woman: DC', 'Batman: DC', 'Thor: Marvel', 'Some other: Marvel']
};

//[1,5,6].find(4)

[1,5,6,8,2].reduce((x, n) => { //foirst argument: accumulator, value you care for
    console.log(n,x)
    x = n > x ? n : x // X will equal n if n is bigger than x   if n is qual than x, return n, if not, return x
    return x
}, 0)//it sets x as 0 at the first time

const biggestNumber = [1,10,3,8,2].reduce((x, n) => { //foirst argument: accumulator, value you care for
    console.log(n,x)
    return x = n > x ? n : x
}, 0)

console.log(biggestNumber)

const heroObjs = data.heroes.reduce((acc, h) => {
    const [hero, studio] = h.split(':')
    acc.push({
        hero,
        studio
    })

    return acc
}, [])

console.log(heroObjs)