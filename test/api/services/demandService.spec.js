const {
    create,
    remove,
    findAll,
    findByUser,
    findById,
  } = require(".../../../src/api/services/demandService.js");

  const {
    create: _create,
    findById: _findById,
    remove: _remove,
    findAll: _findAll,
    findByUser: _findByUser,
  } = require(".../../../src/api/repositories/demandRepository.js");

  const { validPriceDemand } = require("..../../../src/utils/validatorDemand.js");
  const { createValidationError } = require(".../../../src/utils/responses.js");
  
  jest.mock(".../../../src/api/repositories/demandRepository.js");
  jest.mock(".../../../src/utils/validatorDemand.js");
  jest.mock(".../../../src/utils/responses.js", () => ({
    createValidationError: jest.fn((message) => new Error(message)),
  }));
  
  describe("Demand Service", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe("create", () => {
      it("should create a demand when the data is valid", async () => {
        const demand = { price: 100, description: "Test" };
        _create.mockResolvedValue(demand);
        validPriceDemand.mockReturnValue(false);
  
        const result = await create(demand);
        expect(result).toEqual(demand);
        expect(_create).toHaveBeenCalledWith(demand);
      });
  
      it("should throw an error if the demand price is invalid", async () => {
        const demand = { price: -1 };
        validPriceDemand.mockReturnValue(true);
  
        await expect(create(demand)).rejects.toThrow("PRICE_DEMAND_INCORRECT");
      });
  
      it("should throw an error if the demand object is empty", async () => {
        await expect(create({})).rejects.toThrow("PRICE_DEMAND_INCORRECT");
      });
    });
  
    describe("remove", () => {
      it("should remove an existing demand", async () => {
        _findById.mockResolvedValue({ id: 1 });
        _remove.mockResolvedValue();
  
        await expect(remove(1)).resolves.toBeUndefined();
        expect(_remove).toHaveBeenCalledWith(1);
      });
  
      it("should throw an error if the demand does not exist", async () => {
        _findById.mockResolvedValue(null);
  
        await expect(remove(1)).rejects.toThrow("OBJECT_NOT_FOUND");
      });
    });
  
    describe("findAll", () => {
      it("should return all demands", async () => {
        const demands = [{ id: 1 }, { id: 2 }];
        _findAll.mockResolvedValue(demands);
  
        const result = await findAll();
        expect(result).toEqual(demands);
      });
  
      it("should throw an error if no demands are found", async () => {
        _findAll.mockResolvedValue([]);
  
        await expect(findAll()).rejects.toThrow("OBJECT_NOT_FOUND");
      });
    });
  
    describe("findByUser", () => {
      it("should return demands for a specific user", async () => {
        const demands = [{ id: 1, userId: 10 }];
        _findByUser.mockResolvedValue(demands);
  
        const result = await findByUser(10);
        expect(result).toEqual(demands);
      });
  
      it("should throw an error if no demands are found", async () => {
        _findByUser.mockResolvedValue([]);
  
        await expect(findByUser(10)).rejects.toThrow("OBJECT_NOT_FOUND");
      });
    });
  
    describe("findById", () => {
      it("should return a demand by ID", async () => {
        const demand = { id: 1 };
        _findById.mockResolvedValue(demand);
  
        const result = await findById(1);
        expect(result).toEqual(demand);
      });
  
      it("should throw an error if the demand does not exist", async () => {
        _findById.mockResolvedValue(null);
  
        await expect(findById(1)).rejects.toThrow("OBJECT_NOT_FOUND");
      });
    });
  });
  