
const Matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
]
function NxNMatrix(matrix: number[][]): number {
    let tempone = 0
    let temptwo = 0
    for (let i = 0; i < matrix.length; i++) {
        let arrayOne = matrix[i][i]
        let arrayTwo = matrix[i][matrix.length - i - 1]
        tempone += arrayOne
        temptwo += arrayTwo
    }
    return tempone - temptwo
};
const finalResult = NxNMatrix(Matrix)

console.log(finalResult)