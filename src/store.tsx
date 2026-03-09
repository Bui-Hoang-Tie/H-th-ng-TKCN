import { createContext, useContext, useState, ReactNode } from 'react';

export type CaseStatus = 'active' | 'suspended' | 'closed';

export interface Case {
  id: string;
  name: string;
  status: CaseStatus;
  currentStep: number;
  createdAt: Date;
  updatedAt: Date;
  forms: Record<string, any>;
}

interface CaseContextType {
  cases: Case[];
  activeCaseId: string | null;
  setActiveCaseId: (id: string | null) => void;
  createCase: (name: string) => void;
  updateCase: (id: string, updates: Partial<Case>) => void;
  deleteCase: (id: string) => void;
  saveFormData: (caseId: string, formId: string, data: any) => void;
}

const CaseContext = createContext<CaseContextType | undefined>(undefined);

export const CaseProvider = ({ children }: { children: ReactNode }) => {
  const [cases, setCases] = useState<Case[]>([]);
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);

  const createCase = (name: string) => {
    const newCase: Case = {
      id: Date.now().toString(),
      name,
      status: 'active',
      currentStep: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      forms: {},
    };
    setCases((prev) => [newCase, ...prev]);
    setActiveCaseId(newCase.id);
  };

  const updateCase = (id: string, updates: Partial<Case>) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c))
    );
  };

  const deleteCase = (id: string) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
    if (activeCaseId === id) setActiveCaseId(null);
  };

  const saveFormData = (caseId: string, formId: string, data: any) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            forms: {
              ...c.forms,
              [formId]: data,
            },
            updatedAt: new Date(),
          };
        }
        return c;
      })
    );
  };

  return (
    <CaseContext.Provider
      value={{
        cases,
        activeCaseId,
        setActiveCaseId,
        createCase,
        updateCase,
        deleteCase,
        saveFormData,
      }}
    >
      {children}
    </CaseContext.Provider>
  );
};

export const useCases = () => {
  const context = useContext(CaseContext);
  if (!context) {
    throw new Error('useCases must be used within a CaseProvider');
  }
  return context;
};
