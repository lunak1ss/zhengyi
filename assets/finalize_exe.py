# -*- coding: utf-8 -*-
"""把 dist/PipiAssistant.exe 重命名为「皮皮AI助手.exe」（兼容降级）。"""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "dist" / "PipiAssistant.exe"


def main() -> int:
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    if not SRC.exists():
        print("[FAIL] 未找到 dist/PipiAssistant.exe，请先运行 build_exe.bat 完成打包。")
        return 1
    targets = [
        ROOT / "dist" / "皮皮AI助手.exe",
        ROOT / "dist" / "🐻皮皮 AI项目运营助手.exe",
        ROOT / "dist" / "皮皮 AI项目运营助手.exe",
    ]
    for target in targets:
        try:
            SRC.replace(target)
            print("[OK] EXE 已生成：", target)
            return 0
        except OSError as exc:
            print("重命名为", target.name, "失败（", exc, "），尝试降级名称...")
    print("[FAIL] 命名失败，请手动重命名 dist/PipiAssistant.exe")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
