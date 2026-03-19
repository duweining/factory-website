# 🚀 一键迁移到 Netlify/Vercel - 完整指南

## ⚠️ 重要说明

由于云端环境无法直接推送 GitHub，请按以下步骤在**您的本地电脑**操作。

---

## 📋 方案一：使用 GitHub Desktop（最简单，推荐⭐⭐⭐⭐⭐）

### 第 1 步：下载并安装 GitHub Desktop

访问：[desktop.github.com](https://desktop.github.com)
- Windows/Mac 都支持
- 完全免费

### 第 2 步：登录 GitHub Desktop

1. 打开 GitHub Desktop
2. 使用您的 GitHub 账号登录（duweining）

### 第 3 步：下载项目文件

1. 访问：https://h6w2o1e60j.ai-app.pub/download.html
2. 点击 **"部署包（推荐）"** 下载 `factory-website-dist.zip`
3. 解压到桌面，得到 `dist` 文件夹

### 第 4 步：创建仓库并推送

1. 在 GitHub Desktop 中：
   - File → Add Local Repository
   - Choose... 选择桌面的 `dist` 文件夹
   - 点击 "Create a repository"
   
2. 填写信息：
   - Name: `factory-website`
   - Description: 工厂企业官网
   - 点击 "Create repository"

3. 发布到 GitHub：
   - 点击右上角 "Publish repository"
   - Name: `factory-website`
   - ✅ Keep this code private（可选）
   - 点击 "Publish repository"

### 第 5 步：部署到 Netlify

1. 访问：[app.netlify.com](https://app.netlify.com)
2. 登录（用 GitHub 账号）
3. 点击 "Add new site" → "Import an existing project"
4. 选择 "GitHub"
5. 找到 `factory-website` 仓库
6. **重要配置**：
   - Base directory: `dist`
   - Build command: （留空，因为我们已经构建好了）
   - Publish directory: `dist`
7. 点击 "Deploy site"

✅ **完成！** 1-2 分钟后获得网站地址

---

## 📋 方案二：使用命令行（适合熟悉 Git 的用户）

### 第 1 步：准备环境

```bash
# 确保已安装 Git
git --version

# 如果没有，访问 git-scm.com 下载安装
```

### 第 2 步：下载项目文件

1. 访问：https://h6w2o1e60j.ai-app.pub/download.html
2. 下载 `factory-website-source.zip`（源代码包）
3. 解压到桌面

### 第 3 步：推送到 GitHub

```bash
# 进入项目目录
cd ~/Desktop/factory-website  # Mac/Linux
cd C:\Users\你的用户名\Desktop\factory-website  # Windows

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 关联远程仓库（在 GitHub 先创建空仓库）
git remote add origin https://github.com/duweining/factory-website.git

# 推送
git branch -M main
git push -u origin main
```

### 第 4 步：部署到 Vercel

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
cd factory-website
vercel
```

按提示操作即可！

---

## 📋 方案三：Netlify Drop（最快，无需 Git）

### 步骤：

1. **下载部署包**
   - 访问：https://h6w2o1e60j.ai-app.pub/download.html
   - 下载 `factory-website-dist.zip`
   - 解压得到 `dist` 文件夹

2. **拖拽部署**
   - 访问：[app.netlify.com/drop](https://app.netlify.com/drop)
   - 把整个 `dist` 文件夹拖到网页上
   - 等待 1-2 分钟

3. **完成！**
   - 获得网址：`https://xxx-xxx.netlify.app`
   - 免费 HTTPS 已配置

4. **绑定域名（可选）**
   - 在 Netlify 后台：Site settings → Domain management
   - Add custom domain
   - 按提示配置 DNS

---

## 🎯 绑定自定义域名（所有方案通用）

### 在 Netlify 绑定域名：

1. 进入 Site settings → Domain management
2. 点击 "Add custom domain"
3. 输入您的域名（如 `www.yourcompany.com`）
4. 点击 "Verify" 和 "Add domain"

5. **配置 DNS**（在您的域名服务商处）：
   ```
   类型：CNAME
   名称：www
   值：your-site-name.netlify.app
   
   或者根域名：
   类型：A
   名称：@
   值：75.2.60.5
   ```

6. 等待 DNS 生效（几分钟到几小时）
7. Netlify 自动配置 HTTPS

### 在 Vercel 绑定域名：

1. Settings → Domains
2. Add custom domain
3. 输入域名
4. 按提示配置 DNS：
   ```
   CNAME: www → cname.vercel-dns.com
   A: @ → 76.76.21.21
   ```
5. 自动 HTTPS

---

## 💡 推荐方案总结

| 方案 | 难度 | 时间 | 推荐度 |
|------|------|------|--------|
| Netlify Drop | ⭐ | 2 分钟 | ⭐⭐⭐⭐⭐ |
| GitHub Desktop + Netlify | ⭐⭐ | 5 分钟 | ⭐⭐⭐⭐ |
| 命令行 + Vercel | ⭐⭐⭐ | 10 分钟 | ⭐⭐⭐ |

---

## ❓ 常见问题

### Q: 下载链接打不开怎么办？
A: 尝试换个浏览器，或检查网络连接。如果还是不行，联系我重新生成下载链接。

### Q: Netlify Drop 上传后显示空白页？
A: 确保拖拽的是 `dist` 文件夹本身，不是文件夹里的内容。

### Q: 绑定域名后访问不了？
A: DNS 生效需要时间，通常几分钟到几小时。可以用 `ping yourdomain.com` 检查是否解析到 Netlify/Vercel。

### Q: 想从 Netlify 迁移到 Vercel？
A: 随时可以！两个平台都支持一键导入 GitHub 仓库。

---

## 🎉 开始迁移吧！

**立即行动：**
1. 访问下载页面：https://h6w2o1e60j.ai-app.pub/download.html
2. 选择最适合您的方案
3. 5 分钟内完成迁移！

**遇到问题？** 随时告诉我具体卡在哪一步，我会提供详细帮助！
