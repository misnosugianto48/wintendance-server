-- CreateEnum
CREATE TYPE "JOB_TYPE" AS ENUM ('FULLTIME', 'PARTTIME', 'CONTRACT', 'INTERN');

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "fullname" TEXT NOT NULL,
    "NIP" TEXT NOT NULL,
    "position_id" INTEGER NOT NULL,
    "employee_picture" TEXT NOT NULL,
    "job_type" "JOB_TYPE" NOT NULL DEFAULT 'FULLTIME',
    "hire_date" TIMESTAMP(3) NOT NULL,
    "annual_leave_amount" INTEGER NOT NULL DEFAULT 12,
    "amount_of_leave_used" INTEGER,
    "leave_balance" INTEGER,
    "creted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_user_id_key" ON "employees"("user_id");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
