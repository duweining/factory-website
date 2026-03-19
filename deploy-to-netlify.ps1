# 🚀 Windows 一键迁移脚本
# 使用方法：右键 → 使用 PowerShell 运行

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  工厂官网 - 一键迁移到 Netlify/Vercel" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查 Git 是否安装
Write-Host "正在检查 Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version 2>&1
    Write-Host "✓ Git 已安装：$gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git 未安装！" -ForegroundColor Red
    Write-Host ""
    Write-Host "请先安装 Git：" -ForegroundColor Yellow
    Write-Host "1. 访问：https://git-scm.com/download/win" -ForegroundColor Cyan
    Write-Host "2. 下载并安装 Windows 版 Git" -ForegroundColor Cyan
    Write-Host "3. 重新运行此脚本" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "按回车键退出"
    exit
}

# 检查 Node.js 是否安装
Write-Host "正在检查 Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "✓ Node.js 已安装：$nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠ Node.js 未安装（可选，用于本地构建）" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  步骤 1: 在 GitHub 创建仓库" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "请按以下步骤操作：" -ForegroundColor White
Write-Host ""
Write-Host "1. 打开浏览器，访问：" -ForegroundColor Yellow
Write-Host "   https://github.com/new" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. 创建新仓库：" -ForegroundColor Yellow
Write-Host "   Repository name: factory-website" -ForegroundColor White
Write-Host "   选择：Public 或 Private" -ForegroundColor White
Write-Host "   ⚠️ 不要勾选 'Initialize with README'" -ForegroundColor Red
Write-Host ""
Write-Host "3. 点击 'Create repository'" -ForegroundColor Yellow
Write-Host ""

Read-Host "完成后按回车键继续"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  步骤 2: 配置 Git 用户信息" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 获取用户信息
Write-Host "请输入您的 GitHub 用户名：" -ForegroundColor Yellow
$username = Read-Host "用户名"

Write-Host "请输入您的邮箱（GitHub 注册邮箱）：" -ForegroundColor Yellow
$email = Read-Host "邮箱"

# 配置 Git
Write-Host "正在配置 Git..." -ForegroundColor Yellow
git config --global user.name "$username"
git config --global user.email "$email"
Write-Host "✓ Git 配置完成" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  步骤 3: 下载项目文件" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 创建下载目录
$downloadDir = "$env:USERPROFILE\Desktop\factory-website"
if (Test-Path $downloadDir) {
    Write-Host "清理旧文件夹..." -ForegroundColor Yellow
    Remove-Item $downloadDir -Recurse -Force
}

New-Item -ItemType Directory -Path $downloadDir | Out-Null
Write-Host "✓ 已创建文件夹：$downloadDir" -ForegroundColor Green

Write-Host ""
Write-Host "请手动下载项目文件：" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. 打开浏览器访问：" -ForegroundColor White
Write-Host "   https://h6w2o1e60j.ai-app.pub/download-now.html" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. 点击 '下载部署包' 或 '下载源代码包'" -ForegroundColor White
Write-Host ""
Write-Host "3. 将下载的 ZIP 文件解压到：" -ForegroundColor White
Write-Host "   $downloadDir" -ForegroundColor Cyan
Write-Host ""

Read-Host "解压完成后按回车键继续"

# 验证文件是否存在
if (-not (Test-Path "$downloadDir\dist")) {
    Write-Host "⚠️ 未找到 dist 文件夹，请确认已正确解压" -ForegroundColor Red
    Write-Host "解压后的文件夹应该包含：dist/, package.json, src/ 等" -ForegroundColor Yellow
    $continue = Read-Host "是否继续？(y/n)"
    if ($continue -ne 'y') {
        exit
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  步骤 4: 推送到 GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location $downloadDir

# 初始化 Git
Write-Host "初始化 Git 仓库..." -ForegroundColor Yellow
git init
Write-Host "✓ Git 仓库已初始化" -ForegroundColor Green

# 添加文件
Write-Host "添加所有文件..." -ForegroundColor Yellow
git add .
Write-Host "✓ 文件已添加" -ForegroundColor Green

# 提交
Write-Host "提交文件..." -ForegroundColor Yellow
git commit -m "Initial commit - Factory website deployment"
Write-Host "✓ 文件已提交" -ForegroundColor Green

# 重命名分支
git branch -M main

# 关联远程仓库
Write-Host "关联远程仓库..." -ForegroundColor Yellow
$repoUrl = "https://github.com/$username/factory-website.git"
git remote add origin $repoUrl
Write-Host "✓ 远程仓库已关联" -ForegroundColor Green

# 推送（需要输入 GitHub 密码或 Token）
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  步骤 5: 推送到 GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "即将推送到 GitHub..." -ForegroundColor Yellow
Write-Host "⚠️ 需要输入 GitHub 密码或 Personal Access Token" -ForegroundColor Red
Write-Host ""
Write-Host "如果没有 Token，请访问：" -ForegroundColor Yellow
Write-Host "https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host "生成一个新的 Token（勾选 repo 权限）" -ForegroundColor Yellow
Write-Host ""

try {
    git push -u origin main
    Write-Host ""
    Write-Host "✓✓✓ 推送成功！ ✓✓✓" -ForegroundColor Green
    Write-Host ""
    Write-Host "您的代码已上传到：" -ForegroundColor White
    Write-Host "https://github.com/$username/factory-website" -ForegroundColor Cyan
    Write-Host ""
} catch {
    Write-Host ""
    Write-Host "✗ 推送失败！" -ForegroundColor Red
    Write-Host "请检查：" -ForegroundColor Yellow
    Write-Host "1. GitHub 用户名和密码是否正确" -ForegroundColor White
    Write-Host "2. 是否已在 GitHub 创建仓库" -ForegroundColor White
    Write-Host "3. 网络连接是否正常" -ForegroundColor White
    Write-Host ""
    Read-Host "按回车键退出"
    exit
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  步骤 6: 部署到 Netlify/Vercel" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "请选择部署平台：" -ForegroundColor Yellow
Write-Host "1. Netlify (推荐 - 最简单)" -ForegroundColor White
Write-Host "2. Vercel" -ForegroundColor White
$choice = Read-Host "请输入选项 (1 或 2)"

if ($choice -eq '1') {
    Write-Host ""
    Write-Host "正在打开 Netlify..." -ForegroundColor Yellow
    Start-Process "https://app.netlify.com/start/deploy?repository=https://github.com/$username/factory-website"
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Netlify 部署步骤：" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "1. 使用 GitHub 账号登录 Netlify" -ForegroundColor White
    Write-Host "2. 选择 factory-website 仓库" -ForegroundColor White
    Write-Host "3. 配置构建设置：" -ForegroundColor Yellow
    Write-Host "   - Base directory: (留空)" -ForegroundColor Cyan
    Write-Host "   - Build command: npm run build" -ForegroundColor Cyan
    Write-Host "   - Publish directory: dist" -ForegroundColor Cyan
    Write-Host "4. 点击 'Deploy site'" -ForegroundColor White
    Write-Host ""
    Write-Host "等待 2-3 分钟，部署完成后您会获得：" -ForegroundColor Green
    Write-Host "https://your-site-name.netlify.app" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "绑定域名：" -ForegroundColor Yellow
    Write-Host "Site settings → Domain management → Add custom domain" -ForegroundColor Cyan
    
} elseif ($choice -eq '2') {
    Write-Host ""
    Write-Host "正在打开 Vercel..." -ForegroundColor Yellow
    Start-Process "https://vercel.com/new/clone?repository-url=https://github.com/$username/factory-website"
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Vercel 部署步骤：" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "1. 使用 GitHub 账号登录 Vercel" -ForegroundColor White
    Write-Host "2. 导入 factory-website 仓库" -ForegroundColor White
    Write-Host "3. 保持默认配置，点击 Deploy" -ForegroundColor White
    Write-Host ""
    Write-Host "等待 2-3 分钟，部署完成后您会获得：" -ForegroundColor Green
    Write-Host "https://your-site-name.vercel.app" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "绑定域名：" -ForegroundColor Yellow
    Write-Host "Settings → Domains → Add custom domain" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  🎉 迁移完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "项目已成功部署到 GitHub 和云平台！" -ForegroundColor White
Write-Host ""
Write-Host "下一步：" -ForegroundColor Yellow
Write-Host "1. 在 Netlify/Vercel 后台绑定您的自定义域名" -ForegroundColor White
Write-Host "2. 在域名服务商处配置 DNS" -ForegroundColor White
Write-Host "3. 等待 DNS 生效（几分钟到几小时）" -ForegroundColor White
Write-Host ""
Write-Host "详细指南请查看：MIGRATION_GUIDE.md" -ForegroundColor Cyan
Write-Host ""

Read-Host "按回车键退出"
