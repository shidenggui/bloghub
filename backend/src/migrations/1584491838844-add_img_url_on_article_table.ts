import {MigrationInterface, QueryRunner} from "typeorm";

export class addImgUrlOnArticleTable1584491838844 implements MigrationInterface {
    name = 'addImgUrlOnArticleTable1584491838844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `article_table` ADD `imgUrl` varchar(2048) NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `article_table` DROP COLUMN `imgUrl`", undefined);
    }

}
