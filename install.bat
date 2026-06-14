@echo off
echo ================================
echo 医疗AI数据分析可视化系统
echo ================================

echo.
echo [1/2] 正在安装前端依赖...
cd /d "%~dp0"
call npm install

echo.
echo [2/2] 安装完成！
echo.
echo 启动开发服务器...
echo npm run dev
echo.
echo 或者启动后端服务...
echo cd server && npm install && node index.js
echo.

pause
