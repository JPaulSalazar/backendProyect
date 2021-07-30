const recentsService = require('../services/recents.service');

const recentsController = {};

recentsController.upsertRecents = async function (req, res, next) {
  try {
    const recents = await recentsService.upsertRecents(req.body);
    return res.status(201).json({ status: 201, data: recents });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

recentsController.getRecentsByUser = async function (req, res, next) {
  try {
    const recents = await recentsService.getRecentsByUser(req.params);
    return res.status(200).json({ status: 200, data: recents, message: 'Successfully recents retrieved' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports = recentsController;
