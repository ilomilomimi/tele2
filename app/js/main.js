$(function () {
    init();
});

const cardNumberRule = /^\d{4}$/;
const cardCVCRule = /^\d{3}$/;
const cardNameRule = /^([a-zA-Z]( [a-zA-Z])?){4,}/;

function init() {
    const cardNumberChunk1 = $('[name="card-number-chunk-1"]');
    const cardNumberChunk2 = $('[name="card-number-chunk-2"]');
    const cardNumberChunk3 = $('[name="card-number-chunk-3"]');
    const cardNumberChunk4 = $('[name="card-number-chunk-4"]');
    const cardCVC = $('[name="card-cvc"]');
    const cardName = $('[name="card-name"]');

    cardNumberChunk1.on('keydown', handleKeyDownDigits);
    cardNumberChunk2.on('keydown', handleKeyDownDigits);
    cardNumberChunk3.on('keydown', handleKeyDownDigits);
    cardNumberChunk4.on('keydown', handleKeyDownDigits);
    // cardCVC.on('keypress', handleKeyPressDigits);
    //
    // cardName.on('keypress', handleKeyPressLatin);
    //
    // cardNumberChunk1.on('keypress', handleNextFocusCardNumber);
    // cardNumberChunk2.on('keypress', handleNextFocusCardNumber);
    // cardNumberChunk3.on('keypress', handleNextFocusCardNumber);
    // cardNumberChunk4.on('keypress', handleNextFocusCardNumber);

    const fields = [
        { element: cardNumberChunk1, rule: cardNumberRule, isTouch: false, isValid: false },
        { element: cardNumberChunk2, rule: cardNumberRule, isTouch: false, isValid: false },
        { element: cardNumberChunk3, rule: cardNumberRule, isTouch: false, isValid: false },
        { element: cardNumberChunk4, rule: cardNumberRule, isTouch: false, isValid: false },
        { element: cardCVC, rule: cardCVCRule, isTouch: false, isValid: false },
        { element: cardName, rule: cardNameRule, isTouch: false, isValid: false },
    ];

    for (let i = 0; i < fields; i += 1) {
        const field = fields[i];

        $(field).on('change', validateForm);
    }
}

function handleKeyPressLatin(e) {
    const key = e.key;
    return cardNameRule.test(key);
}

function handleKeyDownDigits(e) {
    const key = e.key;
    const value = $(e.target).val().toString() + key.toString();

    const isDigit = /\d/.test(e.key);
    const isMaxLength = value.length >= 4;

    if (isMaxLength && isDigit) {
        const startString = value.slice(0, e.target.selectionStart);
        const endString = value.slice(e.target.selectionStart + 1, value.length);
        $(e.target).val(startString + key + endString);
    }

    const isValid = /^\d{0,4}$/.test(value);

    return isDigit && isValid;
}
function handleKeyPressCardNumber(e) {
    const value = $(e.target).val().toString();

    const isValid = /^\d{1,4}$/.test(value);

    if (value.length >= 4) {
        const inputs = $(e.target).closest('form').find('input');
        inputs.eq(inputs.index(e.target) + 1).focus();
        $(e.target).val(value.slice(0, 4));
    }
}

function handleKeyPressCard(e) {
    const key = e.key;
    const pressOnlyDigits = /\d/;

    return pressOnlyDigits.test(key);
}


function handleNextFocusCardNumber(e) {
    const value = $(e.target).val();

    const isNeedToBlur = value.length === 3;

    if (isNeedToBlur) {
        const inputs = $(e.target).closest('form').find('input');
        inputs.eq(inputs.index(e.target) + 1).focus();
    }

    return true;
}

function validateForm() {
    let isValid = true;

    const fields = [
        { name: 'card-number-chunk-1', isValid: false },
        { name: 'card-number-chunk-2', isValid: false },
        { name: 'card-number-chunk-3', isValid: false },
        { name: 'card-number-chunk-4', isValid: false },
        { name: 'card-cvc', isValid: false },
        { name: 'card-name', isValid: false },
    ];

    for (let i = 0; i < fields; i += 1) {
        const field = fields[i];

        isValid = isValid && field.isValid;
    }

    if (isValid) {
        // Врубить кнопку
    } else {
        // Вырубить
    }
}