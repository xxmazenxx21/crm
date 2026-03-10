import { Trash2 } from 'lucide-react';
import { Meeting } from '../types';

interface MeetingCardProps {
  meeting: Meeting;
  onDelete?: (id: string) => void;
  showCreatedBy?: boolean;
}

export const MeetingCard: React.FC<MeetingCardProps> = ({
  meeting,
  onDelete,
  showCreatedBy = false,
}) => {
  const meetingDate = new Date(meeting.meetingDate);
  const formattedDate = meetingDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{meeting.customerName}</h3>
          <p className="text-sm text-gray-600">{meeting.storeName}</p>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(meeting._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded transition"
            title="Delete meeting"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">📅 {formattedDate}</span>
          <span className="text-sm font-medium text-primary-700">🕐 {meeting.meetingTime}</span>
        </div>
        <div className="text-sm text-gray-600">📞 {meeting.phone}</div>
        {meeting.storeLink && (
          <div className="text-sm">
            <a
              href={meeting.storeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 underline"
            >
              Store Link
            </a>
          </div>
        )}
        {meeting.notes && (
          <div className="text-sm text-gray-600 italic bg-gray-50 p-2 rounded">
            "{meeting.notes}"
          </div>
        )}
      </div>

      {showCreatedBy && meeting.createdBy && (
        <div className="border-t pt-2 mt-2">
          <p className="text-xs text-gray-600">
            Created by: <span className="font-medium">{meeting.createdBy.name}</span>
          </p>
        </div>
      )}
    </div>
  );
};
