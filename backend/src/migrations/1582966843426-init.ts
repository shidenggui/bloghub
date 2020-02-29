import {MigrationInterface, QueryRunner} from "typeorm";

export class init1582966843426 implements MigrationInterface {
    name = 'init1582966843426'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `blog_table` (`id` int NOT NULL AUTO_INCREMENT, `author` varchar(255) NOT NULL, `site` varchar(255) NOT NULL, `stableSite` varchar(255) NOT NULL, `siteName` varchar(255) NOT NULL, `feed` varchar(512) NOT NULL, `stableFeed` varchar(512) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `article_table` (`id` int NOT NULL AUTO_INCREMENT, `url` varchar(512) NOT NULL, `slug` varchar(512) NOT NULL, `stableUrl` varchar(512) NOT NULL, `title` varchar(512) NOT NULL, `tags` varchar(512) NOT NULL, `summary` longtext NOT NULL, `content` longtext NOT NULL, `date` datetime NOT NULL, `views` int NOT NULL DEFAULT 0, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `blogId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `article_table` ADD CONSTRAINT `FK_e2c1e79207463c012ad8dd9dd57` FOREIGN KEY (`blogId`) REFERENCES `blog_table`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `article_table` DROP FOREIGN KEY `FK_e2c1e79207463c012ad8dd9dd57`", undefined);
        await queryRunner.query("DROP TABLE `article_table`", undefined);
        await queryRunner.query("DROP TABLE `blog_table`", undefined);
    }

}
