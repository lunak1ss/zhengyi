# ===== 皮皮 AI 项目运营助手 · 云端镜像 =====
FROM python:3.10-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1 \
    PIPI_DATA_DIR=/app/storage/data \
    PIPI_OUTPUT_DIR=/app/storage/outputs \
    PIPI_STORAGE_DIR=/app/storage

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8501 8000

# 默认启动 Web 界面（Streamlit）；API 服务：uvicorn api.main:app --host 0.0.0.0 --port 8000
CMD ["streamlit", "run", "app.py", "--server.address", "0.0.0.0", "--server.port", "8501", "--browser.gatherUsageStats", "false"]
