import { Cost } from '../../models/cost.model.js';
import { Report } from '../../models/report.model.js';
import ApiError from '../../utils/apiError.js';

export const createCost = async (userid, payload) => {
    const { description, category, sum, currency, date } = payload;

    const newCost = await Cost.create({
        userid,
        description,
        category,
        sum,
        currency,
        createdAt: date ? new Date(date) : new Date()
    });

    return newCost.toObject();
};

export const removeCost = async (userid, id) => {
    const deletedCost = await Cost.findOneAndDelete({ _id: id, userid });
    if (!deletedCost) {
        throw new ApiError(404, 'Cost item not found or you are not authorized');
    }

    const costDate = new Date(deletedCost.createdAt);
    await Report.findOneAndDelete({
        userid,
        year: costDate.getFullYear(),
        month: costDate.getMonth() + 1
    });
};

export const editCost = async (userid, id, payload) => {
    const updatedCost = await Cost.findOneAndUpdate(
        { _id: id, userid },
        payload,
        { new: true, runValidators: true }
    );

    if (!updatedCost) {
        throw new ApiError(404, 'Cost not found or unauthorized');
    }

    const costDate = new Date(updatedCost.createdAt);
    await Report.findOneAndDelete({
        userid,
        year: costDate.getFullYear(),
        month: costDate.getMonth() + 1
    });

    return updatedCost;
};

export const listCosts = async (userid) => {
    return Cost.find({ userid });
};
