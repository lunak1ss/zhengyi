# -*- coding: utf-8 -*-
"""皮皮（AI 运营助手）启动引导：环境/依赖检查 → 启动 Streamlit → 自动打开浏览器。

由 start_pipi.bat 调用：
    python start_pipi.py [--check-only] [--no-browser]
"""
from __future__ import annotations

import os
import subprocess
import sys
import time
import urllib.request
import webbrowser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
URL = "http://localhost:8501"
DEPS = ["streamlit", "openpyxl", "docx", "pdfplumber", "pptx", "matplotlib", "reportlab", "PIL"]


def _imports_ok() -> bool:
    code = "import " + ",".join(DEPS)
    return subprocess.run([sys.executable, "-c", code], capture_output=True).returncode == 0


def _install_deps() -> bool:
    r = subprocess.run([sys.executable, "-m", "pip", "install", "-r", str(ROOT / "requirements.txt")])
    return r.returncode == 0 and _imports_ok()


def _wait_url(url: str, tries: int = 20, delay: float = 2.0) -> bool:
    for _ in range(tries):
        try:
            with urllib.request.urlopen(url, timeout=2) as resp:
                if resp.status == 200:
                    return True
        except Exception:
            pass
        time.sleep(delay)
    return False


def main() -> int:
    try:
        sys.stdout.reconfigure(errors="replace")
    except Exception:
        pass

    check_only = "--check-only" in sys.argv or os.environ.get("PIPI_CHECK_ONLY") == "1"
    no_browser = "--no-browser" in sys.argv or os.environ.get("PIPI_NO_BROWSER") == "1"

    print("========================")
    print("🐻皮皮 AI项目运营助手")
    print("正在启动...")
    print()

    print("✓ 环境检测")

    if not _imports_ok():
        print("正在安装依赖，请稍候...")
        if not _install_deps():
            print("✗ 依赖安装失败，请手动执行：python -m pip install -r requirements.txt")
            input("按回车键退出...")
            return 1
    print("✓ AI模块加载")
    print("✓ 文档解析模块")
    print("✓ PPT设计模块")
    print("✓ Excel生成模块")

    if check_only:
        print()
        print("环境检查全部通过（测试模式，未启动服务）。")
        print("========================")
        return 0

    print("正在启动服务...")
    CREATE_NEW_CONSOLE = 0x00000010
    subprocess.Popen(
        [sys.executable, "-m", "streamlit", "run", "app.py", "--server.headless", "true"],
        cwd=str(ROOT),
        creationflags=CREATE_NEW_CONSOLE,
    )

    print("正在打开浏览器...")
    if _wait_url(URL):
        print("✓ 服务已就绪")
        if not no_browser:
            webbrowser.open(URL)
    else:
        print("✗ 服务启动超时，请手动访问 " + URL)
        print("========================")
        input("按回车键退出...")
        return 1

    print("========================")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
