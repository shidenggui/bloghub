import {MigrationInterface, QueryRunner} from "typeorm";

export class addIgnoreForBlog1585201284084 implements MigrationInterface {
    name = 'addIgnoreForBlog1585201284084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `blog_table` ADD `ignore` tinyint NOT NULL DEFAULT 0", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `blog_table` DROP COLUMN `ignore`", undefined);
    }

}
