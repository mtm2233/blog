/*
 Navicat Premium Data Transfer

 Source Server         : isdream
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : 192.144.210.183:3306
 Source Schema         : mblog

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 06/11/2021 21:29:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '管理员' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for album
-- ----------------------------
DROP TABLE IF EXISTS `album`;
CREATE TABLE `album`  (
  `albumId` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标题',
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '描述',
  `imgSrc` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '封面',
  `addTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `clicks` int(0) NOT NULL DEFAULT 0 COMMENT '点击数',
  PRIMARY KEY (`albumId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '相册' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `artId` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `email` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '2541817610@qq.com' COMMENT '发布人',
  `typeId` int(0) NOT NULL COMMENT '内容分类id(外键)',
  `title` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标题',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '内容',
  `imgSrc` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '封面',
  `addTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '发布时间',
  `clicks` int(0) NOT NULL DEFAULT 0 COMMENT '点击数',
  `replys` int(0) NOT NULL DEFAULT 0 COMMENT '评论数',
  `tags` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '标签',
  `isReply` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否可以评论',
  `carousel` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否轮播显示',
  `isDisplay` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否在文章页显示',
  `carImg` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '轮播图',
  PRIMARY KEY (`artId`) USING BTREE,
  INDEX `typeId`(`typeId`) USING BTREE,
  INDEX `email`(`email`) USING BTREE,
  CONSTRAINT `article_ibfk_2` FOREIGN KEY (`typeId`) REFERENCES `type` (`typeId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `article_ibfk_3` FOREIGN KEY (`email`) REFERENCES `user` (`email`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2086 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '文章' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for friend
-- ----------------------------
DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend`  (
  `friendId` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `urlTypeId` int(0) NOT NULL COMMENT '友链分类(外键)',
  `url` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '链接url',
  `icon` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '图标',
  `name` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '名称',
  `descript` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '网站描述',
  `display` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否显示',
  `addtime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '添加时间',
  PRIMARY KEY (`friendId`) USING BTREE,
  INDEX `urlTypeId`(`urlTypeId`) USING BTREE,
  CONSTRAINT `friend_ibfk_1` FOREIGN KEY (`urlTypeId`) REFERENCES `urltype` (`urlTypeId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '友链' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for nav
-- ----------------------------
DROP TABLE IF EXISTS `nav`;
CREATE TABLE `nav`  (
  `navId` int(0) NOT NULL AUTO_INCREMENT COMMENT '导航id',
  `name` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '导航名称',
  `path` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '导航路由',
  `is_show` enum('0','1') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`navId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '导航内容表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for pictures
-- ----------------------------
DROP TABLE IF EXISTS `pictures`;
CREATE TABLE `pictures`  (
  `imgId` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `albumId` int(0) NOT NULL COMMENT '外键',
  `imgSrc` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '图片',
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标题',
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '描述',
  `addtime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '添加时间',
  PRIMARY KEY (`imgId`) USING BTREE,
  INDEX `albumId`(`albumId`) USING BTREE,
  CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`albumId`) REFERENCES `album` (`albumId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '图片' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for reply
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply`  (
  `replyId` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `email` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评论用户',
  `content` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '回复内容',
  `artId` int(0) NOT NULL COMMENT '回复的文章id',
  `parentId` int(0) NOT NULL DEFAULT 0 COMMENT '回复人id',
  `replyTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '回复时间',
  `display` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否显示',
  PRIMARY KEY (`replyId`) USING BTREE,
  INDEX `artId`(`artId`) USING BTREE,
  INDEX `email`(`email`) USING BTREE,
  CONSTRAINT `reply_ibfk_3` FOREIGN KEY (`artId`) REFERENCES `article` (`artId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `reply_ibfk_4` FOREIGN KEY (`email`) REFERENCES `user` (`email`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '评论表' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for reward
-- ----------------------------
DROP TABLE IF EXISTS `reward`;
CREATE TABLE `reward`  (
  `reId` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '不知名的热心网友' COMMENT '赞助人',
  `reTime` varchar(35) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '赞助时间',
  `money` int(0) NOT NULL COMMENT '赞助金额',
  `message` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '留言',
  `source` enum('支付宝','微信') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '支付宝' COMMENT '来源',
  PRIMARY KEY (`reId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '赞助' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags`  (
  `tagId` int(0) NOT NULL AUTO_INCREMENT COMMENT '标签id',
  `tagName` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标签名',
  `addtime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '添加时间',
  PRIMARY KEY (`tagId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 221 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type`  (
  `typeId` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类名称',
  `parentId` int(0) NULL DEFAULT 0 COMMENT '父分类id',
  `path` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '路由',
  PRIMARY KEY (`typeId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 55 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '内容分类' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for urltype
-- ----------------------------
DROP TABLE IF EXISTS `urltype`;
CREATE TABLE `urltype`  (
  `urlTypeId` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `typeName` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类名称',
  PRIMARY KEY (`urlTypeId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '友链分类' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `email` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '邮箱',
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '昵称',
  `imgSrc` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `qq` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'qq',
  `webSite` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '网址',
  `addTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `title` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '称号',
  `supp` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '称号补充',
  PRIMARY KEY (`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户表' ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
