
import "cuidcdn"
import { createAudioELement, createButtonElement, bindEvents} from "./scripts/html.mjs"

const sounds = ['clap', 'hihat', 'kick', 'perc', 'snare', 'tom']

const soundObj = sounds.reduce((acc, sound) => {
    acc.push({
        filename: `./sounds/${sound}.wav`,
        name: sound,
        id: cuid()
    })
    return acc
}, [])

console.log(soundObj)

soundObj.forEach(sound => {
    const audio = createAudioELement(sound)
    const button = createButtonElement(sound)

    document.getElementById('audios').append(audio)
    document.getElementById('buttons').append(button)

    bindEvents({button, audio}) //Destructuring
});