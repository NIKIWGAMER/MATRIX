// Scroll animation
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // Form validation
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    phoneInput.addEventListener('input', validatePhone);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);
    
    function validateName() {
        const errorElement = document.getElementById('nameError');
        if (nameInput.value.trim() === '') {
            nameInput.classList.add('error');
            errorElement.classList.remove('hidden');
            return false;
        } else {
            nameInput.classList.remove('error');
            errorElement.classList.add('hidden');
            return true;
        }
    }
    
    function validatePhone() {
        const errorElement = document.getElementById('phoneError');
        const phoneRegex = /^\+?[0-9\s\-\(\)]{7,}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            phoneInput.classList.add('error');
            errorElement.classList.remove('hidden');
            return false;
        } else {
            phoneInput.classList.remove('error');
            errorElement.classList.add('hidden');
            return true;
        }
    }
    
    function validateEmail() {
        const errorElement = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add('error');
            errorElement.classList.remove('hidden');
            return false;
        } else {
            emailInput.classList.remove('error');
            errorElement.classList.add('hidden');
            return true;
        }
    }
    
    function validateMessage() {
        const errorElement = document.getElementById('messageError');
        if (messageInput.value.trim() === '') {
            messageInput.classList.add('error');
            errorElement.classList.remove('hidden');
            return false;
        } else {
            messageInput.classList.remove('error');
            errorElement.classList.add('hidden');
            return true;
        }
    }
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isPhoneValid && isEmailValid && isMessageValid) {
            // Show loading state
            submitText.textContent = 'Отправка...';
            submitSpinner.classList.remove('hidden');
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Hide loading state
                submitText.textContent = 'Отправить';
                submitSpinner.classList.add('hidden');
                submitBtn.disabled = false;
                
                // Show success modal
                successModal.classList.remove('hidden');
                
                // Reset form
                contactForm.reset();
            }, 2000);
        }
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        successModal.classList.add('hidden');
    });
    
    // Working hours status
    function updateStatus() {
        const now = new Date();
        const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const statusText = document.getElementById('statusText');
        const statusDisplay = document.getElementById('statusDisplay');
        
        let isOpen = false;
        
        // Weekdays (Monday to Friday)
        if (day >= 1 && day <= 5) {
            if ((hours > 9 || (hours === 9 && minutes >= 0)) && 
                (hours < 20 || (hours === 20 && minutes === 0))) {
                isOpen = true;
            }
        } 
        // Weekend (Saturday and Sunday)
        else if (day === 0 || day === 6) {
            if ((hours > 10 || (hours === 10 && minutes >= 0)) && 
                (hours < 18 || (hours === 18 && minutes === 0))) {
                isOpen = true;
            }
        }
        
        if (isOpen) {
            statusText.textContent = 'Сейчас открыто';
            statusDisplay.classList.add('status-open');
            statusDisplay.classList.remove('status-closed');
        } else {
            statusText.textContent = 'Сейчас закрыто';
            statusDisplay.classList.add('status-closed');
            statusDisplay.classList.remove('status-open');
        }
        
        // Highlight current day in working hours table
        const rows = document.querySelectorAll('.working-hours tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => cell.classList.remove('current-day'));
        });
        
        if (day >= 1 && day <= 5) {
            // Weekday - highlight first row
            const cells = rows[0].querySelectorAll('td');
            cells.forEach(cell => cell.classList.add('current-day'));
        } else if (day === 6) {
            // Saturday - highlight second row
            const cells = rows[1].querySelectorAll('td');
            cells.forEach(cell => cell.classList.add('current-day'));
        } else if (day === 0) {
            // Sunday - highlight third row
            const cells = rows[2].querySelectorAll('td');
            cells.forEach(cell => cell.classList.add('current-day'));
        }
    }
    
    // Initial status update
    updateStatus();
    
    // Update status every minute
    setInterval(updateStatus, 60000);
    
    // Typing effect for form inputs (optional)
    const inputs = [nameInput, phoneInput, emailInput, messageInput];
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.add('typing-effect');
        });
        
        input.addEventListener('blur', function() {
            this.classList.remove('typing-effect');
        });
    });
});

        // Mobile menu functionality
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const bars = document.querySelectorAll('.bar');
            
            // Toggle mobile menu
            mobileMenuButton.addEventListener('click', function() {
                const isOpen = mobileMenu.style.display === 'flex';
                
                if (isOpen) {
                    mobileMenu.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    
                    // Reset button animation
                    bars[0].style.transform = 'rotate(0)';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'rotate(0)';
                } else {
                    mobileMenu.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                    
                    // Animate button to X
                    bars[0].style.transform = 'rotate(45deg)';
                    bars[1].style.opacity = '0';
                    bars[2].style.transform = 'rotate(-45deg)';
                }
            });
            
            // Close menu when clicking links
            const mobileLinks = document.querySelectorAll('.mobile-nav-link');
            mobileLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    
                    // Reset button animation
                    bars[0].style.transform = 'rotate(0)';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'rotate(0)';
                });
            });
            
            // Callback button functionality
            const callbackButtons = document.querySelectorAll('.callback-btn, .mobile-callback-btn');
            callbackButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    alert('Форма обратного звонка будет здесь!');
                });
            });

            // Your existing JavaScript for other functionality...
        });

        // Общая функция для отправки формы
async function submitForm(url, data, successMessage) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            alert(successMessage);
            return true;
        } else {
            alert(result.error || 'Произошла ошибка при отправке формы');
            return false;
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке формы');
        return false;
    }
}

// Обработчик для формы ремонта
document.querySelectorAll('.repair-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: form.querySelector('[name="name"]').value,
            phone: form.querySelector('[name="phone"]').value,
            device: form.querySelector('[name="device"]').value,
            problem: form.querySelector('[name="problem"]').value
        };

        const success = await submitForm(
            '/api/repair-request',
            formData,
            'Ваша заявка на ремонт принята! Мы свяжемся с вами в ближайшее время.'
        );

        if (success) {
            form.reset();
        }
    });
});

// Обработчик для формы обратного звонка
document.querySelectorAll('.callback-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: form.querySelector('[name="name"]').value,
            phone: form.querySelector('[name="phone"]').value,
            preferredTime: form.querySelector('[name="preferredTime"]')?.value
        };

        const success = await submitForm(
            '/api/callback-request',
            formData,
            'Ваш запрос на обратный звонок принят! Мы свяжемся с вами в указанное время.'
        );

        if (success) {
            form.reset();
        }
    });
});

// Обработчик для контактной формы
document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: form.querySelector('[name="name"]').value,
            email: form.querySelector('[name="email"]').value,
            phone: form.querySelector('[name="phone"]').value,
            message: form.querySelector('[name="message"]').value
        };

        const success = await submitForm(
            '/api/contact-form',
            formData,
            'Ваше сообщение отправлено! Мы ответим вам в ближайшее время.'
        );

        if (success) {
            form.reset();
        }
    });
});

// Обработчик для формы отзыва
document.querySelectorAll('.feedback-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: form.querySelector('[name="name"]').value,
            email: form.querySelector('[name="email"]').value,
            device: form.querySelector('[name="device"]').value,
            rating: form.querySelector('[name="rating"]').value,
            message: form.querySelector('[name="message"]').value
        };

        const success = await submitForm(
            '/api/feedback',
            formData,
            'Спасибо за ваш отзыв! Мы ценим ваше мнение.'
        );

        if (success) {
            form.reset();
        }
    });
});
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');
    
    // Показать спиннер загрузки
    submitText.textContent = 'Отправка...';
    submitSpinner.classList.remove('hidden');
    submitBtn.disabled = true;
    
    // Собрать данные формы
    const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value
    };
    
    try {
        const response = await fetch('http://localhost:5000/api/contact-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Показать модальное окно успеха
            document.getElementById('successModal').classList.remove('hidden');
            
            // Очистить форму
            form.reset();
        } else {
            alert(result.error || 'Произошла ошибка при отправке формы');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке формы');
    } finally {
        // Восстановить кнопку
        submitText.textContent = 'Отправить';
        submitSpinner.classList.add('hidden');
        submitBtn.disabled = false;
    }
});

// Закрытие модального окна
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('successModal').classList.add('hidden');
});