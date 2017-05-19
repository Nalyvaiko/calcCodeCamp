var DISPLAY             = document.getElementById('input'),
    DIGITS              = document.querySelectorAll('.digits div'),
    OPERATIONS          = document.querySelectorAll('.operations div'),
    CALCULATE           = document.getElementById('calculate'),
    CLEAR               = document.getElementById('clear'),
    operation           = null,
    operationPushed     = false,
    equalValue          = null,
    secondValue         = null,
    result              = null;



var calculate = function(firstValue, secondValue, operation) {
    firstValue  = parseFloat(firstValue);
    secondValue = parseFloat(secondValue);

    switch (operation) {
        case '+':
            return firstValue + secondValue;
        case '-':
            return firstValue - secondValue;
        case '×':
            return firstValue * secondValue;
        case '÷':
            return firstValue / secondValue;
        default:
            return 0;
    }
};

var reset = function() {
    operation           = null;
    operationPushed     = false;
    equalValue          = null;
    secondValue         = null;
    result              = null;
}

DIGITS.forEach(function(numBtn, i) {
    numBtn.addEventListener('click', function(e) {

        var inputValue  = DISPLAY.innerHTML;
        var digit       = e.target.innerHTML;

        if (inputValue === '0' && digit !== '.') {
            DISPLAY.innerHTML = digit;
        } else {
            if (operationPushed || equalValue) {
                DISPLAY.innerHTML = digit;
            } else {
                DISPLAY.innerHTML += digit;
            }
        }

    });
});

OPERATIONS.forEach(function(operBtn, i) {
    operBtn.addEventListener('click', function(e) {

        operationPushed = true;

        var insertedValue = DISPLAY.innerHTML;

        if (!result || equalValue) {
            result     = insertedValue;
            equalValue = null;
        } else {
            result            = calculate(result, insertedValue, operation);
            DISPLAY.innerHTML = result;
        }

        operation = e.target.innerHTML;
    });
});

CALCULATE.addEventListener('click', function() {
    operationPushed   = false;

    if (!equalValue) {
        equalValue = DISPLAY.innerHTML;
    }

    if (!result) {
        result = equalValue;
    } else {
        result = calculate(result, equalValue, operation);
    }

    DISPLAY.innerHTML = result;
});

CLEAR.addEventListener('click', function() {
    DISPLAY.innerHTML   = 0;
    reset();
});
