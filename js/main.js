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

// 在 DOM 加载完成后调用
document.addEventListener('DOMContentLoaded', function() {
    setDynamicYear();
    // ... 其他 DOMContentLoaded 逻辑 ...
});