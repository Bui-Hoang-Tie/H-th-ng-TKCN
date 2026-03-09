import { useState } from 'react';
import { useCases } from '../store';
import { BMQ16_01 } from './forms/BMQ16_01';
import { BMQ16_12 } from './forms/BMQ16_12';
import { BMQ16_02 } from './forms/BMQ16_02';
import { Check, ChevronRight, AlertTriangle, FileText, Info } from 'lucide-react';

const STEPS = [
  { id: 1, name: 'Tiếp nhận thông tin', desc: 'Nhận thông tin báo nạn từ các nguồn.' },
  { id: 2, name: 'Xác minh thông tin', desc: 'Xác minh với TTDH, Cảng vụ, Biên phòng.' },
  { id: 3, name: 'Xử lý ban đầu', desc: 'Xác định vị trí, thời tiết, phát thông báo hàng hải.' },
  { id: 4, name: 'Lập Phương án TKCN', desc: 'Lập kế hoạch và đề xuất nguồn lực.' },
  { id: 5, name: 'Triển khai hoạt động', desc: 'Điều động phương tiện, chỉ định OSC.' },
  { id: 6, name: 'Kiểm tra, đánh giá', desc: 'Theo dõi, điều chỉnh kế hoạch.' },
  { id: 7, name: 'Tạm dừng, kết thúc', desc: 'Đánh giá điều kiện, báo cáo cấp trên.' },
  { id: 8, name: 'Lưu hồ sơ', desc: 'Tập hợp tài liệu, đóng hồ sơ.' },
];

export const CaseView = () => {
  const { cases, activeCaseId, updateCase } = useCases();
  const activeCase = cases.find((c) => c.id === activeCaseId);
  const [activeForm, setActiveForm] = useState<string | null>(null);

  if (!activeCase) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="text-center text-slate-500">
          <Info size={48} className="mx-auto mb-4 text-slate-300" />
          <p className="text-lg">Chọn một vụ việc từ danh sách hoặc tạo mới.</p>
        </div>
      </div>
    );
  }

  const handleNextStep = () => {
    if (activeCase.currentStep < STEPS.length) {
      updateCase(activeCase.id, { currentStep: activeCase.currentStep + 1 });
      setActiveForm(null);
    }
  };

  const handlePrevStep = () => {
    if (activeCase.currentStep > 1) {
      updateCase(activeCase.id, { currentStep: activeCase.currentStep - 1 });
      setActiveForm(null);
    }
  };

  const renderStepContent = () => {
    switch (activeCase.currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md">
              <h3 className="text-lg font-semibold text-blue-800 flex items-center">
                <AlertTriangle size={20} className="mr-2" /> Nhắc nhở quy trình
              </h3>
              <ul className="mt-2 list-disc list-inside text-blue-700 space-y-1">
                <li>Tiếp nhận thông tin từ đối tượng bị nạn, Đài TTDH, Chủ tàu, Cảng vụ, Biên phòng...</li>
                <li>Sử dụng các thiết bị TTLL sẵn có (VHF/MF/HF, vệ tinh, điện thoại).</li>
                <li>Ghi chép đầy đủ thông tin ban đầu vào biểu mẫu.</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Biểu mẫu liên quan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveForm('BMQ16-01')}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                >
                  <div className="flex items-center">
                    <FileText size={24} className="text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-slate-800">BMQ16-01</p>
                      <p className="text-xs text-slate-500">Thông tin TKCN trên biển</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md">
              <h3 className="text-lg font-semibold text-amber-800 flex items-center">
                <AlertTriangle size={20} className="mr-2" /> Nhắc nhở quy trình
              </h3>
              <ul className="mt-2 list-disc list-inside text-amber-700 space-y-1">
                <li>Liên lạc với Đài TTDH/chủ tàu để xác minh tình trạng.</li>
                <li>Liên lạc với Cảng vụ, Biên phòng, Hải quân, Cảnh sát biển khu vực.</li>
                <li>Nếu là báo nạn giả: Yêu cầu dừng phát tín hiệu, thông báo Cảng vụ xử lý.</li>
                <li>Nếu là báo nạn thật: Xác định mức độ khẩn cấp (chưa xác định, báo động, nguy hiểm).</li>
                <li>Mở hồ sơ vụ việc mới.</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Biểu mẫu liên quan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveForm('BMQ16-01')}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                >
                  <div className="flex items-center">
                    <FileText size={24} className="text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-slate-800">BMQ16-01</p>
                      <p className="text-xs text-slate-500">Thông tin TKCN trên biển</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-400" />
                </button>
                <button
                  onClick={() => setActiveForm('BMQ16-02')}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                >
                  <div className="flex items-center">
                    <FileText size={24} className="text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-slate-800">BMQ16-02</p>
                      <p className="text-xs text-slate-500">Thông tin diễn biến TKCN</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-md">
              <h3 className="text-lg font-semibold text-indigo-800 flex items-center">
                <AlertTriangle size={20} className="mr-2" /> Nhắc nhở quy trình
              </h3>
              <ul className="mt-2 list-disc list-inside text-indigo-700 space-y-1">
                <li>Xác định vị trí nhận biết cuối cùng của đối tượng bị nạn.</li>
                <li>Hướng dẫn sơ cấp cứu, khắc phục sự cố cho đối tượng bị nạn.</li>
                <li>Yêu cầu Đài TTDH phát thông báo hàng hải.</li>
                <li>Tính toán, xác định vùng tìm kiếm.</li>
                <li>Đề xuất điều động phương tiện chuyên dụng nếu cần thiết.</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Biểu mẫu liên quan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveForm('BMQ16-01')}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                >
                  <div className="flex items-center">
                    <FileText size={24} className="text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-slate-800">BMQ16-01</p>
                      <p className="text-xs text-slate-500">Thông tin TKCN trên biển</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-md">
              <h3 className="text-lg font-semibold text-emerald-800 flex items-center">
                <AlertTriangle size={20} className="mr-2" /> Nhắc nhở quy trình
              </h3>
              <ul className="mt-2 list-disc list-inside text-emerald-700 space-y-1">
                <li>Lập Phương án TKCN (BMQ16-12).</li>
                <li>Xác định nguồn lực tại chỗ có thể huy động (AIS, LRIT).</li>
                <li>Đề xuất/kiến nghị điều động phương tiện chuyên dụng/không chuyên.</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Biểu mẫu liên quan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveForm('BMQ16-12')}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                >
                  <div className="flex items-center">
                    <FileText size={24} className="text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-slate-800">BMQ16-12</p>
                      <p className="text-xs text-slate-500">Phương án tìm kiếm, cứu nạn</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-md">
              <h3 className="text-lg font-semibold text-rose-800 flex items-center">
                <AlertTriangle size={20} className="mr-2" /> Nhắc nhở quy trình
              </h3>
              <ul className="mt-2 list-disc list-inside text-rose-700 space-y-1">
                <li>Điều động và chỉ đạo hoạt động của phương tiện, thiết bị.</li>
                <li>Chỉ định Chỉ huy hiện trường (OSC).</li>
                <li>Cung cấp kế hoạch TKCN cho Chỉ huy hiện trường.</li>
                <li>Báo cáo diễn biến, tình hình (BMQ16-02).</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Biểu mẫu liên quan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveForm('BMQ16-02')}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                >
                  <div className="flex items-center">
                    <FileText size={24} className="text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-slate-800">BMQ16-02</p>
                      <p className="text-xs text-slate-500">Thông tin diễn biến TKCN</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        );
      case 6:
      case 7:
      case 8:
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
            <p className="text-slate-500">Nội dung cho bước {activeCase.currentStep} đang được cập nhật.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{activeCase.name}</h2>
          <p className="text-sm text-slate-500">
            Trạng thái: <span className="font-medium capitalize">{activeCase.status}</span>
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handlePrevStep}
            disabled={activeCase.currentStep === 1}
            className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Bước trước
          </button>
          <button
            onClick={handleNextStep}
            disabled={activeCase.currentStep === STEPS.length}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Bước tiếp theo
          </button>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 overflow-x-auto">
        <div className="flex items-center min-w-max">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  activeCase.currentStep > step.id
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : activeCase.currentStep === step.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-slate-300 text-slate-400'
                }`}
              >
                {activeCase.currentStep > step.id ? <Check size={16} /> : step.id}
              </div>
              <div className="ml-3 mr-6">
                <p
                  className={`text-sm font-medium ${
                    activeCase.currentStep >= step.id ? 'text-slate-900' : 'text-slate-500'
                  }`}
                >
                  {step.name}
                </p>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`w-12 h-0.5 mr-6 ${
                    activeCase.currentStep > step.id ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeForm === 'BMQ16-01' ? (
          <div>
            <button
              onClick={() => setActiveForm(null)}
              className="mb-4 text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
            >
              <ChevronRight size={16} className="rotate-180 mr-1" /> Quay lại quy trình
            </button>
            <BMQ16_01 />
          </div>
        ) : activeForm === 'BMQ16-12' ? (
          <div>
            <button
              onClick={() => setActiveForm(null)}
              className="mb-4 text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
            >
              <ChevronRight size={16} className="rotate-180 mr-1" /> Quay lại quy trình
            </button>
            <BMQ16_12 />
          </div>
        ) : activeForm === 'BMQ16-02' ? (
          <div>
            <button
              onClick={() => setActiveForm(null)}
              className="mb-4 text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
            >
              <ChevronRight size={16} className="rotate-180 mr-1" /> Quay lại quy trình
            </button>
            <BMQ16_02 />
          </div>
        ) : (
          renderStepContent()
        )}
      </div>
    </div>
  );
};
