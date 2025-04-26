/**
 * 数据持久化存储管理
 */

class StorageManager {
    constructor() {
        this.storage = window.localStorage;
        this.prefix = 'yi_query_';
    }

    // 生成存储键
    _getKey(key) {
        return `${this.prefix}${key}`;
    }

    // 保存数据
    save(key, data) {
        try {
            const storageKey = this._getKey(key);
            const dataStr = JSON.stringify({
                data,
                timestamp: new Date().getTime()
            });
            this.storage.setItem(storageKey, dataStr);
            return true;
        } catch (error) {
            console.error('保存数据失败:', error);
            return false;
        }
    }

    // 获取数据
    get(key) {
        try {
            const storageKey = this._getKey(key);
            const dataStr = this.storage.getItem(storageKey);
            if (!dataStr) return null;

            const { data, timestamp } = JSON.parse(dataStr);
            return data;
        } catch (error) {
            console.error('获取数据失败:', error);
            return null;
        }
    }

    // 删除数据
    remove(key) {
        try {
            const storageKey = this._getKey(key);
            this.storage.removeItem(storageKey);
            return true;
        } catch (error) {
            console.error('删除数据失败:', error);
            return false;
        }
    }

    // 清除所有数据
    clear() {
        try {
            const keys = Object.keys(this.storage);
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    this.storage.removeItem(key);
                }
            });
            return true;
        } catch (error) {
            console.error('清除数据失败:', error);
            return false;
        }
    }

    // 获取所有存储的键
    getAllKeys() {
        try {
            const keys = Object.keys(this.storage);
            return keys
                .filter(key => key.startsWith(this.prefix))
                .map(key => key.replace(this.prefix, ''));
        } catch (error) {
            console.error('获取存储键失败:', error);
            return [];
        }
    }

    // 检查数据是否存在
    has(key) {
        return this.get(key) !== null;
    }

    // 获取数据大小
    getSize() {
        try {
            let total = 0;
            const keys = this.getAllKeys();
            keys.forEach(key => {
                const data = this.get(key);
                if (data) {
                    total += JSON.stringify(data).length;
                }
            });
            return total;
        } catch (error) {
            console.error('获取数据大小失败:', error);
            return 0;
        }
    }
}

// 创建全局存储管理器实例
const storageManager = new StorageManager();

// 导出存储管理器
export default storageManager; 