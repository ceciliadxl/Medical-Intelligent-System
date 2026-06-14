-- 医疗数据分析系统数据库初始化脚本
-- 数据库：MySQL 8.x

-- 创建数据库
CREATE DATABASE IF NOT EXISTS medicalinfo 
  DEFAULT CHARACTER SET utf8mb4 
  COLLATE utf8mb4_0900_ai_ci;

USE medicalinfo;

-- ----------------------------
-- Table structure for cases
-- ----------------------------
DROP TABLE IF EXISTS `cases`;
CREATE TABLE `cases`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `age` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `time` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `docName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `docHospital` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `department` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `detailUrl` varchar(2555) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `height` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `weight` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `illDuration` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `allergy` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 346 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- 导入数据（使用Navicat导出的数据）
-- ----------------------------
-- 注意：完整的数据请使用Navicat或其他MySQL客户端导入
-- 这里提供简化版数据用于测试

INSERT INTO `cases` VALUES (1, '高血压', '女', '35', '01.09', '35岁，五月份发现高血压...', '李明洲', '北京医院', '心内科', 'https://www.haodf.com', '163', '63', '无', '无');
INSERT INTO `cases` VALUES (2, '高血压', '男', '68', '01.09', '吃高血压药 7-8年...', '关晖勇', '阳江市阳东区人民医院', '综合内科', 'https://www.haodf.com', '163', '79', '一月内', '无');
INSERT INTO `cases` VALUES (3, '高血压', '男', '58', '01.09', '血压不稳...', '张宸', '六安市中医院', '普通内科', 'https://www.haodf.com', '168', '69', '大于半年', '无');
INSERT INTO `cases` VALUES (4, '高血压', '女', '34', '01.09', '哺乳期血压有点高...', '李全祎', '南京脑科医院', '心血管内科', 'https://www.haodf.com', '174', '77', '一月内', '无');
INSERT INTO `cases` VALUES (5, '高血压', '女', '61', '01.09', '高血压，血压在150-190之间...', '隗永健', '佳木斯市中心医院', '综合内科', 'https://www.haodf.com', '166', '55', '一月内', '无');
INSERT INTO `cases` VALUES (6, '高血压', '男', '42', '01.09', '血压高...', '于英', '定西市人民医院', '心血管内科', 'https://www.haodf.com', '170', '98', '大于半年', '无');
INSERT INTO `cases` VALUES (7, '高血压', '男', '48', '01.09', '血压偏高...', '赵晨光', '天津医科大学总医院', '普通内科', 'https://www.haodf.com', '180', '80', '无', '无');
INSERT INTO `cases` VALUES (8, '高血压', '女', '38', '01.09', '健康评估...', '孔祥照', '广州医科大学附属中医医院', '急诊科', 'https://www.haodf.com', '158', '63', '半年内', '无');
INSERT INTO `cases` VALUES (9, '高血压', '女', '62', '01.09', '全身肿尿少...', '张明', '沧州市人民医院', '肾病内科', 'https://www.haodf.com', '160', '63', '大于半年', '青霉素过敏');
INSERT INTO `cases` VALUES (10, '高血压', '男', '44', '01.09', '原发高血压...', '于英', '定西市人民医院', '心血管内科', 'https://www.haodf.com', '169', '75', '大于半年', '无');

INSERT INTO `cases` VALUES (46, '感冒', '女', '32', '01.09', '感冒快10天...', '刘伟男', '六安市中医院', '呼吸内科', 'https://www.haodf.com', '163', '55', '一月内', '无');
INSERT INTO `cases` VALUES (47, '感冒', '女', '56', '01.09', '流鼻涕...', '张宸', '六安市中医院', '普通内科', 'https://www.haodf.com', '158', '55', '一周内', '无');
INSERT INTO `cases` VALUES (48, '感冒', '女', '34', '01.09', '感冒...', '张宸', '六安市中医院', '普通内科', 'https://www.haodf.com', '168', '57', '一周内', '无');
INSERT INTO `cases` VALUES (49, '感冒', '男', '32', '01.09', '感冒发烧...', '万玲玲', '九江市第五人民医院', '综合内科', 'https://www.haodf.com', '182', '67', '一周内', '无');

INSERT INTO `cases` VALUES (91, '骨折', '男', '34', '01.09', '右肘尺骨关节骨折...', '吕晓华', '西双版纳傣族自治州人民医院', '骨科', 'https://www.haodf.com', '187', '88', '一周内', '无');
INSERT INTO `cases` VALUES (92, '骨折', '女', '72', '01.09', '右髋关节损伤...', '刘恒', '北京大学第一医院', '骨科', 'https://www.haodf.com', '159', '52', '1日', '无');
INSERT INTO `cases` VALUES (93, '骨折', '男', '31', '01.09', '股骨粗隆间骨折...', '王利伟', '唐山市人民医院', '骨科', 'https://www.haodf.com', '180', '75', '一周内', '无');

INSERT INTO `cases` VALUES (136, '颈椎病', '男', '18', '01.09', '颈椎病，颈椎酸痛...', '黄晓东', '广州医科大学附属第一医院', '脊柱外科', 'https://www.haodf.com', '175', '87', '大于半年', '无');
INSERT INTO `cases` VALUES (137, '颈椎病', '女', '48', '01.09', '颈椎病术后复查...', '吴至武', '赣州市人民医院', '神经外科', 'https://www.haodf.com', '160', '62', '无', '无');
INSERT INTO `cases` VALUES (138, '颈椎病', '男', '60', '01.09', '颈椎病，肩胛骨处疼痛...', '王修灿', '安徽水建医院', '骨科', 'https://www.haodf.com', '179', '85', '一月内', '无');

INSERT INTO `cases` VALUES (181, '腰椎间盘突出', '男', '59', '01.09', '腰椎间盘突出...', '吕晓华', '西双版纳傣族自治州人民医院', '骨科', 'https://www.haodf.com', '165', '60', '一月内', '无');
INSERT INTO `cases` VALUES (182, '腰椎间盘突出', '男', '21', '01.09', '腰四五突出...', '黄晓东', '广州医科大学附属第一医院', '脊柱外科', 'https://www.haodf.com', '183', '75', '半年内', '无');
INSERT INTO `cases` VALUES (183, '腰椎间盘突出', '女', '60', '01.09', '用药询问...', '肖建生', '南昌大学第一附属医院', '普外科', 'https://www.haodf.com', '155', '59', '一周内', '无');

INSERT INTO `cases` VALUES (226, '胃炎', '女', '65', '01.09', '近半月胃不适...', '刘希双', '青岛大学附属医院', '消化内科', 'https://www.haodf.com', '167', '53', '无', '无');
INSERT INTO `cases` VALUES (227, '胃炎', '男', '57', '01.09', '急性出血糜烂性胃炎...', '胡耀祥', '临沂市妇幼保健院', '内科', 'https://www.haodf.com', '180', '75', '大于半年', '无');
INSERT INTO `cases` VALUES (228, '胃炎', '女', '30', '01.09', '间断发作性左上腹隐痛...', '陈礼平', '陆军八十二集团军医院', '消化内科', 'https://www.haodf.com', '158', '51', '无', '无');

INSERT INTO `cases` VALUES (271, '抑郁症', '女', '55', '01.09', '抑郁症吃药后一直做梦...', '吕钦谕', '上海市精神卫生中心', '精神科', 'https://www.haodf.com', '160', '51', '无', '无');
INSERT INTO `cases` VALUES (272, '抑郁症', '女', '35', '01.09', '药物可否一起服用...', '张宸', '六安市中医院', '普通内科', 'https://www.haodf.com', '170', '64', '一周内', '无');
INSERT INTO `cases` VALUES (273, '抑郁症', '男', '26', '01.09', '抑郁症...', '王锦蓉', '河西学院附属张掖人民医院', '心理咨询科', 'https://www.haodf.com', '175', '72', '半年内', '无');

-- ----------------------------
-- Table structure for appointment
-- ----------------------------
DROP TABLE IF EXISTS `appointment`;
CREATE TABLE `appointment`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id_card` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `department` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `time` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `doctor_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- 初始化完成
-- ----------------------------
SELECT '数据库初始化完成！' AS message;
SELECT COUNT(*) AS cases_count FROM cases;
