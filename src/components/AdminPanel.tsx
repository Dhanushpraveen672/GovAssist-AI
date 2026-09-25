import React, { useState } from 'react';
import { Scheme } from '../types/schemes';
import { SCHEMES as initialSchemes } from '../../server/data/schemes';
import { useLanguage } from '../context/LanguageContext';
import {
  ShieldCheck,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  Save,
  X,
  FileSpreadsheet,
  AlertTriangle,
  ChevronRight,
  Layers,
} from 'lucide-react';

interface AdminPanelProps {
  onSelectScheme?: (scheme: Scheme) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onSelectScheme }) => {
  const { t } = useLanguage();
  const [schemesList, setSchemesList] = useState<Scheme[]>(initialSchemes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);
  const [deletingSchemeId, setDeletingSchemeId] = useState<string | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState<Partial<Scheme>>({
    title: '',
    department: '',
    shortDescription: '',
    fullDescription: '',
    category: 'Farmers',
    targetGroup: '',
    sponsoringBody: 'Central',
    state: '',
    incomeGroup: 'All Income Groups',
    deadline: 'Open All Year',
    processingTime: '7 to 15 Working Days',
    benefits: [''],
    requiredDocuments: [''],
    officialPortalUrl: 'https://myscheme.gov.in',
    tags: ['welfare'],
  });

  const categories = [
    'All',
    'Farmers',
    'Women',
    'Students',
    'Seniors',
    'Healthcare',
    'Housing',
    'MSME',
    'Disability',
  ];

  // Filtering Logic
  const filteredSchemes = schemesList.filter(s => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.department && s.department.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Handle Form Submission for Creating / Updating
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.shortDescription) return;

    if (editingScheme) {
      // Update existing scheme
      setSchemesList(prev =>
        prev.map(s => (s.id === editingScheme.id ? ({ ...s, ...formData } as Scheme) : s))
      );
      setEditingScheme(null);
    } else {
      // Create new scheme
      const newId = `custom-scheme-${Date.now()}`;
      const newScheme: Scheme = {
        id: newId,
        title: formData.title || 'New Welfare Scheme',
        department: formData.department || 'Government Department',
        shortDescription: formData.shortDescription || '',
        fullDescription: formData.fullDescription || formData.shortDescription || '',
        category: (formData.category as any) || 'Farmers',
        targetGroup: formData.targetGroup || 'General Citizens',
        sponsoringBody: formData.sponsoringBody || 'Central',
        state: formData.state || '',
        incomeGroup: formData.incomeGroup || 'All Income Groups',
        deadline: formData.deadline || 'Open All Year',
        processingTime: formData.processingTime || '15 Working Days',
        benefits: Array.isArray(formData.benefits) ? formData.benefits : [formData.benefits || ''],
        eligibilityCriteria: {
          minAge: 18,
          gender: 'All',
        },
        requiredDocuments: Array.isArray(formData.requiredDocuments)
          ? formData.requiredDocuments
          : [formData.requiredDocuments || 'Aadhaar Card'],
        officialPortalUrl: formData.officialPortalUrl || 'https://myscheme.gov.in',
        tags: Array.isArray(formData.tags) ? formData.tags : ['welfare'],
      };

      setSchemesList(prev => [newScheme, ...prev]);
      setIsAddModalOpen(false);
    }

    resetForm();
  };

  const handleOpenEdit = (scheme: Scheme) => {
    setEditingScheme(scheme);
    setFormData({ ...scheme });
  };

  const handleDeleteConfirm = () => {
    if (deletingSchemeId) {
      setSchemesList(prev => prev.filter(s => s.id !== deletingSchemeId));
      setDeletingSchemeId(null);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      department: '',
      shortDescription: '',
      fullDescription: '',
      category: 'Farmers',
      targetGroup: '',
      sponsoringBody: 'Central',
      state: '',
      incomeGroup: 'All Income Groups',
      deadline: 'Open All Year',
      processingTime: '7 to 15 Working Days',
      benefits: [''],
      requiredDocuments: [''],
      officialPortalUrl: 'https://myscheme.gov.in',
      tags: ['welfare'],
    });
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(schemesList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `govassist_schemes_db_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Metrics
  const totalSchemes = schemesList.length;
  const centralSchemes = schemesList.filter(s => s.sponsoringBody === 'Central').length;
  const stateSchemes = schemesList.filter(s => s.sponsoringBody === 'State').length;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Super Admin & Scheme Operations Portal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t('adminTitle', 'Government Scheme Database Admin')}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            {t('adminSubtitle', 'Add, edit, archive, or remove welfare schemes in real-time across central and state domains.')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportJSON}
            className="flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-700 font-bold px-4 py-3 rounded-2xl border border-slate-200 shadow-xs text-xs sm:text-sm transition-all"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>{t('exportDbBtn', 'Export Database (JSON)')}</span>
          </button>

          <button
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
            className="flex items-center space-x-2 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 hover:from-teal-800 text-white font-extrabold px-5 py-3 rounded-2xl shadow-soft text-xs sm:text-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{t('addSchemeBtn', 'Add New Scheme')}</span>
          </button>
        </div>
      </div>

      {/* Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Active Schemes</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{totalSchemes}</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Central Sector Schemes</div>
            <div className="text-2xl font-black text-teal-800 mt-1">{centralSchemes}</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">State Specific Schemes</div>
            <div className="text-2xl font-black text-amber-700 mt-1">{stateSchemes}</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search scheme title, ministry..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.slice(0, 5).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">{t('schemeTitleLabel', 'Scheme Title & ID')}</th>
                <th className="py-3.5 px-4">{t('departmentLabel', 'Department / Ministry')}</th>
                <th className="py-3.5 px-4">{t('categoryLabel', 'Category')}</th>
                <th className="py-3.5 px-4">Sponsoring Body</th>
                <th className="py-3.5 px-4">{t('statusLabel', 'Status')}</th>
                <th className="py-3.5 px-4 text-right">{t('actionsLabel', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredSchemes.map(scheme => (
                <tr key={scheme.id} className="hover:bg-teal-50/40 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-slate-900 text-sm">{scheme.title}</div>
                    <div className="text-[11px] text-teal-700 font-mono">ID: {scheme.id}</div>
                  </td>
                  <td className="py-4 px-4 text-slate-600 max-w-xs truncate">
                    {scheme.department || 'Ministry of Social Justice'}
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-teal-100 text-teal-900 text-[11px] font-bold px-2.5 py-1 rounded-full">
                      {scheme.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      scheme.sponsoringBody === 'Central'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-amber-100 text-amber-900'
                    }`}>
                      {scheme.sponsoringBody} {scheme.state ? `(${scheme.state})` : ''}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center space-x-1 bg-emerald-100 text-emerald-900 text-[11px] font-extrabold px-2.5 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3 text-emerald-700" />
                      <span>{t('active', 'Active')}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {onSelectScheme && (
                        <button
                          onClick={() => onSelectScheme(scheme)}
                          className="p-2 text-slate-500 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition-colors"
                          title="Preview Scheme Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenEdit(scheme)}
                        className="p-2 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors"
                        title="Edit Scheme"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingSchemeId(scheme.id)}
                        className="p-2 text-slate-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
                        title="Delete Scheme"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT SCHEME MODAL */}
      {(isAddModalOpen || editingScheme) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-teal-100 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-teal-900 to-teal-800 text-white flex items-center justify-between">
              <h2 className="text-base font-extrabold">
                {editingScheme ? 'Edit Welfare Scheme' : 'Add New Welfare Scheme'}
              </h2>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingScheme(null);
                }}
                className="p-1.5 rounded-xl hover:bg-teal-700 text-teal-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Scheme Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. PM Solar Muft Bijli Yojana"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department / Ministry</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g. Ministry of New and Renewable Energy"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                  >
                    <option value="Farmers">Farmers</option>
                    <option value="Women">Women</option>
                    <option value="Students">Students</option>
                    <option value="Seniors">Seniors</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Housing">Housing</option>
                    <option value="MSME">MSME</option>
                    <option value="Disability">Disability</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.shortDescription}
                  onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Provide concise summary of benefits and purpose..."
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sponsoring Body</label>
                  <select
                    value={formData.sponsoringBody}
                    onChange={e => setFormData({ ...formData, sponsoringBody: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                  >
                    <option value="Central">Central (All India)</option>
                    <option value="State">State Specific</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">State Name (If State Scheme)</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    placeholder="e.g. Tamil Nadu / Uttar Pradesh"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Portal URL</label>
                <input
                  type="url"
                  value={formData.officialPortalUrl}
                  onChange={e => setFormData({ ...formData, officialPortalUrl: e.target.value })}
                  placeholder="https://official.gov.in"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              {/* Form Action Buttons */}
              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingScheme(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                >
                  {t('cancel', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold shadow-soft"
                >
                  {t('saveChanges', 'Save Scheme')}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingSchemeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 w-full max-w-md text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Are you sure you want to delete this scheme?</h3>
            <p className="text-xs text-slate-500">
              This action will remove the scheme from the active database and search indices.
            </p>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setDeletingSchemeId(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 text-xs"
              >
                {t('cancel', 'Cancel')}
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-soft"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
