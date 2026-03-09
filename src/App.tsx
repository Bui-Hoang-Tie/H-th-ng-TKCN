import { CaseProvider } from './store';
import { Sidebar } from './components/Sidebar';
import { CaseView } from './components/CaseView';

export default function App() {
  return (
    <CaseProvider>
      <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
        <Sidebar />
        <CaseView />
      </div>
    </CaseProvider>
  );
}
