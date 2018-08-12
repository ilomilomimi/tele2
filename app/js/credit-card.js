$(function(){
    var component = $('.bank-cards');
    var chunks = $('.bank-card-form__card-number-chunk', component);
    var cardHolderInput = $('.bank-card-form__card-holder', component);
    var cvcInput = $('.bank-card-form__card-cvc', component);

    var cardNumberRule = /^\d{4}$/;
    var cvcRule = /^\d{3}$/;
    var notDigitRule = /\D/;
    var onlyDigitsRule = /^\d+$/;

    chunks.on('keydown', function(event){
        if (!isValidKey(event.key)) {
            event.preventDefault();
            return false;
        }

        var self = $(this);
        var curVal = self.val();

        var curIndex = chunks.index(self);
        var nextChunk = false;
        var prevChunk = false;

        if (curIndex < 3) {
            var nextChunk = chunks.eq(curIndex + 1);
        }

        if (curIndex > 0) {
            var prevChunk = chunks.eq(curIndex - 1);
        }

        if (curVal.length == 4 && isNumericKey(event.key)) {
            if (nextChunk) {
                if (nextChunk.val().length == 0) {
                    nextChunk.val(event.key).focus();
                } else {
                    nextChunk.focus();
                }
                event.preventDefault();
                return false;
            } else {
                event.preventDefault();
                return false;
            }
        } else if (curVal.length == 0) {
            if (isRemoveKey(event.key) && prevChunk) {
                prevChunk.focus();
                event.preventDefault();
                return false;
            }
        }
    });

    chunks.on('keyup', validateForm);

    cardHolderInput.on('keyup', function(){
        $(this).val( $(this).val().toUpperCase() );
        validateForm();
    });

    cvcInput.on('keydown', function(event){
        if (!isValidKey(event.key)) {
            event.preventDefault();
            return false;
        }

        if ($(this).val().length >= 3 && isNumericKey(event.key)) {
            event.preventDefault();
            return false;
        }
    });

    cvcInput.on('keyup', validateForm);

    function validateForm() {
        var isValid = true;

        chunks.each(function() {
            if (!cardNumberRule.test($(this).val())) {
                isValid = false;
            }
        });

        if (!cvcRule.test( cvcInput.val() )) {
            isValid = false;
        }

        if (cardHolderInput.val().length == 0) {
            isValid = false;
        }

        if (isValid) {
            // Врубить кнопку
            console.log('form valid');
        } else {
            // Вырубить
            console.log('form invalid');
        }
    }

    function isValidKey(key) {
        if (isNumericKey(key) || isControlsKey(key)) {
            return true;
        }
        return false;
    }

    function isControlsKey(key) {
        var keys = ['Backspace', 'Delete', 'End', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
        return keys.indexOf(key) > -1;
    }

    function isRemoveKey(key) {
        return key == 'Backspace' || key == 'Delete';
    }

    function isNumericKey(key){
        return onlyDigitsRule.test(key);
    }
});
