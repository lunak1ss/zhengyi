# -*- coding: utf-8 -*-
"""创建 Windows 桌面快捷方式：皮皮AI助手

目标优先级：
    1. dist/皮皮AI助手.exe       （已打包，推荐）
    2. dist/🐻皮皮 AI项目运营助手.exe （旧版 exe）
    3. 启动皮皮AI助手.bat        （未打包，源码启动）

用法：
    python create_shortcut.py
"""
from __future__ import annotations

import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def _esc(value: str) -> str:
    return value.replace("'", "''")


def _find_target() -> Path | None:
    candidates = [
        ROOT / "dist" / "皮皮AI助手.exe",
        ROOT / "dist" / "🐻皮皮 AI项目运营助手.exe",
        ROOT / "dist" / "皮皮 AI项目运营助手.exe",
        ROOT / "启动皮皮AI助手.bat",
    ]
    for c in candidates:
        if c.exists():
            return c
    return None


def main() -> int:
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

    target = _find_target()
    if target is None:
        print("❌ 未找到可启动的目标：")
        print("   请先运行 build_exe.bat 打包，或确认「启动皮皮AI助手.bat」存在。")
        return 1

    icon = ROOT / "pipi_icon.ico"
    icon_arg = f"$s.IconLocation = '{_esc(str(icon))}'" if icon.exists() else ""

    ps = f"""
$ErrorActionPreference = 'Stop'
$ws = New-Object -ComObject WScript.Shell
$desktop = [Environment]::GetFolderPath('Desktop')
$names = @('🐻皮皮AI助手.lnk', '皮皮AI助手.lnk')
$created = $null
foreach ($n in $names) {{
  $lnk = Join-Path $desktop $n
  try {{
    $s = $ws.CreateShortcut($lnk)
    $s.TargetPath = '{_esc(str(target))}'
    $s.WorkingDirectory = '{_esc(str(ROOT))}'
    $s.Description = '皮皮AI助手：AI 项目运营助手（双击启动）'
    {icon_arg}
    $s.WindowStyle = 1
    $s.Save()
    $created = $lnk
    break
  }} catch {{ }}
}}
if (-not $created) {{ throw '无法创建桌面快捷方式' }}
Write-Output $created
"""
    # 用 UTF-8 BOM 的临时 ps1 执行，避免中文/emoji 经命令行传输被破坏
    with tempfile.NamedTemporaryFile("w", suffix=".ps1", delete=False, encoding="utf-8-sig") as f:
        f.write(ps)
        ps_path = f.name
    try:
        result = subprocess.run(
            ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", ps_path],
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
        if result.returncode != 0:
            print("❌ 创建快捷方式失败：")
            print(result.stderr.strip())
            return 1
        path = result.stdout.strip()
        print("✅ 已创建桌面快捷方式：")
        print(path)
        print("目标：", target)
        if target.suffix.lower() == ".exe":
            print("提示：双击快捷方式即可启动皮皮AI助手。")
        else:
            print("提示：当前为源码模式（未打包），双击后将通过 Python 启动。")
            print("     建议运行 build_exe.bat 生成「皮皮AI助手.exe」后再创建快捷方式。")
        return 0
    finally:
        Path(ps_path).unlink(missing_ok=True)


if __name__ == "__main__":
    raise SystemExit(main())
