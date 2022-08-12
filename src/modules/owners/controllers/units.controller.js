const unitsOwnerService = require('../services/units');

const listingUnits = async (req, res) => {
    const {limit = 2, offset = 0} = req.query;
    const {company, user, subdomain} = req.state;
    const {userId} = user;
    const {companyId} = company;
    const {subdomainId} = subdomain;

    const units = await unitsOwnerService.findAll({
        userId,
        companyId,
        subdomainId,
        limit,
        offset
    });

    res.json({ data: units });
};

const getUnit = async (req, res) => {
    const { unitId } = req.params;
    const {company, user, subdomain} = req.state;
    const {userId} = user;
    const {companyId} = company;
    const {subdomainId} = subdomain;

    const unit = await unitsOwnerService.findOne({
        unitId,
        userId,
        companyId,
        subdomainId
    });

    res.json({ data: unit });
}

module.exports = {
    listingUnits,
    getUnit
};
