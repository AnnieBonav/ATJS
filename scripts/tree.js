console.log('Hello, I am a tree!')
let layers = "*";
let height = 5;
let air = " "


createTree()
function createTree(){
    for(let i = 1; i <= height+1; i++){
        if(i <= height){
            console.log(createAir(air, height, i) + createLeaves("*", i) + createAir(air, height, i))
        }
    }

    console.log(air.repeat(Math.round((height/2))) + layers)
}

function createLayer(layer, height){

}

function createLeaves(layer, height){
    return layer.repeat(height*2-1)
}

function createAir(air, height, currentLayer){
    let value
    if(currentLayer%2 == 0){
        value = Math.ceil((height-currentLayer)/2 )
    }else {
        value = Math.ceil((height-currentLayer)/2 +2)
    }
    
    //console.log(value)
    return air.repeat(value)
}


/*

console.log('Hello, I am a tree!')
let layers = "*";
let height = 10;
let air = " "


createTree()
function createTree(){
    for(let i = 1; i <= height+1; i++){
        if(i <= height){
            console.log(createAir(air, height, i) + createLeaves("*", i) + createAir(air, height, i))
        }
    }

    console.log(air.repeat(Math.round((height/2))) + layers)
}


function createLeaves(layer, height){
    return layer.repeat(height*2-1)
}

function createAir(air, height, currentLayer){
    return air.repeat(Math.round((height-currentLayer)/2))
}

*/