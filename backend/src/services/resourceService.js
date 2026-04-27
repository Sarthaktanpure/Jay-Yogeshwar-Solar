const { Types } = require("mongoose");
const { mockStore } = require("../data/mockStore");
const models = require("../models");

function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function createResourceService(dbState) {
  function useMock(name) {
    return !dbState.connected && Array.isArray(mockStore[name]);
  }

  async function list(name) {
    if (useMock(name)) {
      return [...mockStore[name]].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    const Model = models[name.slice(0, 1).toUpperCase() + name.slice(1, -1)];
    return Model.find().sort({ createdAt: -1 }).lean();
  }

  async function create(name, payload, prefix) {
    if (useMock(name)) {
      const entry = {
        _id: createId(prefix),
        ...payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockStore[name].unshift(entry);
      return entry;
    }

    const modelName = name.slice(0, 1).toUpperCase() + name.slice(1, -1);
    const Model = models[modelName];
    const doc = await Model.create(payload);
    return doc.toObject();
  }

  async function update(name, id, payload) {
    if (useMock(name)) {
      const index = mockStore[name].findIndex((item) => item._id === id);
      if (index === -1) {
        return null;
      }

      mockStore[name][index] = {
        ...mockStore[name][index],
        ...payload,
        updatedAt: new Date().toISOString(),
      };
      return mockStore[name][index];
    }

    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const modelName = name.slice(0, 1).toUpperCase() + name.slice(1, -1);
    const Model = models[modelName];
    return Model.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).lean();
  }

  async function remove(name, id) {
    if (useMock(name)) {
      const index = mockStore[name].findIndex((item) => item._id === id);
      if (index === -1) {
        return null;
      }

      const [removed] = mockStore[name].splice(index, 1);
      return removed;
    }

    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const modelName = name.slice(0, 1).toUpperCase() + name.slice(1, -1);
    const Model = models[modelName];
    return Model.findByIdAndDelete(id).lean();
  }

  return { list, create, update, remove };
}

module.exports = { createResourceService };
