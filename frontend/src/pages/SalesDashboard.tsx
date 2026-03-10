import { useEffect, useState } from 'react';
import { Plus, Loader } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { MeetingCard } from '../components/MeetingCard';
import { CreateMeetingModal } from '../components/CreateMeetingModal';
import { DayFilter } from '../components/DayFilter';
import { useMeetings } from '../hooks/useMeetings';
import { User, CreateMeetingInput } from '../types';

interface SalesDashboardProps {
  user: User | null;
  onLogout: () => void;
}

export const SalesDashboard: React.FC<SalesDashboardProps> = ({ user, onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const { meetings, loading, createMeeting, fetchAllMeetings, fetchMeetingsByDay, deleteMeeting } =
    useMeetings();

  useEffect(() => {
    fetchAllMeetings();
  }, []);

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
    <div className="page-container">
      <Navbar user={user} onLogout={onLogout} />

      <div className="page-content">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">Sales Dashboard</h1>
            <p className="text-secondary-600">Manage your meetings and view team schedules</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
          >
            <Plus size={20} />
            Create Meeting
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-100 rounded-lg p-3">
                <Plus className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">Total Meetings</p>
                <p className="text-2xl font-semibold text-secondary-900">{meetings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-success-100 rounded-lg p-3">
                <Plus className="h-6 w-6 text-success-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">This Week</p>
                <p className="text-2xl font-semibold text-secondary-900">
                  {meetings.filter(m => {
                    const meetingDate = new Date(m.meetingDate);
                    const today = new Date();
                    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                    return meetingDate >= today && meetingDate <= weekFromNow;
                  }).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-warning-100 rounded-lg p-3">
                <Plus className="h-6 w-6 text-warning-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">Pending</p>
                <p className="text-2xl font-semibold text-secondary-900">
                  {meetings.filter(m => m.meetingDate < new Date().toISOString().split('T')[0]).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-error-100 rounded-lg p-3">
                <Plus className="h-6 w-6 text-error-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">Overdue</p>
                <p className="text-2xl font-semibold text-secondary-900">
                  {meetings.filter(m => {
                    const meetingDate = new Date(m.meetingDate);
                    const today = new Date();
                    return meetingDate < today;
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <DayFilter onDaySelect={handleDayFilter} selectedDay={selectedDay} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader className="animate-spin text-primary-600 mx-auto mb-4" size={40} />
              <p className="text-secondary-600">Loading meetings...</p>
            </div>
          </div>
        )}

        {/* Meetings List */}
        {!loading && (
          <>
            {meetings.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4">
                  <Plus className="h-8 w-8 text-secondary-400" />
                </div>
                <h3 className="text-lg font-medium text-secondary-900 mb-2">
                  {selectedDay ? 'No meetings scheduled for this day' : 'No meetings yet'}
                </h3>
                <p className="text-secondary-600 mb-6">
                  {selectedDay ? 'Try selecting a different day' : 'Create your first meeting to get started'}
                </p>
                {!selectedDay && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary"
                  >
                    <Plus size={20} />
                    Create Meeting
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-sm text-secondary-600">
                    Showing <span className="font-semibold">{meetings.length}</span> meeting{meetings.length !== 1 ? 's' : ''}
                    {selectedDay && <span> for {new Date(selectedDay).toLocaleDateString()}</span>}
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {meetings.map((meeting) => (
                    <MeetingCard
                      key={meeting._id}
                      meeting={meeting}
                      onDelete={
                        meeting.createdBy.id === user?.id
                          ? handleDeleteMeeting
                          : undefined
                      }
                      showCreatedBy={meeting.createdBy.id !== user?.id}
                    />
                  ))}
                </div>
              </>
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
