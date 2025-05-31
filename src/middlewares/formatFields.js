const formatCardNumber = (cardNumber) => {
  const digits = cardNumber.replace(/\D/g, "");
  return digits.replace(/.(?=.{4})/g, "#");
};

const formatCep = (cep) => {
  return cep.replace(/\D/g, "");
};

const removeAccents = (str) => {
  if (!str) return str;
  return String(str)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const sanitizeStringFields = (obj) => {
  if (!obj) return obj;
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitized[key] = removeAccents(value);
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeStringFields(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
};

export const formatFields = (req, res, next) => {
  if (req.query) {
    req.query = sanitizeStringFields(req.query);
  }

  let body = { ...req.body };
  body = sanitizeStringFields(body);

  if (body.cardNumber) {
    body.cardNumber = formatCardNumber(body.cardNumber);
  }

  if (body.cep) {
    body.cep = formatCep(body.cep);
  }

  if (body?.card?.cardNumber) {
    body.card.cardNumber = formatCardNumber(body.card.cardNumber);
  }

  if (Array.isArray(body.addresses)) {
    body.addresses = body.addresses.map((address) => {
      if (address.cep) {
        return {
          ...address,
          cep: formatCep(address.cep),
        };
      }
      return address;
    });
  }

  if (body.filter) {
    if (body.filter.cardNumber) {
      body.filter.cardNumber = formatCardNumber(body.filter.cardNumber);
    }

    if (body.filter.cep) {
      body.filter.cep = formatCep(body.filter.cep);
    }
  }

  req.body = Object.fromEntries(
    Object.entries(body).filter(([key, value]) => value !== "")
  );
  next();
};
