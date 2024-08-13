import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { userRoutes } from '../routes/usersRoutes.mjs';
import { authenticationsRouter } from '../routes/authenticationsRoutes.mjs';
import { errorMidlleware } from '../middleware/errorMidlleware.mjs';
import { departmentsRouter } from '../routes/departmentsRoutes.mjs';
import { positionsRouter } from '../routes/positionsRoutes.mjs';
import { employeeRouter } from '../routes/employeesRoutes.mjs';
import { attendRouter } from '../routes/attendancesRoutes.mjs';

export const web = express();
web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(morgan('dev'));
web.use(cors());
web.use(helmet());

web.use('/api/v1', userRoutes);
web.use('/api/v1', authenticationsRouter);
web.use('/api/v1', departmentsRouter);
web.use('/api/v1', positionsRouter);
web.use('/api/v1', employeeRouter);
web.use('/api/v1', attendRouter);

web.use(errorMidlleware);
