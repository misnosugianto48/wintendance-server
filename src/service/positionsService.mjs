import positionsValidator from "../validator/positionsValidator.mjs";
import { validate } from "../validator/validate.mjs";
import { primaClient } from "../apps/database.mjs";
import { NotFoundError } from "../exceptions/NotFoundError.mjs";

const addPositions = async (payload) => {
  const position = validate(positionsValidator.addPositionsValidator, payload);

  const newPosition = {
    position_name: position.positionName,
    position_description: position.positionDescription,
    department_id: position.departmentId,
  };

  return await primaClient.position.create({
    data: newPosition,
    select: {
      id: true,
    },
  });
};

const getPositions = async () => {
  const positions = await primaClient.position.findMany({
    select: {
      id: true,
      position_name: true,
      position_description: true,
      department_id: true,
      department: {
        select: {
          department_name: true,
        },
      },
      created_at: true,
      updated_at: true,
    },
  });

  return positions.map((position) => ({
    id: position.id,
    positionName: position.position_name,
    positionDescription: position.position_description,
    departmentId: position.department_id,
    departmentName: position.department.department_name,
    createdAt: position.created_at,
    updatedAt: position.updated_at,
  }));
};

const getPositionById = async (positionId) => {
  const position = await primaClient.position.findUnique({
    where: {
      id: positionId,
    },
    select: {
      id: true,
      position_name: true,
      position_description: true,
      department_id: true,
      department: {
        select: {
          department_name: true,
        },
      },
      created_at: true,
      updated_at: true,
    },
  });

  if (!position) {
    throw new NotFoundError("postition not found");
  }

  return {
    id: position.id,
    positionName: position.position_name,
    positionDescription: position.position_description,
    departmentId: position.department_id,
    departmentName: position.department.department_name,
    createdAt: position.created_at,
    updatedAt: position.updated_at,
  };
};

const editPositionById = async (positionId, payload) => {
  const position = validate(positionsValidator.editPositionsValidator, payload);

  const positionCount = await primaClient.position.findUnique({
    where: {
      id: positionId,
    },
  });

  if (!positionCount) {
    throw new NotFoundError("position not found");
  }

  const data = {};

  if (position.positionName) {
    data.position_name = position.positionName;
  }

  if (position.positionDescription) {
    data.position_description = position.positionDescription;
  }

  if (position.departmentId) {
    data.department_id = position.departmentId;
  }

  return await primaClient.position.update({
    where: {
      id: positionId,
    },
    data: data,
    select: {
      id: true,
    },
  });
};

const deletePositionById = async (positionId) => {
  const position = await primaClient.position.findUnique({
    where: {
      id: positionId,
    },
  });

  if (!position) {
    throw new NotFoundError("position not found");
  }

  return await primaClient.position.delete({
    where: {
      id: positionId,
    },
  });
};

export default {
  addPositions,
  getPositions,
  getPositionById,
  editPositionById,
  deletePositionById,
};
