import { useState } from 'react';
import { useCases } from '../store';
import { Plus, FileText, Clock, CheckCircle, AlertCircle, X, Check } from 'lucide-react';
import { format } from 'date-fns';

export const Sidebar = () => {
  const { cases, activeCaseId, setActiveCaseId, createCase } = useCases();
  const [isCreating, setIsCreating] = useState(false);
  const [newCaseName, setNewCaseName] = useState('');

  const handleCreateNew = () => {
    if (newCaseName.trim()) {
      createCase(newCaseName.trim());
      setNewCaseName('');
      setIsCreating(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertCircle size={16} className="text-amber-500" />;
      case 'suspended': return <Clock size={16} className="text-slate-500" />;
      case 'closed': return <CheckCircle size={16} className="text-emerald-500" />;
      default: return null;
    }
  };

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800">
      <div className="p-4 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white mb-4">Hệ thống TKCN</h1>
        {!isCreating ? (
          <button
            onClick={() => setIsCreating(true)}
            className="w-full flex items-center justify-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Vụ việc mới
          </button>
        ) : (
          <div className="bg-slate-800 p-3 rounded-md">
            <input
              type="text"
              autoFocus
              value={newCaseName}
              onChange={(e) => setNewCaseName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateNew();
                if (e.key === 'Escape') {
                  setIsCreating(false);
                  setNewCaseName('');
                }
              }}
              placeholder="Tên vụ việc..."
              className="w-full px-2 py-1 mb-2 text-sm bg-slate-700 text-white border border-slate-600 rounded focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setIsCreating(false);
                  setNewCaseName('');
                }}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
              <button
                onClick={handleCreateNew}
                disabled={!newCaseName.trim()}
                className="p-1 text-blue-400 hover:text-blue-300 disabled:opacity-50"
              >
                <Check size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Danh sách vụ việc</h2>
        {cases.length === 0 ? (
          <p className="text-sm text-slate-500 px-2 italic">Chưa có vụ việc nào.</p>
        ) : (
          <ul className="space-y-1">
            {cases.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setActiveCaseId(c.id)}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center transition-colors ${
                    activeCaseId === c.id ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/50'
                  }`}
                >
                  <div className="mr-3">{getStatusIcon(c.status)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{c.name}</p>
                    <p className="text-xs text-slate-500 truncate">{format(c.createdAt, 'dd/MM/yyyy HH:mm')}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
