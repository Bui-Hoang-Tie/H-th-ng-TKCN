import { useState, useEffect } from 'react';
import { useCases } from '../../store';
import { Save, Download, Mic, MicOff } from 'lucide-react';
import { exportBMQ16_12 } from '../../utils/wordExport';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';

const InlineInput = ({ value, onChange, placeholder, width = '100px' }: { value: string, onChange: (v: string) => void, placeholder?: string, width?: string }) => {
  const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechRecognition();
  
  useEffect(() => {
    if (transcript) {
      const newValue = value ? `${value} ${transcript}` : transcript;
      onChange(newValue);
      setTranscript('');
    }
  }, [transcript, onChange, value, setTranscript]);

  return (
    <span className="inline-flex items-center relative group mx-1">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width }}
        className="border-b border-dotted border-slate-400 bg-transparent focus:outline-none focus:border-blue-500 text-blue-700 px-1 text-center"
      />
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        className={`absolute -top-6 right-0 p-1 rounded-full bg-white shadow-sm border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity z-10 ${
          isListening ? 'text-red-500 opacity-100 animate-pulse' : 'text-slate-400 hover:text-blue-500'
        }`}
        title="Nhập bằng giọng nói"
      >
        {isListening ? <Mic size={14} /> : <MicOff size={14} />}
      </button>
    </span>
  );
};

const BlockInput = ({ value, onChange, rows = 3 }: { value: string, onChange: (v: string) => void, rows?: number }) => {
  const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechRecognition();
  
  useEffect(() => {
    if (transcript) {
      const newValue = value ? `${value} ${transcript}` : transcript;
      onChange(newValue);
      setTranscript('');
    }
  }, [transcript, onChange, value, setTranscript]);

  return (
    <div className="relative group mt-2 mb-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full border border-dotted border-slate-400 bg-transparent focus:outline-none focus:border-blue-500 text-blue-700 p-2 rounded resize-none leading-relaxed"
        style={{ backgroundImage: 'linear-gradient(transparent, transparent 27px, #cbd5e1 28px)', backgroundSize: '100% 28px', lineHeight: '28px' }}
      />
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        className={`absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity z-10 ${
          isListening ? 'text-red-500 opacity-100 animate-pulse' : 'text-slate-400 hover:text-blue-500'
        }`}
        title="Nhập bằng giọng nói"
      >
        {isListening ? <Mic size={16} /> : <MicOff size={16} />}
      </button>
    </div>
  );
};

export const BMQ16_12 = () => {
  const { cases, activeCaseId, saveFormData } = useCases();
  const activeCase = cases.find((c) => c.id === activeCaseId);
  
  const [formData, setFormData] = useState<any>({
    so: '',
    gio: '', phut: '', ngay: '', thang: '', nam: '',
    vuViec: '', tinhDenGio: '', tinhDenPhut: '', tinhDenNgay: '',
    thongTinVuViec: '',
    danhGiaTinhHinh: '',
    lucLuongPhuongTien: '',
    phanCongNhiemVu: '',
    danhGiaHoatDong: '',
    deXuatKienNghi: ''
  });

  useEffect(() => {
    if (activeCase?.forms['BMQ16-12']) {
      setFormData(activeCase.forms['BMQ16-12']);
    }
  }, [activeCase]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (activeCaseId) {
      saveFormData(activeCaseId, 'BMQ16-12', formData);
      alert('Đã lưu biểu mẫu.');
    }
  };

  const handleExport = () => {
    exportBMQ16_12(formData);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 max-w-4xl mx-auto font-serif text-slate-800">
      <div className="flex justify-end mb-8 space-x-2 no-print">
        <button onClick={handleSave} className="flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-sans">
          <Save size={16} className="mr-2" /> Lưu
        </button>
        <button onClick={handleExport} className="flex items-center px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm font-sans">
          <Download size={16} className="mr-2" /> Xuất Word
        </button>
      </div>

      <div className="document-content leading-relaxed">
        <div className="text-right italic mb-4">Mẫu BMQ 16-12</div>
        
        <div className="flex justify-between mb-6">
          <div className="w-1/3 text-center">
            <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-2 flex items-center justify-center text-slate-400 text-xs">LOGO</div>
          </div>
          <div className="w-2/3 text-center">
            <h2 className="font-bold text-lg">TRUNG TÂM PHỐI HỢP TÌM KIẾM CỨU NẠN HÀNG HẢI VIỆT NAM/</h2>
            <h2 className="font-bold text-lg">TRUNG TÂM PHỐI HỢP TÌM KIẾM CỨU NẠN HÀNG HẢI KHU VỰC...</h2>
            <div className="grid grid-cols-2 text-left pl-12 mt-2">
              <div>Số: <InlineInput value={formData.so} onChange={(v) => handleChange('so', v)} width="100px" /></div>
              <div></div>
              <div>Điện thoại:</div>
              <div>Fax:</div>
              <div>E-mail:</div>
              <div></div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-8">
          <div className="italic">
            , <InlineInput value={formData.gio} onChange={(v) => handleChange('gio', v)} width="40px" /> giờ 
            <InlineInput value={formData.phut} onChange={(v) => handleChange('phut', v)} width="40px" /> phút <br/>
            Ngày <InlineInput value={formData.ngay} onChange={(v) => handleChange('ngay', v)} width="40px" /> 
            tháng <InlineInput value={formData.thang} onChange={(v) => handleChange('thang', v)} width="40px" /> 
            năm 20<InlineInput value={formData.nam} onChange={(v) => handleChange('nam', v)} width="40px" />
          </div>
        </div>

        <h1 className="text-xl font-bold text-center mb-2">PHƯƠNG ÁN TÌM KIẾM, CỨU NẠN</h1>
        <div className="text-center font-bold mb-8">
          Vụ việc <InlineInput value={formData.vuViec} onChange={(v) => handleChange('vuViec', v)} width="200px" /> 
          tính đến <InlineInput value={formData.tinhDenGio} onChange={(v) => handleChange('tinhDenGio', v)} width="40px" /> giờ 
          <InlineInput value={formData.tinhDenPhut} onChange={(v) => handleChange('tinhDenPhut', v)} width="40px" /> phút 
          ngày <InlineInput value={formData.tinhDenNgay} onChange={(v) => handleChange('tinhDenNgay', v)} width="100px" />
        </div>

        <div className="font-bold mb-1">1. THÔNG TIN VỤ VIỆC <span className="font-normal italic">(thời gian, vị trí, loại tai nạn/sự cố, tình trạng phương tiện và người bị nạn).</span></div>
        <BlockInput value={formData.thongTinVuViec} onChange={(v) => handleChange('thongTinVuViec', v)} rows={3} />

        <div className="font-bold mb-1 mt-4">2. ĐÁNH GIÁ TÌNH HÌNH <span className="font-normal italic">(Điều kiện thời tiết, tình trạng nạn nhân, thuận lợi, khó khăn của hoạt động tìm kiếm, cứu nạn...).</span></div>
        <BlockInput value={formData.danhGiaTinhHinh} onChange={(v) => handleChange('danhGiaTinhHinh', v)} rows={3} />

        <div className="font-bold mb-1 mt-4">3. LỰC LƯỢNG, PHƯƠNG TIỆN THAM GIA TKCN <span className="font-normal italic">(chuyên trách và không chuyên trách).</span></div>
        <BlockInput value={formData.lucLuongPhuongTien} onChange={(v) => handleChange('lucLuongPhuongTien', v)} rows={3} />

        <div className="font-bold mb-1 mt-4">4. PHÂN CÔNG NHIỆM VỤ <span className="font-normal italic">(Phòng Phối hợp cứu nạn, Phương tiện tìm kiếm, cứu nạn ngoài hiện trường, Lực lượng phương tiện khác...)</span></div>
        <BlockInput value={formData.phanCongNhiemVu} onChange={(v) => handleChange('phanCongNhiemVu', v)} rows={3} />

        <div className="font-bold mb-1 mt-4">5. ĐÁNH GIÁ HOẠT ĐỘNG TÌM KIẾM, CỨU NẠN <span className="font-normal italic">(dự kiến kết quả, thời gian kết thúc/ tạm dừng hoạt động TKCN).</span></div>
        <BlockInput value={formData.danhGiaHoatDong} onChange={(v) => handleChange('danhGiaHoatDong', v)} rows={3} />

        <div className="font-bold mb-1 mt-4">6. ĐỀ XUẤT, KIẾN NGHỊ <span className="font-normal italic">(lực lượng, phương tiện, hậu cần, y tế, kỹ thuật...)</span></div>
        <BlockInput value={formData.deXuatKienNghi} onChange={(v) => handleChange('deXuatKienNghi', v)} rows={3} />

        <div className="flex justify-between mt-12">
          <div className="w-1/2">
            <div className="font-bold italic">Nơi nhận:</div>
            <div>- ......</div>
          </div>
          <div className="w-1/4 text-center font-bold">
            TRỰC BAN
          </div>
          <div className="w-1/4 text-center font-bold">
            TRỰC CHỈ HUY
          </div>
        </div>
      </div>
    </div>
  );
};
