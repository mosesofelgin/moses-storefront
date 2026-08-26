CREATE TABLE `analytics_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`visitorId` varchar(64) NOT NULL,
	`path` varchar(512) NOT NULL,
	`referrer` varchar(255) NOT NULL DEFAULT 'direct',
	`campaignSource` varchar(128),
	`campaignMedium` varchar(128),
	`campaignName` varchar(128),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `analytics_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `analytics_events_created_at_idx` ON `analytics_events` (`createdAt`);--> statement-breakpoint
CREATE INDEX `analytics_events_visitor_created_idx` ON `analytics_events` (`visitorId`,`createdAt`);