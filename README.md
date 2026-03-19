# 工厂企业官网

专业的工厂企业官方网站，采用现代化设计，大气简约风格，支持响应式布局。包含前台展示和后台管理两大部分。

## 功能特性

- **前台官网**：首页、产品中心、新闻中心、联系我们四大页面
- **滑动效果**：流畅的页面滚动和动画过渡效果
- **响应式设计**：完美适配 PC、平板、手机等各种设备
- **按钮光影**：精美的按钮光效和悬停动画
- **后台管理**：完整的企业信息、产品、新闻管理系统
- **图片上传**：产品支持 1-5 张图片上传
- **权限控制**：后台登录验证和权限管理

## 技术栈

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Tailwind CSS 3
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Build Tool**: Vite 5

## 项目结构

```
src/
├── components/         # 公共组件（导航栏、页脚、后台布局）
├── hooks/             # 自定义 Hooks（企业信息获取）
├── lib/               # 工具库（Supabase 客户端、样式工具）
├── pages/             # 页面组件
│   ├── admin/         # 后台管理页面
│   │   ├── AdminLogin.tsx      # 登录页
│   │   ├── AdminDashboard.tsx  # 控制台
│   │   ├── AdminProducts.tsx   # 产品管理
│   │   ├── AdminNews.tsx       # 新闻管理
│   │   └── AdminSettings.tsx   # 企业设置
│   ├── HomePage.tsx    # 官网首页
│   ├── ProductsPage.tsx # 产品列表
│   ├── NewsPage.tsx    # 新闻中心
│   └── ContactPage.tsx # 联系我们
├── types/             # TypeScript 类型定义
├── app.tsx            # 应用入口
├── index.tsx          # 程序入口
└── index.css          # 全局样式
```

## 数据库结构

数据库表结构定义文件位置：`supabase/tables/schema_8b8a.sql`

### 数据表说明

- `companies_s_8b8a8a89_5`: 企业基本信息表
- `products_s_8b8a8a89_5`: 产品信息表（支持最多 5 张图片）
- `news_s_8b8a8a89_5`: 新闻资讯表
- `admin_users`: 后台管理员账户表

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 后台管理

### 登录地址
`/admin/login`

### 默认账号
- 用户名：`admin`
- 密码：`123456`

### 功能模块
1. **控制台**：查看系统概览和统计数据
2. **产品管理**：添加、编辑、删除产品，支持 1-5 张图片上传
3. **新闻管理**：发布、编辑、删除企业新闻
4. **企业设置**：修改企业信息、Logo、联系方式等
5. **密码修改**：修改管理员登录密码

## 主要特性

### 前台官网
- 响应式导航栏，滚动时自动变换样式
- Hero 区域渐变背景和滑动动画
- 产品展示卡片悬停效果
- 新闻列表时间线设计
- 联系表单美观实用

### 后台管理
- 侧边栏导航，移动端适配
- 表格数据展示，支持搜索和筛选
- 模态框表单，新增/编辑功能
- 图片上传预览和删除
- 富文本编辑器支持

## 注意事项

1. 首次使用需要先在后台设置企业信息
2. 产品图片目前使用本地预览 URL，生产环境需配置 Supabase Storage
3. 建议首次登录后立即修改默认密码
4. 所有数据操作都有软删除机制，可通过 is_deleted 字段恢复
