/**
 * 易数 - 通用JavaScript功能
 */

// 动画控制函数
function animateElement(element, animation, duration = 1000) {
    return new Promise((resolve) => {
        const motion = window.framerMotion;
        
        if (motion && element) {
            motion.animate(element, animation, {
                duration: duration / 1000,
                onComplete: resolve
            });
        } else {
            // 降级处理
            if (element) {
                Object.assign(element.style, animation);
            }
            setTimeout(resolve, duration);
        }
    });
}

// 随机整数生成
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 日期格式化
function formatDate(date) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

// 延迟函数
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 显示元素
function showElement(element, displayType = 'block') {
    if (element) {
        element.style.display = displayType;
    }
}

// 隐藏元素
function hideElement(element) {
    if (element) {
        element.style.display = 'none';
    }
}

// 滚动到元素
function scrollToElement(element, offset = 0) {
    if (element) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetTop = rect.top + scrollTop - offset;
        
        window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
        });
    }
}


// 设置动态年份
function setDynamicYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// 添加页面切换动画
function animatePageTransition(fromPage, toPage) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        if (page === fromPage) {
            page.classList.add('fade-out');
            setTimeout(() => {
                page.style.display = 'none';
                page.classList.remove('fade-out');
            }, 300);
        } else if (page === toPage) {
            page.style.display = 'block';
            page.classList.add('fade-in');
            setTimeout(() => {
                page.classList.remove('fade-in');
            }, 300);
        }
    });
}

// 添加加载动画
function showLoadingAnimation(element) {
    element.innerHTML = '<div class="loading-spinner"></div>';
    element.classList.add('loading');
}

function hideLoadingAnimation(element) {
    element.classList.remove('loading');
    element.innerHTML = '';
}

// 添加表单验证动画
function animateFormValidation(element, isValid) {
    if (isValid) {
        element.classList.add('valid');
        setTimeout(() => {
            element.classList.remove('valid');
        }, 1000);
    } else {
        element.classList.add('invalid');
        setTimeout(() => {
            element.classList.remove('invalid');
        }, 1000);
    }
}

// 添加结果展示动画
function animateResultDisplay(element) {
    element.classList.add('result-enter');
    setTimeout(() => {
        element.classList.remove('result-enter');
    }, 500);
}

// 添加滚动平滑效果
function smoothScrollToElement(element, offset = 0) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// 添加触摸反馈效果
function addTouchFeedback(element) {
    element.addEventListener('touchstart', () => {
        element.classList.add('touch-active');
    });
    
    element.addEventListener('touchend', () => {
        element.classList.remove('touch-active');
    });
}

// 添加键盘导航支持
function addKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// 添加响应式布局支持
function handleResponsiveLayout() {
    const updateLayout = () => {
        const width = window.innerWidth;
        const elements = document.querySelectorAll('.responsive-element');
        
        elements.forEach(element => {
            if (width < 768) {
                element.classList.add('mobile');
                element.classList.remove('desktop');
            } else {
                element.classList.add('desktop');
                element.classList.remove('mobile');
            }
        });
    };
    
    window.addEventListener('resize', updateLayout);
    updateLayout();
}

// 初始化所有交互功能
document.addEventListener('DOMContentLoaded', () => {
    // 添加触摸反馈到所有按钮
    document.querySelectorAll('button').forEach(addTouchFeedback);
    
    // 添加键盘导航
    addKeyboardNavigation();
    
    // 添加响应式布局支持
    handleResponsiveLayout();
    
    // 设置动态年份
    setDynamicYear();
});