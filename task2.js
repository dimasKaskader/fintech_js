function parseDateNumber(dateNumber) {
    return (dateNumber > 10) ? '' + dateNumber : '0' + dateNumber
}

function parseDate(dateString) {
    var date = new Date(dateString)
    var dateStr = ''
    var day = date.getDate()
    day = parseDateNumber(day)
    var month = date.getMonth() + 1
    month = parseDateNumber(month)
    dateStr += day + '.' + month + '.' + date.getFullYear()
    var hours = date.getHours()
    hours = parseDateNumber(hours)
    var minutes = date.getMinutes()
    minutes = parseDateNumber(minutes)
    dateStr += ' ' + hours + ':' + minutes
    return dateStr
}

function parseAmount(amount) {
    var resultAmount = amount
    var dotIndex = amount.indexOf('.')
    var whole_part = amount.slice(0, dotIndex)
    var counter = 0
    for (var i = whole_part.length - 1; i > 0; i--)
    {
        counter ++
        if (counter === 3)
        {
            resultAmount = resultAmount.slice(0, i) + ',' + resultAmount.slice(i)
            counter = 0
        }
    }
    return resultAmount
}

function parseJSON(jsonString) {
    var outputStr = ''
    for(var entry of jsonString) {
        outputStr += 'Имя покупателя: ' + entry.name + '\n'
        outputStr += 'Номер карты: ' + entry.cardNumber.slice(0, 4) + ' **** **** ' + entry.cardNumber.slice(12, 16) + '\n'
        outputStr += 'Дата и время операции: ' + parseDate(entry.date) + '\n'
        outputStr += 'Сумма операции: ' + entry.currency + parseAmount(entry.amount) + '\n'
        outputStr += '\n'
    }
    return outputStr
}

var jsonString = [
    {
        "name": "Ashlynn Hartmann",
        "cardNumber": "4929289137092267",
        "date": "2019-01-24T17:39:07.347Z",
        "amount": "579.63",
        "currency": "$"
    },
    {
        "name": "Philip Stoltenberg",
        "cardNumber": "4916258329158678",
        "date": "2018-09-07T02:21:03.144Z",
        "amount": "10472.99",
        "currency": "$"
    }
]
console.log(parseJSON(jsonString))