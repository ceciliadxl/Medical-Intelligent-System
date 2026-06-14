#!/bin/bash

echo "===================================="
echo "启动医疗AI数据分析可视化系统"
echo "===================================="

echo ""
echo "正在启动前端开发服务器..."
npm run dev &
FRONTEND_PID=$!

sleep 3

echo ""
echo "前端服务已启动: http://localhost:3000"
echo ""

read -p "是否启动后端服务？(y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "正在启动后端服务..."
    cd server && node index.js &
    BACKEND_PID=$!
    echo "后端服务已启动: http://localhost:8080"
fi

echo ""
echo "===================================="
echo "系统已就绪！"
echo "===================================="
echo ""
echo "前端地址: http://localhost:3000"
echo "数据表格: http://localhost:3000/table"
echo "可视化大屏: http://localhost:3000/dashboard"
echo ""
echo "按 Ctrl+C 停止服务"
echo "===================================="
