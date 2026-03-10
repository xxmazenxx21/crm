import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Please provide customer name'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number'],
    },
    storeName: {
      type: String,
      required: [true, 'Please provide store/business name'],
      trim: true,
    },
    storeLink: {
      type: String,
      default: null,
    },
    meetingDate: {
      type: Date,
      required: [true, 'Please provide meeting date'],
    },
    meetingTime: {
      type: String,
      required: [true, 'Please provide meeting time'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide valid time format (HH:MM)'],
    },
    notes: {
      type: String,
      default: '',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient date queries
meetingSchema.index({ meetingDate: 1 });
meetingSchema.index({ createdBy: 1 });
meetingSchema.index({ createdAt: -1 });

export default mongoose.model('Meeting', meetingSchema);
