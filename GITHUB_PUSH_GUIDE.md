# 第一步：推送到 GitHub - 详细图文教程

## 📋 完整步骤

### 步骤 1：注册/登录 GitHub

1. 访问 [github.com](https://github.com)
2. 如果没有账号，点击 **Sign up** 注册（免费）
3. 如果已有账号，点击 **Sign in** 登录

---

### 步骤 2：创建新仓库

1. 登录后，点击右上角的 **+** 号
2. 选择 **New repository**

3. 填写仓库信息：
   ```
   Repository name: factory-website
   Description: 工厂企业官网 - Factory Official Website
   Public: ✅ (公开，任何人都可以看到)
   Private: ⭕ (私有，只有你能看到)
   
   ⚠️ 不要勾选 "Initialize this repository with a README"
   ```

4. 点击底部的 **Create repository** 按钮

5. 复制页面显示的 HTTPS URL（重要！）：
   ```
   https://github.com/YOUR_USERNAME/factory-website.git
   ```
   （将 `YOUR_USERNAME` 替换为你的实际 GitHub 用户名）

---

### 步骤 3：在项目中执行 Git 命令

打开终端（Terminal 或 CMD），依次执行以下命令：

#### 3.1 进入项目目录
```bash
cd /admin/projects/8b8a8a89-5b0d-4b33-92c7-30b3c2dee790
```

#### 3.2 初始化 Git 仓库
```bash
git init
```
你会看到输出：`Initialized empty Git repository in ...`

#### 3.3 添加所有文件到暂存区
```bash
git add .
```
（注意有个点 `.`，表示当前目录所有文件）

#### 3.4 提交到本地仓库
```bash
git commit -m "Initial commit - Ready for Vercel deployment"
```
你会看到输出：`[main (root-commit) xxxxxxx] Initial commit...`

#### 3.5 关联远程 GitHub 仓库
**重要：** 将下面的 `YOUR_USERNAME` 替换为你的 GitHub 用户名！

```bash
git remote add origin https://github.com/YOUR_USERNAME/factory-website.git
```

例如，如果你的用户名是 `zhangsan`：
```bash
git remote add origin https://github.com/zhangsan/factory-website.git
```

#### 3.6 重命名分支为 main
```bash
git branch -M main
```

#### 3.7 推送到 GitHub
```bash
git push -u origin main
```

首次推送时，可能会要求你登录 GitHub：
- 如果是 Mac，可能会弹出浏览器让你授权
- 如果是 Windows，可能会要求输入用户名和密码
- 如果使用密码，需要使用 **Personal Access Token**（不是登录密码）

---

### 步骤 4：验证推送成功

1. 回到 GitHub 仓库页面
2. 刷新浏览器
3. 你应该能看到所有文件已经上传成功：
   - `src/` 文件夹
   - `package.json`
   - `vite.config.ts`
   - `vercel.json`
   - `.gitignore`
   - 等等...

---

## 🔐 常见问题：GitHub 认证

### 问题 1：提示需要认证

如果你看到：
```
remote: Support for password authentication was removed on August 13, 2021.
```

**解决方法：使用 Personal Access Token**

#### 创建 Token：

1. 访问：[github.com/settings/tokens](https://github.com/settings/tokens)
2. 点击 **Generate new token (classic)**
3. 填写：
   - **Note**: `Vercel Deployment`
   - **Expiration**: `No expiration`（或选择 90 天）
   - **Select scopes**: 勾选 `repo`（全选）
4. 点击底部的 **Generate token**
5. **复制生成的 token**（只显示一次，务必保存好！）

#### 使用 Token 推送：

```bash
git push -u origin main
```

当提示输入密码时：
- Username: 你的 GitHub 用户名
- Password: 粘贴刚才生成的 token（不会显示字符，正常现象）

---

### 问题 2：SSH 方式推送（可选高级方案）

如果你不想每次都输入密码，可以使用 SSH：

#### 生成 SSH Key：
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```
（一路按回车即可）

#### 添加到 GitHub：
1. 查看公钥：
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
2. 复制输出的内容
3. 访问：[github.com/settings/keys](https://github.com/settings/keys)
4. 点击 **New SSH key**
5. 粘贴公钥内容，保存

#### 改用 SSH URL：
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/factory-website.git
git push -u origin main
```

---

## ✅ 快速检查清单

执行完所有命令后，确认：

- [ ] `git init` 成功执行
- [ ] `git add .` 没有报错
- [ ] `git commit` 显示提交了文件
- [ ] `git remote add origin` 成功
- [ ] `git push` 成功，没有错误
- [ ] GitHub 仓库页面能看到所有文件

---

## 🎯 一键复制命令（替换用户名后）

```bash
# 进入项目目录
cd /admin/projects/8b8a8a89-5b0d-4b33-92c7-30b3c2dee790

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit - Ready for Vercel"

# 关联远程仓库（⚠️ 替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/factory-website.git

# 重命名分支
git branch -M main

# 推送到 GitHub
git push -u origin main
```

---

## 🆘 遇到问题？

### 错误：`fatal: remote origin already exists`

**解决：**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/factory-website.git
git push -u origin main
```

### 错误：`failed to push some refs`

**解决：**
```bash
git pull --rebase
git push -u origin main
```

### 错误：`permission denied`

**原因：** 仓库 URL 错误或没有权限

**解决：**
1. 检查 URL 是否正确（用户名、仓库名）
2. 确认已登录正确的 GitHub 账号
3. 如果是私有仓库，确认你有访问权限

---

## 📞 下一步

推送成功后，继续执行 **第二步：在 Vercel 部署**

查看文档：`TRANSFER_TO_VERCEL.md`

---

**祝您推送成功！** 🎉
