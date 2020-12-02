'use strict'
$(document).ready(function () {
    $('#text-down').arctext({radius: 93, dir: -1});
    $('#text-up').arctext({radius: 80});
    $('#text-down-second').arctext({radius: 93, dir: -1});
    $('#text-up-second').arctext({radius: 80});
    $('#text-down-third').arctext({radius: 93, dir: -1});
    $('#text-up-third').arctext({radius: 90});
    $('#text-down-fourth').arctext({radius: 102, dir: -1});
    $('#text-up-fourth').arctext({radius: 90});

    $('.header-menu').click((e) => {
        let currentElement = $(e.target);

        $('.header-menu').removeClass('active');
        currentElement.addClass('active');
    });

    $('.category').click((e) => {
        let currentElement = $(e.target);
        $('.products-container').hide();
        let id = currentElement.data('id');
        $('#' + id).show();

        $('.category').removeClass('active');
        currentElement.addClass('active');

        $('#' + id + ' .products').slick('refresh');
    });

    $('#white-tea-container .products').slick({
        dots: true,
        arrows: true,
        centerMode: true,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    arrows: false,
                    centerMode: false,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 580,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1,
                }
            }
        ],
    });
    $('#black-tea-container .products').slick({
        dots: true,
        arrows: true,
        centerMode: true,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    arrows: false,
                    centerMode: false,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 580,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1,
                }
            }
        ],
    });
    $('#green-tea-container .products').slick({
        dots: true,
        arrows: true,
        centerMode: true,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    arrows: false,
                    centerMode: false,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 580,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '20px',
                    slidesToShow: 1
                }
            }
        ]
    });
    $('#mix-tea-container .products').slick({
        dots: true,
        arrows: true,
        centerMode: true,
        slidesToShow: 3,
        infinite: true,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    arrows: false,
                    centerMode: false,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 580,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '20px',
                    slidesToShow: 1
                }
            }
        ]
    });
    $('#ulun-tea-container .products').slick({
        dots: true,
        arrows: true,
        centerMode: true,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    arrows: false,
                    centerMode: false,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 580,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '20px',
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.open-modal').click(() => {
        $('#reservation-container').css('display', 'flex');
    });

    $('#reservation-cancel-close , #reservation-container').click((e) => {
        if (e.target.id === 'reservation-container' || e.target.id === 'reservation-cancel-close') {
            $('#reservation-container').hide();
        }
    });

    $('#reserve-button > button').click(() => {
        let orderTitle = $('#order-title');
        let count = $('#count');
        let name = $('#name');
        let phone = $('#phone');

        if (orderTitle.val() && count.val() && name.val() && phone.val()) {
            $.ajax({
                type: 'post',
                url: 'mail.php',
                data: 'orderTitle=' + orderTitle.val() + '&count=' + count.val() + '&name=' + name.val() + '&phone=' + phone.val(),
                success: () => {
                    $('#reservation-sent').show();
                    $('#reservation-content-first').hide();
                },
                error: () => {
                    $('#reservation-container').hide();
                    alert('Ошибка заказа вашего чая. Свяжитесь, пожалуйста, с администратором по номеру телефона.');
                }
            });

        } else {
            $('.input-error').hide();
            if (!orderTitle.val()) {
                orderTitle.siblings('.order-title').show();
                orderTitle.css('border-color', 'red');
            } else {
                orderTitle.css('border-color', 'green');
            }
            if (!count.val()) {
                count.siblings('.count').show();
                count.css('border-color', 'red');
            } else {
                count.css('border-color', 'green');
            }
            if (!name.val()) {
                name.siblings('.name').show();
                name.css('border-color', 'red');
            } else {
                name.css('border-color', 'green');
            }
            if (!phone.val()) {
                phone.siblings('.phone').show();
                phone.css('border-color', 'red');
            } else {
                phone.css('border-color', 'green');
            }
        }
    });

    $('#discount-action > button').click(() => {
        $('.input-error').hide();

        let mail = $('#mail');
        let mailValue = mail.val();

        if (mail.val() === '') {
            mail.siblings('.mail').show();
            return false;
        }

        function IsEmail(mailValue) {
            var res = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            if (!res.test(mailValue)) {
                return false;
            } else {
                return true;
            }
        }

        if (IsEmail(mail.val()) === true) {
            $.ajax({
                type: 'post',
                url: 'promo.php',
                data: 'mail=' + mail.val(),
                success: () => {
                    $('.mail-sent').hide();
                    $('#promo-message').show();
                },
                error: () => {
                    alert('Ошибка отправки вашего email. Свяжитесь, пожалуйста, с администратором по номеру телефона.');
                }
            });
        } else {
            mail.siblings('.mail').show();
            return false;
        }
    });

    $('#tea').click(() => {
        $('#header').toggleClass('menu-open');
    });
    $('#header #menu a').click(() => {
        $('#header').toggleClass('menu-open');
    });

    $('.block-action').click((e) => {
        let currentElement = $(e.target);
        let  container = currentElement.closest('.product-content');
        let containerChildren =  container[0].childNodes;
        let currentChild = containerChildren[1].innerText;
        $("#order-title").val(currentChild);
    });

    var rellax = new Rellax('.rellax');
    new WOW({
        animateClass: 'animate__animated'
    }).init();
});