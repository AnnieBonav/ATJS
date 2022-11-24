const sounds = ['clap', 'hihat', 'kick', 'perc', 'snare', 'tom']

const soundObj = sounds.reduce((acc, sound) => {
    acc.push({
        filename: `./sounds/${sound}.wav`,
        name: sound
    })
    return acc
}, [])

console.log(soundObj)

soundObj.forEach(sound => {
    const audio = document.createElement('audio')
    audio.setAttribute('src', sound.filename)
    audio.setAttribute('controls', true)

    document.getElementById('audios').append(audio)

    const button = document.createElement('button')
    button.textContent = sound.name

    button.addEventListener('click', () =>{
        audio.currentTime = 0;
        audio.play()
        button.classList.add('playing')
    })

    audio.addEventListener('ended', ()=>{
        button.classList.remove('playing')
    })

    document.getElementById('buttons').append(button)
});

/*
document.addEventListener('click', (){

})*/