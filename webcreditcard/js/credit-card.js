class CreditType{
    constructor(name, validate){
        this.name = name
        this.validate = validate
    }
}

const CreditTypes = [
    new CreditType('Visa', /^4[0-9]{6,}$/),
    new CreditType('MasterCard', /^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/),
    new CreditType('AmericanExpress', /^3[47][0-9]{5,}$/),
    new CreditType('DinersClub', /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/),
    new CreditType('Discover', /^6(?:011|5[0-9]{2})[0-9]{3,}$/),
    new CreditType('JBC', /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/),
]

function initCreditCardListeners(){
    const ccType = document.getElementById("credit-card-type")
    const ccNumberF = document.getElementById("credit-card-form-number")
    const ccNumber = document.getElementById("credit-card-number")
    const ccNameF = document.getElementById("credit-card-form-name")
    const ccName = document.getElementById("credit-card-name")
    const ccValidMF = document.getElementById('credit-card-form-valid-m')
    const ccValidM = document.getElementById('credit-card-valid-m')
    const ccValidYF = document.getElementById('credit-card-form-valid-y')
    const ccValidY = document.getElementById('credit-card-valid-y')
    const ccCodeF = document.getElementById("credit-card-form-code")
    const ccCode = document.getElementById("credit-card-code")
    if(ccType && ccNumber && ccNumberF && ccName && ccNameF && ccCode && ccCodeF && ccValidMF && ccValidM && ccValidYF && ccValidY){
        function getCreditType(number){
            if(number && number.trim() != ''){
                number = number.trim().replaceAll(' ', '')
                for(i in CreditTypes){
                    if(CreditTypes[i].validate.test(number.trim())){
                        return CreditTypes[i]
                    }
                }
            }
            return new CreditType('None', /^$/)
        }
        function formatCreditType(type){
            ccType.innerText = "(" + type.name + ")"
        }

        function formatNumber(form, component){
            let value = form.value
            if(!value || value.trim() == ''){
                value = '0000 0000 0000 0000'
                form.value = ''
            }else{
                const valueClear = value.trim().replaceAll(' ', '')
                value = ''
                for(i in valueClear){
                    if(!isNaN(parseInt(valueClear[i]))){
                        value += parseInt(valueClear[i])
                    }
                }
                const parts = [value.substring(0, 4), value.substring(4, 8), value.substring(8, 12), value.substring(12, 16)]
                value = ''
                for(i in parts){
                    if(parts[i] && parts[i].trim() != ''){
                        if(i != 0)
                            value += ' '
                        value += parts[i].trim()
                    }
                }
                if(value == ''){
                    value = '0000 0000 0000 0000'
                    form.value = ''
                }else{
                    form.value = value
                }
            }
            component.innerText = value
        }
        function formatName(form, component){
            let value = form.value
            if(!value || value.trim() == ''){
                value = 'INVALID NAME'
                form.value = ''
            }else{
                value = value.toUpperCase()
                form.value = value
            }
            component.innerText = value
        }
        function formatValid(mf, m, yf, y){
            let valueM = mf.value
            let valueY = yf.value
            if(!valueM || isNaN(parseInt(valueM))){
                valueM = "00"
                mf.value = ''
            }else{
                let mv = parseInt(valueM)
                if(mv < 0){
                    mv = 0
                }else if(mv > 12){
                    mv = 12
                }
                valueM = mv < 10 ? "0" + mv : mv
                mf.value = mv
            }
            m.innerText = valueM
            if(!valueY || isNaN(parseInt(valueY))){
                valueY = "00"
                yf.value = ''
            }
            y.innerText = valueY
        }
        function formatCode(form, component){
            let value = form.value
            if(!value || value.trim() == ''){
                value = '000'
                form.value = ''
            }else{
                value = value.trim().replaceAll(' ', '')
                const v = value.substring(0, 3)
                value = ''
                for(let i in v){
                    if(!isNaN(parseInt(v[i]))){
                        value += v[i]
                    }
                }
                if(value == ''){
                    value = '000'
                    form.value = ''
                }else{
                    form.value = value
                }
            }
            component.innerText = value
        }

        document.addEventListener('keyup', (_) => {
            formatNumber(ccNumberF, ccNumber)
            formatName(ccNameF, ccName)
            formatCode(ccCodeF, ccCode)
            formatValid(ccValidMF, ccValidM, ccValidYF, ccValidY)
            formatCreditType(getCreditType(ccNumberF.value))
        })
        return
    }
    throw "Wans't founded all parts of the Credit Card"
}

window.onload = initCreditCardListeners