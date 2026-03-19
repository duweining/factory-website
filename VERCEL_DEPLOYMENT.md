# Vercel 部署及域名绑定完整指南

## 🚀 快速部署（5 分钟）

### 第一步：准备项目

您的项目已配置好以下文件：
- ✅ `package.json` - 项目依赖和构建脚本
- ✅ `vite.config.ts` - Vite 配置（已移除开发插件）
- ✅ `tsconfig.json` - TypeScript 配置
- ✅ `index.html` - 入口 HTML

### 第二步：推送到 GitHub

```bash
# 进入项目目录
cd /admin/projects/8b8a8a89-5b0d-4b33-92c7-30b3c2dee790

# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Ready for Vercel deployment"

# 在 GitHub.com 创建新仓库，然后关联
git remote add origin https://github.com/YOUR_USERNAME/factory-website.git
git branch -M main
git push -u origin main
```

### 第三步：在 Vercel 部署

1. **访问** [vercel.com](https://vercel.com)
2. **登录**（使用 GitHub 账号最快）
3. **点击** "Add New Project"
4. **选择** 刚才推送的仓库
5. **配置**（保持默认即可）：
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **点击** "Deploy"

等待 1-2 分钟，部署成功后会显示：
- ✅ 绿色的 "Ready" 状态
- 🌐 访问地址：`https://factory-website-xxx.vercel.app`

---

## 🌐 绑定自定义域名

### 场景一：已有域名

#### 1. 在 Vercel 添加域名

1. 进入项目 Dashboard
2. 点击 **Settings** → **Domains**
3. 点击 **Add** 按钮
4. 输入您的域名：
   - `www.yourcompany.com`（推荐）
   - `yourcompany.com`（根域名）

#### 2. 配置 DNS 记录

登录您的域名服务商（如阿里云、腾讯云、GoDaddy 等），添加以下记录：

**方式 A：使用 www 子域名（推荐）**

| 类型 | 主机记录 | 记录值 | TTL |
|------|---------|--------|-----|
| CNAME | www | cname.vercel-dns.com | 自动 |

**方式 B：使用根域名**

| 类型 | 主机记录 | 记录值 | TTL |
|------|---------|--------|-----|
| A | @ | 76.76.21.21 | 自动 |
| CNAME | www | cname.vercel-dns.com | 自动 |

#### 3. 验证并生效

1. 回到 Vercel Domains 页面
2. 点击域名旁边的 **Verify**
3. 等待 DNS 传播（通常 5-30 分钟，最长 48 小时）
4. 验证通过后显示 ✅

#### 4. 自动 HTTPS

Vercel 会自动为您的域名配置 SSL 证书，无需额外操作！

---

### 场景二：需要购买新域名

#### 推荐域名服务商

1. **阿里云万网**（国内用户首选）
   - 网址：[wanwang.aliyun.com](https://wanwang.aliyun.com)
   - 价格：`.com` 约 60 元/年
   
2. **腾讯云 DNSPod**
   - 网址：[dnspod.cloud.tencent.com](https://dnspod.cloud.tencent.com)
   - 价格：`.com` 约 55 元/年

3. **Namecheap**（国际用户）
   - 网址：[namecheap.com](https://namecheap.com)
   - 价格：`.com` 约 $10/年

#### 购买步骤（以阿里云为例）

1. 注册/登录阿里云账号
2. 搜索想要的域名（如 `yourcompany.com`）
3. 加入购物车并付款
4. 完成实名认证（国内要求）
5. 进入 **控制台** → **域名管理**
6. 点击域名后的 **解析**
7. 按上面的 DNS 配置添加记录

---

## ⚠️ 重要配置检查

### 1. 环境变量

虽然您的代码直接使用了 Supabase URL 和 Key，但建议在 Vercel 配置环境变量：

进入项目 Settings → **Environment Variables**，添加：

```
VITE_SUPABASE_URL=https://spb-bp12745p8840775h.supabase.opentrust.net
VITE_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYW5vbiIsInJlZiI6InNwYi1icDEyNzQ1cDg4NDA3NzVoIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE3NzM4MDcwNjIsImV4cCI6MjA4OTM4MzA2Mn0.bzvEigELn640m62nUO4hf3nm36kuTBIg_OFaT2ueQwU
```

### 2. 构建检查

部署前本地测试构建：

```bash
npm install
npm run build
```

确保输出：
```
✓ built in .xxxs
```

---

## 📋 部署后测试清单

- [ ] 访问首页是否正常加载
- [ ] 产品中心图片是否显示
- [ ] 新闻中心内容是否正常
- [ ] 后台登录功能是否正常
- [ ] 产品上传功能是否正常
- [ ] 新闻自动生成按钮是否响应
- [ ] 移动端适配是否正常
- [ ] HTTPS 是否生效（浏览器地址栏有锁图标）

---

## 🔧 常见问题解决

### Q1: 构建失败 "Module not found"

**解决方案：**
```bash
# 清除 node_modules 重新安装
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Q2: 部署后白屏

**可能原因：**
- 路由配置问题
- 静态资源路径错误

**检查：**
1. 打开浏览器控制台（F12）
2. 查看 Network 标签的错误
3. 常见错误是 404，检查 `vite.config.ts` 的 `base` 配置

### Q3: 域名一直验证不通过

**解决方案：**
1. 确认 DNS 记录完全正确（大小写敏感）
2. 等待更长时间（最多 48 小时）
3. 清除本地 DNS 缓存：
   - Windows: `ipconfig /flushdns`
   - Mac: `sudo dscacheutil -flushcache`
4. 使用 [whatsmydns.net](https://whatsmydns.net) 检查全球 DNS 传播情况

### Q4: 图片上传失败

**原因：** Supabase Storage 权限配置

**解决：**
1. 登录 Supabase Dashboard
2. 进入 Storage → Buckets
3. 找到对应 Bucket
4. 检查 Policies 是否允许匿名上传

---

## 🎯 持续集成

配置好后，每次推送代码到 GitHub 都会自动部署：

```bash
# 修改代码后
git add .
git commit -m "Fix some bug"
git push

# Vercel 会自动检测并重新部署！
```

---

## 💰 费用说明

### Vercel 免费计划包含：
- ✅ 无限次部署
- ✅ 100GB 带宽/月
- ✅ 自动 HTTPS
- ✅ 自定义域名（免费！）
- ✅ 全球 CDN

### 域名费用：
- `.com` 域名：约 60 元/年
- `.cn` 域名：约 35 元/年
- `.net` 域名：约 70 元/年

**总成本：仅需域名费用！**

---

## 📞 技术支持

遇到问题可以：
1. 查看 Vercel 文档：[vercel.com/docs](https://vercel.com/docs)
2. 检查部署日志：项目 Dashboard → Deployments → 点击最新部署
3. 浏览器控制台错误（F12）

---

**祝您部署顺利！** 🎉

部署完成后，您的网站将通过自定义域名向全世界访问！
