// My implementation

export function shuffle<T>(array: T[]): T[] {
    
    for(let i = array.length-1; i >= 1; i --){
        let j: number = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
  