// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const backToTopBtn = document.getElementById('backToTop');
const navLinksAll = document.querySelectorAll('.nav-links a');

// Mobile menu toggle - с проверкой элемента
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Close mobile menu when clicking a link
navLinksAll.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) {
            navLinks.classList.remove('active');
        }
        if (menuToggle) {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Menu tabs functionality
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding tab pane
        const tabId = btn.getAttribute('data-tab');
        if (tabId) {
            const tabPane = document.getElementById(tabId);
            if (tabPane) {
                tabPane.classList.add('active');
                
                // Animate menu items in the active tab
                const menuItems = tabPane.querySelectorAll('.menu-item');
                menuItems.forEach((item, index) => {
                    item.style.animationDelay = `${index * 0.1}s`;
                    item.classList.add('animate-fade-in');
                    
                    // Reset animation to trigger it again
                    setTimeout(() => {
                        item.style.animation = 'none';
                        setTimeout(() => {
                            item.style.animation = '';
                            item.classList.add('animate-fade-in');
                        }, 10);
                    }, 500);
                });
            }
        }
    });
});

// Back to top button
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const revealElements = document.querySelectorAll('.reveal');

function checkScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
    
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.menu-item, .food-category, .section-header, .about-text, .about-image, .location-info, .location-map, .contact-form, .contact-info');
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - 100) {
            if (!element.classList.contains('animated')) {
                element.classList.add('animated');
                
                // Add different animations based on element type
                if (element.classList.contains('menu-item') || element.classList.contains('food-category')) {
                    element.classList.add('animate-fade-in');
                }
            }
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Initialize first tab to show animation
window.addEventListener('load', () => {
    // Trigger animation for first tab items
    const firstTabPane = document.querySelector('.tab-pane.active');
    if (firstTabPane) {
        const firstTabItems = firstTabPane.querySelectorAll('.menu-item');
        firstTabItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('animate-fade-in');
        });
    }
    
    // Add hover animation to menu items
    const allMenuItems = document.querySelectorAll('.menu-item, .food-category');
    allMenuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('hover-lift');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('hover-lift');
        });
    });
    
    // Add pulse animation to CTA buttons on load
    setTimeout(() => {
        const ctaButtons = document.querySelectorAll('.btn-primary');
        ctaButtons.forEach(btn => {
            btn.classList.add('animate-pulse');
            
            setTimeout(() => {
                btn.classList.remove('animate-pulse');
            }, 3000);
        });
    }, 2000);
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]')?.value;
            const email = this.querySelector('input[type="email"]')?.value;
            const message = this.querySelector('textarea')?.value;
            
            // Simple validation - ИСПРАВЛЕНО
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real app, you would send this data to a server
            // For demo purposes, we'll just show a success message
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Thank you for your message! We\'ll get back to you soon.');
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            if (!emailInput) return;
            
            const email = emailInput.value;
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalHtml = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                
                setTimeout(() => {
                    alert(`Thank you for subscribing with ${email}!`);
                    emailInput.value = '';
                    submitBtn.innerHTML = originalHtml;
                }, 1000);
            }
        });
    }
});

// Add animation to logo on hover
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('mouseenter', () => {
        const icon = logo.querySelector('i');
        if (icon) {
            icon.classList.add('animate-rotate');
        }
    });

    logo.addEventListener('mouseleave', () => {
        const icon = logo.querySelector('i');
        if (icon) {
            icon.classList.remove('animate-rotate');
        }
    });
}

// Coffee cup animation in hero section
function createFloatingCoffeeCup() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const coffeeCup = document.createElement('div');
    coffeeCup.innerHTML = '<i class="fas fa-mug-hot"></i>';
    coffeeCup.style.position = 'absolute';
    coffeeCup.style.color = 'rgba(255, 255, 255, 0.2)';
    coffeeCup.style.fontSize = Math.random() * 20 + 20 + 'px';
    coffeeCup.style.left = Math.random() * 100 + '%';
    coffeeCup.style.top = Math.random() * 100 + '%';
    coffeeCup.style.zIndex = '1';
    coffeeCup.classList.add('animate-float');
    coffeeCup.style.animationDuration = Math.random() * 3 + 3 + 's';
    
    hero.appendChild(coffeeCup);
    
    // Remove after animation completes
    setTimeout(() => {
        coffeeCup.remove();
    }, 6000);
}

// Create floating coffee cups in hero section
if (document.querySelector('.hero')) {
    setInterval(createFloatingCoffeeCup, 1000);
}











// Самый простой вариант drag & drop
let isDown = false;
let startX;
let scrollLeft;

const carousel = document.getElementById('drinksCarousel');

carousel.addEventListener('mousedown', (e) => {
  isDown = true;
  carousel.classList.add('active');
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
  isDown = false;
  carousel.classList.remove('active');
});

carousel.addEventListener('mouseup', () => {
  isDown = false;
  carousel.classList.remove('active');
});

carousel.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2; // скорость прокрутки
  carousel.scrollLeft = scrollLeft - walk;
});

// Для мобильных
carousel.addEventListener('touchstart', (e) => {
  isDown = true;
  startX = e.touches[0].pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('touchend', () => {
  isDown = false;
});

carousel.addEventListener('touchmove', (e) => {
  if (!isDown) return;
  const x = e.touches[0].pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2;
  carousel.scrollLeft = scrollLeft - walk;
});





// Функция перехода к напитку в меню
function goToDrink(tabId, itemName) {
  // Сохраняем в localStorage какие вкладку и напиток открыть
  localStorage.setItem('drinkTab', tabId);
  localStorage.setItem('drinkItem', itemName.toLowerCase().replace(/\s+/g, '-'));
  
  // Переходим на страницу меню
  window.location.href = 'menu.html';
}



// На странице menu.html - открываем нужную вкладку при загрузке
document.addEventListener('DOMContentLoaded', function() {
  // Проверяем, пришли ли мы с главной страницы по ссылке на конкретный напиток
  const drinkTab = localStorage.getItem('drinkTab');
  const drinkItem = localStorage.getItem('drinkItem');
  
  if (drinkTab && drinkItem) {
    // Находим кнопку нужной вкладки
    const tabBtn = document.querySelector(`[data-tab="${drinkTab}"]`);
    
    if (tabBtn) {
      // Кликаем на вкладку (активируем ее)
      tabBtn.click();
      
      // Ждем немного, чтобы контент вкладки загрузился
      setTimeout(() => {
        // Находим все элементы меню в активной вкладке
        const menuItems = document.querySelectorAll('.menu-item');
        
        // Ищем нужный напиток
        menuItems.forEach(item => {
          const itemTitle = item.querySelector('h3').textContent.toLowerCase();
          const normalizedTitle = itemTitle.replace(/\s+/g, '-');
          
          // Если нашли совпадение - подсвечиваем
          if (normalizedTitle.includes(drinkItem)) {
            item.style.backgroundColor = 'rgba(139, 69, 19, 0.1)';
            item.style.border = '2px solid #8B4513';
            item.style.borderRadius = '10px';
            item.style.padding = '15px';
            
            // Прокручиваем к элементу
            item.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
            
            // Добавляем анимацию пульсации
            item.style.animation = 'pulse 2s infinite';
          }
        });
        
        // Очищаем localStorage после использования
        localStorage.removeItem('drinkTab');
        localStorage.removeItem('drinkItem');
      }, 300); // Задержка для загрузки контента вкладки
    }
  }
});




// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initContactPage();
});

function initContactPage() {
    // Инициализация контактной формы
    initContactForm();
    
    // Инициализация FAQ аккордеона
    initFAQ();
    
    // Инициализация подсчета символов
    initCharCount();
    
    // Добавляем обработчики для emergency кнопки
    const emergencyBtn = document.querySelector('.banner-btn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', callEmergency);
    }
}

// Контактная форма
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const submitSpinner = document.getElementById('submitSpinner');
    const formSuccess = document.getElementById('formSuccess');
    
    // Валидация формы
    const validateField = (field, validator) => {
        const errorElement = document.getElementById(field.id + 'Error');
        const isValid = validator(field.value.trim());
        
        if (!isValid) {
            errorElement.textContent = getErrorMessage(field.id);
            field.style.borderColor = '#d32f2f';
            return false;
        } else {
            errorElement.textContent = '';
            field.style.borderColor = field.value ? '#4caf50' : '#f5c6b3';
            return true;
        }
    };
    
    // Получение сообщений об ошибках
    const getErrorMessage = (fieldId) => {
        const messages = {
            name: 'Name must be at least 2 characters long',
            email: 'Please enter a valid email address',
            phone: 'Please enter a valid phone number',
            subject: 'Please select a subject',
            message: 'Message must be between 10-500 characters'
        };
        return messages[fieldId] || 'This field is required';
    };
    
    // Валидаторы
    const validators = {
        name: (value) => value.length >= 2,
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        phone: (value) => !value || /^[\d\s\-\+\(\)]{10,}$/.test(value),
        subject: (value) => !!value,
        message: (value) => value.length >= 10 && value.length <= 500
    };
    
    // Реалтайм валидация
    const fields = ['name', 'email', 'phone', 'subject', 'message'];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', () => validateField(field, validators[fieldId]));
            field.addEventListener('blur', () => validateField(field, validators[fieldId]));
        }
    });
    
    // Обработка отправки формы
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Валидация всех полей
        let isValid = true;
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && !validateField(field, validators[fieldId])) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            // Прокрутка к первой ошибке
            const firstError = contactForm.querySelector('.error-message:not(:empty)');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Отключение кнопки и показ спиннера
        submitBtn.disabled = true;
        submitSpinner.style.display = 'block';
        
        try {
            // Сбор данных формы
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim() || 'Not provided',
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value.trim(),
                newsletter: document.getElementById('newsletter').checked,
                timestamp: new Date().toISOString()
            };
            
            // Симуляция отправки (замените на реальный API-вызов)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Показ успешного сообщения
            formSuccess.style.display = 'block';
            contactForm.reset();
            updateCharCount(0);
            
            // Сброс стилей полей
            fields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field) {
                    field.style.borderColor = '#f5c6b3';
                }
            });
            
            // Прокрутка к сообщению об успехе
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Скрытие сообщения через 5 секунд
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was an error submitting the form. Please try again.');
        } finally {
            // Включение кнопки и скрытие спиннера
            submitBtn.disabled = false;
            submitSpinner.style.display = 'none';
        }
    });
}

// FAQ аккордеон
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Закрытие других элементов
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключение текущего элемента
            item.classList.toggle('active');
        });
    });
}

// Подсчет символов
function initCharCount() {
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    if (messageInput && charCount) {
        updateCharCount(messageInput.value.length);
        
        messageInput.addEventListener('input', function() {
            updateCharCount(this.value.length);
        });
    }
}

function updateCharCount(count) {
    const charCount = document.getElementById('charCount');
    if (charCount) {
        charCount.textContent = count;
        
        // Изменение цвета при приближении к лимиту
        if (count > 450) {
            charCount.style.color = '#d32f2f';
        } else if (count > 400) {
            charCount.style.color = '#ff9800';
        } else {
            charCount.style.color = '#777';
        }
    }
}

// Функция для emergency вызова
function callEmergency() {
    if (confirm('Call emergency number: (123) 456-7891?')) {
        window.location.href = 'tel:1234567891';
    }
}

// Анимации для элементов при скролле
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Наблюдение за всеми анимируемыми элементами
    document.querySelectorAll('.animate-slide-up, .animate-slide-left, .animate-slide-right, .animate-pop').forEach(el => {
        observer.observe(el);
    });
}

// Инициализация анимаций
document.addEventListener('DOMContentLoaded', initAnimations);





    // Contact page specific JavaScript
    document.addEventListener('DOMContentLoaded', function() {
      // FAQ Accordion
      const faqItems = document.querySelectorAll('.faq-item');
      
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
          // Close other items
          faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
              otherItem.classList.remove('active');
            }
          });
          
          // Toggle current item
          item.classList.toggle('active');
        });
      });
      
      // Character counter
      const messageInput = document.getElementById('message');
      const charCount = document.getElementById('charCount');
      
      if (messageInput && charCount) {
        messageInput.addEventListener('input', function() {
          const count = this.value.length;
          charCount.textContent = count;
          
          // Change color when approaching limit
          if (count > 450) {
            charCount.style.color = '#d32f2f';
          } else if (count > 400) {
            charCount.style.color = '#ff9800';
          } else {
            charCount.style.color = 'var(--text-light)';
          }
        });
        
        // Initial count
        charCount.textContent = messageInput.value.length;
      }
      
      // Form submission
      const contactForm = document.getElementById('contactForm');
      const formSuccess = document.getElementById('formSuccess');
      
      if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Simple validation
          let isValid = true;
          const requiredFields = ['name', 'email', 'subject', 'message'];
          
          requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(fieldId + 'Error');
            
            if (field && !field.value.trim()) {
              errorElement.textContent = 'This field is required';
              field.style.borderColor = '#d32f2f';
              isValid = false;
            } else {
              errorElement.textContent = '';
              field.style.borderColor = 'var(--accent-color)';
            }
          });
          
          // Email validation
          const emailField = document.getElementById('email');
          const emailError = document.getElementById('emailError');
          if (emailField && emailField.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value.trim())) {
              emailError.textContent = 'Please enter a valid email address';
              emailField.style.borderColor = '#d32f2f';
              isValid = false;
            }
          }
          
          if (isValid) {
            // Show success message
            formSuccess.style.display = 'block';
            contactForm.reset();
            
            // Reset character count
            if (charCount) charCount.textContent = '0';
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
              formSuccess.style.display = 'none';
            }, 5000);
          }
        });
      }
    });