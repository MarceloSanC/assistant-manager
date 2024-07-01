document.addEventListener('DOMContentLoaded', (event) => {
    const steps = Array.from(document.querySelectorAll('.step'));
    const formSteps = Array.from(document.querySelectorAll('.form-step'));
    const nextBtns = Array.from(document.querySelectorAll('.next-btn'));
    const prevBtns = Array.from(document.querySelectorAll('.prev-btn'));
    const submitBtn = document.querySelector('.submit-btn');
    const phoneInput = document.getElementById('phone-number');
    const phoneError = document.getElementById('phone-error');
    const establishmentNameInput = document.getElementById('establishment-name');
    const establishmentNameError = document.createElement('small');
    establishmentNameError.classList.add('error');
    establishmentNameError.style.display = 'none';
    establishmentNameInput.after(establishmentNameError);

    let currentStep = 0;
    console.log('formSteps:', formSteps, 'nextBtns: ', nextBtns);

    function updateFormSteps() {
        formSteps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });

        if (currentStep === formSteps.length - 1) {
            nextBtns.forEach(btn => btn.style.display = 'none');
            submitBtn.classList.add('active');
        } else {
            nextBtns.forEach(btn => btn.style.display = 'inline-block');
            submitBtn.classList.remove('active');
        }

        if (currentStep === 0) {
            prevBtns.forEach(btn => btn.style.display = 'none');
        } else {
            prevBtns.forEach(btn => btn.style.display = 'inline-block');
        }
    }

    function updateProgressBar() {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index <= currentStep);
        });

        const progressBar = document.getElementById('progress-bar');
        progressBar.style.width = ((currentStep) / (steps.length - 1)) * 100 + '%';
    }

    function validatePhoneNumber(phoneNumber) {
        const phoneRegex = /^\+\d{2} \(\d{2}\) \d{9}$/;
        return phoneRegex.test(phoneNumber);
    }

    function formatPhoneNumber(event) {
        const input = event.target.value.replace(/\D/g, '');
        const match = input.match(/^(\d{2})(\d{2})(\d{1,9})$/);
        if (match) {
            event.target.value = `+${match[1]} (${match[2]}) ${match[3]}`;
        }
    }

    phoneInput.addEventListener('input', formatPhoneNumber);

    nextBtns.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep === 0) {
                const establishmentName = establishmentNameInput.value.trim();
                const phoneNumber = phoneInput.value;

                let isValid = true;

                if (!establishmentName) {
                    establishmentNameError.textContent = 'Campo obrigatório';
                    establishmentNameError.style.display = 'block';
                    establishmentNameInput.classList.add('invalid');
                    isValid = false;
                } else {
                    establishmentNameError.style.display = 'none';
                    establishmentNameInput.classList.remove('invalid');
                }

                if (!validatePhoneNumber(phoneNumber)) {
                    phoneError.textContent = 'Obrigatório 13 dígitos';
                    phoneInput.classList.add('invalid');
                    isValid = false;
                } else {
                    phoneError.textContent = '';
                    phoneInput.classList.remove('invalid');
                }

                if (!isValid) return;
            }
            currentStep++;
            updateFormSteps();
            updateProgressBar();
        });
    });

    prevBtns.forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            updateFormSteps();
            updateProgressBar();
        });
    });

    updateFormSteps();
    updateProgressBar();
});
