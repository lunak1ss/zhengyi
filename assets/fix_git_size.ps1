# ============================================================
# 皮皮 AI 项目运营助手 · Git 仓库瘦身脚本
# 用途：移除历史中 build/ work/ data/ outputs/ 等大文件，使仓库可 push 到 GitHub
#       （GitHub 单文件上限 100MB）
# 用法：powershell -ExecutionPolicy Bypass -File fix_git_size.ps1
# 注意：会重写 git 历史并 force push，请确认仓库无他人协作者后再运行。
# ============================================================
$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

Write-Host "==== 皮皮 Git 仓库瘦身 ====" -ForegroundColor Cyan
if (-not (Test-Path ".git")) { Write-Host "未找到 .git，请确认在项目根目录运行" -ForegroundColor Red; exit 1 }

# 1) 确保 .gitignore 已忽略大目录
if (-not (Select-String -Path ".gitignore" -Pattern "^build/|^dist/|^work/|^data/|^outputs/" -Quiet)) {
    Write-Host "请先更新 .gitignore（应包含 build/ dist/ work/ data/ outputs/ storage/ logs/ .env）" -ForegroundColor Red
    exit 1
}

# 2) 安装 git-filter-repo
Write-Host "[1/4] 检查 git-filter-repo ..."
if (-not (Get-Command git-filter-repo -ErrorAction SilentlyContinue)) {
    Write-Host "     安装 git-filter-repo ..."
    python -m pip install git-filter-repo
}

# 3) 从全部历史中删除大目录
Write-Host "[2/4] 重写历史，移除 build/dist/work/data/outputs/storage/logs/samples ..."
git filter-repo --force --invert-paths --path build --path dist --path work --path data --path outputs --path storage --path logs --path samples

# 4) 清理悬挂对象，压缩仓库
Write-Host "[3/4] 清理对象与压缩 ..."
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 5) 重新添加远端（filter-repo 会移除 remote）并展示提交
Write-Host "[4/4] 重新关联远端 ..."
$remote = Read-Host "请输入 GitHub 远端地址（如 https://github.com/用户名/仓库.git；直接回车跳过）"
if ($remote) {
    git remote add origin $remote
}

Write-Host ""
Write-Host "仓库瘦身完成。当前跟踪大小：" -ForegroundColor Green
$total = 0
git ls-files | ForEach-Object { $p = Join-Path (Get-Location) $_; if (Test-Path $p) { $total += (Get-Item $p).Length } }
"{0:N1} MB" -f ($total / 1MB)

Write-Host ""
Write-Host "下一步（重要）：" -ForegroundColor Yellow
Write-Host "  1) git add -A && git commit -m 'chore: 移除大文件，准备云端部署'"
Write-Host "  2) git push --force --all origin   （会覆盖远端历史）"
Write-Host "  3) 到 GitHub 仓库页面确认无 >100MB 文件"
Write-Host "  4) 连接 Streamlit Cloud 部署（Main = app.py，Secrets 填 DEEPSEEK_API_KEY）"
