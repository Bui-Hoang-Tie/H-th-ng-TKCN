import { useState, useEffect } from 'react';
import { useCases } from '../../store';
import { Save, Download, Mic, MicOff } from 'lucide-react';
import { exportBMQ16_01 } from '../../utils/wordExport';
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

export const BMQ16_01 = () => {
  const { cases, activeCaseId, saveFormData } = useCases();
  const activeCase = cases.find((c) => c.id === activeCaseId);
  
  const [formData, setFormData] = useState<any>({
    so: '', gio: '', phut: '', ngay: '', thang: '', nam: '',
    kinhGui: '',
    hoiGio: '', hoiPhut: '', hoiNgay: '', hoiThang: '', hoiNam: '',
    trucBan: '', nguonTin: '',
    thietBi: '', tanSo: '',
    thoiGianUTC: '', ngayUTC: '', thoiGianVN: '', ngayVN: '',
    viTriN: '', viTriE: '',
    viTriHienTaiN: '', viTriHienTaiE: '',
    tenPhuongTien: '', quocTich: '',
    hoHieu: '', mmsi: '', loaiTau: '',
    trongTai: '', soNguoi: '',
    chuTau: '',
    tinhTrangBanDau: '',
    bienPhapXuLy: '',
    deNghi: '',
    taiLieuKemTheo: ''
  });

  useEffect(() => {
    if (activeCase?.forms['BMQ16-01']) {
      setFormData(activeCase.forms['BMQ16-01']);
    }
  }, [activeCase]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (activeCaseId) {
      saveFormData(activeCaseId, 'BMQ16-01', formData);
      alert('Đã lưu biểu mẫu.');
    }
  };

  const handleExport = () => {
    exportBMQ16_01(formData);
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
        <div className="text-right italic mb-4">Mẫu: BMQ16-01</div>
        
        <div className="flex justify-between mb-6">
          <div className="w-1/3 text-center">
            <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-2 flex items-center justify-center text-slate-400 text-xs">LOGO</div>
          </div>
          <div className="w-2/3 text-center">
            <h2 className="font-bold text-lg">TRUNG TÂM PHỐI HỢP TÌM KIẾM CỨU NẠN HÀNG HẢI...</h2>
            <div className="grid grid-cols-2 text-left pl-12 mt-2">
              <div>Địa chỉ:</div>
              <div></div>
              <div>Điện thoại:</div>
              <div>Fax:</div>
              <div>E-mail:</div>
              <div></div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mb-8">
          <div>Số: <InlineInput value={formData.so} onChange={(v) => handleChange('so', v)} width="60px" /> /</div>
          <div className="italic">
            , <InlineInput value={formData.gio} onChange={(v) => handleChange('gio', v)} width="40px" /> giờ 
            <InlineInput value={formData.phut} onChange={(v) => handleChange('phut', v)} width="40px" /> phút <br/>
            Ngày <InlineInput value={formData.ngay} onChange={(v) => handleChange('ngay', v)} width="40px" /> 
            tháng <InlineInput value={formData.thang} onChange={(v) => handleChange('thang', v)} width="40px" /> 
            năm <InlineInput value={formData.nam} onChange={(v) => handleChange('nam', v)} width="60px" />
          </div>
        </div>

        <h1 className="text-xl font-bold text-center mb-6">THÔNG TIN TÌM KIẾM CỨU NẠN TRÊN BIỂN</h1>

        <div className="pl-8 mb-4">
          <span className="font-bold italic">Kính gửi:</span> 
          <InlineInput value={formData.kinhGui} onChange={(v) => handleChange('kinhGui', v)} width="400px" />
        </div>

        <div className="mb-2">
          Hồi <InlineInput value={formData.hoiGio} onChange={(v) => handleChange('hoiGio', v)} width="40px" /> giờ 
          <InlineInput value={formData.hoiPhut} onChange={(v) => handleChange('hoiPhut', v)} width="40px" /> phút, 
          ngày <InlineInput value={formData.hoiNgay} onChange={(v) => handleChange('hoiNgay', v)} width="40px" /> 
          tháng <InlineInput value={formData.hoiThang} onChange={(v) => handleChange('hoiThang', v)} width="40px" /> 
          năm 20<InlineInput value={formData.hoiNam} onChange={(v) => handleChange('hoiNam', v)} width="40px" />
        </div>

        <div className="mb-4">
          <span className="font-bold">Trực ban</span> <InlineInput value={formData.trucBan} onChange={(v) => handleChange('trucBan', v)} width="150px" /> 
          <span className="font-bold">nhận được thông tin từ:</span> <InlineInput value={formData.nguonTin} onChange={(v) => handleChange('nguonTin', v)} width="300px" />
        </div>

        <div className="font-bold mb-2">1. Nội dung:</div>
        
        <div className="mb-2">
          Thiết bị báo nạn: <InlineInput value={formData.thietBi} onChange={(v) => handleChange('thietBi', v)} width="200px" /> 
          Tần số: <InlineInput value={formData.tanSo} onChange={(v) => handleChange('tanSo', v)} width="150px" />
        </div>
        
        <div className="mb-2">
          Thời gian: <InlineInput value={formData.thoiGianUTC} onChange={(v) => handleChange('thoiGianUTC', v)} width="80px" /> UTC, 
          ngày <InlineInput value={formData.ngayUTC} onChange={(v) => handleChange('ngayUTC', v)} width="100px" /> 
          Tức: <InlineInput value={formData.thoiGianVN} onChange={(v) => handleChange('thoiGianVN', v)} width="80px" /> VN, 
          ngày <InlineInput value={formData.ngayVN} onChange={(v) => handleChange('ngayVN', v)} width="100px" />
        </div>

        <div className="mb-2">
          Vị trí bị nạn: <InlineInput value={formData.viTriN} onChange={(v) => handleChange('viTriN', v)} width="150px" /> N; 
          <InlineInput value={formData.viTriE} onChange={(v) => handleChange('viTriE', v)} width="150px" /> E
        </div>

        <div className="mb-2">
          Vị trí hiện tại: <InlineInput value={formData.viTriHienTaiN} onChange={(v) => handleChange('viTriHienTaiN', v)} width="150px" /> N; 
          <InlineInput value={formData.viTriHienTaiE} onChange={(v) => handleChange('viTriHienTaiE', v)} width="150px" /> E
        </div>

        <div className="mb-2">
          Tên phương tiện: <InlineInput value={formData.tenPhuongTien} onChange={(v) => handleChange('tenPhuongTien', v)} width="250px" /> 
          Quốc tịch: <InlineInput value={formData.quocTich} onChange={(v) => handleChange('quocTich', v)} width="150px" />
        </div>

        <div className="mb-2">
          Hô hiệu: <InlineInput value={formData.hoHieu} onChange={(v) => handleChange('hoHieu', v)} width="120px" />; 
          ID (MMSI): <InlineInput value={formData.mmsi} onChange={(v) => handleChange('mmsi', v)} width="120px" /> 
          Loại tàu: <InlineInput value={formData.loaiTau} onChange={(v) => handleChange('loaiTau', v)} width="120px" />
        </div>

        <div className="mb-2">
          Trọng tải: <InlineInput value={formData.trongTai} onChange={(v) => handleChange('trongTai', v)} width="150px" />; 
          Số người trên phương tiện: <InlineInput value={formData.soNguoi} onChange={(v) => handleChange('soNguoi', v)} width="100px" />
        </div>

        <div className="mb-4">
          Chủ tàu: <InlineInput value={formData.chuTau} onChange={(v) => handleChange('chuTau', v)} width="500px" />
        </div>

        <div className="font-bold mb-1">Tình trạng ban đầu:</div>
        <BlockInput value={formData.tinhTrangBanDau} onChange={(v) => handleChange('tinhTrangBanDau', v)} rows={3} />

        <div className="font-bold mb-1 mt-4">2. Biện pháp đã xử lý:</div>
        <BlockInput value={formData.bienPhapXuLy} onChange={(v) => handleChange('bienPhapXuLy', v)} rows={3} />

        <div className="font-bold mb-1 mt-4">3. Đề nghị:</div>
        <BlockInput value={formData.deNghi} onChange={(v) => handleChange('deNghi', v)} rows={3} />

        <div className="font-bold mb-1 mt-4">4. Tài liệu kèm theo:</div>
        <BlockInput value={formData.taiLieuKemTheo} onChange={(v) => handleChange('taiLieuKemTheo', v)} rows={2} />

        <div className="flex justify-between mt-12">
          <div className="w-1/2">
            <div className="font-bold italic">Nơi nhận:</div>
            <div>- Như trên;</div>
            <div>- ......</div>
          </div>
          <div className="w-1/4 text-center font-bold">
            TRỰC BAN
          </div>
          <div className="w-1/4 text-center font-bold">
            KT. TGĐ/GĐ<br/>
            TRỰC CHỈ HUY
          </div>
        </div>
      </div>
    </div>
  );
};

