// Import required modules and utilities
const fs = require('fs').promises;
const { editResource } = require('../utils/EditResourceUtil');
const { deleteResource } = require('../utils/DeleteResourceUtil');

// Mock the 'fs' module so we don't interact with the real file system.
jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn(),
        writeFile: jest.fn(),
    }
}));

describe('Unit Tests for Utils', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('editResource should update resource', async () => {
        const mockData = JSON.stringify([
            {
                name: 'Test Resource',
                location: 'Room 101',
                description: 'Projector and screen',
                owner: 'user@example.com',
                id: 1
            }
        ]);
        fs.readFile.mockResolvedValue(mockData);
        fs.writeFile.mockResolvedValue();

        const req = { params: { id: 1 }, body: { name: 'Edited Resource Name' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await editResource(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        const response = res.json.mock.calls[0][0];
        expect(response.message).toEqual('Resource updated successfully!');
        expect(response.resource.name).toEqual('Edited Resource Name');
    });

    it('deleteResource should delete resource', async () => {
        const mockData = JSON.stringify([
            {
                name: 'Test Resource',
                location: 'Room 101',
                description: 'Projector and screen',
                owner: 'user@example.com',
                id: 1
            }
        ]);
        fs.readFile.mockResolvedValue(mockData);
        fs.writeFile.mockResolvedValue();

        const req = { params: { id: 1 } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await deleteResource(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        const response = res.json.mock.calls[0][0];
        expect(response.message).toEqual('Resource deleted successfully!');
    });
});
