@echo off

REM Initialize Go module
go mod init github.com/jiepengwong/Lift-Bros-HEAP

REM Install dependencies
go get github.com/gofiber/fiber/v2
go get gorm.io/gorm
go get gorm.io/driver/mysql