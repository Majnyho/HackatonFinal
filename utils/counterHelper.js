const Counter = require('../models/Counter');

const getNextId = async (modelName) => {
  const counter = await Counter.findOneAndUpdate(
    { model: modelName },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  );
  return counter.count;
};

module.exports = { getNextId };
