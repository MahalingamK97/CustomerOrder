import { MigrationInterface, QueryRunner } from "typeorm";

export class AllEntity1734460674980 implements MigrationInterface {
    name = 'AllEntity1734460674980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("customerId" text NOT NULL, "customerName" character varying NOT NULL, "customerEmail" character varying NOT NULL, "customerAddress" character varying NOT NULL, CONSTRAINT "PK_71302d30c27acbf513b3d74f81c" PRIMARY KEY ("customerId"))`);
        await queryRunner.query(`CREATE TABLE "order" ("orderId" text NOT NULL, "region" character varying NOT NULL, "dateOfSale" date NOT NULL, "quantitySold" numeric NOT NULL, "discount" numeric NOT NULL, "shippingCost" numeric NOT NULL, "paymentMethod" character varying NOT NULL, "customerId" character varying NOT NULL, "productId" character varying NOT NULL, "customerCustomerId" text, "productProductId" text, CONSTRAINT "PK_b075313d4d7e1c12f1a6e6359e8" PRIMARY KEY ("orderId"))`);
        await queryRunner.query(`CREATE TABLE "product" ("productId" text NOT NULL, "productName" character varying NOT NULL, "category" character varying NOT NULL, "unitPrice" numeric NOT NULL, CONSTRAINT "PK_429540a50a9f1fbf87efd047f35" PRIMARY KEY ("productId"))`);
        await queryRunner.query(`CREATE TYPE "public"."upload-history_status_enum" AS ENUM('Pending', 'Success', 'Failed')`);
        await queryRunner.query(`CREATE TABLE "upload-history" ("id" SERIAL NOT NULL, "uploadedDate" TIMESTAMP WITH TIME ZONE NOT NULL, "filePath" character varying NOT NULL, "status" "public"."upload-history_status_enum" NOT NULL, "comment" character varying NOT NULL, CONSTRAINT "PK_d2023fa6a2e04c214e8eaa051d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_39db5324a2b0834d6b4585c872b" FOREIGN KEY ("customerCustomerId") REFERENCES "customer"("customerId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_6eef7dc59686bd91c22c53660ee" FOREIGN KEY ("productProductId") REFERENCES "product"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_6eef7dc59686bd91c22c53660ee"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_39db5324a2b0834d6b4585c872b"`);
        await queryRunner.query(`DROP TABLE "upload-history"`);
        await queryRunner.query(`DROP TYPE "public"."upload-history_status_enum"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
