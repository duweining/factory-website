# Vercel 转移完整指南

## 📋 转移步骤（按顺序执行）

### 第一步：准备项目文件

✅ 已完成：
- `vercel.json` - Vercel 配置文件
- `.gitignore` - Git 忽略文件
- `vite.config.ts` - 已优化（移除开发插件）

### 第二步：推送到 GitHub

```bash
# 1. 进入项目目录
cd /admin/projects/8b8a8a89-5b0d-4b33-92c7-30b3c2dee790

# 2. 初始化 Git（如果还没有）
git init

# 3. 添加所有文件
git add .

# 4. 提交
git commit -m "Prepare for Vercel deployment"

# 5. 在 GitHub 创建新仓库
# 访问：https://github.com/new
# 仓库名：factory-website（或其他你喜欢的名字）
# 设为 Public 或 Private 都可以

# 6. 关联远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/factory-website.git

# 7. 推送代码
git branch -M main
git push -u origin main
```

### 第三步：在 Vercel 部署

#### 方法 A：通过 GitHub（推荐）

1. **访问** [vercel.com](https://vercel.com)
2. **登录** - 使用 GitHub 账号登录
3. **点击** "Add New Project"
4. **选择** "Import Git Repository"
5. **找到** 刚才创建的 `factory-website` 仓库
6. **点击** "Import"
7. **保持默认配置**：
   - Framework Preset: `Vite` ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `dist` ✅
8. **点击** "Deploy"

等待 1-2 分钟，看到 ✅ 表示成功！

#### 方法 B：通过 Vercel CLI（快速测试）

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署
cd /admin/projects/8b8a8a89-5b0d-4b33-92c7-30b3c2dee790
vercel

# 4. 按提示操作
# - Link to existing project? No
# - Project name: factory-website
# - Which scope? (选择你的账号)
# - Link to existing project? No
# 等待部署完成！
```

---

## 🌐 绑定自定义域名

### 1. 在 Vercel 添加域名

1. 进入项目 Dashboard
2. **Settings** → **Domains**
3. **Add** 按钮
4. 输入域名：
   - `www.yourcompany.com`
   - `yourcompany.com`（根域名）

### 2. 配置 DNS（在域名服务商处）

#### 方案 A：只使用 www 子域名（简单）

```
类型：CNAME
主机记录：www
记录值：cname.vercel-dns.com
TTL：自动
```

#### 方案 B：同时支持根域名和 www（推荐）

```
记录 1:
类型：A
主机记录：@
记录值：76.76.21.21
TTL：自动

记录 2:
类型：CNAME
主机记录：www
记录值：cname.vercel-dns.com
TTL：自动
```

### 3. 验证域名

1. 回到 Vercel Domains 页面
2. 点击域名旁的 **Verify**
3. 等待 DNS 生效（5 分钟 - 48 小时）
4. 验证通过后显示 ✅

### 4. 自动 HTTPS

Vercel 会自动配置 SSL 证书，无需额外操作！

---

## ⚙️ 环境变量配置（可选）

虽然代码中已硬编码 Supabase 配置，但建议使用环境变量：

在 Vercel Dashboard：
1. **Settings** → **Environment Variables**
2. **Add Variable**
3. 添加：

```
Key: VITE_SUPABASE_URL
Value: https://spb-bp12745p8840775h.supabase.opentrust.net
Environment: Production, Preview, Development ✅

Key: VITE_SUPABASE_ANON_KEY
Value: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYW5vbiIsInJlZiI6InNwYi1icDEyNzQ1cDg4NDA3NzVoIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE3NzM4MDcwNjIsImV4cCI6MjA4OTM4MzA2Mn0.bzvEigELn640m62nUO4hf3nm36kuTBIg_OFaT2ueQwU
Environment: Production, Preview, Development ✅
```

---

## 🧪 本地测试构建

部署前建议本地测试：

```bash
# 1. 安装依赖
npm install

# 2. 构建
npm run build

# 3. 预览（可选）
npm run preview
```

如果看到 `✓ built in xxxms` 表示成功！

---

## 🔄 自动更新

配置好后，每次 `git push` 都会自动部署：

```bash
# 修改代码后
git add .
git commit -m "Fix bug or add feature"
git push

# Vercel 会自动检测并重新部署！
```

可以在 Vercel Dashboard 查看部署状态和日志。

---

## 📊 部署后检查清单

访问您的网站并测试：

- [ ] 首页加载正常
- [ ] 导航栏滚动效果正常
- [ ] 产品中心图片显示正常
- [ ] 新闻中心内容正常
- [ ] 联系我们表单正常
- [ ] 移动端适配正常
- [ ] 后台登录 (`/admin/login`) 正常
- [ ] 产品管理功能正常
- [ ] 新闻管理功能正常
- [ ] 图片上传功能正常
- [ ] HTTPS 生效（地址栏有锁图标）
- [ ] 自定义域名访问正常

---

## 💰 费用说明

### Vercel 免费计划：
- ✅ 无限次部署
- ✅ 100GB 带宽/月（个人使用足够）
- ✅ 自动 HTTPS
- ✅ 自定义域名（完全免费！）
- ✅ 全球 CDN 加速

### 域名费用（仅需这个）：
- `.com` ≈ 60 元/年
- `.cn` ≈ 35 元/年
- `.net` ≈ 70 元/年

**总计：只需域名费！**

---

## 🔧 常见问题

### Q: 部署失败怎么办？

1. 查看 Vercel 部署日志
2. 常见错误：
   - `Module not found` → 检查 `package.json` 依赖
   - `Build failed` → 本地运行 `npm run build` 测试
   - `TypeScript error` → 检查类型定义

### Q: 域名验证一直失败？

1. 确认 DNS 记录完全正确（区分大小写）
2. 等待更长时间（最长 48 小时）
3. 使用 [whatsmydns.net](https://whatsmydns.net) 检查传播状态
4. 清除本地 DNS 缓存

### Q: 图片上传失败？

检查 Supabase Storage 权限：
1. 登录 Supabase Dashboard
2. Storage → Buckets → 选择 bucket
3. Policies → 确保有上传权限

### Q: 如何回滚到旧版本？

在 Vercel Dashboard：
1. Deployments
2. 找到想回滚的版本
3. 点击右侧菜单 → "Promote to Production"

---

## 📞 需要帮助？

- Vercel 文档：[vercel.com/docs](https://vercel.com/docs)
- Vercel 社区：[github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- 查看部署日志：Dashboard → Deployments → 点击最新版本

---

**祝您顺利转移！** 🎉

有任何问题随时询问！
