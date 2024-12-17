import { ProducerService } from "../src/services/ProducerService";
import { ProducerRepository } from "../src/repositories/ProducerRepository";

// Mocking the repository methods
jest.mock("../src/repositories/ProducerRepository");

const mockProducerRepository = {
  createProducer: jest.fn(),
  updateProducer: jest.fn(),
  deleteProducer: jest.fn(),
  getProducerById: jest.fn(),
  getAllProducers: jest.fn(),
  getDashboardTotals: jest.fn()
};

const producerData = {  
    id: 1,
    cpfCnpj: '12345678901', 
    name: 'John Doe',
    farmName: 'Farm A',
    city: 'City A',
    state: 'State A',
    totalArea: 100,
    cultivableArea: 70,
    vegetationArea: 30,
    crops: ['Soja', 'Milho'] 
};

describe("ProducerService", () => {
  let producerService: ProducerService;

  beforeEach(() => {
    // Initialize the service with the mock repository
    producerService = new ProducerService(mockProducerRepository as any);
  });

  it("should create a producer", async () => {
    
    mockProducerRepository.createProducer.mockResolvedValue({ ...producerData });

    const result = await producerService.createProducer(producerData);

    expect(mockProducerRepository.createProducer).toHaveBeenCalledWith(producerData);
    expect(result).toEqual({ id: 1, name: "Test Producer" });
  });

  it("should handle errors on create", async () => {

    mockProducerRepository.createProducer.mockRejectedValue(new Error("Error creating producer"));

    try {
      await producerService.createProducer(producerData);
    } catch (error) {
      expect(error.message).toBe("Error creating producer");
    }
  });

  it("should update a producer", async () => {
    const id = 1;
    const updatedData = { name: "Updated Producer" };
    mockProducerRepository.updateProducer.mockResolvedValue({ id, name: "Updated Producer" });

    const result = await producerService.updateProducer(id, updatedData);

    expect(mockProducerRepository.updateProducer).toHaveBeenCalledWith(id, updatedData);
    expect(result).toEqual({ id, name: "Updated Producer" });
  });

  it("should handle errors on update", async () => {
    const id = 1;
    const updatedData = { name: "Updated Producer" };
    mockProducerRepository.updateProducer.mockRejectedValue(new Error("Error updating producer"));

    try {
      await producerService.updateProducer(id, updatedData);
    } catch (error) {
      expect(error.message).toBe("Error updating producer");
    }
  });

  it("should delete a producer", async () => {
    const id = 1;
    mockProducerRepository.deleteProducer.mockResolvedValue({ id });

    const result = await producerService.deleteProducer(id);

    expect(mockProducerRepository.deleteProducer).toHaveBeenCalledWith(id);
    expect(result).toEqual({ id });
  });

  it("should handle errors on delete", async () => {
    const id = 1;
    mockProducerRepository.deleteProducer.mockRejectedValue(new Error("Error deleting producer"));

    try {
      await producerService.deleteProducer(id);
    } catch (error) {
      expect(error.message).toBe("Error deleting producer");
    }
  });

  it("should get a producer by id", async () => {
    const id = 1;
    mockProducerRepository.getProducerById.mockResolvedValue({ id, name: "Test Producer" });

    const result = await producerService.getProducerById(id);

    expect(mockProducerRepository.getProducerById).toHaveBeenCalledWith(id);
    expect(result).toEqual({ id, name: "Test Producer" });
  });

  it("should handle errors on get producer by id", async () => {
    const id = 1;
    mockProducerRepository.getProducerById.mockRejectedValue(new Error("Producer not found"));

    try {
      await producerService.getProducerById(id);
    } catch (error) {
      expect(error.message).toBe("Producer not found");
    }
  });

  it("should get all producers", async () => {
    mockProducerRepository.getAllProducers.mockResolvedValue([
      { id: 1, name: "Producer 1" },
      { id: 2, name: "Producer 2" },
    ]);

    const result = await producerService.getAllProducers();

    expect(mockProducerRepository.getAllProducers).toHaveBeenCalled();
    expect(result).toEqual([
      { id: 1, name: "Producer 1" },
      { id: 2, name: "Producer 2" },
    ]);
  });

  it("should handle errors on get all producers", async () => {
    mockProducerRepository.getAllProducers.mockRejectedValue(new Error("Error fetching producers"));

    try {
      await producerService.getAllProducers();
    } catch (error) {
      expect(error.message).toBe("Error fetching producers");
    }
  });

  it("should get dashboard totals", async () => {
    mockProducerRepository.getDashboardTotals.mockResolvedValue({
      totalProducers: 5,
      totalRevenue: 10000,
    });

    const result = await producerService.getDashboardTotals();

    expect(mockProducerRepository.getDashboardTotals).toHaveBeenCalled();
    expect(result).toEqual({
      totalProducers: 5,
      totalRevenue: 10000,
    });
  });

  it("should handle errors on get dashboard totals", async () => {
    mockProducerRepository.getDashboardTotals.mockRejectedValue(new Error("Error fetching dashboard totals"));

    try {
      await producerService.getDashboardTotals();
    } catch (error) {
      expect(error.message).toBe("Error fetching dashboard totals");
    }
  });
});
