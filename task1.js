function justAddOne(array, number) {
    var whole_number = ''
    for(var digit of array)
    {
        if (Number.isInteger(digit) && Math.floor(digit/10) === 0)
            whole_number += digit
        else
            return null
    }
    whole_number = Number(whole_number) + number
    return String(whole_number).split('')
}

console.log(justAddOne([1, 0, 9], 2)); // 109 + 2 = 111; => [1, 1, 1]
console.log(justAddOne([2, 5, 1], 5)); // 251 + 5 = 256; => [2, 5, 6]
console.log(justAddOne([1], 4020)); // 1 + 4020 = 4021; => [4, 0, 2, 1]
console.log(justAddOne([1, '4', 11, null], 1)); // '4' - строка и есть null => null