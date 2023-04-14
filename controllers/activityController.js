
import SpecialActivity from '../models/SpecialActivityModel.js';

export const createActivity = async (req, res) => {
    try {
        const {
            name,
            location,
            dateRange,
            timeRange,
            type,
            description,
            image,
        } = req.body;
        console.log(req.body)
        const newActivity = new SpecialActivity({
            name,
            location,
            dateRange,
            timeRange,
            type,
            description,
            image,
        });

        const savedActivity = await newActivity.save();

        res.status(201).json({ created: true, activity: savedActivity });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const approveActivity = async (req, res) => {
    try {
        console.log(req.params);
        const activityId = req.params.id;
        const updatedActivity = await SpecialActivity.findByIdAndUpdate(
            activityId,
            { $set: { status: 'APPROVED' } },
            { new: true }
        );
        res.status(200).json({ success: true, activity: updatedActivity });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getApprovedActivities = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const activities = await SpecialActivity.find({ status: 'APPROVED' })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await SpecialActivity.countDocuments({ status: 'APPROVED' });

        res.status(200).json({
            success: true,
            page,
            limit,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            activities,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getPendingActivities = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const activities = await SpecialActivity.find({ statuS: 'PENDING' })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await SpecialActivity.countDocuments({ statuS: 'PENDING' });

        res.status(200).json({
            success: true,
            page,
            limit,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            activities,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const declineActivity = async (req, res) => {
    try {
        const activityId = req.params.id;
        const updatedActivity = await SpecialActivity.findByIdAndUpdate(
            activityId,
            { $set: { status: 'DECLINED' } },
            { new: true }
        );
        res.status(200).json({ success: true, activity: updatedActivity });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const filterActivities = async (req, res) => {
    try {
        const { name, type, startDate, endDate, startTime, endTime, searchQuery, longitude, latitude } = req.query;

        const filter = {};
        if (name) filter.name = { $regex: name, $options: 'i' };
        if (type) filter.type = type;


        if (startDate && endDate) filter['dateRange.startDate'] = { $lte: new Date(endDate) };
        if (startDate && endDate) filter['dateRange.endDate'] = { $gte: new Date(startDate) };
        if (startTime && endTime) filter['timeRange.startTime'] = { $lte: endTime };
        if (startTime && endTime) filter['timeRange.endTime'] = { $gte: startTime };


        if (searchQuery) {
            filter.$or = [{ name: { $regex: searchQuery, $options: 'i' } }, { description: { $regex: searchQuery, $options: 'i' } }];
        }

        if (longitude && latitude) {
            const activities = await SpecialActivity.find({
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude]
                        },
                        $maxDistance: 10000 // in meters
                    }
                }
            });
            filter._id = { $in: activities.map(activity => activity._id) };
        }


        const activities = await SpecialActivity.find(filter);
        res.status(200).json({ activities });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
