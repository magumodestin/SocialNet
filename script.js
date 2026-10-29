    function showform(formId){
        document.querySelectorAll(".form-box").forEach(form => form.classList.remove("active"));
        document.getElementById(formId).classList.add("active");
    }

    function validatePassword() {
        let password = document.getElementById('password').value;
        let lengthValid = document.getElementById('length-valid');
        let numberValid = document.getElementById('number-valid');
        let capitalValid = document.getElementById('capital-valid');
        let symbolValid = document.getElementById('symbol-valid');

        lengthValid.className = password.length >= 8 ? 'valid' : 'invalid';
        lengthValid.innerHTML = password.length >= 8 ? '✓' : '✗';

        numberValid.className = /\d/.test(password) ? 'valid' : 'invalid';
        numberValid.innerHTML = /\d/.test(password) ? '✓' : '✗';

        capitalValid.className = /[A-Z]/.test(password) ? 'valid' : 'invalid';
        capitalValid.innerHTML = /[A-Z]/.test(password) ? '✓' : '✗';

        symbolValid.className = /[^a-zA-Z0-9]/.test(password) ? 'valid' : 'invalid';
        symbolValid.innerHTML = /[^a-zA-Z0-9]/.test(password) ? '✓' : '✗';

        validateConfirmPassword();
    }

    function validateConfirmPassword() {
        let password = document.getElementById('password').value;
        let confirmPassword = document.getElementById('confirm-password').value;
        let errorMsg = document.getElementById('password-match-error');
        let successMsg = document.getElementById('password-match-success');

        if (password === confirmPassword && password !== '') {
            errorMsg.style.display = 'none';
            successMsg.style.display = 'flex';
        } else {
            errorMsg.style.display = 'flex';
            successMsg.style.display = 'none';
        }
    }