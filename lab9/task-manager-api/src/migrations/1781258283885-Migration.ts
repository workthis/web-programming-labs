import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1781258283885 implements MigrationInterface {
    name = 'Migration1781258283885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "description" text, "status" character varying NOT NULL DEFAULT 'pending', "priority" character varying NOT NULL DEFAULT 'medium', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks_tags_tags" ("tasksId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_e2c842b1d58e16e3e4ab1b8cbba" PRIMARY KEY ("tasksId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_791bc3e522e77386d2186ec760" ON "tasks_tags_tags" ("tasksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8f2ff7a27728781da1a1f944f7" ON "tasks_tags_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "tasks_tags_tags" ADD CONSTRAINT "FK_791bc3e522e77386d2186ec7604" FOREIGN KEY ("tasksId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tasks_tags_tags" ADD CONSTRAINT "FK_8f2ff7a27728781da1a1f944f78" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_tags_tags" DROP CONSTRAINT "FK_8f2ff7a27728781da1a1f944f78"`);
        await queryRunner.query(`ALTER TABLE "tasks_tags_tags" DROP CONSTRAINT "FK_791bc3e522e77386d2186ec7604"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8f2ff7a27728781da1a1f944f7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_791bc3e522e77386d2186ec760"`);
        await queryRunner.query(`DROP TABLE "tasks_tags_tags"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
