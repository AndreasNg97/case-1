const income2017 = document.querySelector("#income-2017");
const income2018 = document.querySelector("#income-2018");
const income2019 = document.querySelector("#income-2019");
const textBox = document.querySelector("#textBox");


function G(x){
    return 101351*x
}

function toZeroFromNaN(value){
    return(isNaN(value) ? 0 : value)
}

function addIncome(income1, income2, income3){
    let sum = toZeroFromNaN(income1) + toZeroFromNaN(income2) + toZeroFromNaN(income3)
    return sum
}

function averageIncome(income1, income2, income3){
    let sum =  (toZeroFromNaN(income1) + toZeroFromNaN(income2) + toZeroFromNaN(income3)) / 3
    return roundTwoDecimal(sum)
}

function roundTwoDecimal(a){
    return Math.round(a * 100)/100
}

function text(total, eligible){
    if(eligible){
        return `
            <p class="text-light">
                Du har rett på dagpenger, og får en dagsats på <b>${dailyRate()}kr</b>
            </p>
        `
    }else{
        return`
            <p class="text-light">Du har <b>ikke</b> rett på dagpenger</p>
            <p class="text-light">Total inntekt de siste 3 årene : <b>${total}</b></p>
        `
    }
}
console.log(G(6))
function textAppear(total, eligible){
    textBox.innerHTML = text(total, eligible)
}

function checkEligibility(incomeTotal){
    let eligible
    if(incomeTotal > G(3) || income2019.value > G(1.5)){
        eligible = true
        textAppear(incomeTotal, eligible)
    }else{
        eligible = false
        textAppear(incomeTotal, eligible)
    }
}

function startCalculate(e){
    e.preventDefault()
    checkEligibility(
        addIncome(income2017.valueAsNumber,income2018.valueAsNumber,income2019.valueAsNumber)
    )
}

function unemploymentBenefitBasis(avgIncome, incomeLastYear){
    if(Math.max(avgIncome, incomeLastYear) > G(6))
        return G(6)
    else
        return Math.max(avgIncome, incomeLastYear)
}

function dailyRate(){
    return Math.ceil(
        unemploymentBenefitBasis(averageIncome(income2017.valueAsNumber,income2018.valueAsNumber,income2019.valueAsNumber), income2019.valueAsNumber) / 260)
}


document.addEventListener('DOMContentLoaded', function (){
    const checkBtn = document.querySelector("#checkBtn");
    checkBtn.addEventListener('click', startCalculate)
})

module.exports = {G, toZeroFromNaN, addIncome, averageIncome, roundTwoDecimal, unemploymentBenefitBasis, text}