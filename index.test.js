const { test, expect } = require('@jest/globals');
const indexFile = require('./index.js');
const G = indexFile.G
const toZeroFromNaN = indexFile.toZeroFromNaN
const addIncome = indexFile.addIncome
const averageIncome = indexFile.averageIncome
const roundTwoDecimal = indexFile.roundTwoDecimal
const unemploymentBenefitBasis = indexFile.unemploymentBenefitBasis
const text = indexFile.text


test('(G = 101351)multiples G with value passed unto the function', () => {
    expect(G(1)).toBe(101351)
    expect(G(2)).toBe(202702)
    expect(G(3)).toBe(304053)
})

test('if value passed unto the function is NaN, return 0, else return value', () => {
    expect(toZeroFromNaN(NaN)).toBe(0)
    expect(toZeroFromNaN('a')).toBe(0)
    expect(toZeroFromNaN(200)).toBe(200)
})

test('properly adds 3 numbers and returns sum', () => {
    expect(addIncome(200, 300, 150)).toBe(650)
    expect(addIncome(0, 200, 150)).toBe(350)
    expect(addIncome(0, 200, 0)).toBe(200)
})

test('calculates and returns the average value of 3 values', () => {
    expect(averageIncome(100, 100, 100)).toBe(100)
    expect(averageIncome(500, 300, 400)).toBe(400)
    expect(averageIncome(250, 400, 350)).toBe(333.33)
})

test('Round to at most 2 decimal places only if necessary', () => {
    expect(roundTwoDecimal(333.3333)).toBe(333.33)
    expect(roundTwoDecimal(233.9967)).toBe(234)
    expect(roundTwoDecimal(277.7777)).toBe(277.78)
})

test('returns the highest value of either avgIncome or incomeLastYear. if value is higher than 6G, return 6G ', () => {
    let G = 101351
    expect(unemploymentBenefitBasis(450000, 500000)).toBe(500000)
    expect(unemploymentBenefitBasis(400000, 300000)).toBe(400000)
    expect(unemploymentBenefitBasis(900000, 300000)).toBe(G*6)
})
