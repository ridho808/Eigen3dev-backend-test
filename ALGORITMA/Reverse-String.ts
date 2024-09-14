function ReverseWord(str: string): string {
    let words = str.slice(0, -1)
    let lastStr = str.slice(-1)
    const ReveresString = words.split("").reverse().join("")
    const result = ReveresString + lastStr
    return result
}

const word: string = ReverseWord("NEGIE1")

console.log(word) 