function SearchInput(Input: string[], Query: string[]): number[] {
    let temp: number[] = []

    for (const str of Query) {
        let word = Input.filter(word => word === str)
        temp.push(word.length)
    }

    return temp
}

const INPUT = ['xc', 'dz', 'bbb', 'dz']
const QUERY = ['bbb', 'ac', 'dz']
let result = SearchInput(INPUT, QUERY)

console.log('OUTPUT :', result);
