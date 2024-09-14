function CheckLongSentence(sentence: string): string {
    const sentenceToArray = sentence.split(" ")
    let temp: string | undefined
    let maxLength = 0
    for (const word of sentenceToArray) {
        if (word.length > maxLength) {
            maxLength = word.length
            temp = `${word} : ${maxLength} character`
        }
    }
    return temp!
}



const sentence = CheckLongSentence("Saya sangat senang mengerjakan soal algoritma")
console.log(sentence);
