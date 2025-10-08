import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, RefreshCcw } from 'lucide-react';

interface Coupon {
  id?: string;
  code: string;
  name: string;
  description?: string;
  discountType: 'Percentage' | 'Fixed';
  discountValue: number;
  validFrom: string;
  validTo: string;
  status: 'Active' | 'Inactive';
  createdAt?: string;
  updatedAt?: string;
}

const defaultColors = {
  background: { primary: '#ffffff', secondary: '#f9fafb', tertiary: '#f3f4f6' },
  text: { primary: '#111827', secondary: '#6b7280', inverse: '#ffffff' },
  border: { primary: '#e5e7eb', secondary: '#d1d5db' },
  interactive: { primary: '#3b82f6', secondary: '#6b7280' },
};

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


const Coupons: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  let colors = defaultColors;

  useEffect(() => { fetchCoupons(); }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${apiBase}/coupons`);
      if (!res.ok) throw new Error('Failed to fetch coupons');
      const data = await res.json();
      setCoupons(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCoupon = async (coupon: Coupon) => {
    try {
      const method = editingCoupon ? 'PUT' : 'POST';
      const url = editingCoupon ? `${apiBase}/coupons/${editingCoupon.id}` : `${apiBase}/coupons`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(coupon),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      const data = await res.json();
      if (editingCoupon)
        setCoupons(prev => prev.map(c => c.id === editingCoupon.id ? data : c));
      else
        setCoupons(prev => [data, ...prev]);
      setShowForm(false);
      setEditingCoupon(null);
      alert(editingCoupon ? 'Coupon updated successfully!' : 'Coupon created successfully!');
    } catch (err: any) {
      alert('Failed to save coupon: ' + err.message);
      throw err;
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setShowForm(true);
  };

  const handleDelete = async (coupon: Coupon) => {
    if (!window.confirm(`Are you sure you want to delete coupon "${coupon.code}"?`)) return;
    try {
      const res = await fetch(`${apiBase}/coupons/${coupon.id}`, { method: 'DELETE' });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      setCoupons(prev => prev.filter(c => c.id !== coupon.id));
      alert('Coupon deleted successfully!');
    } catch (err: any) {
      alert('Failed to delete coupon: ' + err.message);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const isExpired = (validTo: string): boolean => (
    new Date(validTo) < new Date()
  );

  const getStatusColor = (coupon: Coupon) => {
    if (coupon.status === 'Inactive')
      return { bg: '#9ca3af', text: '#ffffff' };
    if (isExpired(coupon.validTo))
      return { bg: '#ef4444', text: '#ffffff' };
    return { bg: '#10b981', text: '#ffffff' };
  };

  const getStatusText = (coupon: Coupon) => {
    if (coupon.status === 'Inactive') return 'Inactive';
    if (isExpired(coupon.validTo)) return 'Expired';
    return 'Active';
  };

  return (
    <div className="p-6 min-h-screen transition-colors duration-300" style={{ backgroundColor: colors.background.primary }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold" style={{ color: colors.text.primary }}>Coupons</h2>
          <p className="text-sm mt-1" style={{ color: colors.text.secondary }}>
            Manage discount coupons for your store
          </p>
        </div>
        <button
          onClick={() => { setEditingCoupon(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 rounded font-medium hover:opacity-90 transition"
          style={{ backgroundColor: colors.interactive.primary, color: colors.text.inverse }}
        >
          <Plus size={16} />
          Add Coupon
        </button>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg border" style={{ backgroundColor: colors.background.secondary, borderColor: colors.border.primary }}>
          <p className="text-sm" style={{ color: colors.text.secondary }}>Total Coupons</p>
          <p className="text-2xl font-bold mt-1" style={{ color: colors.text.primary }}>{coupons.length}</p>
        </div>
        <div className="p-4 rounded-lg border" style={{ backgroundColor: colors.background.secondary, borderColor: colors.border.primary }}>
          <p className="text-sm" style={{ color: colors.text.secondary }}>Active Coupons</p>
          <p className="text-2xl font-bold mt-1" style={{ color: '#10b981' }}>
            {coupons.filter(c => c.status === 'Active' && !isExpired(c.validTo)).length}
          </p>
        </div>
        <div className="p-4 rounded-lg border" style={{ backgroundColor: colors.background.secondary, borderColor: colors.border.primary }}>
          <p className="text-sm" style={{ color: colors.text.secondary }}>Expired Coupons</p>
          <p className="text-2xl font-bold mt-1" style={{ color: '#ef4444' }}>
            {coupons.filter(c => isExpired(c.validTo)).length}
          </p>
        </div>
      </div>
      {/* Error */}
      {error &&
        <div className="mb-4 p-4 rounded-lg border border-red-500 bg-red-50">
          <p className="text-red-600">{error}</p>
          <button onClick={fetchCoupons} className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Retry</button>
        </div>
      }
      {/* Loading */}
      {loading ?
        (<div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: colors.interactive.primary }} />
        </div>)
        :
        (
          <div className="overflow-x-auto rounded-lg border" style={{ borderColor: colors.border.primary }}>
            <table className="min-w-full divide-y" style={{ borderColor: colors.border.primary }}>
              <thead style={{ backgroundColor: colors.background.secondary, color: colors.text.primary }}>
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Code</th>
                  <th className="px-4 py-3 text-left font-semibold">Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Discount</th>
                  <th className="px-4 py-3 text-left font-semibold">Valid From</th>
                  <th className="px-4 py-3 text-left font-semibold">Valid To</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ backgroundColor: colors.background.primary, borderColor: colors.border.primary }}>
                {coupons.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="mb-4 p-4 rounded-full" style={{ backgroundColor: colors.background.tertiary }}>
                          <Plus size={32} style={{ color: colors.text.secondary }} />
                        </div>
                        <p className="text-lg font-medium mb-2" style={{ color: colors.text.primary }}>
                          No coupons found
                        </p>
                        <p className="text-sm mb-4" style={{ color: colors.text.secondary }}>
                          Create your first coupon to start offering discounts
                        </p>
                        <button
                          onClick={() => setShowForm(true)}
                          className="px-4 py-2 rounded font-medium hover:opacity-90 transition"
                          style={{ backgroundColor: colors.interactive.primary, color: colors.text.inverse }}
                        >
                          Create Coupon
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  coupons.map(c => {
                    const statusColor = getStatusColor(c);
                    const statusText = getStatusText(c);
                    return (
                      <tr key={c.id} style={{ color: colors.text.primary }} className="hover:bg-opacity-50 transition">
                        <td className="px-4 py-3">
                          <span className="font-mono font-semibold px-2 py-1 rounded" style={{ backgroundColor: colors.background.tertiary }}>
                            {c.code}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium">{c.name}</p>
                            {c.description && <p className="text-xs mt-1" style={{ color: colors.text.secondary }}>{c.description}</p>}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-semibold">{c.discountType === 'Percentage' ? `${c.discountValue}%` : c.discountValue}</span>
                          <span className="text-xs ml-1" style={{ color: colors.text.secondary }}>
                            {c.discountType === 'Percentage' ? 'off' : 'flat'}
                          </span>
                        </td>
                        <td className="px-4 py-3">{formatDate(c.validFrom)}</td>
                        <td className="px-4 py-3">{formatDate(c.validTo)}</td>
                        <td className="px-4 py-3">
                          <span
                            className="px-2 py-1 rounded text-xs font-medium"
                            style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
                          >
                            {statusText}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(c)}
                              className="p-2 rounded hover:opacity-80 transition"
                              style={{ backgroundColor: colors.background.tertiary, color: colors.text.primary }}
                              title="Edit coupon"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(c)}
                              className="p-2 rounded hover:opacity-80 transition"
                              style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}
                              title="Delete coupon"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )
      }
      {/* Coupon Form Modal */}
      {showForm && (
        <CouponFormModal
          onClose={() => { setShowForm(false); setEditingCoupon(null); }}
          onSave={handleAddCoupon}
          editingCoupon={editingCoupon}
          colors={colors}
        />
      )}
    </div>
  );
};

// Coupon Form Modal Component (inline for single-file setup)
const CouponFormModal: React.FC<{
  onClose: () => void,
  onSave: (coupon: any) => Promise<void>,
  editingCoupon: Coupon | null,
  colors: any,
}> = ({ onClose, onSave, editingCoupon, colors }) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    discountType: 'Percentage' as 'Percentage' | 'Fixed',
    discountValue: 0,
    validFrom: '',
    validTo: '',
    status: 'Active' as 'Active' | 'Inactive',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingCoupon) {
      setFormData({
        code: editingCoupon.code,
        name: editingCoupon.name,
        description: editingCoupon.description || '',
        discountType: editingCoupon.discountType,
        discountValue: editingCoupon.discountValue,
        validFrom: editingCoupon.validFrom?.split('T')[0] || '',
        validTo: editingCoupon.validTo?.split('T')[0] || '',
        status: editingCoupon.status,
      });
    }
  }, [editingCoupon]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleGenerateCode = () => {
    const random = Math.random().toString(36).substring(2, 10).toUpperCase();
    setFormData(prev => ({
      ...prev,
      code: `SAVE${random}`,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    if (!formData.code.trim()) { alert('Coupon code is required'); return; }
    if (!formData.name.trim()) { alert('Coupon name is required'); return; }
    if (formData.discountValue <= 0) { alert('Discount value must be greater than 0'); return; }
    if (formData.discountType === 'Percentage' && formData.discountValue > 100) { alert('Percentage discount cannot exceed 100'); return; }
    if (!formData.validFrom) { alert('Valid From date is required'); return; }
    if (!formData.validTo) { alert('Valid To date is required'); return; }
    if (new Date(formData.validFrom) > new Date(formData.validTo)) { alert('Valid From date must be before Valid To date'); return; }

    try {
      setIsSubmitting(true);
      await onSave(formData);
    } catch (err) {
      // Error already handled in parent
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-2xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]"
        style={{ backgroundColor: colors.background.primary, color: colors.text.primary, border: `1px solid ${colors.border.primary}` }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
          </h2>
          <button onClick={onClose}
            className="p-2 rounded transition hover:opacity-80"
            style={{ color: colors.text.secondary, backgroundColor: colors.background.tertiary }}>
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Coupon Code & Generate */}
          <div className="grid grid-cols-3 gap-2 items-end">
            <div className="col-span-2">
              <label className="block text-sm mb-1 font-medium">
                Coupon Code <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                style={{
                  borderColor: colors.border.primary,
                  color: colors.text.primary,
                  backgroundColor: colors.background.primary,
                }}
                placeholder="e.g., SAVE2024"
                required
              />
            </div>
            <div>
              <button type="button" onClick={handleGenerateCode}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded transition hover:opacity-90 h-[42px]"
                style={{
                  backgroundColor: colors.background.tertiary,
                  color: colors.text.primary,
                }}>
                <RefreshCcw size={16} />
                Generate
              </button>
            </div>
          </div>
          {/* Name */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              Coupon Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              style={{
                borderColor: colors.border.primary,
                color: colors.text.primary,
                backgroundColor: colors.background.primary,
              }}
              placeholder="e.g., Summer Sale 2025"
              required
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              style={{
                borderColor: colors.border.primary,
                color: colors.text.primary,
                backgroundColor: colors.background.primary,
              }}
              rows={3}
              placeholder="Enter coupon description..."
            />
          </div>
          {/* Discount */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1 font-medium">
                Discount Type <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select
                name="discountType"
                value={formData.discountType}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                style={{
                  borderColor: colors.border.primary,
                  color: colors.text.primary,
                  backgroundColor: colors.background.primary,
                }}>
                <option value="Percentage">Percentage</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">
                Discount Value <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="number"
                name="discountValue"
                value={formData.discountValue}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                style={{
                  borderColor: colors.border.primary,
                  color: colors.text.primary,
                  backgroundColor: colors.background.primary,
                }}
                min={0}
                step={0.01}
                required
              />
            </div>
          </div>
          {/* Validity Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1 font-medium">
                Valid From <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="date"
                name="validFrom"
                value={formData.validFrom}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                style={{
                  borderColor: colors.border.primary,
                  color: colors.text.primary,
                  backgroundColor: colors.background.primary,
                }}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">
                Valid To <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="date"
                name="validTo"
                value={formData.validTo}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                style={{
                  borderColor: colors.border.primary,
                  color: colors.text.primary,
                  backgroundColor: colors.background.primary,
                }}
                required
              />
            </div>
          </div>
          {/* Status */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              Status <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              style={{
                borderColor: colors.border.primary,
                color: colors.text.primary,
                backgroundColor: colors.background.primary,
              }}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t mt-4" style={{ borderColor: colors.border.secondary }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded transition hover:opacity-90"
              style={{ backgroundColor: colors.background.tertiary, color: colors.text.primary }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded font-medium hover:opacity-90 transition disabled:opacity-50"
              style={{ backgroundColor: colors.interactive.primary, color: colors.text.inverse }}
            >
              {isSubmitting ? 'Saving...' : editingCoupon ? 'Update Coupon' : 'Add Coupon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Coupons;
