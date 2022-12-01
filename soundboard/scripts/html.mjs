export function createAudioELement({ filename, id }){
    const audio = document.createElement('audio')
    audio.setAttribute('src', filename)
    //audio.setAttribute('id', id)

    return audio
}

export function createButtonElement({name}){
    const button = document.createElement('button')
    button.textContent = name

    return button
}

export function bindEvents({button, audio}){
    button.addEventListener('click', () =>{
        audio.currentTime = 0;
        audio.play()
        button.classList.add('playing')
    })

    audio.addEventListener('ended', ()=>{
        button.classList.remove('playing')
    })
}