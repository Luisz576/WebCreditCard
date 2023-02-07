function initCreditCardListeners(){
    const creditCard = document.getElementById('credit-card')
    const ccNumberF = document.getElementById("credit-card-form-number")
    const ccNumber = document.getElementById("credit-card-number")
    const ccNameF = document.getElementById("credit-card-form-name")
    const ccName = document.getElementById("credit-card-name")
    const ccValidF = document.getElementById("credit-card-form-valid")
    const ccValid = document.getElementById("credit-card-valid")
    const ccCodeF = document.getElementById("credit-card-form-code")
    const ccCode = document.getElementById("credit-card-code")
    if(creditCard && ccNumber && ccNumberF && ccName && ccNameF && ccValid && ccValidF && ccCode && ccCodeF){
        function removeClass(){
            creditCard.classList.remove('flipped')
        }
        ccCodeF.addEventListener('focus', () => {
            creditCard.classList.add('flipped')
        })
        ccValidF.addEventListener('focus', removeClass)
        ccNameF.addEventListener('focus', removeClass)
        ccNumberF.addEventListener('focus', removeClass)
        document.addEventListener('keyup', (_) => {
            ccNumber.innerText = ccNumberF.value == '' ? '0000 0000 0000 0000' : ccNumberF.value
            ccName.innerText = ccNameF.value == '' ? 'No Name' : ccNameF.value
            ccValid.innerText = ccValidF.value == '' ? '00/00' : ccValidF.value
            ccCode.innerText = ccCodeF.value == '' ? '000' : ccCodeF.value
        })
        return
    }
    throw "Wans't founded all parts of the Credit Card"
}

window.onload = initCreditCardListeners