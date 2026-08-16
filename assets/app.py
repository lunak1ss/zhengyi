# -*- coding: utf-8 -*-
"""皮皮（项目运营助手）——Streamlit Web 界面（框架层）。

启动方式：streamlit run app.py

app.py 只负责：
- 页面框架 / 导航 / 状态 / 启动日志
- 按点击懒加载页面模块（modules/ 包）
所有业务页面都在 modules/ 中，各模块内部再按需懒加载重依赖。
"""
from __future__ import annotations

import time
from pathlib import Path

import streamlit as st

from ops_agent.config import AI_MODE
from modules import run_page
from modules.ui import _module_available, _ppt_css
from utils.logger import setup_logger


st.set_page_config(page_title="皮皮（项目运营助手）", page_icon="🐻", layout="wide")


def main() -> None:
    t_start = time.perf_counter()
    setup_logger()
    # 全局主题：统一加载 assets/theme.css（不要逐页重复 CSS）
    theme_css = Path(__file__).resolve().parent / "assets" / "theme.css"
    if theme_css.exists():
        st.markdown(
            f"<style>{theme_css.read_text(encoding='utf-8')}</style>",
            unsafe_allow_html=True,
        )
    st.markdown(_ppt_css(), unsafe_allow_html=True)

    # 新用户引导：首次启动显示欢迎页（磁盘标记 + session_state，重启不重复打扰）
    from modules.onboarding import is_onboarded, render_welcome_page

    if not is_onboarded():
        render_welcome_page()
        return

    # 启动日志：只做可导入性检查（find_spec 毫秒级），不加载模块、不检测 COM/浏览器
    if "pipi_booted" not in st.session_state:
        steps = [
            ("UI加载", ["streamlit", "pandas", "altair"]),
            ("项目模块加载", ["ops_agent"]),
            ("AI模块加载", ["ops_agent"]),
            ("Office模块加载", ["office_agent"]),
            ("Canva模块加载", ["playwright"]),
        ]
        # 注意：只用顶层包名做 find_spec 可导入性检查，
        # 不会导入任何子模块，也不会触发 COM / 浏览器 / WPS 检测。
        log_lines = ["系统加载："]
        for name, mods in steps:
            s = time.perf_counter()
            ok = all(_module_available(m) for m in mods)
            log_lines.append(f"{'✅' if ok else '⚠️'} {name}：{time.perf_counter() - s:.3f}s")
        total = time.perf_counter() - t_start
        st.session_state["pipi_booted"] = True
        st.session_state["boot_log"] = log_lines + [f"总耗时：{total:.2f}s"]
        with st.expander("🚀 启动日志（系统加载）", expanded=True):
            for ln in log_lines:
                st.markdown(ln)
            st.markdown(f"总耗时：{total:.2f}s（仅可导入性检查，不加载模块、不检测 COM/浏览器）")

    NAV_OPTIONS = ["🏠 首页", "📁 我的项目", "💬 AI助手", "📊 工作报告", "📂 文件中心", "⚙ 设置"]
    nav_state = st.session_state.get("pipi_nav", "🏠 首页")
    with st.sidebar:
        st.markdown(
            '<div style="font-weight:900;font-size:1.25rem;color:#1F2430;margin-bottom:2px;">🐻 皮皮 AI</div>'
            '<div style="font-size:.78rem;color:#4B5563;margin-bottom:8px;">你的 AI 项目工作空间</div>',
            unsafe_allow_html=True,
        )
        from modules.chat import render_sidebar_history

        render_sidebar_history()
        st.markdown("---")
        st.markdown("**功能入口**")
        nav_idx = NAV_OPTIONS.index(nav_state) if nav_state in NAV_OPTIONS else 0
        radio_val = st.radio(
            "导航",
            NAV_OPTIONS,
            index=nav_idx,
            key="nav",
            label_visibility="collapsed",
        )
        # 检测用户点击侧边栏 radio（widget 值变化 → 更新持久导航）
        last_radio = st.session_state.get("pipi_last_radio")
        if last_radio is not None and radio_val != last_radio:
            st.session_state["pipi_nav"] = radio_val
        st.session_state["pipi_last_radio"] = radio_val
        demo_mode = st.toggle(
            "🖥️ 演示模式",
            value=False,
            key="demo_mode",
            help="用于产品展示：隐藏开发信息，一键演示完整 AI 流程",
        )
        with st.expander("🧰 更多功能", expanded=False):
            if st.button("🤖 AI 顾问（执行中心）", key="sb_ai_advisor", use_container_width=True):
                st.session_state["nav_target"] = "AI顾问"
                st.rerun()
            if st.button("🎨 AI设计", key="sb_ai_design", use_container_width=True):
                st.session_state["nav_target"] = "AI设计"
                st.rerun()
            if st.button("📂 文档中心", key="sb_docs", use_container_width=True):
                st.session_state["nav_target"] = "文档中心"
                st.rerun()
            if st.button("❓ 使用手册", key="sb_guide", use_container_width=True):
                st.session_state["nav_target"] = "❓ 使用手册"
                st.rerun()
        if demo_mode:
            st.markdown('<div class="demo-badge">🖥️ 演示模式：AI 引擎已就绪（开发信息已隐藏）</div>',
                        unsafe_allow_html=True)
        ai_mode = st.session_state.get("ai_mode", bool(AI_MODE))

    nav_target = st.session_state.pop("nav_target", None)
    if nav_target:
        st.session_state["pipi_nav"] = nav_target
    nav = st.session_state.get("pipi_nav", "🏠 首页")
    with st.spinner("正在加载皮皮..."):
        run_page(nav, ai_mode)


if __name__ == "__main__":
    main()
