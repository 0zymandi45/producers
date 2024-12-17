import { Request, Response } from "express";
import { ProducerController } from "../src/controllers/ProducerController";
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

describe("ProducerController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;

  // Create controller instance with the mock repository
  const producerController = new ProducerController(mockProducerRepository as any);

  beforeEach(() => {
    jsonMock = jest.fn();
    req = {};
    res = {
      status: jest.fn(() => res) as any,
      json: jsonMock,
    };
  });

  it("should create a producer", async () => {
    req.body = { name: "Test Producer" };
    mockProducerRepository.createProducer.mockResolvedValue({ id: 1, name: "Test Producer" });

    await producerController.createProducer(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({ id: 1, name: "Test Producer" });
  });

  it("should handle errors on create", async () => {
    req.body = { name: "Test Producer" };
    mockProducerRepository.createProducer.mockRejectedValue(new Error("Error creating producer"));

    await producerController.createProducer(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Error creating producer" });
  });

  it("should update a producer", async () => {
    req.params = { id: "1" };
    req.body = { name: "Updated Producer" };
    mockProducerRepository.updateProducer.mockResolvedValue({ id: 1, name: "Updated Producer" });

    await producerController.updateProducer(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ id: 1, name: "Updated Producer" });
  });

  it("should handle errors on update", async () => {
    req.params = { id: "1" };
    req.body = { name: "Updated Producer" };
    mockProducerRepository.updateProducer.mockRejectedValue(new Error("Error updating producer"));

    await producerController.updateProducer(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Error updating producer" });
  });

  it("should delete a producer", async () => {
    req.params = { id: "1" };
    mockProducerRepository.deleteProducer.mockResolvedValue({ id: 1 });

    await producerController.deleteProducer(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Producer deleted successfully" });
  });

  it("should handle errors on delete", async () => {
    req.params = { id: "1" };
    mockProducerRepository.deleteProducer.mockRejectedValue(new Error("Error deleting producer"));

    await producerController.deleteProducer(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Error deleting producer" });
  });

  it("should get a producer by id", async () => {
    req.params = { id: "1" };
    mockProducerRepository.getProducerById.mockResolvedValue({ id: 1, name: "Test Producer" });

    await producerController.getProducerById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ id: 1, name: "Test Producer" });
  });

  it("should handle errors on get producer by id", async () => {
    req.params = { id: "1" };
    mockProducerRepository.getProducerById.mockRejectedValue(new Error("Producer not found"));

    await producerController.getProducerById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Producer not found" });
  });

  it("should get all producers", async () => {
    mockProducerRepository.getAllProducers.mockResolvedValue([
      { id: 1, name: "Producer 1" },
      { id: 2, name: "Producer 2" },
    ]);

    await producerController.getAllProducers(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith([
      { id: 1, name: "Producer 1" },
      { id: 2, name: "Producer 2" },
    ]);
  });

  it("should handle errors on get all producers", async () => {
    mockProducerRepository.getAllProducers.mockRejectedValue(new Error("Error fetching producers"));

    await producerController.getAllProducers(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Error fetching producers" });
  });

  it("should get dashboard totals", async () => {
    mockProducerRepository.getDashboardTotals.mockResolvedValue({ totalProducers: 5, totalRevenue: 10000 });

    await producerController.getDashboardTotals(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ totalProducers: 5, totalRevenue: 10000 });
  });

  it("should handle errors on get dashboard totals", async () => {
    mockProducerRepository.getDashboardTotals.mockRejectedValue(new Error("Error fetching dashboard totals"));

    await producerController.getDashboardTotals(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Error fetching dashboard totals" });
  });
});
