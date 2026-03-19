# 工厂企业官网应用

大气简约风格的工厂企业官方网站，包含前台展示和后台管理系统。

## 功能特性

- **前台官网**：首页、产品中心、新闻中心、联系我们四大页面
- **滑动效果**：流畅的页面滚动和动画过渡效果
- **响应式设计**：完美适配 PC、平板、手机等各种设备
- **按钮光影**：精美的按钮光效和悬停动画
- **后台管理**：完整的企业信息、产品、新闻管理系统
- **图片上传**：产品支持 1-5 张图片上传
- **权限控制**：后台登录验证和权限管理

## 技术栈

- Frontend framework and version: React 18 + TypeScript
- UI library: Tailwind CSS 3 + Lucide React Icons
- Backend service: Supabase (PostgreSQL)
- Other key libraries: React Router v6, clsx, tailwind-merge

## 项目结构

```
src/
├── components/         # 公共组件
│   ├── Navbar.tsx     # 导航栏（带滚动效果）
│   ├── Footer.tsx     # 页脚
│   └── AdminLayout.tsx # 后台布局
├── hooks/
│   └── useCompany.ts  # 企业信息 Hook
├── lib/
│   ├── supabase.ts    # Supabase 客户端
│   └── utils.ts       # 工具函数
├── pages/
│   ├── HomePage.tsx   # 首页（Hero 区域 + 特性展示）
│   ├── ProductsPage.tsx # 产品列表页
│   ├── NewsPage.tsx   # 新闻中心
│   ├── ContactPage.tsx # 联系我们
│   └── admin/
│       ├── AdminLogin.tsx      # 后台登录
│       ├── AdminDashboard.tsx  # 控制台
│       ├── AdminProducts.tsx   # 产品管理
│       ├── AdminNews.tsx       # 新闻管理
│       └── AdminSettings.tsx   # 企业设置
├── types/
│   └── database.ts    # 数据库类型定义
├── app.tsx            # 应用主组件
├── index.tsx          # 入口文件
└── index.css          # 全局样式（含自定义动画）
```

## 数据库结构

数据库表结构定义文件位置：`supabase/tables/schema_8b8a.sql`

### 主要数据表

- `companies_s_8b8a8a89_5`: 企业基本信息（名称、Logo、简介、联系方式等）
- `products_s_8b8a8a89_5`: 产品信息（名称、描述、分类、价格、图片数组 1-5 张）
- `news_s_8b8a8a89_5`: 新闻资讯（标题、摘要、内容、封面图、作者、阅读量）
- `admin_users`: 管理员账户（用户名、密码、角色）

## 使用说明

### 后台登录
- 地址：`/admin/login`
- 默认账号：admin / 123456
- 建议首次登录后修改密码

### 主要功能
1. **企业设置**：配置企业信息、Logo、Banner、联系方式
2. **产品管理**：CRUD 操作，支持最多 5 张图片上传，可设置推荐产品
3. **新闻管理**：发布企业新闻，支持封面图和分类
4. **密码管理**：修改管理员登录密码
