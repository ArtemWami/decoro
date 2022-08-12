const paletteServices = require('../../../services/palette/index');
const paletteLocationServices = require('../../../services/paletteLocation');

const createPalette = async (req, res) => {
    const { name, description, buildingId } = req.body;

    const { companyId } = req.state.company;
    const { subdomainId } = req.state.subdomain;
    const palette = await paletteServices.createPalette({
        name,
        description,
        buildingId,
        subdomainId,
        companyId,
    });

    const { paletteId } = palette;
    await paletteLocationServices.createByPaletteId({
        paletteId,
        buildingId,
        companyId,
        subdomainId,
    });

    const currentPalette = await paletteServices.findPalette.one.byPaletteId({ paletteId });
    res.json({ data: currentPalette });
};

const getAllPalettes = async (req, res) => {
    const { buildingId } = req.query;
    const palettes = await paletteServices.findPalette.all.listByBuildingId({ buildingId });
    res.json({ data: palettes });
};

const getOnePalette = async (req, res) => {
    const { paletteId } = req.params;
    const palette = await paletteServices.findPalette.one.byPaletteId({ paletteId });
    res.json({ data: palette });
};

const updatePalette = async (req, res) => {
    const { paletteId } = req.params;
    const { name, description } = req.body;

    await paletteServices.updatePalette.one.byPaletteId(
        { paletteId },
        {
            name,
            description,
        }
    );
    const palette = await paletteServices.findPalette.one.byPaletteId({ paletteId });

    res.json({ data: palette });
};

const removePalette = async (req, res) => {
    const { paletteId } = req.params;
    await paletteServices.removePalette.one.byPaletteId({ paletteId });
    res.json({ msg: 'PALETTE IS REMOVED' });
};

module.exports = {
    createPalette,
    getAllPalettes,
    getOnePalette,
    updatePalette,
    removePalette,
};
