# -*- coding: utf-8 -*-
"""生成皮皮应用图标：熊猫/熊头像风格（PIL 绘制），输出 pipi_icon.ico 与预览 PNG。"""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent


def draw_bear(size: int = 512) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    s = size / 512.0

    def E(box, fill):
        d.ellipse([box[0] * s, box[1] * s, box[2] * s, box[3] * s], fill=fill)

    # 耳朵（黑）+ 内耳（浅粉紫）
    E((78, 62, 218, 202), (40, 36, 46, 255))
    E((294, 62, 434, 202), (40, 36, 46, 255))
    E((118, 104, 190, 176), (242, 198, 214, 255))
    E((322, 104, 394, 176), (242, 198, 214, 255))

    # 脸（白色）
    E((96, 120, 416, 460), (250, 250, 252, 255))

    # 眼部黑斑
    E((128, 220, 244, 330), (40, 36, 46, 255))
    E((268, 220, 384, 330), (40, 36, 46, 255))
    # 眼睛
    E((168, 244, 220, 296), (255, 255, 255, 255))
    E((292, 244, 344, 296), (255, 255, 255, 255))
    # 瞳孔
    E((186, 258, 206, 278), (40, 36, 46, 255))
    E((306, 258, 326, 278), (40, 36, 46, 255))

    # 鼻子（品牌紫）
    E((232, 348, 280, 384), (155, 107, 207, 255))
    # 微笑
    d.arc([200 * s, 360 * s, 312 * s, 430 * s], start=20, end=160, fill=(80, 70, 100, 255), width=int(10 * s))

    # 蝴蝶结（粉紫）
    d.polygon([(256 * s, 430 * s), (216 * s, 452 * s), (256 * s, 452 * s)], fill=(226, 91, 154, 255))
    d.polygon([(256 * s, 430 * s), (296 * s, 452 * s), (256 * s, 452 * s)], fill=(226, 91, 154, 255))
    E((246, 436, 266, 460), (155, 107, 207, 255))
    return img


def main() -> int:
    try:
        sys.stdout.reconfigure(errors="replace")
    except Exception:
        pass
    icon = draw_bear(512)
    icon.save(ROOT / "pipi_icon.png")
    icon.save(
        ROOT / "pipi_icon.ico",
        sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
    )
    print("[OK] 已生成：", ROOT / "pipi_icon.ico")
    print("[OK] 已生成：", ROOT / "pipi_icon.png")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
