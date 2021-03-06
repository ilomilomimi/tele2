$(function () {
    $('.select').each(function (selectIndex, selectEl) {
        const selectOptions = $(selectEl).find('.select__options');
        const selectNative = $(selectEl).find('.select__native');
        const valueDom = $(selectEl).find('.select__value');

        valueDom.on('click', function (event) {
            selectOptions.toggleClass('select__options--open');
            valueDom.toggleClass('select__value--open');

            if (valueDom.hasClass('select__value--open')) {
                event.stopPropagation();
                $(document).on('click', clickOutsideDropdown);
            }
        });

        function clickOutsideDropdown(event) {
            if (!$(event.target).closest(valueDom).length) {
                valueDom.removeClass('select__value--open');
                selectOptions.removeClass('select__options--open');
                $(document).off('click', clickOutsideDropdown);
            }
        }

        $(selectEl).find('.select__native option').each(function (optionIndex, optionEl) {
            const optionValue = $(optionEl).val();
            const optionText = $(optionEl).html();
            const template = $('<div class="select__item" data-value="' + optionValue + '">' + optionText + '</div>');

            if (this.selected) {
                valueDom.html(optionText);
                template.addClass('select__item--selected');
            }

            $(template).on('click', function () {
                const value = $(this).data('value');
                const text = $(this).html();

                selectOptions.find('.select__item').removeClass('select__item--selected');
                $(this).addClass('select__item--selected');

                valueDom.html(text);
                selectOptions.removeClass('select__options--open');
                selectNative.val(value);
                $('.select__value').removeClass('select__value--open');
            });

            selectOptions.append(template);
        });
    });
});