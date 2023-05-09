-- nodeapp.`role` definition

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `label` varchar(10) NOT NULL,
  `router` varchar(100) DEFAULT NULL,
  UNIQUE KEY `role_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- nodeapp.role_router_users definition

CREATE TABLE `role_router_users` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `router` varchar(100) NOT NULL,
  `id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_router_users_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- nodeapp.router definition

CREATE TABLE `router` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET latin1 NOT NULL,
  `parentId` int(11) NOT NULL,
  `path` varchar(30) CHARACTER SET latin1 NOT NULL,
  `sort` varchar(11) DEFAULT NULL,
  `redirect` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  `title` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `title2` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `icon` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `hidden` tinyint(1) DEFAULT '0',
  `isEdit` tinyint(1) DEFAULT '0',
  `keepAlive` tinyint(1) DEFAULT '0',
  `parentRoute` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `component` varchar(20) CHARACTER SET latin1 NOT NULL,
  `disable` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=gbk;


-- nodeapp.users definition

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `email` varchar(30) CHARACTER SET greek DEFAULT NULL,
  `phone` varchar(11) CHARACTER SET greek DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `last_update_time` varchar(13) CHARACTER SET greek DEFAULT NULL,
  `last_login_time` varchar(13) CHARACTER SET greek DEFAULT NULL,
  `avatar` varchar(50) CHARACTER SET greek DEFAULT NULL,
  `password` varchar(100) CHARACTER SET greek DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;