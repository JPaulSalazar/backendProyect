const recentsService = require('../services/recents.service');

const recentsController = {};

recentsController.upsert = async function (req, res, next) {
  try {
    const upsertRecents = await recentsService.upsertRecents(req.body);
    return res.status(201).json({ status: 201, data: upsertRecents});
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

recentsController.getRecents = async function (req, res, next) {
  try {
    const userId = await recentsService.getRecents(req.params);
    if (userId == null) {
      return res.status(400).json({ status: 200, data: userId, message: 'Cannot find recents with that user id' });
    }
    return res.status(200).json({ dtatus: 200, data: userId, message: 'Successfully recents retrieved' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports = recentsController;
