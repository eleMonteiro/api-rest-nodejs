import { Op } from "sequelize";
import fiql from "fiql-parser";
import { logger } from "../config/logger.js";

const { parse } = fiql;

export const fiqlToSequelize = (query) => {
  if (!query) return {};

  try {
    const node = parse(query);

    if (!node) return {};

    if (node.type === "CONSTRAINT") {
      const { selector, comparison, argument } = node;
      return convertComparison(selector, comparison, argument);
    }

    if (node.type === "comparison") {
      const { selector, operator, arguments: args } = node;
      return convertComparison(selector, operator, args[0]);
    }

    if (node.type === "logical") {
      const left = fiqlToSequelize(node.left);
      const right = fiqlToSequelize(node.right);

      if (node.operator === ";") {
        return { [Op.and]: [left, right] };
      } else if (node.operator === ",") {
        return { [Op.or]: [left, right] };
      }
    }
  } catch (error) {
    logger.error("Erro ao processar a consulta FIQL:", error);
  }

  return {};
};

const convertComparison = (selector, operator, arg) => {
  switch (operator) {
    case "==":
      return { [selector]: arg };
    case "!=":
      return { [selector]: { [Op.ne]: arg } };
    case "=lt=":
      return { [selector]: { [Op.lt]: parseFloat(arg) } };
    case "=le=":
      return { [selector]: { [Op.lte]: parseFloat(arg) } };
    case "=gt=":
      return { [selector]: { [Op.gt]: parseFloat(arg) } };
    case "=ge=":
      return { [selector]: { [Op.gte]: parseFloat(arg) } };
    case "=in=":
      return {
        [selector]: {
          [Op.in]: arg.replace(/^\(|\)$/g, "").split(","),
        },
      };
    case "=like=":
      return {
        [selector]: {
          [Op.like]: `%${arg}%`,
        },
      };
    default:
      logger.error(`Operador FIQL não suportado: ${operator}`);
  }
};
