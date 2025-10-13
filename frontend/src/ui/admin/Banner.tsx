import React, { useEffect, useState } from 'react';
import { Edit3, Trash, Plus, Calendar, ExternalLink } from 'lucide-react';
import BannerForm from './BannerForm';
import { useAdminThemeStyles } from '../../hooks/useAdminThemeStyles';
import { useAdminTheme } from '../../contexts/AdminThemeContext';

interface Banner {
  _id?: string;
  title: string;
  description: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  startDate: string;
  endDate: string;
  position: string;
  bannerType: string;
  priority: number;
  status: string;
  backgroundColor: string;
  textColor: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const truncate = (s: string, n = 120) => (s && s.length > n ? s.slice(0, n).trim() + '...' : s);

// Status badge colors
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active': return { bg: '#D1FAE5', text: '#047857' }; // green
    case 'inactive': return { bg: '#FEE2E2', text: '#B91C1C' };
    case 'pending': return { bg: '#FEF3C7', text: '#78350F' };
    default: return { bg: '#E5E7EB', text: '#374151' };
  }
};

// Banner type colors
const getBannerTypeStyle = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'festival': return 'bg-purple-100 text-purple-800';
    case 'flash sale': return 'bg-red-100 text-red-800';
    case 'seasonal': return 'bg-gradient-to-r from-teal-100 to-teal-200 text-teal-800';
    default: return 'bg-gray-200 text-gray-800';
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
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
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
    <div className="p-6 min-h-screen bg-admin-bg-primary">
      {showForm && (
        <BannerForm
          banner={editingBanner}
          onClose={() => { setShowForm(false); setEditingBanner(null); }}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-center p-6 ">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold" style={{ color: colors.text.primary }}>Banner Management</h1>
          <div className="w-24 h-1 bg-yellow-400 rounded-full"></div> {/* heading underline */}
          <p className="mt-1 text-admin-text-secondary" style={{ color: colors.text.secondary }}>Create & manage promotional banners</p>
        </div>
        <button
          onClick={() => { setEditingBanner(null); setShowForm(true); }}
          className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium hover:shadow-md transition"
          style={buttonStyle('primary')}
        >
          <Plus size={20} /> Add Banner
        </button>
      </div>

      {/* Banner List */}
      <div className="mt-6 flex flex-col gap-6">
        {loading ? (
          <div className="text-center py-16 text-admin-text-secondary">Loading...</div>
        ) : banners.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed rounded-lg border-admin-border-primary">
            <p className="mb-3 text-admin-text-secondary">No banners found</p>
            <button onClick={() => { setEditingBanner(null); setShowForm(true); }} style={buttonStyle('primary')}>Create Your First Banner</button>
          </div>
        ) : (
          banners.map((b, idx) => {
            const statusColor = getStatusColor(b.status);
            return (
              <div
                key={b._id}
                className="rounded-xl p-6 flex flex-col md:flex-row justify-between gap-4 hover:shadow-2xl transition-transform transform hover:-translate-y-"
                style={{
                  ...cardStyle('secondary'),
                  border: `2px solid ${colors.border.primary}`, // dynamic yellow from theme
                  transitionDelay: `${idx * 50}ms`, // staggered flow effect
                }}
              >
                {/* Left: Banner Info */}
                <div className="flex flex-col gap-2 min-w-0">
                  <h3 className="text-xl font-bold text-admin-text-primary">{b.title}</h3>
                  <p className="text-admin-text-secondary">{truncate(b.description, 200)}</p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBannerTypeStyle(b.bannerType)}`}>
                      {b.bannerType}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
                    >
                      {b.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mt-2 text-admin-text-accent">
                    <div className="flex items-center gap-2"><Calendar size={16} /> {new Date(b.startDate).toLocaleDateString()} — {new Date(b.endDate).toLocaleDateString()}</div>
                    <div className="flex items-center gap-2"><ExternalLink size={16} /> Priority: {b.priority}/10</div>
                  </div>
                </div>

                {/* Right: Modern Action Buttons */}
                <div className="flex flex-col sm:flex-row flex-shrink-0 gap-2 mt-4 md:mt-0 items-start md:items-center">
                  <button
                    onClick={() => { setEditingBanner(b); setShowForm(true); }}
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-yellow-400 bg-yellow-50 hover:bg-yellow-100 hover:shadow-md transition transform hover:scale-105"
                    title="Edit"
                  >
                    <Edit3 size={18} className="text-yellow-600" />
                  </button>
                  <button
                    onClick={() => b._id && handleDelete(b._id)}
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-red-400 bg-red-50 hover:bg-red-100 hover:shadow-md transition transform hover:scale-105"
                    title="Delete"
                  >
                    <Trash size={18} className="text-red-600" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BannerManagement;
