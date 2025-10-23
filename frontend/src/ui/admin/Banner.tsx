import React, { useEffect, useState } from 'react';
import { Edit3, Trash, Plus, Calendar, ExternalLink } from 'lucide-react';
import BannerForm from './BannerForm';
import { useAdminThemeStyles } from '../../hooks/useAdminThemeStyles';
import { useAdminTheme } from '../../contexts/AdminThemeContext';
import type { Banner } from "../../types/Banner";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const truncate = (s: string, n = 120) => (s && s.length > n ? s.slice(0, n).trim() + '...' : s);

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active': return { bg: '#D1FAE5', text: '#047857' };
    case 'inactive': return { bg: '#FEE2E2', text: '#B91C1C' };
    case 'scheduled': return { bg: '#FEF3C7', text: '#78350F' };
    default: return { bg: '#E5E7EB', text: '#374151' };
  }
};

const getBannerTypeStyle = (type: string) => {
  switch (type.toLowerCase()) {
    case 'festival': return 'bg-gradient-to-r from-purple-100 to-purple-300 text-purple-800';
    case 'flash sale': return 'bg-gradient-to-r from-red-100 to-red-300 text-red-800';
    case 'seasonal': return 'bg-gradient-to-r from-teal-100 to-cyan-200 text-cyan-800';
    default: return 'bg-gray-200 text-gray-800 shadow-sm ring-1 ring-gray-300';
  }
};

const BannerManagement: React.FC = () => {
  const { cardStyle, buttonStyle } = useAdminThemeStyles();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const { colors } = useAdminTheme();

  useEffect(() => { fetchBanners(); }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/banners`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setBanners(data.success ? data.data : []);
    } catch (err) {
      console.error(err);
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this banner?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/banners/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('delete failed');
      fetchBanners();
    } catch (err) {
      console.error(err);
      alert('Error deleting banner');
    }
  };

  const handleFormSubmit = async (data: Banner) => {
    try {
      const token = localStorage.getItem('token');
      const url = editingBanner ? `${API_URL}/api/banners/${editingBanner._id}` : `${API_URL}/api/banners`;
      const method = editingBanner ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error('save failed');
      setShowForm(false);
      setEditingBanner(null);
      fetchBanners();
    } catch (err) {
      console.error(err);
      alert('Error saving banner');
    }
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-admin-bg-primary">
      {showForm && <BannerForm banner={editingBanner} onClose={() => { setShowForm(false); setEditingBanner(null); }} onSubmit={handleFormSubmit} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 sm:p-6 gap-3">
        <div className="flex flex-col gap-1 w-full sm:w-auto">
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: colors.text.primary }}>Banner Management</h1>
          <div className="w-20 h-1 bg-yellow-400 rounded-full"></div>
          <p className="mt-1 text-sm sm:text-base" style={{ color: colors.text.secondary }}>Create & manage promotional banners</p>
        </div>
        <button onClick={() => { setEditingBanner(null); setShowForm(true); }} className="flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg font-medium hover:shadow-md transition w-full sm:w-auto justify-center" style={buttonStyle('primary')}>
          <Plus size={20} /> Add Banner
        </button>
      </div>

      {/* Banner List */}
      <div className="mt-4 sm:mt-6 flex flex-col gap-4">
        {loading ? <div className="text-center py-16" style={{ color: colors.text.secondary }}>Loading...</div> :
          banners.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed rounded-lg"
                 style={{ borderColor: colors.border.primary, color: colors.text.secondary }}>
              <p className="mb-3">No banners found</p>
          <button
  onClick={() => { setEditingBanner(null); setShowForm(true); }}
  style={buttonStyle('primary')}
  className="rounded-lg px-4 py-2 font-medium hover:shadow-md transition"
>
  Create Your First Banner 
</button>

            </div>
          ) :
            banners.map((b, idx) => {
              const statusColor = getStatusColor(b.status);
              return (
                <div key={b._id} className="rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between gap-4 hover:shadow-2xl transition-transform transform hover:-translate-y-1" style={{ ...cardStyle('secondary'), border: `2px solid ${colors.border.primary}`, transitionDelay: `${idx * 50}ms` }}>
                  <div className="flex flex-col gap-2 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold">{b.title}</h3>
                    <p className="text-sm sm:text-base">{truncate(b.description, 100)}</p>
                    <div className="flex flex-wrap gap-2 mt-2 overflow-x-auto">
                      <span className={`px-2 py-1 rounded-full text-xs sm:text-sm font-semibold ${getBannerTypeStyle(b.bannerType)}`}>{b.bannerType}</span>
                      <span className="px-2 py-1 rounded-full text-xs sm:text-sm font-semibold" style={{ backgroundColor: statusColor.bg, color: statusColor.text }}>{b.status}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm mt-2">
                      <div className="flex items-center gap-1 sm:gap-2"><Calendar size={14} /> {new Date(b.startDate).toLocaleDateString()} — {new Date(b.endDate).toLocaleDateString()}</div>
                      <div className="flex items-center gap-1 sm:gap-2"><ExternalLink size={14} /> Priority: {b.priority}/10</div>
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col gap-2 mt-2 sm:mt-0 justify-start sm:justify-center items-start sm:items-center flex-shrink-0">
                    <button onClick={() => { setEditingBanner(b); setShowForm(true); }} className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-yellow-400 bg-yellow-50 hover:bg-yellow-100 hover:shadow-md transition transform hover:scale-105" title="Edit"><Edit3 size={16} className="text-yellow-600" /></button>
                    <button onClick={() => b._id && handleDelete(b._id)} className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-red-400 bg-red-50 hover:bg-red-100 hover:shadow-md transition transform hover:scale-105" title="Delete"><Trash size={16} className="text-red-600" /></button>
                  </div>
                </div>
              );
            })
        }
      </div>
    </div>
  );
};

export default BannerManagement;
