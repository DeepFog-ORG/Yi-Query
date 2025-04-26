/**
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
    "000111": { // 泰卦
        name: "泰",
        chineseName: "地天泰",
        judgment: "小往大来，吉亨。",
        lines: [
            "初九：拔茅茹，以其汇，征吉。",
            "九二：包荒，用冯河，不遐遗，朋亡，得尚于中行。",
            "九三：无平不陂，无往不复，艰贞无咎。勿恤其孚，于食有福。",
            "六四：翩翩不富，以其邻，不戒以孚。",
            "六五：帝乙归妹，以祉元吉。",
            "上六：城复于隍，勿用师。自邑告命，贞吝。"
        ],
        overallFortune: "大吉",
        element: "土",
        detailedInterpretation: {
            career: "事业：发展顺利，有贵人相助（初九）。需要包容和坚持（九二）。注意平衡和循环（九三）。合作共赢（六四）。获得重要支持（六五）。避免过度扩张（上六）。",
            wealth: "财运：收入稳定增长，适合投资。注意风险控制。",
            relationship: "感情：关系和谐，互相支持。注意沟通和信任。",
            health: "健康：整体良好，注意劳逸结合。"
        }
    },
    "111000": { // 否卦
        name: "否",
        chineseName: "天地否",
        judgment: "否之匪人，不利君子贞，大往小来。",
        lines: [
            "初六：拔茅茹，以其汇，贞吉亨。",
            "六二：包承。小人吉，大人否亨。",
            "六三：包羞。",
            "九四：有命无咎，畴离祉。",
            "九五：休否，大人吉。其亡其亡，系于苞桑。",
            "上九：倾否，先否后喜。"
        ],
        overallFortune: "凶",
        element: "金",
        detailedInterpretation: {
            career: "事业：面临困境，需要谨慎（初六）。注意人际关系（六二）。避免错误决策（六三）。等待时机（九四）。需要坚持（九五）。终将好转（上九）。",
            wealth: "财运：暂时困难，需要节约。避免冒险投资。",
            relationship: "感情：关系紧张，需要耐心。注意沟通方式。",
            health: "健康：注意休息，避免压力过大。"
        }
    },
    "010001": { // 屯卦
        name: "屯",
        chineseName: "水雷屯",
        judgment: "元亨利贞，勿用有攸往，利建侯。",
        lines: [
            "初九：磐桓，利居贞，利建侯。",
            "六二：屯如邅如，乘马班如。匪寇婚媾，女子贞不字，十年乃字。",
            "六三：即鹿无虞，惟入于林中，君子几不如舍，往吝。",
            "六四：乘马班如，求婚媾，往吉，无不利。",
            "九五：屯其膏，小贞吉，大贞凶。",
            "上六：乘马班如，泣血涟如。"
        ],
        overallFortune: "吉",
        element: "水",
        detailedInterpretation: {
            career: "事业：初创阶段，需要耐心（初九）。面临选择（六二）。谨慎决策（六三）。把握机会（六四）。注意分寸（九五）。避免过度（上六）。",
            wealth: "财运：初期积累，需要耐心。避免冒进。",
            relationship: "感情：需要等待时机。注意选择对象。",
            health: "健康：注意休息，避免劳累。"
        }
    },
    "100010": { // 蒙卦
        name: "蒙",
        chineseName: "山水蒙",
        judgment: "亨。匪我求童蒙，童蒙求我。初筮告，再三渎，渎则不告。利贞。",
        lines: [
            "初六：发蒙，利用刑人，用说桎梏，以往吝。",
            "九二：包蒙吉；纳妇吉；子克家。",
            "六三：勿用取女；见金夫，不有躬，无攸利。",
            "六四：困蒙，吝。",
            "六五：童蒙，吉。",
            "上九：击蒙；不利为寇，利御寇。"
        ],
        overallFortune: "吉",
        element: "土",
        detailedInterpretation: {
            career: "事业：学习阶段，需要指导（初六）。包容接纳（九二）。谨慎选择（六三）。克服困难（六四）。保持纯真（六五）。注意方法（上九）。",
            wealth: "财运：需要学习理财。避免冲动消费。",
            relationship: "感情：需要真诚相待。注意选择对象。",
            health: "健康：注意养生，保持良好习惯。"
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

// 导入存储管理器
import storageManager from './storage.js';

// 占卜历史记录
const DIVINATION_HISTORY_KEY = 'divination_history';

// 保存占卜记录
function saveDivinationRecord(question, result) {
    const history = storageManager.get(DIVINATION_HISTORY_KEY) || [];
    history.unshift({
        question,
        result,
        timestamp: new Date().getTime()
    });
    
    // 只保留最近100条记录
    if (history.length > 100) {
        history.pop();
    }
    
    storageManager.save(DIVINATION_HISTORY_KEY, history);
}

// 获取占卜历史
function getDivinationHistory() {
    return storageManager.get(DIVINATION_HISTORY_KEY) || [];
}

// 清除占卜历史
function clearDivinationHistory() {
    storageManager.remove(DIVINATION_HISTORY_KEY);
}

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

    // 获取结构化选项
    const questionTypeInput = document.getElementById('question-type');
    const situationInput = document.getElementById('situation');
    const personInput = document.getElementById('person');
    const timeRangeInput = document.getElementById('time-range');

    // 八卦编号映射
    const guaMap = {
      "乾": "111",
      "兑": "011",
      "离": "101",
      "震": "001",
      "巽": "110",
      "坎": "010",
      "艮": "100",
      "坤": "000"
    };
    // 选项到八卦的映射
    const optionToGua = {
      // 问题类型
      "career": "乾",
      "wealth": "兑",
      "love": "巽",
      "health": "坎",
      "study": "艮",
      "family": "坤",
      "social": "离",
      // 具体情境
      "promotion": "乾",
      "startup": "兑",
      "investment": "兑",
      "confession": "巽",
      "marriage": "坤",
      "illness": "坎",
      "exam": "艮",
      "family_conflict": "坤",
      "friendship": "离"
    };

    // --- 事件监听器 ---
    startDivinationBtn.addEventListener('click', () => {
        const type = questionTypeInput.value;
        const situation = situationInput.value;
        // 相关人物和时间范围可作为变爻参数
        const person = personInput.value;
        const timeRange = timeRangeInput.value;
        // 算法：上卦=类型，下卦=情境，变爻=人物+时间哈希
        const upperGua = guaMap[optionToGua[type]];
        const lowerGua = guaMap[optionToGua[situation]];
        const hexagramKey = upperGua + lowerGua;
        // 变爻：用人物和时间字符串做哈希
        let changingLine = (hashCode(person + timeRange) % 6) + 1;
        // 查找卦象数据
        let divinationResult;
        if (hexagramData[hexagramKey]) {
            divinationResult = performDivinationByKey(hexagramKey, changingLine);
        } else {
            divinationResult = { error: `无法解读卦象 ${hexagramKey}，数据缺失。` };
        }
        fortuneForm.style.display = 'none';
        divinationProcess.style.display = 'block';
        resultContainer.style.display = 'none';
        setTimeout(() => {
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
        let interpretation = "";
        let overallFortune = originalHexagram.overallFortune;

        if (changingLines.length === 0) {
            // 无变爻，直接解读本卦
            interpretation = `本卦 ${originalHexagram.name} (${originalHexagram.chineseName})：${originalHexagram.judgment}`;
        } else if (changingLines.length === 1) {
            // 一爻变，以变爻为主
            const changingLineIndex = changingLines[0];
            interpretation = `本卦 ${originalHexagram.name} 之 ${changedHexagram ? changedHexagram.name : '未知变卦'}：\n`;
            if (originalHexagram.lines && originalHexagram.lines[changingLineIndex - 1]) {
                interpretation += `变爻 (${getLineName(changingLineIndex, lines[changingLineIndex-1])})：${originalHexagram.lines[changingLineIndex - 1]}`;
            } else {
                interpretation += `变爻 (${getLineName(changingLineIndex, lines[changingLineIndex-1])})：爻辞数据缺失。`;
            }
        } else if (changingLines.length === 2) {
            // 两爻变，以本卦卦辞为主，参考变爻
            interpretation = `本卦 ${originalHexagram.name} (${originalHexagram.chineseName})：${originalHexagram.judgment}\n`;
            interpretation += `变卦 ${changedHexagram ? changedHexagram.name : '未知变卦'}：\n`;
            changingLines.forEach(lineIndex => {
                if (originalHexagram.lines && originalHexagram.lines[lineIndex - 1]) {
                    interpretation += `变爻 (${getLineName(lineIndex, lines[lineIndex-1])})：${originalHexagram.lines[lineIndex - 1]}\n`;
                }
            });
        } else if (changingLines.length === 3) {
            // 三爻变，以本卦和变卦的卦辞为主
            interpretation = `本卦 ${originalHexagram.name} (${originalHexagram.chineseName})：${originalHexagram.judgment}\n`;
            if (changedHexagram) {
                interpretation += `变卦 ${changedHexagram.name} (${changedHexagram.chineseName})：${changedHexagram.judgment}\n`;
            }
            // 参考变爻
            changingLines.forEach(lineIndex => {
                if (originalHexagram.lines && originalHexagram.lines[lineIndex - 1]) {
                    interpretation += `变爻 (${getLineName(lineIndex, lines[lineIndex-1])})：${originalHexagram.lines[lineIndex - 1]}\n`;
                }
            });
        } else if (changingLines.length === 4) {
            // 四爻变，以变卦卦辞为主
            if (changedHexagram) {
                interpretation = `变卦 ${changedHexagram.name} (${changedHexagram.chineseName})：${changedHexagram.judgment}\n`;
                // 参考不变爻
                const unchangedLines = [1,2,3,4,5,6].filter(i => !changingLines.includes(i));
                unchangedLines.forEach(lineIndex => {
                    if (changedHexagram.lines && changedHexagram.lines[lineIndex - 1]) {
                        interpretation += `不变爻 (${getLineName(lineIndex, changedLines[lineIndex-1])})：${changedHexagram.lines[lineIndex - 1]}\n`;
                    }
                });
            }
        } else if (changingLines.length === 5) {
            // 五爻变，以变卦卦辞为主
            if (changedHexagram) {
                interpretation = `变卦 ${changedHexagram.name} (${changedHexagram.chineseName})：${changedHexagram.judgment}\n`;
                // 参考不变爻
                const unchangedLine = [1,2,3,4,5,6].find(i => !changingLines.includes(i));
                if (unchangedLine && changedHexagram.lines && changedHexagram.lines[unchangedLine - 1]) {
                    interpretation += `不变爻 (${getLineName(unchangedLine, changedLines[unchangedLine-1])})：${changedHexagram.lines[unchangedLine - 1]}\n`;
                }
            }
        } else if (changingLines.length === 6) {
            // 六爻全变，以变卦卦辞为主
            if (changedHexagram) {
                interpretation = `变卦 ${changedHexagram.name} (${changedHexagram.chineseName})：${changedHexagram.judgment}`;
            }
        }

        // 添加五行生克关系解读
        if (changedHexagram) {
            const originalElement = originalHexagram.element;
            const changedElement = changedHexagram.element;
            
            if (elementRelations[changedElement].generates === originalElement) {
                interpretation += "\n\n五行关系：变卦生本卦，吉。";
            } else if (elementRelations[originalElement].generates === changedElement) {
                interpretation += "\n\n五行关系：本卦生变卦，泄气，需努力。";
            } else if (elementRelations[changedElement].controls === originalElement) {
                interpretation += "\n\n五行关系：变卦克本卦，凶。";
            } else if (elementRelations[originalElement].controls === changedElement) {
                interpretation += "\n\n五行关系：本卦克变卦，需努力。";
            } else {
                interpretation += "\n\n五行关系：本卦变卦五行相同，吉。";
            }
        }

        // 添加详细运势解读
        if (originalHexagram.detailedInterpretation) {
            interpretation += "\n\n详细运势：\n";
            Object.entries(originalHexagram.detailedInterpretation).forEach(([key, value]) => {
                interpretation += `${value}\n`;
            });
        }

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

        // 保存占卜记录
        saveDivinationRecord(result.question, result.interpretation);
    }

    // 字符串哈希函数
    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash);
    }

    // 通过卦象key和变爻生成结果
    function performDivinationByKey(hexagramKey, changingLine) {
    const originalHexagram = hexagramData[hexagramKey];
        let lines = hexagramKey.split('').map(x => parseInt(x));
        let changingLines = [changingLine];
        // 变卦
        let changedLines = [...lines];
        changedLines[changingLine - 1] = 1 - changedLines[changingLine - 1];
        const changedHexagramKey = changedLines.join('');
        const changedHexagram = hexagramData[changedHexagramKey];
        // 解读
        let interpretation = `本卦 ${originalHexagram.name} 之 ${changedHexagram ? changedHexagram.name : '未知变卦'}：\n`;
        if (originalHexagram.lines && originalHexagram.lines[changingLine - 1]) {
            interpretation += `变爻：${originalHexagram.lines[changingLine - 1]}`;
        }
    return {
            hexagram: originalHexagram,
            changedHexagram: changedHexagram,
        originalLines: lines,
        changingLines: changingLines,
            interpretation: interpretation,
            overallFortune: originalHexagram.overallFortune,
            elementAnalysis: { '金': 5, '木': 5, '水': 5, '火': 5, '土': 5 },
        detailedInterpretation: originalHexagram.detailedInterpretation
    };
}

    // 初始隐藏处理和结果区域
    divinationProcess.style.display = 'none';
    resultContainer.style.display = 'none';

    // 显示历史记录
    showDivinationHistory();
    
    // 添加清除历史按钮事件监听
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', () => {
            clearDivinationHistory();
            showDivinationHistory();
        });
    }
});

// 添加历史记录显示功能
function showDivinationHistory() {
    const historyContainer = document.getElementById('divination-history');
    const history = getDivinationHistory();
    
    if (history.length === 0) {
        historyContainer.innerHTML = '<p class="no-history">暂无占卜记录</p>';
        return;
    }

    historyContainer.innerHTML = history.map(record => `
        <div class="history-item">
            <div class="history-question">问题：${record.question}</div>
            <div class="history-result">结果：${record.result}</div>
            <div class="history-time">时间：${new Date(record.timestamp).toLocaleString()}</div>
        </div>
    `).join('');
}