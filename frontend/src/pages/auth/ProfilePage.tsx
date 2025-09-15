// ProfilePage.tsx
import { useState } from 'react';
import { useCurrentUser } from '../../api/auth';
import EditProfileForm from './EditProfileForm';
import FormButton from '../../components/Button/FormButton';

export default function ProfilePage() {
  const { data: user, isLoading, error } = useCurrentUser();
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Error loading profile</h2>
          <p className="text-gray-600 mt-2">Please try again later.</p>
        </div>a
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          {!isEditing && (
            <FormButton
              onClick={() => setIsEditing(true)}
              variant="primary"
              size="sm"
            >
              Edit Profile
            </FormButton>
          )}
        </div>
        
        {isEditing ? (
          <EditProfileForm onCancel={() => setIsEditing(false)} />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
              </div>
              
              {user?.fullName && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <p className="mt-1 text-sm text-gray-900">{user.fullName}</p>
                </div>
              )}
              
              {user?.phoneNumber && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <p className="mt-1 text-sm text-gray-900">{user.phoneNumber}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}