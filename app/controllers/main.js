var callApi = new CallApi();

/**
 * Ham lay ID
 * @param {*} id 
 * @returns 
 */
function getEle(id) {
  return document.getElementById(id);
};

/**
 * ham lay data
 */
function getData() {
  callApi
    .fetchListData()
    .then(function(result){
      console.log(result.data);
      renderTable(result.data)
    }) 
    .catch(function(error) {
      console.log(error);
    })
}

getData()


/**
 * In danh sach nhan vien
 * @param {*} data 
 */
function renderTable (data) {
  var contentHTML = "";
  data.forEach(nv => {
    contentHTML += 
    `
    <tr>
      <td>${nv.maNhanVien}</td>
      <td>${nv.tenNhanVien}</td>
      <td>${nv.chucVu}</td>
      <td>${nv.luongCoBan}</td>
      <td>${Number(nv.luongCoBan)* Number(nv.soGioLamTrongThang)}</td>
      <td>${nv.soGioLamTrongThang}</td>'
      <td>${xepLoai(nv.soGioLamTrongThang)}</td>
      <td>
        <button class="btn btn-danger" onclick="handleDelete('${nv.maNhanVien}')">Xóa nhân viên</button>
        <button class="btn btn-success" onclick="handleEdit('${nv.maNhanVien}')">Cập nhật</button>
      </td>
    </tr>
    `
  });
  getEle("tblDanhSachNV").innerHTML = contentHTML;
};

getEle("themNV").addEventListener("click", function(){
  document.getElementsByClassName("modal-title")[0].innerHTML = 'Thêm nhân viên mới'
  var btnThem = `<button class="btn btn-success" onclick="themNhanVienMoi()">Thêm nhân viên mới</button>`
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnThem;


});
/**
 * Lay thong tin nhan vien can them moi
 * @returns 
 */
function layThongTin() {
  var maNhanVien = getEle("empID").value;
  var tenNhanVien = getEle("empName").value;
  var heSoChucVu = getEle("position").value;
  var luongCoBan = getEle("salary").value;
  var soGioLamTrongThang = getEle ("hours").value;
  var chucVu = "";
  if(heSoChucVu == 3){
    chucVu = "Giám đốc"
  }
  if(heSoChucVu == 2){
    chucVu = "Quản lý"
  }  
  if(heSoChucVu == 1){
    chucVu = "Nhân viên"
  }  
  if(heSoChucVu == 4){
    chucVu = "deveoper"
  };
  var isValid = true;
  var validation = new Validation();
  isValid &= validation.kiemTraRong(maNhanVien, "idCheck", "Vui lòng nhập mã nhân viên") && validation.kiemTraKyTu(maNhanVien, "idCheck", "Vui lòng nhập mã từ 4 - 6 ký tự")
  isValid &= validation.kiemTraRong(tenNhanVien, "nameCheck", "Vui lòng nhập tên nhân viên") && validation.kiemTraTen(tenNhanVien, "nameCheck", "Vui lòng chỉ nhập chữ cho tên nhân viên")
  isValid &= validation.kiemTraRong(luongCoBan, "salaryCheck", "Vui lòng nhập lương cơ bản") && validation.kiemTraLuong(luongCoBan, "salaryCheck", "Lương nhập từ 1.000.000 đến 20.000.000 ", 1000000, 20000000);
  isValid &= validation.kiemTraRong(soGioLamTrongThang, "hoursCheck", "Vui lòng nhập số giờ làm") && validation.kiemTraLuong(soGioLamTrongThang, "hoursCheck", "Nhập số giờ làm từ 50 đến 150 giờ", 50, 150)
  
  if (!isValid) return null;

  var nv = new NhanVien(maNhanVien, tenNhanVien,chucVu , heSoChucVu,luongCoBan, soGioLamTrongThang);
  return nv
};

function xepLoai(number) {
  var xepLoai = "";
  if(number >= 100){
    xepLoai = "Xuất sắc"
    return xepLoai;
  }
  if(number>= 80 && number < 100){
    xepLoai = "Giỏi";
    return xepLoai;
  }  
  if(number >= 60 && number < 80){
    xepLoai = "Khá";
    return xepLoai;
  }  
  if(number < 60){
    xepLoai = "Trung bình";
    return xepLoai;
  };
};

/**
 * them nhan vien moi
 */
function themNhanVienMoi() {
  var nv = layThongTin();
  if(nv) {}
  callApi
  .themNhanVien(nv)
  .then(function(){
      getData()
      document.getElementsByClassName("close")[0].click();
    
  })
  .catch(function(error){
    console.log(error);
  })
}

/**
 * Xoa nhan vien
 * @param {*} id 
 */
function handleDelete(id) {
  callApi
    .xoaNhanVien(id)
    .then(function(){
      getData();
    })
    .catch(function(error){
      console.log(error);
    })
};

/**
 * Lay thong tin nhan vien can cap nhat
 * @param {} id 
 */
function handleEdit(id){
  getEle("themNV").click();
  document.getElementsByClassName("modal-title")[0].innerHTML = 'Cập nhật nhân viên '
  var btnEdit = `<button class="btn btn-success" onclick="edit()">Cập nhật</button>`
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnEdit;
  callApi
    .layThongTinNV(id)
    .then(function(result) {
      console.log(result.data);
      getEle("empID").value = result.data.maNhanVien;
      getEle("empName").value = result.data.tenNhanVien;
      getEle("position"),value = result.data,heSoChucVu
      getEle("position").name = result.data.chucVu;
      getEle("salary").value = result.data.luongCoBan;
      getEle("hours").value = result.data.soGioLamTrongThang;
    })
    .catch(function(error){
      console.log(error);
    })

};

/**
 * cap nhat nhan vien
 */
function edit() {
  var maNhanVien = getEle("empID").value;
  var tenNhanVien = getEle("empName").value;
  var heSoChucVu = getEle("position").value;
  var luongCoBan = getEle("salary").value;
  var soGioLamTrongThang = getEle ("hours").value;
  var chucVu = "";
  if(heSoChucVu == 3){
    chucVu = "Giám đốc"
  }
  if(heSoChucVu == 2){
    chucVu = "Quản lý"
  }  
  if(heSoChucVu == 1){
    chucVu = "Nhân viên"
  }  
  if(heSoChucVu == 4){
    chucVu = "deveoper"
  }

  var nv = new NhanVien(maNhanVien, tenNhanVien,chucVu , heSoChucVu, luongCoBan, soGioLamTrongThang);
  callApi
    .capNhatNV(nv)
    .then(function(result){
      document.getElementsByClassName('close')[0].click();
      alert(result.data)
      getData()
    })
    .catch(function(error){
      console.log(error);
    })
}