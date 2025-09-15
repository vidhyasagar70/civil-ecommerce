// EditProfileForm.tsx
import React, { useState, useEffect } from 'react';
import { useUpdateProfile,useCurrentUser } from '../../api/auth';
import FormInput from '../../components/Input/FormInput';
import FormButton from '../../components/Button/FormButton';
import Swal from 'sweetalert2';

interface EditProfileFormProps {
  onCancel: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ onCancel }) => {
  const { data: user } = useCurrentUser();
  const updateProfileMutation = useUpdateProfile();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        phoneNumber: user.phoneNumber || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if there are any changes
    if (formData.fullName === user?.fullName && formData.phoneNumber === user?.phoneNumber) {
      Swal.fire({
        title: 'No Changes',
        text: 'You haven\'t made any changes to your profile.',
        icon: 'info',
        confirmButtonText: 'OK'
      });
      return;
    }
    
    try {
      await updateProfileMutation.mutateAsync(formData);
      onCancel(); // Close the edit form after successful update
    } catch (error) {
      // Error handling is done in the mutation
      console.error('Update error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <p className="text-sm text-gray-900 p-2 bg-gray-50 rounded">{user?.email}</p>
          <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
        </div>
        
        <FormInput
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
        />
        
        <FormInput
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
        
        <div className="flex space-x-3 pt-4">
          <FormButton
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="flex-1"
            disabled={updateProfileMutation.isPending}
          >
            Cancel
          </FormButton>
          <FormButton
            type="submit"
            disabled={updateProfileMutation.isPending}
            className="flex-1"
          >
            {updateProfileMutation.isPending ? 'Updating...' : 'Update Profile'}
          </FormButton>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;