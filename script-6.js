// Preloader
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        setTimeout(function() {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }
        }, 1000);
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const bars = document.querySelectorAll('.bar');

    if (mobileMenuButton && mobileMenu) {
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
    }

    // Close menu when clicking links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Reset button animation
                if (bars.length > 0) {
                    bars[0].style.transform = 'rotate(0)';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'rotate(0)';
                }
            }
        });
    });

    // Callback buttons
    document.querySelectorAll('.callback-btn, .mobile-callback-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Форма обратного звонка будет здесь!');
        });
    });

    // Form steps navigation
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');

    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            if (!currentStep) return;
            
            const prevStep = currentStep.previousElementSibling;
            if (!prevStep) return;
            
            currentStep.classList.remove('active');
            currentStep.classList.add('hidden');
            
            prevStep.classList.remove('hidden');
            prevStep.classList.add('active');
            
            // Update progress tracker
            const currentProgress = Array.from(progressSteps).findIndex(step => 
                step.classList.contains('active')
            );
            
            if (currentProgress > 0) {
                progressSteps[currentProgress].classList.remove('active');
                progressSteps[currentProgress - 1].classList.add('active');
            }
        });
    });

    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            if (!currentStep) return;
            
            const nextStep = currentStep.nextElementSibling;
            if (!nextStep) return;
            
            currentStep.classList.remove('active');
            currentStep.classList.add('hidden');
            
            nextStep.classList.remove('hidden');
            nextStep.classList.add('active');
            
            // Update progress tracker
            const currentProgress = Array.from(progressSteps).findIndex(step => 
                step.classList.contains('active')
            );
            
            if (currentProgress < progressSteps.length - 1) {
                progressSteps[currentProgress].classList.remove('active');
                progressSteps[currentProgress].classList.add('completed');
                progressSteps[currentProgress + 1].classList.add('active');
            }
        });
    });

    // Service cards selection
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.service-card').forEach(c => {
                c.classList.remove('border-red-600');
            });
            this.classList.add('border-red-600');
        });
    });

    // Service calculator
    const checkboxes = document.querySelectorAll('.service-checkbox');
    const urgentCheckbox = document.querySelector('.urgent-checkbox');
    const serviceCostElement = document.getElementById('service-cost');
    const urgentCostElement = document.getElementById('urgent-cost');
    const discountElement = document.getElementById('discount');
    const totalCostElement = document.getElementById('total-cost');

    let baseCost = 0;
    let urgent = false;

    if (checkboxes.length > 0) {
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const price = parseInt(this.dataset.price) || 0;
                
                if (this.checked) {
                    baseCost += price;
                } else {
                    baseCost -= price;
                }
                
                updateCost();
            });
        });
    }

    if (urgentCheckbox) {
        urgentCheckbox.addEventListener('change', function() {
            urgent = this.checked;
            updateCost();
        });
    }

    function updateCost() {
        const urgentCost = urgent ? baseCost * 0.2 : 0;
        const discount = baseCost * 0.1;
        const total = baseCost + urgentCost - discount;
        
        if (serviceCostElement) serviceCostElement.textContent = baseCost + ' ₽';
        if (urgentCostElement) urgentCostElement.textContent = '+' + urgentCost + ' ₽';
        if (discountElement) discountElement.textContent = '-' + discount + ' ₽';
        if (totalCostElement) totalCostElement.textContent = total + ' ₽';
        
        if (serviceCostElement) animateValue(serviceCostElement, 0, baseCost, 500);
        if (urgentCostElement) animateValue(urgentCostElement, 0, urgentCost, 500);
        if (discountElement) animateValue(discountElement, 0, discount, 500);
        if (totalCostElement) animateValue(totalCostElement, 0, total, 500);
    }

    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + ' ₽';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Confirmation modal
    const submitForm = document.getElementById('submit-form');
    const confirmationModal = document.getElementById('confirmation-modal');
    const closeModal = document.getElementById('close-modal');

    if (submitForm && confirmationModal) {
        submitForm.addEventListener('click', function() {
            confirmationModal.classList.remove('hidden');
        });
    }

    if (closeModal && confirmationModal) {
        closeModal.addEventListener('click', function() {
            confirmationModal.classList.add('hidden');
        });
    }

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-slide-in, .animate-fade-in');
    if (animateElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('opacity-0');
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Toggle switches
    document.querySelectorAll('.relative input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const container = this.closest('.relative');
            if (!container) return;
            
            const dot = container.querySelector('.dot');
            const block = container.querySelector('.block');
            
            if (dot && block) {
                if (this.checked) {
                    dot.style.transform = 'translateX(100%)';
                    block.classList.add('bg-red-600');
                } else {
                    dot.style.transform = 'translateX(0)';
                    block.classList.remove('bg-red-600');
                }
            }
        });
    });
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