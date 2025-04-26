# 易数 - 周易与梅花易数应用

![易数](https://img.shields.io/badge/易数-v1.0-cyan)
![License](https://img.shields.io/badge/license-MIT-blue)

## 项目介绍

易数是一个基于周易与梅花易数原理的网页应用，旨在为用户提供命运测算与寻物服务。项目采用现代化的UI设计，结合传统易学理论，打造直观、美观且实用的占卜体验。

## 功能特点

### 🔮 卜命功能

- 基于周易六十四卦的命运测算
- 个性化的运势分析与建议
- 直观的卦象展示与解读
- 多维度运势图表分析

### 🔍 寻物功能

- 基于梅花易数的失物方位指引
- 精准的方位与位置建议
- 简洁的操作流程
- 详细的结果解读

## 技术栈

- **前端框架**：原生HTML/CSS/JavaScript
- **UI组件**：Tailwind CSS
- **动画效果**：Framer Motion
- **图表可视化**：Chart.js
- **图标库**：Font Awesome

## 快速部署

### Vercel 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDeepFog-ORG%2FYi-Query)

1. 点击上方按钮
2. 按照Vercel提示完成部署
3. 部署完成后，您将获得一个可访问的URL

### Cloudflare Workers 一键部署

[![Deploy to Cloudflare Workers](https://img.shields.io/badge/部署到-Cloudflare%20Workers-orange?logo=cloudflare&style=for-the-badge)](https://dash.cloudflare.com/sign-up?redirect_url=https://dash.cloudflare.com/:account/workers/new)

1. 点击上方按钮注册并登录 Cloudflare 账号
2. 本地安装 wrangler 工具（如未安装）：
   ```bash
   npm install -g wrangler
   ```
3. 运行 `wrangler login` 绑定你的 Cloudflare 账号
4. 复制 `wrangler.example.toml` 为 `wrangler.toml`
5. （可选）如需自定义配置，可编辑 `wrangler.toml`
6. 运行以下命令一键部署到你的 workers.dev 子域名：
   ```bash
   wrangler publish
   ```

> **注意：**
> - `wrangler.toml` 不包含账号信息，安全开源。
> - 如需部署到自定义域名，请手动补充 `account_id` 字段。
> - 推荐将 `wrangler.toml` 加入 `.gitignore`，防止私有配置上传。

## 本地开发

```bash
# 克隆仓库
git clone https://github.com/yourname/Yi-Query.git

# 进入项目目录
cd Yi-Query

# 使用任意HTTP服务器启动项目
# 例如使用Python的简易HTTP服务器
python -m http.server

# 或使用Node.js的http-server
npx http-server
```

## 项目结构

```
Yi-Query/
├── index.html          # 首页
├── fortune.html        # 卜命页面
├── lost-item.html      # 寻物页面
├── js/                 # JavaScript文件
│   ├── main.js         # 通用功能
│   ├── fortune.js      # 卜命功能
│   └── lost-item.js    # 寻物功能
├── vercel.json         # Vercel配置
└── _redirects          # Cloudflare Pages配置
```

## 使用指南

### 卜命功能

1. 访问「卜命」页面
2. 输入您的姓名和出生日期
3. 点击「开始卜卦」按钮
4. 系统将生成您的卦象和运势分析
5. 查看详细的运势解读和建议

### 寻物功能

1. 访问「寻物」页面
2. 输入失物名称和丢失时间
3. 点击「开始寻物」按钮
4. 系统将生成方位指引和位置建议
5. 按照指引寻找失物

## 贡献指南

欢迎对本项目进行贡献！您可以通过以下方式参与：

1. 提交Issue报告bug或提出新功能建议
2. 提交Pull Request改进代码
3. 完善文档和使用指南

## 许可证

本项目采用MIT许可证。详情请参阅LICENSE文件。

## 联系方式

如有任何问题或建议，请通过以下方式联系我们：

- 电子邮件：example@example.com
- GitHub Issues：[提交Issue](https://github.com/yourname/Yi-Query/issues)

---

<p align="center">© 2023 易数 | 探索命运轨迹，寻找失物方位</p>
