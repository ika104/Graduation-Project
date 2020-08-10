const DATABASE_URL = "http://invittus.com/project-1/";
const ACCOUNTS_DATABASE_URL = DATABASE_URL + "accounts";
const LOGIN_URL = DATABASE_URL + "accounts/logIn/";
let users = {};


var state = false;

function toggle() {
    if (state) {
        document.getElementById("signUp-password").setAttribute("type", "password");
        document.getElementById("eye").style.color = '#7a797e';
        state = false;
    } else {
        document.getElementById("signUp-password").setAttribute("type", "text");
        document.getElementById("eye").style.color = '#848abd';
        state = true;
    }
}



/*************************************************************************************************************************** */
$(document).ready(function () {

    'use strict';

    var usernameError = true,
        emailError = true,
        passwordError = true,
        passConfirm = true;

    // Detect browser for css purpose
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        $('.form form label').addClass('fontSwitch');
    }

    //Label effect
    $('input').focus(function () {

        $(this).siblings('label').addClass('active');
    });
    // PassWord
    function checkPassword(str) {
        // at least one number, one lowercase and one uppercase letter
        // at least six characters that are letters, numbers or the underscore
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
        return re.test(str);
    }
    //Email
    function checkEmail(email) {
        var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email);
    }

    //Form Real-time validation
    $('input').blur(function () {

        // User Name
        if ($(this).hasClass('name')) {
            if ($(this).val().length === 0) {
                $(this).siblings('span.error').text('Please type your full name').fadeIn().parent('.form-group').addClass('hasError');
                usernameError = true;
            } else if ($(this).val().length > 1 && $(this).val().length <= 6) {
                $(this).siblings('span.error').text('Please type at least 6 characters').fadeIn().parent('.form-group').addClass('hasError');
                usernameError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                usernameError = false;
            }
        }
        // Email
        if ($(this).hasClass('email')) {
            if ($(this).val().length === 0) {
                $(this).siblings('span.error').text('Please type your email address').fadeIn().parent('.form-group').addClass('hasError');
                emailError = true;
            } else if (!checkEmail($("#signUp-email").val())) {
                $(this).siblings('span.error').text('Please type a valid email ').fadeIn().parent('.form-group').addClass('hasError');
                emailError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                emailError = false;
            }
        }

        if ($(this).hasClass('pass')) {
            if (!checkPassword($("#signUp-password").val())) {
                $(this).siblings('span.error').text('Please enter a valid password').fadeIn().parent('.form-group').addClass('hasError');
                passwordError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                passwordError = false;
            }
        }

        // PassWord confirmation
        if ($('.pass').val() !== $('.passConfirm').val()) {
            $('.passConfirm').siblings('.error').text('Passwords don\'t match').fadeIn().parent('.form-group').addClass('hasError');
            passConfirm = true;
        } else {
            $('.passConfirm').siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
            passConfirm = false;
        }

    });


    //form switch
    $('a.switch').click(function (e) {
        $(this).toggleClass('active');
        e.preventDefault();

        if ($('a.switch').hasClass('active')) {
            $(this).parents('.form-peice').addClass('switched').siblings('.form-peice').removeClass('switched');
        } else {
            $(this).parents('.form-peice').removeClass('switched').siblings('.form-peice').addClass('switched');
        }
    });



    //Sign-Up Request
    $('#signUp-submit').on("click", function () {
        let name = $("#signUp-name").val();
        let nameLen = $('#signUp-name').val().length;
        let email = $("#signUp-email").val();
        let emailLen = $("#signUp-email").val().length;
        let password = $("#signUp-password").val();
        let passwordLen = $("#signUp-password").val().length;
        let conPassword = $("#signUp-passwordCon").val();
        let conPasswordLen = $('#signUp-passwordCon').val().length;
        console.log(password + "  " + conPassword);
        
        //some validation for submition
        if (nameLen > 0 && nameLen < 6) {
            alert("Please enter a name contains at least 6 letters !");
            return false;
        } else if (!checkEmail(email)) {
            alert("Please enter a valid Email");
            return false;
        } else if (password != conPassword) {
            alert("Error, You entered unmatched passwords !!");
            return false;
        } else if (nameLen == 0 || emailLen == 0 || passwordLen == 0 || conPasswordLen == 0) {
            alert("Error, Please enter all fields !!");
            return false;
        }

        $.ajax({
            accept: "application/json",
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: ACCOUNTS_DATABASE_URL,
            data: JSON.stringify({
                "userName": name,
                "passWord": password,
                "email": email
            }),
            success: function (data) {
                sessionStorage.setItem("userId", data["id"]);
                sessionStorage.setItem("userName", data["userName"]);
                sessionStorage.setItem("email", data["email"]);
                sessionStorage.setItem("passWord", data["passWord"]);
                alert("Welcome " + data["userName"] + " , You are Successfuly Registered");
                window.location.replace("home.html");

            },
            error: function () {
                alert("Sorry, E-mail:" + email + " is already exist");
            }
        });

        return false;
    })

    //Login Request
    $('#login-submit').on("click", function () {
        let email = $("#login-email").val();
        let password = $("#login-password").val();
        let link = LOGIN_URL + email + "/" + password;
        $.ajax({
            accept: "application/json",
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: link,
            success: function (data) {
                sessionStorage.setItem("userId", data["id"]);
                sessionStorage.setItem("userName", data["userName"]);
                sessionStorage.setItem("email", data["email"]);
                sessionStorage.setItem("passWord", data["passWord"]);
                alert("your ID is: " + data["id"] + " with password: " + data["passWord"]);
                window.location.replace("home.html");
            },
            error: function () {
                alert("Error, Invalid E-mail / Password");
            }
        });

        return false;

    });

});