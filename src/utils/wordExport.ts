import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

export const exportBMQ16_01 = (data: any) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({ text: "Mẫu: BMQ16-01", italics: true }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "TRUNG TÂM PHỐI HỢP TÌM KIẾM CỨU NẠN HÀNG HẢI...", bold: true }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "THÔNG TIN TÌM KIẾM CỨU NẠN TRÊN BIỂN", bold: true, size: 28 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Kính gửi: ${data.kinhGui || '........................'}`, bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Hồi ${data.hoiGio || '...'} giờ ${data.hoiPhut || '...'} phút, ngày ${data.hoiNgay || '...'} tháng ${data.hoiThang || '...'} năm 20${data.hoiNam || '...'}`, italics: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Trực ban ${data.trucBan || '...'} nhận được thông tin từ: ${data.nguonTin || '........................'}`, bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "1. Nội dung:", bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Thiết bị báo nạn: ${data.thietBi || '........................'} Tần số: ${data.tanSo || '........................'}` }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Thời gian: ${data.thoiGianUTC || '...'} UTC, ngày ${data.ngayUTC || '...'} Tức: ${data.thoiGianVN || '...'} VN, ngày ${data.ngayVN || '...'}` }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Vị trí bị nạn: ${data.viTriN || '...'} N; ${data.viTriE || '...'} E` }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Vị trí hiện tại: ${data.viTriHienTaiN || '...'} N; ${data.viTriHienTaiE || '...'} E` }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Tên phương tiện: ${data.tenPhuongTien || '........................'} Quốc tịch: ${data.quocTich || '........................'}` }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Hô hiệu: ${data.hoHieu || '........................'}; ID (MMSI): ${data.mmsi || '........................'} Loại tàu: ${data.loaiTau || '........................'}` }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Trọng tải: ${data.trongTai || '........................'}; Số người trên phương tiện: ${data.soNguoi || '........................'}` }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Chủ tàu: ${data.chuTau || '........................'}` }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Tình trạng ban đầu:", bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: data.tinhTrangBanDau || '................................................................................................' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "2. Biện pháp đã xử lý:", bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: data.bienPhapXuLy || '................................................................................................' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "3. Đề nghị:", bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: data.deNghi || '................................................................................................' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "4. Tài liệu kèm theo:", bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: data.taiLieuKemTheo || '................................................................................................' }),
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "BMQ16-01.docx");
  });
};

export const exportBMQ16_12 = (data: any) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({ text: "Mẫu BMQ 16-12", italics: true }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "TRUNG TÂM PHỐI HỢP TÌM KIẾM CỨU NẠN HÀNG HẢI VIỆT NAM/", bold: true }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "TRUNG TÂM PHỐI HỢP TÌM KIẾM CỨU NẠN HÀNG HẢI KHU VỰC...", bold: true }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "PHƯƠNG ÁN TÌM KIẾM, CỨU NẠN", bold: true, size: 28 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: `Vụ việc ${data.vuViec || '...'} tính đến ${data.tinhDenGio || '...'} giờ ${data.tinhDenPhut || '...'} phút ngày ${data.tinhDenNgay || '...'}`, bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "1. THÔNG TIN VỤ VIỆC ", bold: true }),
              new TextRun({ text: "(thời gian, vị trí, loại tai nạn/sự cố, tình trạng phương tiện và người bị nạn).", italics: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: data.thongTinVuViec || '................................................................................................' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "2. ĐÁNH GIÁ TÌNH HÌNH ", bold: true }),
              new TextRun({ text: "(Điều kiện thời tiết, tình trạng nạn nhân, thuận lợi, khó khăn của hoạt động tìm kiếm, cứu nạn...).", italics: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: data.danhGiaTinhHinh || '................................................................................................' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "3. LỰC LƯỢNG, PHƯƠNG TIỆN THAM GIA TKCN ", bold: true }),
              new TextRun({ text: "(chuyên trách và không chuyên trách).", italics: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: data.lucLuongPhuongTien || '................................................................................................' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "4. PHÂN CÔNG NHIỆM VỤ ", bold: true }),
              new TextRun({ text: "(Phòng Phối hợp cứu nạn, Phương tiện tìm kiếm, cứu nạn ngoài hiện trường, Lực lượng phương tiện khác...)", italics: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: data.phanCongNhiemVu || '................................................................................................' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "5. ĐÁNH GIÁ HOẠT ĐỘNG TÌM KIẾM, CỨU NẠN ", bold: true }),
              new TextRun({ text: "(dự kiến kết quả, thời gian kết thúc/ tạm dừng hoạt động TKCN).", italics: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: data.danhGiaHoatDong || '................................................................................................' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "6. ĐỀ XUẤT, KIẾN NGHỊ ", bold: true }),
              new TextRun({ text: "(lực lượng, phương tiện, hậu cần, y tế, kỹ thuật...)", italics: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: data.deXuatKienNghi || '................................................................................................' }),
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "BMQ16-12.docx");
  });
};

export const exportBMQ16_02 = (data: any) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({ text: "Mẫu: BMQ16-02", italics: true }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "TRUNG TÂM PHỐI HỢP TÌM KIẾM CỨU NẠN HÀNG HẢI...", bold: true }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "THÔNG TIN DIỄN BIẾN TÌM KIẾM CỨU NẠN TRÊN BIỂN", bold: true, size: 28 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Kính gửi: ${data.kinhGui || '........................'}`, bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Hồi ${data.hoiGio || '...'} giờ ${data.hoiPhut || '...'} phút, ngày ${data.hoiNgay || '...'} tháng ${data.hoiThang || '...'} năm ${data.hoiNam || '...'}`, italics: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Trực ban ${data.trucBan || '...'} nhận được thông tin tiếp theo về vụ việc ${data.vuViec || '...'}`, bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Từ: ${data.tu || '........................'}`, bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "1. Tình trạng hiện nay:", bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: data.tinhTrangHienNay || '................................................................................................' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "2. Biện pháp đã xử lý:", bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: data.bienPhapDaXuLy || '................................................................................................' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "3. Đề nghị:", bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: data.deNghi || '................................................................................................' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "4. Tài liệu kèm theo:", bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: data.taiLieuKemTheo || '................................................................................................' }),
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "BMQ16-02.docx");
  });
};
