const unitsService = require('../../../services/units');
const descriptionService = require('../../../services/description');
const { NotFoundError } = require('../../../errors');

const createDescription = async (req, res) => {
    const { text, unitId } = req.body;
    const { userId } = req.state.user;
    const { companyId } = req.state.company;
    const { subdomainId } = req.state.subdomain;
    const unit = await unitsService.findOneBuildingId({ unitId });
    if (!unit) {
        throw new NotFoundError({ message: 'Unit not found' });
    }

    const descriptionSave = await descriptionService.createDescription({
        text,
        unitId,
        userId,
        companyId,
        subdomainId,
        buildingId: unit.buildingId,
    });

    res.json({ data: descriptionSave });
};

const getDescriptions = async (req, res) => {
    const { unitId } = req.query;
    const descriptions = await descriptionService.findDescription.all.list({ unitId });
    res.json({ data: descriptions });
};

const updateDescription = async (req, res) => {
    const { descriptionId } = req.params;
    const { text } = req.body;
    await descriptionService.updateDescription.byDescriptionId({ descriptionId }, { text });
    const description = await descriptionService.findDescription.one.byDescriptionId({
        descriptionId,
    });
    res.json({ data: description });
};

const removeDescription = async (req, res) => {
    const { descriptionId } = req.params;
    await descriptionService.removeDescription.byDescriptionId({ descriptionId });
    res.json({ msg: 'Description is removed!!!' });
};

module.exports = {
    createDescription,
    getDescriptions,
    updateDescription,
    removeDescription,
};
