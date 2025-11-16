@echo off
echo Importing database schema to Railway MySQL...
echo.

mysql -h metro.proxy.rlwy.net -P 10312 -u root -pnZwcvxymZyCbAFQzcTmeMPTtFGSCvrzJ railway < schema.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Success! Database schema imported successfully.
    echo.
    echo You can now verify by running: mysql -h metro.proxy.rlwy.net -P 10312 -u root -pnZwcvxymZyCbAFQzcTmeMPTtFGSCvrzJ railway -e "SHOW TABLES;"
) else (
    echo.
    echo Error: Failed to import schema. Please check your MySQL installation.
)

pause
