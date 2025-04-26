/**
 * 易数 - 梅花寻物功能
 */

// --- 数据定义 ---
// 八卦基础数据 (保持不变)
const trigrams = {
    "111": { name: "乾", element: "金", number: 1, direction: "西北", tượng: "天、父、君、首、金玉、宝、圆物、马、刚健、高亢" },
    "011": { name: "兑", element: "金", number: 2, direction: "西", tượng: "泽、少女、口舌、喜悦、附决、金器（破损）、羊、湿润" },
    "101": { name: "离", element: "火", number: 3, direction: "南", tượng: "火、中女、目、光明、文章、戈兵、雉、燥" },
    "001": { name: "震", element: "木", number: 4, direction: "东", tượng: "雷、长男、足、动、生长、木器、龙、高处" },
    "110": { name: "巽", element: "木", number: 5, direction: "东南", tượng: "风、长女、股、入、命令、绳、草木、鸡、细长" },
    "010": { name: "坎", element: "水", number: 6, direction: "北", tượng: "水、中男、耳、陷、险、黑色、豕、湿、低洼" },
    "100": { name: "艮", element: "土", number: 7, direction: "东北", tượng: "山、少男、手、止、土石、门阙、狗、高地" },
    "000": { name: "坤", element: "土", number: 8, direction: "西南", tượng: "地、母、腹、众、布帛、方形、牛、柔顺、低处" },
};

// 五行生克关系 (保持不变)
const elementRelations = {
    "金": { generates: "水", generated_by: "土", controls: "木", controlled_by: "火", same: "金" },
    "木": { generates: "火", generated_by: "水", controls: "土", controlled_by: "金", same: "木" },
    "水": { generates: "木", generated_by: "金", controls: "火", controlled_by: "土", same: "水" },
    "火": { generates: "土", generated_by: "木", controls: "金", controlled_by: "水", same: "火" },
    "土": { generates: "金", generated_by: "火", controls: "水", controlled_by: "木", same: "土" },
};

// 方位数据 (保持不变)
const directions = [
    { name: "东", angle: 90, description: "日出之地，代表生机与希望。" },
    { name: "东南", angle: 135, description: "温暖明亮，代表成长与发展。" },
    { name: "南", angle: 180, description: "阳光充足，代表热情与活力。" },
    { name: "西南", angle: 225, description: "温和宜人，代表稳定与和谐。" },
    { name: "西", angle: 270, description: "日落之地，代表收获与总结。" },
    { name: "西北", angle: 315, description: "清凉干燥，代表坚毅与决断。" },
    { name: "北", angle: 0, description: "寒冷肃穆，代表智慧与内省。" },
    { name: "东北", angle: 45, description: "春风拂面，代表新生与萌发。" }
];

// 新增：物品分类及其对应的数字 (用于起卦)
const itemCategories = {
    "metal": 1, // 金属、贵重物品 (乾)
    "electronics": 3, // 电子产品、文件 (离)
    "wood": 4, // 木制品、植物 (震)
    "fabric": 8, // 衣物、布料、方形物品 (坤)
    "liquid": 6, // 液体、易碎品 (坎)
    "other": 7, // 其他、杂物 (艮) - 可根据需要调整
};


document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const lostItemForm = document.getElementById('lost-item-form');
    const findingProcess = document.getElementById('finding-process');
    const resultContainer = document.getElementById('result-container');
    const startFindingBtn = document.getElementById('start-finding');
    const newFindingBtn = document.getElementById('new-finding');
    
    // !!假设您已经在HTML中添加了以下元素!!
    const itemCategorySelect = document.getElementById('item-category'); // 例如: <select id="item-category">...</select>
    const birthDateInput = document.getElementById('birth-date'); // 例如: <input type="datetime-local" id="birth-date">
    // 原有的输入框
    const itemDescriptionInput = document.getElementById('item-description');
    const lostLocationInput = document.getElementById('lost-location'); // 丢失地点信息可能仍有用

    const compassArrow = document.getElementById('compass-arrow');
    const directionResult = document.getElementById('direction-result');
    const distanceEstimation = document.getElementById('distance-estimation');
    const itemFeatures = document.getElementById('item-features');
    const environmentDescription = document.getElementById('environment-description');
    const findingSuggestions = document.getElementById('finding-suggestions');


    // --- 事件监听器 ---
    startFindingBtn.addEventListener('click', () => {
        lostItemForm.style.display = 'none';
        findingProcess.style.display = 'block';
        resultContainer.style.display = 'none';

        // 1. 自动获取当前时间
        const currentTime = new Date();

        // 2. 获取用户选择或输入的值
        const selectedCategoryValue = itemCategorySelect ? itemCategorySelect.value : null; // 从下拉菜单获取值
        const birthDateStr = birthDateInput ? birthDateInput.value : null; // 获取生辰字符串
        const itemDesc = itemDescriptionInput.value; // 保留描述作为备用
        const lostLocation = lostLocationInput.value; // 地点信息可能用于解读参考

        // 输入验证 (简单示例)
        // 可以根据实际需要调整验证逻辑
        if (!selectedCategoryValue && !itemDesc && !birthDateStr) {
             alert("请至少选择物品分类、输入物品描述或提供生辰信息");
             findingProcess.style.display = 'none';
             lostItemForm.style.display = 'block';
             return;
        }


        setTimeout(() => {
            // 调用核心计算函数，传入所有可能的信息源
            const result = calculateLostItem(currentTime, selectedCategoryValue, birthDateStr, itemDesc, lostLocation);

            displayResult(result); // 显示真实计算结果

            findingProcess.style.display = 'none';
            resultContainer.style.display = 'block';
            resultContainer.classList.add('visible');

        }, 1500); // 模拟计算耗时
    });

    // ... newFindingBtn listener (保持不变) ...
    newFindingBtn.addEventListener('click', () => {
        resultContainer.style.display = 'none';
        findingProcess.style.display = 'none';
        lostItemForm.style.display = 'block';
        // 清空表单 (可选)
        if(itemCategorySelect) itemCategorySelect.selectedIndex = 0; // 重置下拉菜单
        if(birthDateInput) birthDateInput.value = '';
        itemDescriptionInput.value = '';
        lostLocationInput.value = '';
    });


    // --- 核心梅花易数计算逻辑 (修改起卦部分) ---
    function calculateLostItem(currentTime, categoryValue, birthDateStr, itemDesc, lostLocation) {
        let upperTrigramNum, lowerTrigramNum, changingLineNum;
        let guaMethod = ""; // 记录使用了哪种起卦方法

        // 1. 确定起卦方法 (优先级：当前时间 > 物品分类 > 生辰 > 物品描述)
        
        // 优先使用当前时间起卦 (最常用)
        guaMethod = "当前时间";
        try {
            // 使用当前时间进行计算
            const yearBranchNum = (currentTime.getFullYear() % 12) || 12;
            const monthNum = currentTime.getMonth() + 1;
            const dayNum = currentTime.getDate();
            const hourBranchNum = Math.floor((currentTime.getHours() + 1) / 2) % 12 || 12;

            upperTrigramNum = (yearBranchNum + monthNum + dayNum) % 8 || 8;
            lowerTrigramNum = (yearBranchNum + monthNum + dayNum + hourBranchNum) % 8 || 8;
            changingLineNum = (yearBranchNum + monthNum + dayNum + hourBranchNum) % 6 || 6;
            console.log(`起卦方式: ${guaMethod}`);

        } catch (e) {
            console.error("当前时间起卦失败:", e);
            // 如果当前时间起卦失败（理论上不太可能），则尝试下一种
            return { error: "无法获取当前时间进行计算" }; // 或者设计备用逻辑
        }


        // 如果需要，可以在这里添加其他起卦方法的逻辑，例如：
        /*
        else if (categoryValue && itemCategories[categoryValue]) {
            // 使用物品分类起卦
            guaMethod = "物品分类";
            // 简单的示例：用分类数字作为基础数
            const baseNum = itemCategories[categoryValue];
            // 需要结合其他数字（如当前时辰）来生成上下卦和变爻
            const hourBranchNum = Math.floor((currentTime.getHours() + 1) / 2) % 12 || 12;
            upperTrigramNum = baseNum % 8 || 8; // 示例上卦
            lowerTrigramNum = (baseNum + hourBranchNum) % 8 || 8; // 示例下卦
            changingLineNum = (baseNum + hourBranchNum) % 6 || 6; // 示例变爻
            console.log(`起卦方式: ${guaMethod}`);
        } else if (birthDateStr) {
            // 使用生辰起卦 (逻辑较为复杂，此处为占位符)
            guaMethod = "生辰八字";
            console.log(`起卦方式: ${guaMethod} (逻辑待实现)`);
            // 实现生辰八字转换及起卦算法...
            // upperTrigramNum = ...;
            // lowerTrigramNum = ...;
            // changingLineNum = ...;
             return { error: "生辰起卦逻辑尚未实现" }; // 暂时返回错误
        } else if (itemDesc) {
            // 使用物品描述字数起卦 (作为最后备选)
            guaMethod = "物品描述";
            const result = calculateByDescription(itemDesc);
            if (result.error) return result;
            upperTrigramNum = result.upperTrigramNum;
            lowerTrigramNum = result.lowerTrigramNum;
            changingLineNum = result.changingLineNum;
            console.log(`起卦方式: ${guaMethod}`);
        } else {
             return { error: "缺少有效的起卦信息" };
        }
        */

        // 辅助函数：按字数起卦 (保持不变)
        function calculateByDescription(desc) {
            // ... (代码同前) ...
            const len = desc.replace(/\s+/g, '').length;
            if (len === 0) return { error: "物品描述无效" };
            let upperNum, lowerNum, changeNum;
            if (len === 1) {
                upperNum = 1; lowerNum = 1; changeNum = 1;
            } else {
                const halfLen = Math.ceil(len / 2);
                upperNum = halfLen % 8 || 8;
                lowerNum = (len - halfLen) % 8 || 8;
                changeNum = len % 6 || 6;
            }
            return { upperTrigramNum: upperNum, lowerTrigramNum: lowerNum, changingLineNum: changeNum };
        }


        // 2. 获取卦象信息 (保持不变)
        const upperTrigram = Object.values(trigrams).find(t => t.number === upperTrigramNum);
        const lowerTrigram = Object.values(trigrams).find(t => t.number === lowerTrigramNum);

        if (!upperTrigram || !lowerTrigram) return { error: "无法生成卦象" };

        // 3. 定体用 (保持不变)
        const tiGua = lowerTrigram;
        const yongGua = upperTrigram;

        // 4. 分析生克关系 (保持不变)
        // ... (代码同前) ...
        const tiElement = tiGua.element;
        const yongElement = yongGua.element;
        let relation = "";
        let relationInterpretation = "";
        if (elementRelations[yongElement].generates === tiElement) { relation = "用生体"; relationInterpretation = "吉，易寻回..."; }
        else if (elementRelations[tiElement].generates === yongElement) { relation = "体生用"; relationInterpretation = "耗力，需周折..."; }
        else if (elementRelations[yongElement].controls === tiElement) { relation = "用克体"; relationInterpretation = "凶，难寻回..."; }
        else if (elementRelations[tiElement].controls === yongElement) { relation = "体克用"; relationInterpretation = "可寻，需努力..."; }
        else { relation = "体用比和"; relationInterpretation = "吉，易寻回..."; }


        // 5. 断方位 (保持不变)
        // ... (代码同前) ...
        const directionName = yongGua.direction;
        const directionData = directions.find(d => d.name === directionName);


        // 6. 断距离 (保持不变)
        // ... (代码同前) ...
        let distance = "未知";
        if (relation === "用生体" || relation === "体用比和") { distance = "近处"; if (['坤', '艮'].includes(tiGua.name) || ['坤', '艮'].includes(yongGua.name)) distance += " (可能非常近)"; }
        else if (relation === "体生用" || relation === "体克用") { distance = "稍远"; }
        else if (relation === "用克体") { distance = "远处"; if (['坎', '离'].includes(tiGua.name) || ['坎', '离'].includes(yongGua.name)) distance += " (可能较远或难达)"; }


        // 7. 断特征/环境
        let featureDetails = "物品可能具有以下特征：\n";
        
        // 根据体卦五行和卦名添加物品特征描述
        switch(tiGua.element) {
            case "金":
                featureDetails += "- 金属材质或金属光泽\n";
                featureDetails += "- 圆形或球形\n";
                featureDetails += "- 贵重或坚硬\n";
                if (tiGua.name === "乾") {
                    featureDetails += "- 可能是电子产品或贵重物品\n";
                    featureDetails += "- 可能有金色或银色外观\n";
                } else if (tiGua.name === "兑") {
                    featureDetails += "- 可能是破损的金属物品\n";
                    featureDetails += "- 可能有缺口或凹陷\n";
                }
                break;
            case "木":
                featureDetails += "- 木质或植物材质\n";
                featureDetails += "- 长条形或细长\n";
                featureDetails += "- 绿色或棕色\n";
                if (tiGua.name === "震") {
                    featureDetails += "- 可能是会发出声音的物品\n";
                    featureDetails += "- 可能是电子设备或乐器\n";
                } else if (tiGua.name === "巽") {
                    featureDetails += "- 可能是轻薄的物品\n";
                    featureDetails += "- 可能是纸张或布料\n";
                }
                break;
            case "水":
                featureDetails += "- 液体或与水相关\n";
                featureDetails += "- 黑色或深色\n";
                featureDetails += "- 易碎或易变形\n";
                if (tiGua.name === "坎") {
                    featureDetails += "- 可能是容器或瓶子\n";
                    featureDetails += "- 可能是电子产品或液体\n";
                }
                break;
            case "火":
                featureDetails += "- 红色或暖色调\n";
                featureDetails += "- 发光或发热\n";
                featureDetails += "- 电子或电力相关\n";
                if (tiGua.name === "离") {
                    featureDetails += "- 可能是文件或证件\n";
                    featureDetails += "- 可能是发光物品\n";
                }
                break;
            case "土":
                featureDetails += "- 土色或黄色\n";
                featureDetails += "- 方形或扁平\n";
                featureDetails += "- 布料或纸张\n";
                if (tiGua.name === "坤") {
                    featureDetails += "- 可能是衣物或布料\n";
                    featureDetails += "- 可能是方形物品\n";
                } else if (tiGua.name === "艮") {
                    featureDetails += "- 可能是石头或陶瓷\n";
                    featureDetails += "- 可能是杂物或小物件\n";
                }
                break;
        }

        // 根据用卦五行和卦名添加环境描述
        let environmentDetails = "寻找环境可能具有以下特征：\n";
        
        switch(yongGua.element) {
            case "金":
                environmentDetails += "- 金属或石头环境\n";
                environmentDetails += "- 高处或开阔处\n";
                if (yongGua.name === "乾") {
                    environmentDetails += "- 可能是办公室或工作场所\n";
                    environmentDetails += "- 可能是高处或显眼位置\n";
                } else if (yongGua.name === "兑") {
                    environmentDetails += "- 可能是破损或凹陷处\n";
                    environmentDetails += "- 可能是金属容器内\n";
                }
                break;
            case "木":
                environmentDetails += "- 木质环境或植物附近\n";
                environmentDetails += "- 长条形空间\n";
                if (yongGua.name === "震") {
                    environmentDetails += "- 可能是会发出声音的地方\n";
                    environmentDetails += "- 可能是高处或显眼位置\n";
                } else if (yongGua.name === "巽") {
                    environmentDetails += "- 可能是通风处或角落\n";
                    environmentDetails += "- 可能是轻薄的覆盖物下\n";
                }
                break;
            case "水":
                environmentDetails += "- 水边或潮湿处\n";
                environmentDetails += "- 低洼处或暗处\n";
                if (yongGua.name === "坎") {
                    environmentDetails += "- 可能是容器内或凹陷处\n";
                    environmentDetails += "- 可能是暗处或隐蔽处\n";
                }
                break;
            case "火":
                environmentDetails += "- 明亮或温暖处\n";
                environmentDetails += "- 电子设备附近\n";
                if (yongGua.name === "离") {
                    environmentDetails += "- 可能是文件堆或书架\n";
                    environmentDetails += "- 可能是发光处或显眼位置\n";
                }
                break;
            case "土":
                environmentDetails += "- 地面或低处\n";
                environmentDetails += "- 方形空间\n";
                if (yongGua.name === "坤") {
                    environmentDetails += "- 可能是衣物堆或布料下\n";
                    environmentDetails += "- 可能是地面或低处\n";
                } else if (yongGua.name === "艮") {
                    environmentDetails += "- 可能是角落或隐蔽处\n";
                    environmentDetails += "- 可能是杂物堆中\n";
                }
                break;
        }

        // 根据五行生克关系添加建议
        let findingSuggestions = "寻找建议：\n";
        
        if (relation === "用生体") {
            findingSuggestions += "- 物品容易找到，保持耐心\n";
            findingSuggestions += "- 按照提示的方向和环境特征寻找\n";
            findingSuggestions += "- 注意显眼或高处位置\n";
        } else if (relation === "体生用") {
            findingSuggestions += "- 需要花费一些时间和精力\n";
            findingSuggestions += "- 建议寻求他人帮助\n";
            findingSuggestions += "- 注意检查隐蔽处\n";
        } else if (relation === "用克体") {
            findingSuggestions += "- 寻找难度较大，需要耐心\n";
            findingSuggestions += "- 建议扩大搜索范围\n";
            findingSuggestions += "- 注意检查不常去的地方\n";
        } else if (relation === "体克用") {
            findingSuggestions += "- 需要主动寻找，不要等待\n";
            findingSuggestions += "- 注意检查相关物品附近\n";
            findingSuggestions += "- 建议分区域仔细搜索\n";
        } else {
            findingSuggestions += "- 物品容易找到，保持信心\n";
            findingSuggestions += "- 按照提示的方向和环境特征寻找\n";
            findingSuggestions += "- 注意检查相关物品附近\n";
        }

        return {
            direction: directionData,
            distance: distance,
            features: featureDetails,
            environment: environmentDetails,
            suggestions: findingSuggestions,
            relation: relation,
            relationInterpretation: relationInterpretation
        };
    }


    // --- 结果显示函数 (保持不变) ---
    function displayResult(result) {
        // ... (代码同前) ...
        if (result.error || !result.direction) {
            directionResult.textContent = '无法测算';
            compassArrow.style.transform = `rotate(0deg)`;
            distanceEstimation.textContent = '-';
            itemFeatures.textContent = result.error || '信息不足或错误';
            environmentDescription.textContent = '-';
            findingSuggestions.textContent = '请检查输入或联系管理员。';
            console.error("测算错误:", result.error || "未知错误");
            return;
        }
        directionResult.textContent = result.direction.name;
        compassArrow.style.transform = `rotate(${result.direction.angle}deg)`;
        distanceEstimation.textContent = result.distance || '未知';
        itemFeatures.innerHTML = (result.features || '暂无信息').replace(/\n/g, '<br>');
        itemFeatures.style.whiteSpace = 'pre-wrap';
        environmentDescription.innerHTML = (result.environment || '暂无信息').replace(/\n/g, '<br>');
        environmentDescription.style.whiteSpace = 'pre-wrap';
        findingSuggestions.innerHTML = (result.suggestions || '暂无建议').replace(/\n/g, '<br>');
        findingSuggestions.style.whiteSpace = 'pre-wrap';
        console.log("测算结果:", result);
    }

    // 初始隐藏处理和结果区域
    findingProcess.style.display = 'none';
    resultContainer.style.display = 'none';

});