-- CreateEnum
CREATE TYPE "REQUEST_STATUS" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "leave_requests" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "leave_start_date" TIMESTAMP(3) NOT NULL,
    "leave_end_date" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "request_status" "REQUEST_STATUS" NOT NULL DEFAULT 'PENDING',
    "number_of_days_leave" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leave_requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "leave_requests" ADD CONSTRAINT "leave_requests_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
