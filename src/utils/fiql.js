import { Op } from "sequelize";
import fiql from "fiql-parser";
import { logger } from "../config/logger.js";

const { parse } = fiql;

export const fiqlToSequelize = (query) => {
  if (!query) return {};

  try {
    if (typeof query !== "string") {
      return processParsedNode(query);
    }

    const node = parse(query);
    return processParsedNode(node);
  } catch (error) {
    logger.error("Erro ao processar a consulta FIQL:", error);
    return {};
  }
};

const processParsedNode = (node) => {
  if (!node) return {};

  if (node.type.toUpperCase() === "CONSTRAINT") {
    const { selector, comparison, argument } = node;
    return convertComparison(selector, comparison, argument);
  }

  if (node.type.toUpperCase() === "COMPARISON") {
    const { selector, operator, arguments: args } = node;
    return convertComparison(selector, operator, args[0]);
  }

  if (node.type.toUpperCase() === "COMBINATION") {
    const left = processParsedNode(node.lhs);
    const right = processParsedNode(node.rhs);

    if (node.operator.toUpperCase() === "AND") {
      return { [Op.and]: [left, right] };
    } else if (node.operator.toUpperCase() === "OR") {
      return { [Op.or]: [left, right] };
    }
  }

  if (node.type.toUpperCase() === "LOGICAL") {
    const left = processParsedNode(node.left);
    const right = processParsedNode(node.right);

    if (node.operator === ";") {
      return { [Op.and]: [left, right] };
    } else if (node.operator === ",") {
      return { [Op.or]: [left, right] };
    }
  }

  return {};
};

const convertComparison = (selector, operator, arg) => {
  const parsedArg = parseDateIfValid(arg);
  switch (operator) {
    case "==":
      if (parsedArg instanceof Date) {
        const start = parsedArg;
        const end = new Date(parsedArg);
        end.setUTCDate(end.getUTCDate() + 1);

        return {
          [selector]: {
            [Op.gte]: start,
            [Op.lt]: end,
          },
        };
      }
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

const parseDateIfValid = (value) => {
  if (typeof value !== "string") return value;

  let match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (match) {
    const [_, day, month, year] = match;
    const date = new Date(Date.UTC(year, month - 1, day));
    if (!isNaN(date.getTime())) return date;
  }

  match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    const [_, year, month, day] = match;
    const date = new Date(Date.UTC(year, month - 1, day));
    if (!isNaN(date.getTime())) return date;
  }

  return value;
};
