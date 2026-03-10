import { useEffect, useState } from 'react';
import { Plus, Loader } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { MeetingCard } from '../components/MeetingCard';
import { CreateMeetingModal } from '../components/CreateMeetingModal';
import { DayFilter } from '../components/DayFilter';
import { useMeetings } from '../hooks/useMeetings';
import { User, CreateMeetingInput } from '../types';

interface ManagerDashboardProps {
  user: User | null;
  onLogout: () => void;
}

export const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ user, onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [statsData, setStatsData] = useState({
    totalMeetings: 0,
    totalSalesUsers: 0,
  });

  const { meetings, loading, createMeeting, fetchAllMeetings, fetchMeetingsByDay, deleteMeeting } =
    useMeetings();

  useEffect(() => {
    fetchAllMeetings();
  }, []);

  useEffect(() => {
    setStatsData({
      totalMeetings: meetings.length,
      totalSalesUsers: new Set(meetings.map((m) => m.createdBy._id)).size,
    });
  }, [meetings]);

  const handleDayFilter = async (date: string | null) => {
    setSelectedDay(date);
    if (date) {
      await fetchMeetingsByDay(date);
    } else {
      await fetchAllMeetings();
    }
  };

  const handleCreateMeeting = async (data: CreateMeetingInput) => {
    await createMeeting(data);
    if (selectedDay) {
      await fetchMeetingsByDay(selectedDay);
    } else {
      await fetchAllMeetings();
    }
  };

  const handleDeleteMeeting = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this meeting?')) {
      try {
        await deleteMeeting(id);
      } catch (error) {
        console.error('Failed to delete meeting:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manager Dashboard</h1>
            <p className="text-gray-600 mt-1">View all team meetings and performance</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition font-medium"
          >
            <Plus size={20} />
            Create Meeting
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-primary-600">
            <p className="text-gray-600 text-sm font-medium">Total Meetings</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{statsData.totalMeetings}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <p className="text-gray-600 text-sm font-medium">Sales Team Members</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{statsData.totalSalesUsers}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <DayFilter onDaySelect={handleDayFilter} selectedDay={selectedDay} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader className="animate-spin text-primary-600" size={40} />
          </div>
        )}

        {/* Meetings List */}
        {!loading && (
          <>
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing {meetings.length} meeting{meetings.length !== 1 ? 's' : ''}
              </p>
            </div>

            {meetings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600 text-lg">
                  {selectedDay ? 'No meetings scheduled for this day' : 'No meetings yet'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {meetings.map((meeting) => (
                  <MeetingCard
                    key={meeting._id}
                    meeting={meeting}
                    onDelete={handleDeleteMeeting}
                    showCreatedBy={true}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Create Meeting Modal */}
      <CreateMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateMeeting}
        isLoading={loading}
      />
    </div>
  );
};
