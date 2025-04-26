\n/**
 * 易数 - 周易卜命功能
 */

// --- 数据定义 ---

// 示例：六十四卦数据结构 (需要完整填充)
// 您需要一个包含所有64卦详细信息的对象或数组
// 结构可以类似： { '111111': { name: '乾', judgment: '元亨利贞。', lines: ['初九：潜龙勿用。', '九二：见龙在田，利见大人。', ...], overallFortune: '大吉', element: '金', ... }, ... }
const hexagramData = {
    // --- 示例数据 (需要替换为完整的64卦数据) ---
    "111111": { // 乾卦 (二进制表示，阳爻为1，阴爻为0，从下往上)
        name: "乾",
        chineseName: "乾为天",
        judgment: "元亨利贞。", // 卦辞
        lines: [ // 爻辞 (从初爻到上爻)
            "初九：潜龙勿用。",
            "九二：见龙在田，利见大人。",
            "九三：君子终日乾乾，夕惕若厉，无咎。",
            "九四：或跃在渊，无咎。",
            "九五：飞龙在天，利见大人。",
            "上九：亢龙有悔。"
        ],
        overallFortune: "大吉", // 简化总体运势
        element: "金", // 五行属性
        detailedInterpretation: { // 详细解读占位符
            career: "事业：开创时期，潜力巨大，但需谨慎行事，不可冒进（初九）。时机成熟时，将大有可为（九二、九五）。需保持勤勉警惕（九三）。",
            wealth: "财运：初期积累，后期丰厚。避免过度投资（上九）。",
            relationship: "感情：关系稳固，充满阳刚之气。需注意沟通方式，避免过于强势（上九）。",
            health: "健康：精力充沛，但需防范过度劳累和意外（上九）。"
        }
    },
    "000000": { // 坤卦
        name: "坤",
        chineseName: "坤为地",
        judgment: "元亨，利牝马之贞。君子有攸往，先迷后得主，利。西南得朋，东北丧朋。安贞吉。",
        lines: [
            "初六：履霜，坚冰至。",
            "六二：直方大，不习无不利。",
            "六三：含章可贞，或从王事，无成有终。",
            "六四：括囊，无咎无誉。",
            "六五：黄裳元吉。",
            "上六：龙战于野，其血玄黄。"
        ],
        overallFortune: "吉",
        element: "土",
        detailedInterpretation: {
            career: "事业：厚积薄发，需要耐心和积累（初六）。保持正直、宽容的态度有利发展（六二）。辅助他人能取得成功（六三）。低调行事可保平安（六四）。将获得重要地位或认可（六五）。需防范冲突（上六）。",
            wealth: "财运：稳定增长，适合长期投资。避免争斗（上六）。",
            relationship: "感情：温柔包容，关系和谐。需警惕潜在的冲突（上六）。",
            health: "健康：注意脾胃保养，避免过度操劳引发的冲突或损伤（上六）。"
        }
    },
    // ... 在此填充其他62个卦的数据 ...
    // 例如： "000111": { name: "泰", ... }, "111000": { name: "否", ... }, etc.
};

// 五行数据 (用于图表)
const elements = ['金', '木', '水', '火', '土'];
const elementColors = { // 与 Tailwind 配置或主题匹配的颜色
    '金': 'rgba(212, 175, 55, 0.8)', // Gold-ish
    '木': 'rgba(0, 128, 0, 0.8)',   // Green
    '水': 'rgba(0, 0, 255, 0.8)',   // Blue
    '火': 'rgba(255, 0, 0, 0.8)',     // Red
    '土': 'rgba(139, 69, 19, 0.8)'    // Brown-ish (SaddleBrown)
};


document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const fortuneForm = document.getElementById('fortune-form');
    const divinationProcess = document.getElementById('divination-process');
    const resultContainer = document.getElementById('result-container');
    const startDivinationBtn = document.getElementById('start-divination');
    const newDivinationBtn = document.getElementById('new-divination');
    const questionInput = document.getElementById('question');
    const birthDateInput = document.getElementById('birth-date'); // 确保HTML中有此元素

    // 结果展示元素
    const hexagramNameEl = document.getElementById('hexagram-name');
    const hexagramLinesContainer = document.getElementById('hexagram-lines');
    const fortuneResultEl = document.getElementById('fortune-result');
    const hexagramInterpretationEl = document.getElementById('hexagram-interpretation');
    const detailedFortuneContainer = document.getElementById('detailed-fortune');
    const elementsChartCanvas = document.getElementById('elements-chart');
    let elementsChart = null; // 用于存储Chart实例

    // --- 事件监听器 ---
    startDivinationBtn.addEventListener('click', () => {
        const question = questionInput.value;
        const birthDateStr = birthDateInput.value; // 获取生日输入

        // !! 这里需要增加逻辑判断用户想用哪种方法起卦
        // !! 例如，检查是否选中了“使用生日起卦”的选项
        const useBirthDateMethod = false; // 假设默认不使用生日起卦

        fortuneForm.style.display = 'none';
        divinationProcess.style.display = 'block';
        resultContainer.style.display = 'none';

        setTimeout(() => {
            let divinationResult;
            if (useBirthDateMethod && birthDateStr) {
                // 如果选择使用生日且输入了生日
                divinationResult = performDivinationByBirthDate(birthDateStr, question);
            } else {
                // 默认使用常规方法（如金钱卦）
                divinationResult = performDivinationStandard(question);
            }

            displayDivinationResult(divinationResult);

            divinationProcess.style.display = 'none';
            resultContainer.style.display = 'block';
            resultContainer.classList.add('visible');

        }, 2000);
    });

    newDivinationBtn.addEventListener('click', () => {
        resultContainer.style.display = 'none';
        divinationProcess.style.display = 'none';
        fortuneForm.style.display = 'block';
        questionInput.value = '';
        birthDateInput.value = ''; // 清空输入
    });

    // --- 核心占卜逻辑 ---
    function performDivination(question) {
        // 在这里实现您的起卦算法
        // 方法1：模拟蓍草法 (复杂)
        // 方法2：模拟金钱卦法 (常用) - 抛掷三次硬币为一爻，共六次
        // 方法3：按时间起卦 (类似梅花易数，但解卦用周易)
        // 方法4：按字数起卦 (类似梅花易数)
        // 方法5：随机生成 (最简单，用于测试)

        // --- 示例：随机生成卦象和变爻 ---
        let lines = [];
        let changingLines = []; // 记录变爻位置 (1-6)
        for (let i = 0; i < 6; i++) {
            const coin1 = Math.random() < 0.5 ? 2 : 3; // 反面2，正面3
            const coin2 = Math.random() < 0.5 ? 2 : 3;
            const coin3 = Math.random() < 0.5 ? 2 : 3;
            const sum = coin1 + coin2 + coin3;

            if (sum === 6) { // 老阴 (--) 变为 阳 (-)
                lines.push(0); // 本卦为阴
                changingLines.push(i + 1);
            } else if (sum === 7) { // 少阳 (-)
                lines.push(1); // 本卦为阳
            } else if (sum === 8) { // 少阴 (--)
                lines.push(0); // 本卦为阴
            } else if (sum === 9) { // 老阳 (-) 变为 阴 (--)
                lines.push(1); // 本卦为阳
                changingLines.push(i + 1);
            }
        }

        // 在 performDivination 函数内部查找卦象后
        const hexagramKey = lines.join('');
        const originalHexagram = hexagramData[hexagramKey];
        
        // 增加判断
        if (!originalHexagram) {
            console.error("未找到本卦数据:", hexagramKey);
            return { error: `无法解读卦象 ${hexagramKey}，数据缺失。` };
        }

        // 计算变卦 (如果存在变爻)
        let changedHexagram = null;
        let changedHexagramKey = null;
        if (changingLines.length > 0) {
            let changedLines = [...lines];
            changingLines.forEach(lineIndex => {
                changedLines[lineIndex - 1] = 1 - changedLines[lineIndex - 1]; // 0变1，1变0
            });
            changedHexagramKey = changedLines.join('');
            changedHexagram = hexagramData[changedHexagramKey];
            // 对变卦也增加判断 (如果需要使用其属性)
            if (!changedHexagram) {
                 console.warn("未找到变卦数据:", changedHexagramKey);
                 // 可以决定是报错还是继续，取决于解卦逻辑
            }
        }

        // --- 解卦逻辑 ---
        // 在使用 originalHexagram 和 changedHexagram 的地方确保它们存在
        let interpretation = "";
        let overallFortune = originalHexagram.overallFortune; // 确认 originalHexagram 存在

        if (changingLines.length === 0) {
            interpretation = `本卦 ${originalHexagram.name} (${originalHexagram.chineseName})：${originalHexagram.judgment}`;
        } else if (changingLines.length === 1) {
            const changingLineIndex = changingLines[0];
            // 确保 changedHexagram 存在或有替代文本
            interpretation = `本卦 ${originalHexagram.name} 之 ${changedHexagram ? changedHexagram.name : '未知变卦'}：\n`;
            // 确保 originalHexagram.lines 存在且索引有效
            if (originalHexagram.lines && originalHexagram.lines[changingLineIndex - 1]) {
                interpretation += `变爻 (${getLineName(changingLineIndex, lines[changingLineIndex-1])})：${originalHexagram.lines[changingLineIndex - 1]}`;
            } else {
                interpretation += `变爻 (${getLineName(changingLineIndex, lines[changingLineIndex-1])})：爻辞数据缺失。`;
            }
        }
        // ... 其他解卦逻辑类似处理 ...

        // 辅助函数：获取爻名 (如 初九, 六二)
        function getLineName(lineIndex, lineType) {
            const prefix = ['初', '二', '三', '四', '五', '上'][lineIndex - 1];
            const type = lineType === 1 ? '九' : '六'; // 阳爻为九，阴爻为六
            return prefix + type;
        }


        // 模拟五行分析数据 (可以根据本卦、变卦、用神等计算)
        const elementAnalysis = {
            '金': Math.random() * 10,
            '木': Math.random() * 10,
            '水': Math.random() * 10,
            '火': Math.random() * 10,
            '土': Math.random() * 10,
        };

        return {
            question: question,
            originalLines: lines, // 本卦爻象 [1, 1, 1, 1, 1, 1]
            changingLines: changingLines, // 变爻位置 [1, 3]
            hexagram: originalHexagram, // 本卦数据对象
            changedHexagram: changedHexagram, // 变卦数据对象 (可能为null)
            interpretation: interpretation, // 主要解读文字
            overallFortune: overallFortune, // 总体吉凶
            elementAnalysis: elementAnalysis, // 五行分析数据
            detailedInterpretation: originalHexagram.detailedInterpretation // 详细分类解读 (用本卦的)
        };
    }

    // --- 结果显示函数 ---
    function displayDivinationResult(result) {
        if (result.error) {
            // 显示错误信息
            hexagramNameEl.textContent = "错误";
            hexagramLinesContainer.innerHTML = '';
            fortuneResultEl.textContent = '！';
            hexagramInterpretationEl.textContent = result.error;
            detailedFortuneContainer.innerHTML = '';
            if (elementsChart) {
                elementsChart.destroy(); // 清除旧图表
                elementsChart = null;
            }
            console.error("占卜出错:", result.error);
            return;
        }

        // 1. 显示卦名
        hexagramNameEl.textContent = `${result.hexagram.name} (${result.hexagram.chineseName})`;
        if (result.changedHexagram) {
            hexagramNameEl.textContent += ` 之 ${result.changedHexagram.name}`;
        }

        // 2. 绘制卦象线条
        hexagramLinesContainer.innerHTML = ''; // 清空旧线条
        result.originalLines.slice().reverse().forEach((lineType, index) => { // 从上往下绘制，所以反转数组
            const lineDiv = document.createElement('div');
            lineDiv.classList.add('hexagram-line');
            const actualLineIndex = 6 - index; // 爻的实际位置 (1-6)

            if (lineType === 1) { // 阳爻
                lineDiv.classList.add('yang-line');
            } else { // 阴爻
                lineDiv.classList.add('yin-line');
                const part1 = document.createElement('div');
                part1.classList.add('yin-line-part');
                const part2 = document.createElement('div');
                part2.classList.add('yin-line-part');
                lineDiv.appendChild(part1);
                lineDiv.appendChild(part2);
            }

            // 标记变爻 (可选样式)
            if (result.changingLines.includes(actualLineIndex)) {
                lineDiv.style.outline = '2px solid #FF00FF'; // 用高亮色2标记变爻
                lineDiv.style.outlineOffset = '2px';
            }

            hexagramLinesContainer.appendChild(lineDiv);
        });

        // 3. 显示总体运势 (大字)
        fortuneResultEl.textContent = result.overallFortune || '平'; // 如果没有定义则为'平'

        // 4. 显示卦辞/爻辞解读
        hexagramInterpretationEl.textContent = result.interpretation;

        // 5. 显示详细运势解读
        detailedFortuneContainer.innerHTML = ''; // 清空旧内容
        if (result.detailedInterpretation) {
            for (const category in result.detailedInterpretation) {
                const categoryDiv = document.createElement('div');
                categoryDiv.innerHTML = `<h5 class="font-semibold text-highlight/80 mb-1">${category.charAt(0).toUpperCase() + category.slice(1)}:</h5><p class="text-sm">${result.detailedInterpretation[category]}</p>`;
                detailedFortuneContainer.appendChild(categoryDiv);
            }
        } else {
            detailedFortuneContainer.textContent = "暂无详细解读。";
        }


        // 6. 绘制五行分析图表 (雷达图)
        if (elementsChart) {
            elementsChart.destroy(); // 清除旧图表实例
        }
        const ctx = elementsChartCanvas.getContext('2d');
        elementsChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: elements,
                datasets: [{
                    label: '五行能量分析',
                    data: elements.map(el => result.elementAnalysis[el] || 0), // 获取对应数据
                    fill: true,
                    backgroundColor: 'rgba(0, 255, 255, 0.2)', // 高亮色半透明填充
                    borderColor: 'rgba(0, 255, 255, 1)', // 高亮色边框
                    pointBackgroundColor: 'rgba(0, 255, 255, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(0, 255, 255, 1)'
                }]
            },
            options: {
                elements: {
                    line: {
                        borderWidth: 3
                    }
                },
                scales: {
                    r: { // 雷达图的径向轴 (数值轴)
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.3)' // 轴线颜色
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.3)' // 网格线颜色
                        },
                        pointLabels: {
                            color: '#FFFFFF', // 五行标签颜色
                            font: {
                                size: 14
                            }
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)', // 刻度数字颜色
                            backdropColor: 'rgba(0, 0, 0, 0.5)', // 刻度背景色
                            stepSize: 2 // 根据数据范围调整步长
                        },
                         suggestedMin: 0,
                         suggestedMax: 10 // 根据数据范围调整最大值
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#FFFFFF' // 图例文字颜色
                        }
                    }
                }
            }
        });
    }


    // 初始隐藏处理和结果区域
    divinationProcess.style.display = 'none';
    resultContainer.style.display = 'none';

});


/**
 * 易数 - 周易卜命功能
 */

// --- 核心占卜逻辑 ---
function performDivination(question) {
    // 在这里实现您的起卦算法
    // 方法1：模拟蓍草法 (复杂)
    // 方法2：模拟金钱卦法 (常用) - 抛掷三次硬币为一爻，共六次
    // 方法3：按时间起卦 (类似梅花易数，但解卦用周易)
    // 方法4：按字数起卦 (类似梅花易数)
    // 方法5：随机生成 (最简单，用于测试)

    // --- 示例：随机生成卦象和变爻 ---
    let lines = [];
    let changingLines = []; // 记录变爻位置 (1-6)
    for (let i = 0; i < 6; i++) {
        const coin1 = Math.random() < 0.5 ? 2 : 3; // 反面2，正面3
        const coin2 = Math.random() < 0.5 ? 2 : 3;
        const coin3 = Math.random() < 0.5 ? 2 : 3;
        const sum = coin1 + coin2 + coin3;

        if (sum === 6) { // 老阴 (--) 变为 阳 (-)
            lines.push(0); // 本卦为阴
            changingLines.push(i + 1);
        } else if (sum === 7) { // 少阳 (-)
            lines.push(1); // 本卦为阳
        } else if (sum === 8) { // 少阴 (--)
            lines.push(0); // 本卦为阴
        } else if (sum === 9) { // 老阳 (-) 变为 阴 (--)
            lines.push(1); // 本卦为阳
            changingLines.push(i + 1);
        }
    }

    // 在 performDivination 函数内部查找卦象后
    const hexagramKey = lines.join('');
    const originalHexagram = hexagramData[hexagramKey];
    
    // 增加判断
    if (!originalHexagram) {
        console.error("未找到本卦数据:", hexagramKey);
        return { error: `无法解读卦象 ${hexagramKey}，数据缺失。` };
    }

    // 计算变卦 (如果存在变爻)
    let changedHexagram = null;
    let changedHexagramKey = null;
    if (changingLines.length > 0) {
        let changedLines = [...lines];
        changingLines.forEach(lineIndex => {
            changedLines[lineIndex - 1] = 1 - changedLines[lineIndex - 1]; // 0变1，1变0
        });
        changedHexagramKey = changedLines.join('');
        changedHexagram = hexagramData[changedHexagramKey];
        // 对变卦也增加判断 (如果需要使用其属性)
        if (!changedHexagram) {
             console.warn("未找到变卦数据:", changedHexagramKey);
             // 可以决定是报错还是继续，取决于解卦逻辑
        }
    }

    // --- 解卦逻辑 ---
    // 在使用 originalHexagram 和 changedHexagram 的地方确保它们存在
    let interpretation = "";
    let overallFortune = originalHexagram.overallFortune; // 确认 originalHexagram 存在

    if (changingLines.length === 0) {
        interpretation = `本卦 ${originalHexagram.name} (${originalHexagram.chineseName})：${originalHexagram.judgment}`;
    } else if (changingLines.length === 1) {
        const changingLineIndex = changingLines[0];
        // 确保 changedHexagram 存在或有替代文本
        interpretation = `本卦 ${originalHexagram.name} 之 ${changedHexagram ? changedHexagram.name : '未知变卦'}：\n`;
        // 确保 originalHexagram.lines 存在且索引有效
        if (originalHexagram.lines && originalHexagram.lines[changingLineIndex - 1]) {
            interpretation += `变爻 (${getLineName(changingLineIndex, lines[changingLineIndex-1])})：${originalHexagram.lines[changingLineIndex - 1]}`;
        } else {
            interpretation += `变爻 (${getLineName(changingLineIndex, lines[changingLineIndex-1])})：爻辞数据缺失。`;
        }
    }
    // ... 其他解卦逻辑类似处理 ...

    // 辅助函数：获取爻名 (如 初九, 六二)
    function getLineName(lineIndex, lineType) {
        const prefix = ['初', '二', '三', '四', '五', '上'][lineIndex - 1];
        const type = lineType === 1 ? '九' : '六'; // 阳爻为九，阴爻为六
        return prefix + type;
    }


    // 模拟五行分析数据 (可以根据本卦、变卦、用神等计算)
    const elementAnalysis = {
        '金': Math.random() * 10,
        '木': Math.random() * 10,
        '水': Math.random() * 10,
        '火': Math.random() * 10,
        '土': Math.random() * 10,
    };

    return {
        question: question,
        originalLines: lines, // 本卦爻象 [1, 1, 1, 1, 1, 1]
        changingLines: changingLines, // 变爻位置 [1, 3]
        hexagram: originalHexagram, // 本卦数据对象
        changedHexagram: changedHexagram, // 变卦数据对象 (可能为null)
        interpretation: interpretation, // 主要解读文字
        overallFortune: overallFortune, // 总体吉凶
        elementAnalysis: elementAnalysis, // 五行分析数据
        detailedInterpretation: originalHexagram.detailedInterpretation // 详细分类解读 (用本卦的)
    };
}

// --- 将原核心占卜逻辑封装为标准方法 ---
function performDivinationStandard(question) {
    let guaMethod = "金钱卦法(模拟)";
    // --- 模拟金钱卦法 (代码来自之前的 performDivination) ---
    let lines = [];
    let changingLines = []; // 记录变爻位置 (1-6)
    for (let i = 0; i < 6; i++) {
        const coin1 = Math.random() < 0.5 ? 2 : 3;
        const coin2 = Math.random() < 0.5 ? 2 : 3;
        const coin3 = Math.random() < 0.5 ? 2 : 3;
        const sum = coin1 + coin2 + coin3;
        if (sum === 6) { lines.push(0); changingLines.push(i + 1); }
        else if (sum === 7) { lines.push(1); }
        else if (sum === 8) { lines.push(0); }
        else if (sum === 9) { lines.push(1); changingLines.push(i + 1); }
    }

    const hexagramKey = lines.join('');
    const originalHexagram = hexagramData[hexagramKey];

    if (!originalHexagram) {
        console.error("未找到本卦数据:", hexagramKey);
        return { error: `无法解读卦象 ${hexagramKey}，数据缺失。` };
    }

    let changedHexagram = null;
    let changedHexagramKey = null;
    if (changingLines.length > 0) {
        let changedLines = [...lines];
        changingLines.forEach(lineIndex => {
            changedLines[lineIndex - 1] = 1 - changedLines[lineIndex - 1];
        });
        changedHexagramKey = changedLines.join('');
        changedHexagram = hexagramData[changedHexagramKey];
        // 可选：增加对变卦数据的检查
        if (!changedHexagram) {
             console.warn("未找到变卦数据:", changedHexagramKey);
        }
    }

    // --- 解卦逻辑 ---
    const interpretationResult = interpretHexagram(originalHexagram, changedHexagram, changingLines, lines);

    // --- 五行分析 (仍需实现基于卦象的计算) ---
    const elementAnalysis = calculateElementAnalysis(originalHexagram, changedHexagram); // 需要实现此函数

    return {
        question: question,
        originalLines: lines,
        changingLines: changingLines,
        hexagram: originalHexagram,
        changedHexagram: changedHexagram,
        interpretation: `(起卦方式: ${guaMethod})\n${interpretationResult.text}`,
        overallFortune: interpretationResult.fortune || originalHexagram.overallFortune, // 使用解读结果或本卦运势
        elementAnalysis: elementAnalysis,
        detailedInterpretation: originalHexagram.detailedInterpretation
    };
}

// --- 新增：提取解卦逻辑为独立函数 ---
function interpretHexagram(originalHexagram, changedHexagram, changingLines, originalLinesArray) {
    let interpretationText = "";
    let fortune = originalHexagram.overallFortune; // 默认运势

    // 辅助函数：获取爻名 (如 初九, 六二)
    function getLineName(lineIndex, lineType) {
        const prefix = ['初', '二', '三', '四', '五', '上'][lineIndex - 1];
        const type = lineType === 1 ? '九' : '六';
        return prefix + type;
    }


    if (!originalHexagram) return { text: "错误：本卦数据缺失。", fortune: "错误" };

    const changedHexagramName = changedHexagram ? changedHexagram.name : '未知变卦';
    const changedHexagramChineseName = changedHexagram ? changedHexagram.chineseName : '';

    if (changingLines.length === 0) {
        interpretationText = `本卦 ${originalHexagram.name} (${originalHexagram.chineseName})：${originalHexagram.judgment}`;
    } else if (changingLines.length === 1) {
        const lineIndex = changingLines[0];
        interpretationText = `本卦 ${originalHexagram.name} 之 ${changedHexagramName}：\n`;
        if (originalHexagram.lines && originalHexagram.lines[lineIndex - 1]) {
            interpretationText += `变爻 (${getLineName(lineIndex, originalLinesArray[lineIndex-1])})：${originalHexagram.lines[lineIndex - 1]}`;
            // 可以根据爻辞吉凶判断调整 fortune
        } else {
            interpretationText += `变爻 (${getLineName(lineIndex, originalLinesArray[lineIndex-1])})：爻辞数据缺失。`;
        }
    } else if (changingLines.length >= 2 && changingLines.length <= 3) {
         interpretationText = `本卦 ${originalHexagram.name} 之 ${changedHexagramName}：\n`;
         changingLines.sort((a, b) => a - b); // 按顺序显示
         changingLines.forEach(lineIndex => {
             if (originalHexagram.lines && originalHexagram.lines[lineIndex - 1]) {
                interpretationText += `变爻 (${getLineName(lineIndex, originalLinesArray[lineIndex-1])})：${originalHexagram.lines[lineIndex - 1]}\n`;
             } else {
                interpretationText += `变爻 (${getLineName(lineIndex, originalLinesArray[lineIndex-1])})：爻辞数据缺失。\n`;
             }
         });
         interpretationText += "(解读时以下爻为主)";
    } else if (changingLines.length >= 4 && changingLines.length <= 5) {
        interpretationText = `变卦 ${changedHexagramName} (${changedHexagramChineseName})：\n`;
        if (changedHexagram && changedHexagram.lines) {
            let unchangedLines = [1, 2, 3, 4, 5, 6].filter(l => !changingLines.includes(l));
            unchangedLines.sort((a, b) => a - b); // 按顺序显示
            unchangedLines.forEach(lineIndex => {
                // 注意：爻辞应该取变卦的爻辞，但爻的阴阳属性是变卦的
                const changedLineType = changedHexagram.lines[lineIndex - 1] === '0' ? 0 : 1; // 假设爻辞格式能判断阴阳，否则需要从变卦key推断
                if (changedHexagram.lines[lineIndex - 1]) {
                    interpretationText += `爻辞 (${getLineName(lineIndex, changedLineType)})：${changedHexagram.lines[lineIndex - 1]}\n`;
                } else {
                     interpretationText += `爻辞 (${getLineName(lineIndex, changedLineType)})：爻辞数据缺失。\n`;
                }
            });
            interpretationText += "(解读时以下爻为主)";
            fortune = changedHexagram.overallFortune; // 参考变卦运势
        } else {
            interpretationText += "无法获取变卦爻辞信息。";
        }
    } else { // 六爻皆变
        if (originalHexagram.name === '乾' && changedHexagram) {
            interpretationText = `变卦 ${changedHexagramName}：用九，见群龙无首，吉。`;
            fortune = "大吉";
        } else if (originalHexagram.name === '坤' && changedHexagram) {
            interpretationText = `变卦 ${changedHexagramName}：用六，利永贞。`;
            fortune = "吉";
        } else if (changedHexagram) {
            interpretationText = `变卦 ${changedHexagramName} (${changedHexagramChineseName})：${changedHexagram.judgment}`;
            fortune = changedHexagram.overallFortune;
        } else {
             interpretationText = "六爻皆变，但无法获取变卦信息。";
        }
    }
    return { text: interpretationText.trim(), fortune: fortune };
}

// --- 新增：计算五行分析 (需要实现真实逻辑) ---
function calculateElementAnalysis(originalHexagram, changedHexagram) {
    // !! 此处需要根据本卦、变卦、可能还有用神等信息计算五行旺衰 !!
    // !! 当前仍然返回随机值作为占位符 !!
    console.warn("五行分析仍使用随机数据，待实现真实计算逻辑。");
    return {
        '金': Math.random() * 10,
        '木': Math.random() * 10,
        '水': Math.random() * 10,
        '火': Math.random() * 10,
        '土': Math.random() * 10,
    };
}


// --- 结果显示函数 (displayDivinationResult) ---
// (保持不变，它现在接收标准化的 divinationResult 对象)
function displayDivinationResult(result) {
    if (result.error) {
        // 显示错误信息
        hexagramNameEl.textContent = "错误";
        hexagramLinesContainer.innerHTML = '';
        fortuneResultEl.textContent = '！';
        hexagramInterpretationEl.textContent = result.error;
        detailedFortuneContainer.innerHTML = '';
        if (elementsChart) {
            elementsChart.destroy(); // 清除旧图表
            elementsChart = null;
        }
        console.error("占卜出错:", result.error);
        return;
    }

    // 1. 显示卦名
    hexagramNameEl.textContent = `${result.hexagram.name} (${result.hexagram.chineseName})`;
    if (result.changedHexagram) {
        hexagramNameEl.textContent += ` 之 ${result.changedHexagram.name}`;
    }

    // 2. 绘制卦象线条
    hexagramLinesContainer.innerHTML = ''; // 清空旧线条
    result.originalLines.slice().reverse().forEach((lineType, index) => { // 从上往下绘制，所以反转数组
        const lineDiv = document.createElement('div');
        lineDiv.classList.add('hexagram-line');
        const actualLineIndex = 6 - index; // 爻的实际位置 (1-6)

        if (lineType === 1) { // 阳爻
            lineDiv.classList.add('yang-line');
        } else { // 阴爻
            lineDiv.classList.add('yin-line');
            const part1 = document.createElement('div');
            part1.classList.add('yin-line-part');
            const part2 = document.createElement('div');
            part2.classList.add('yin-line-part');
            lineDiv.appendChild(part1);
            lineDiv.appendChild(part2);
        }

        // 标记变爻 (可选样式)
        if (result.changingLines.includes(actualLineIndex)) {
            lineDiv.style.outline = '2px solid #FF00FF'; // 用高亮色2标记变爻
            lineDiv.style.outlineOffset = '2px';
        }

        hexagramLinesContainer.appendChild(lineDiv);
    });

    // 3. 显示总体运势 (大字)
    fortuneResultEl.textContent = result.overallFortune || '平'; // 如果没有定义则为'平'

    // 4. 显示卦辞/爻辞解读
    hexagramInterpretationEl.textContent = result.interpretation;

    // 5. 显示详细运势解读
    detailedFortuneContainer.innerHTML = ''; // 清空旧内容
    if (result.detailedInterpretation) {
        for (const category in result.detailedInterpretation) {
            const categoryDiv = document.createElement('div');
            categoryDiv.innerHTML = `<h5 class="font-semibold text-highlight/80 mb-1">${category.charAt(0).toUpperCase() + category.slice(1)}:</h5><p class="text-sm">${result.detailedInterpretation[category]}</p>`;
            detailedFortuneContainer.appendChild(categoryDiv);
        }
    } else {
        detailedFortuneContainer.textContent = "暂无详细解读。";
    }


    // 6. 绘制五行分析图表 (雷达图)
    if (elementsChart) {
        elementsChart.destroy(); // 清除旧图表实例
    }
    const ctx = elementsChartCanvas.getContext('2d');
    elementsChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: elements,
            datasets: [{
                label: '五行能量分析',
                data: elements.map(el => result.elementAnalysis[el] || 0), // 获取对应数据
                fill: true,
                backgroundColor: 'rgba(0, 255, 255, 0.2)', // 高亮色半透明填充
                borderColor: 'rgba(0, 255, 255, 1)', // 高亮色边框
                pointBackgroundColor: 'rgba(0, 255, 255, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(0, 255, 255, 1)'
            }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                r: { // 雷达图的径向轴 (数值轴)
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.3)' // 轴线颜色
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.3)' // 网格线颜色
                    },
                    pointLabels: {
                        color: '#FFFFFF', // 五行标签颜色
                        font: {
                            size: 14
                        }
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)', // 刻度数字颜色
                        backdropColor: 'rgba(0, 0, 0, 0.5)', // 刻度背景色
                        stepSize: 2 // 根据数据范围调整步长
                    },
                     suggestedMin: 0,
                     suggestedMax: 10 // 根据数据范围调整最大值
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#FFFFFF' // 图例文字颜色
                    }
                }
            }
        }
    });
}


// 初始隐藏处理和结果区域
divinationProcess.style.display = 'none';
resultContainer.style.display = 'none';

});