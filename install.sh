#!/bin/bash

echo "===================================="
echo "医疗AI数据分析可视化系统"
echo "===================================="

echo ""
echo "[1/3] 安装前端依赖..."
npm install

echo ""
echo "[2/3] 安装后端依赖..."
cd server
npm install
cd ..

echo ""
echo "[3/3] 安装完成！"
echo ""
echo "===================================="
echo "启动方式："
echo "===================================="
echo ""
echo "启动前端："
echo "  npm run dev"
echo ""
echo "启动后端："
echo "  cd server && node index.js"
echo ""
echo "或使用一键启动："
echo "  ./start.sh"
echo ""
