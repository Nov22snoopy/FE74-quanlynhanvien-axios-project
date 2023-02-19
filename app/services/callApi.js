function CallApi () {
  this.fetchListData = function () {
    return axios({
      url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien",
      method: 'GET'
    })
  };
  this.themNhanVien = function(data){
    return axios({
      url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
      method: 'POST',
      data: data
    })
  };
  this.xoaNhanVien = function(id) {
    return axios ({
      url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${id}`,
      method: "DELETE"
    })
  };

  this.layThongTinNV = function (id) {
    return axios ({
      url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${id}`,
      method: 'GET'
    })

  }

  this.capNhatNV = function(data) {
    return axios({
      url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${data.maNhanVien}`,
      method: 'PUT',
      data: data
    })
  }
}