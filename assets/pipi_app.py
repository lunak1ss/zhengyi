# -*- coding: utf-8 -*-
"""皮皮 AI 项目运营助手 —— Windows 桌面应用入口（PyInstaller 打包）。

功能：启动内置 Streamlit 服务并自动打开浏览器进入皮皮界面。
运行方式：
    python pipi_app.py              # 开发调试
    dist/🐻皮皮 AI项目运营助手.exe    # 打包后双击
"""
from __future__ import annotations

import os
import sys
from pathlib import Path


def _code_dir() -> Path:
    if getattr(sys, "frozen", False):
        return Path(getattr(sys, "_MEIPASS", Path(sys.executable).resolve().parent))
    return Path(__file__).resolve().parent


def main() -> int:
    try:
        sys.stdout.reconfigure(errors="replace")
    except Exception:
        pass

    code_dir = _code_dir()
    os.chdir(str(code_dir))
    sys.path.insert(0, str(code_dir))

    no_browser = os.environ.get("PIPI_NO_BROWSER") == "1" or "--no-browser" in sys.argv
    port = os.environ.get("PIPI_PORT", "8501")

    print("========================")
    print("🐻皮皮 AI项目运营助手")
    print("正在启动服务...")
    print("========================")

    app_path = str(code_dir / "app.py")
    # 冻结（PyInstaller）环境下 Streamlit 会误判为开发模式，导致 --server.port 冲突
    os.environ["STREAMLIT_GLOBAL_DEVELOPMENT_MODE"] = "false"
    sys.argv = [
        "streamlit",
        "run",
        app_path,
        "--server.headless",
        "true" if no_browser else "false",
        "--server.port",
        port,
        "--browser.gatherUsageStats",
        "false",
    ]
    from streamlit.web import cli as stcli

    try:
        stcli.main()
    except SystemExit:
        pass
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
