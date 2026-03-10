import Meeting from '../models/Meeting.js';
import ErrorHandler from '../utils/errorHandler.js';

// Create a new meeting
export const createMeeting = async (req, res, next) => {
  try {
    const { customerName, phone, storeName, storeLink, meetingDate, meetingTime, notes } = req.body;

    if (!customerName || !phone || !storeName || !meetingDate || !meetingTime) {
      throw new ErrorHandler('Please provide all required fields', 400);
    }

    const meeting = await Meeting.create({
      customerName,
      phone,
      storeName,
      storeLink: storeLink || null,
      meetingDate: new Date(meetingDate),
      meetingTime,
      notes: notes || '',
      createdBy: req.user.id,
    });

    // Populate creator details
    await meeting.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      data: meeting,
    });
  } catch (error) {
    next(error);
  }
};

// Get all meetings (for sales users - their own + others)
export const getMeetings = async (req, res, next) => {
  try {
    const meetings = await Meeting.find()
      .populate('createdBy', 'name email role')
      .sort({ meetingDate: -1 });

    res.status(200).json({
      success: true,
      count: meetings.length,
      data: meetings,
    });
  } catch (error) {
    next(error);
  }
};

// Get meetings for a specific day
export const getMeetingsByDay = async (req, res, next) => {
  try {
    const { date } = req.params;

    // Parse the date and get start and end of day
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const meetings = await Meeting.find({
      meetingDate: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .populate('createdBy', 'name email role')
      .sort({ meetingTime: 1 });

    res.status(200).json({
      success: true,
      count: meetings.length,
      date: date,
      data: meetings,
    });
  } catch (error) {
    next(error);
  }
};

// Get all meetings (manager only)
export const getAllMeetings = async (req, res, next) => {
  try {
    const meetings = await Meeting.find()
      .populate('createdBy', 'name email role')
      .sort({ meetingDate: -1 });

    res.status(200).json({
      success: true,
      count: meetings.length,
      data: meetings,
    });
  } catch (error) {
    next(error);
  }
};

// Get single meeting
export const getMeeting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const meeting = await Meeting.findById(id).populate('createdBy', 'name email role');

    if (!meeting) {
      throw new ErrorHandler('Meeting not found', 404);
    }

    res.status(200).json({
      success: true,
      data: meeting,
    });
  } catch (error) {
    next(error);
  }
};

// Update meeting (only by creator or manager)
export const updateMeeting = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { customerName, phone, storeName, storeLink, meetingDate, meetingTime, notes } = req.body;

    const meeting = await Meeting.findById(id);

    if (!meeting) {
      throw new ErrorHandler('Meeting not found', 404);
    }

    // Check authorization
    if (meeting.createdBy.toString() !== req.user.id && req.user.role !== 'manager') {
      throw new ErrorHandler('Not authorized to update this meeting', 403);
    }

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      id,
      {
        customerName,
        phone,
        storeName,
        storeLink,
        meetingDate: meetingDate ? new Date(meetingDate) : undefined,
        meetingTime,
        notes,
      },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      data: updatedMeeting,
    });
  } catch (error) {
    next(error);
  }
};

// Delete meeting (only by creator or manager)
export const deleteMeeting = async (req, res, next) => {
  try {
    const { id } = req.params;

    const meeting = await Meeting.findById(id);

    if (!meeting) {
      throw new ErrorHandler('Meeting not found', 404);
    }

    // Check authorization
    if (meeting.createdBy.toString() !== req.user.id && req.user.role !== 'manager') {
      throw new ErrorHandler('Not authorized to delete this meeting', 403);
    }

    await Meeting.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Meeting deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
