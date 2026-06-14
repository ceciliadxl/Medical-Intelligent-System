@echo off
echo ====================================
echo 启动医疗AI数据分析可视化系统
echo ====================================

echo.
echo 正在启动前端开发服务器...
start cmd /k "npm run dev"

timeout /t 3 /nobreak > nul

echo.
echo 前端服务已启动: http://localhost:3000
echo.
echo 可选：是否启动后端服务？(Y/N)
choice /C YN /T 10 /D N

if errorlevel 1 (
    echo.
    echo 正在启动后端服务...
    cd /d "%~dp0server"
    call npm install
    start cmd /k "node index.js"
    echo 后端服务已启动: http://localhost:8080
)

echo.
echo ====================================
echo 系统已就绪！
echo 前端地址: http://localhost:3000
echo 数据表格: http://localhost:3000/table
echo 可视化大屏: http://localhost:3000/dashboard
echo ====================================

pause
