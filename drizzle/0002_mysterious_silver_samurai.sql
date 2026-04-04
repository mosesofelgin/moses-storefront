CREATE TABLE `downloads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`downloadToken` varchar(255) NOT NULL,
	`customerEmail` varchar(320) NOT NULL,
	`expiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `downloads_id` PRIMARY KEY(`id`),
	CONSTRAINT `downloads_downloadToken_unique` UNIQUE(`downloadToken`)
);
