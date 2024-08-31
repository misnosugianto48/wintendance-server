-- CreateEnum
CREATE TYPE "ATTENDANCE_STATUS" AS ENUM ('PRESENT', 'ABSENT', 'EARLY', 'PERMISSION', 'TOO_LATE');

-- CreateEnum
CREATE TYPE "WORK_TYPE" AS ENUM ('OFFICE', 'HOME');

-- CreateTable
CREATE TABLE "attendances" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "check_in" TIMESTAMP(3) NOT NULL,
    "check_out" TIMESTAMP(3),
    "attendance_status" "ATTENDANCE_STATUS" NOT NULL DEFAULT 'ABSENT',
    "attendance_description" TEXT,
    "work_type" "WORK_TYPE",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attendances_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
