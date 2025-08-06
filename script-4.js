// Инициализация частиц
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenuButton.classList.toggle('open');
        mobileMenu.classList.toggle('flex');
        mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ff0000"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ff0000",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // Анимация появления элементов при скролле
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', fadeInOnScroll);
    window.addEventListener('load', fadeInOnScroll);
    
    // Фильтрация отзывов
    const filterButtons = document.querySelectorAll('.filter-btn');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-red-600');
                btn.classList.add('bg-gray-800', 'hover:bg-gray-700');
            });
            
            // Добавляем активный класс к текущей кнопке
            button.classList.add('bg-red-600');
            button.classList.remove('bg-gray-800', 'hover:bg-gray-700');
            
            const filter = button.getAttribute('data-filter');
            
            testimonialCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Сортировка отзывов
    const sortSelect = document.getElementById('sort-select');
    const reviewsContainer = document.getElementById('reviews-container');
    
    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;
        const cards = Array.from(testimonialCards);
        
        cards.sort((a, b) => {
            if (sortValue === 'date-new') {
                return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
            } else if (sortValue === 'date-old') {
                return new Date(a.getAttribute('data-date')) - new Date(b.getAttribute('data-date'));
            } else if (sortValue === 'rating-high') {
                return parseInt(b.getAttribute('data-rating')) - parseInt(a.getAttribute('data-rating'));
            } else if (sortValue === 'rating-low') {
                return parseInt(a.getAttribute('data-rating')) - parseInt(b.getAttribute('data-rating'));
            }
            return 0;
        });
        
        // Очищаем контейнер и добавляем отсортированные карточки
        reviewsContainer.innerHTML = '';
        cards.forEach(card => {
            reviewsContainer.appendChild(card);
        });
    });
    
    // Лайки на отзывы
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const likesCount = button.nextElementSibling;
            let count = parseInt(likesCount.textContent);
            
            if (button.querySelector('i').classList.contains('far')) {
                button.innerHTML = '<i class="fas fa-heart text-red-500"></i>';
                count++;
            } else {
                button.innerHTML = '<i class="far fa-heart"></i>';
                count--;
            }
            
            likesCount.textContent = count;
        });
    });
    
    // Рейтинг звездами в форме
    const ratingStars = document.querySelectorAll('#rating-stars .rating-star');
    const ratingInput = document.getElementById('rating');
    
    ratingStars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.getAttribute('data-value'));
            ratingInput.value = value;
            
            // Обновляем отображение звезд
            ratingStars.forEach((s, index) => {
                if (index < value) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
        
        star.addEventListener('mouseover', () => {
            const value = parseInt(star.getAttribute('data-value'));
            
            ratingStars.forEach((s, index) => {
                if (index < value) {
                    s.classList.add('hover');
                } else {
                    s.classList.remove('hover');
                }
            });
        });
        
        star.addEventListener('mouseout', () => {
            ratingStars.forEach(s => {
                s.classList.remove('hover');
            });
            
            // Восстанавливаем выбранный рейтинг
            const currentRating = parseInt(ratingInput.value);
            ratingStars.forEach((s, index) => {
                if (index < currentRating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
    
    // Валидация формы
    const reviewForm = document.getElementById('review-form');
    
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        // Проверка имени
        const name = document.getElementById('name');
        const nameError = document.getElementById('name-error');
        if (name.value.trim() === '') {
            name.classList.add('border-red-500');
            nameError.classList.remove('hidden');
            isValid = false;
        } else {
            name.classList.remove('border-red-500');
            nameError.classList.add('hidden');
        }
        
        // Проверка email
        const email = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            email.classList.add('border-red-500');
            emailError.classList.remove('hidden');
            isValid = false;
        } else {
            email.classList.remove('border-red-500');
            emailError.classList.add('hidden');
        }
        
        // Проверка устройства
        const device = document.getElementById('device');
        const deviceError = document.getElementById('device-error');
        if (device.value.trim() === '') {
            device.classList.add('border-red-500');
            deviceError.classList.remove('hidden');
            isValid = false;
        } else {
            device.classList.remove('border-red-500');
            deviceError.classList.add('hidden');
        }
        
        // Проверка текста отзыва
        const reviewText = document.getElementById('review-text');
        const textError = document.getElementById('text-error');
        if (reviewText.value.trim() === '') {
            reviewText.classList.add('border-red-500');
            textError.classList.remove('hidden');
            isValid = false;
        } else {
            reviewText.classList.remove('border-red-500');
            textError.classList.add('hidden');
        }
        
        // Проверка рейтинга
        const rating = document.getElementById('rating');
        const ratingError = document.getElementById('rating-error');
        if (rating.value === '0') {
            ratingError.classList.remove('hidden');
            isValid = false;
        } else {
            ratingError.classList.add('hidden');
        }
        
        if (isValid) {
            // Здесь можно отправить форму
            alert('Спасибо за ваш отзыв! Он будет опубликован после модерации.');
            reviewForm.reset();
            ratingInput.value = '0';
            ratingStars.forEach(star => {
                star.classList.remove('active');
            });
        }
    });
    
    // Модальное окно для видео
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    const videoModal = document.getElementById('video-modal');
    const videoFrame = document.getElementById('video-frame');
    const closeModal = document.querySelector('.close-modal');
    
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const videoId = thumbnail.getAttribute('data-video-id');
            // В реальном проекте здесь будет ссылка на видео
            videoFrame.src = `https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1`;
            videoModal.style.display = 'flex';
        });
    });
    
    closeModal.addEventListener('click', () => {
        videoFrame.src = '';
        videoModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoFrame.src = '';
            videoModal.style.display = 'none';
        }
    });
    
    // Анимация счетчиков
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Запускаем анимацию счетчиков при появлении в области видимости
    const counterSection = document.querySelector('.counter-container').parentElement.parentElement;
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.unobserve(counterSection);
        }
    });
    
    observer.observe(counterSection);
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
const paginationButtons = document.querySelectorAll('.pagination-btn');
let currentPage = 1;

paginationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const page = parseInt(button.getAttribute('data-page'));
        
        if (page === currentPage) return;
        
        // Обновляем активную кнопку пагинации
        document.querySelector('.pagination-btn.active').classList.remove('active');
        button.classList.add('active');
        
        // Переключаем страницы
        document.getElementById(`reviews-page-${currentPage}`).classList.add('hidden');
        document.getElementById(`reviews-page-${page}`).classList.remove('hidden');
        
        currentPage = page;
        
        // Прокручиваем к началу отзывов
        document.getElementById('reviews-container').scrollIntoView({ behavior: 'smooth' });
    });
});

// Модальное окно для выбора платформы отзыва
const reviewPlatformModal = document.getElementById('review-platform-modal');
const reviewRequestModal = document.getElementById('review-request-modal');
const writeReviewBtns = document.querySelectorAll('.write-review-btn');

writeReviewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        reviewPlatformModal.style.display = 'flex';
    });
});

// Обработчик для кнопки "Добавить видеоотзыв"
document.querySelector('.add-video-review-btn').addEventListener('click', () => {
    reviewRequestModal.style.display = 'flex';
});

// Обработчик формы заявки на отзыв
document.getElementById('review-request-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('request-name').value,
        phone: document.getElementById('request-phone').value,
        device: document.getElementById('request-device').value
    };
    
    const success = await submitForm(
        '/api/review-request',
        formData,
        'Спасибо за заявку! Мы свяжемся с вами в ближайшее время для уточнения деталей.'
    );
    
    if (success) {
        reviewRequestModal.style.display = 'none';
        document.getElementById('review-request-form').reset();
    }
});