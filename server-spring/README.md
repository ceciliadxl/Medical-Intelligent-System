# Spring Boot 后端服务

## 目录结构
```
server-spring/
├── src/main/java/com/medical/
│   ├── MedicalApplication.java
│   ├── controller/
│   │   └── CasesController.java
│   ├── service/
│   │   └── CasesService.java
│   ├── entity/
│   │   └── Cases.java
│   └── mapper/
│       └── CasesMapper.java
├── src/main/resources/
│   └── application.yml
└── pom.xml
```

## 配置数据库连接
在 application.yml 中修改数据库配置：
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/medicalinfo
    username: root
    password: your_password
```

## 启动
```bash
mvn spring-boot:run
```
