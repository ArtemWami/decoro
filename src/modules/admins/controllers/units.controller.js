const unitsService = require('../../../services/units');
const modelService = require('../../../services/model');
const unitsUsersService = require('../../../services/unitsUsers');
const { isID } = require('../../../helpers/middleware');
const { Units } = require('../../../../models');
const { NotFoundError, BadRequestError } = require('../../../errors');

const createUnitArr = (unitNumber) => {
    const unitArr = unitNumber.map((unitObj) => {
        /** SAVE unit element */
        const unitTypes = Units.TYPES || [];
        if (unitTypes.indexOf(unitObj.type) > -1 && unitObj.value.trim().length >= 1) {
            const unitArrParse = unitObj.value.split(',');
            return unitArrParse.map((unitEx) => {
                /** IS SINGLE NUMBER */
                if (!isNaN(unitEx)) return { type: unitObj.type, value: +unitEx };

                /** IS INTERVAL */
                const unitInterval = unitEx.split('-');
                if (unitInterval.length === 2) {
                    const startInterval = unitInterval[0].trim();
                    const stopInterval = unitInterval[1].trim();
                    const arrayLength = stopInterval - startInterval + 1;
                    const unitArrFromList = Array.from(
                        { length: arrayLength },
                        (x, i) => i + +startInterval
                    );
                    return unitArrFromList.map((unitEx) => {
                        return { type: unitObj.type, value: +unitEx };
                    });
                }
            });
        }
    });
    const unitsObjects = [].concat.apply([], unitArr);
    return [].concat.apply([], unitsObjects);
};

const createUnit = async (req, res) => {
    const { unitNumber, modelId, buildingId } = req.body;
    const { companyId } = req.state.company;
    const { subdomainId } = req.state.subdomain;
    /** CHECK unitNumbers */
    if (!unitNumber || unitNumber.length === 0) {
        throw new BadRequestError({ message: 'Invalid unit number' });
    }

    const createRecord = async ({ type, value } = {}) => {
        if (!Number.isFinite(value)) {
            return;
        }

        const unitSaveObj = {
            buildingId,
            companyId,
            subdomainId,
            type,
            unitNumber: value,
            status: Units.STATUS.NEVER_LOGGED_IN,
            modelId: isID(modelId) ? modelId : null,
        };

        let unit = await unitsService.findUnits.one.byUnitNumberAndType({
            unitNumber: unitSaveObj.unitNumber,
            type: unitSaveObj.type,
            buildingId,
        });

        if (unit) {
            await unitsService.updateUnits.one.byUnitId({ unitId: unit.unitId }, unitSaveObj);
        } else {
            await unitsService.createUnits(unitSaveObj);
        }
    };

    /** Save units */
    await Promise.all(createUnitArr(unitNumber).map(createRecord));

    res.json({ msg: 'UNITS CREATED' });
};

const getUnits = async (req, res) => {
    const { buildingId, limit, offset, search } = req.query;
    const units = await unitsService.findUnits.all.searchInlistOfBuilding({
        buildingId,
        limit,
        offset,
        search,
    });
    res.json({ data: units });
};

const getUnit = async (req, res) => {
    const { unitId } = req.params;
    const unit = await unitsService.findUnits.one.byUnitId({ unitId });
    res.json({ data: unit });
};

const updateUnit = async (req, res) => {
    const { unitIds, type, modelId, cash, recipientId } = req.body;

    const updateObj = {};
    /** Add model info to update */
    if (isID(modelId)) {
        const currentModel = await modelService.findModel.one.byModelId({ modelId });
        if (!currentModel) throw new NotFoundError({ message: 'MODEL IS NOT EXIST!!!' });
        updateObj.modelId = modelId;
    }

    /** Add owner info to update */
    if (isID(recipientId)) {
        const currentOwnerUnits = await unitsUsersService.findOwnerUnits({
            unitIds,
            userId: recipientId,
        });

        if (currentOwnerUnits.length !== unitIds.length) {
            throw new NotFoundError({ message: 'OWNER DOES NOT EXIST!!!' });
        }

        updateObj.recipientId = recipientId;
    }

    /** Add cash to update param */
    if (Number.isFinite(cash) && cash >= 0) {
        updateObj.cash = cash;
    }

    /** Add type info to update */
    if (type) {
        if (!Units.TYPES.includes(type)) {
            throw new NotFoundError({ message: 'INCORRECT UNIT TYPE' });
        }

        updateObj.type = type;
    }

    /** UPDATE UNITS */
    await Promise.all(
        unitIds.map((unitId) => unitsService.updateUnits.one.byUnitId({ unitId }, updateObj))
    );

    res.json({ data: 'UNITS IS UPDATE !!!' });
};

const removeUnit = async (req, res) => {
    const { unitIds } = req.body;
    unitIds.map(async (unitId) => {
        await unitsService.removeUnit.one.byUnitId({ unitId });
    });
    res.json({ data: 'UNIT IS REMOVED' });
};

module.exports = {
    createUnit,
    getUnits,
    getUnit,
    updateUnit,
    removeUnit,
};
