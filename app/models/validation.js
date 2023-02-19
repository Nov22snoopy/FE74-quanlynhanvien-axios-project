function Validation() {
  this.kiemTraRong = function(value, id, mes){
    if (value == "") {
      getEle(id).style.display = "block"
      getEle(id).innerHTML = mes;
      return false;
    }
      getEle(id).style.display = "none";
      getEle(id).innerHTML = "";
      return true
  }
  this.kiemTraKyTu = function (value, spanId, mes) {
    if (4 <= value.length && value.length <= 6) {
      getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
    }
    getEle(spanId).style.display = "block";
    getEle(spanId).innerHTML = mes;
    return false;
  };
  this.kiemTraTen = function (value, spanId, mes) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
    }
    getEle(spanId).style.display = "block";
    getEle(spanId).innerHTML = mes;
    return false;
  };
  this.kiemTraLuong = function (value, spanId, mes, min, max) {
    if (min <= Number(value) && Number(value) <= max) {
      getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
    }
    getEle(spanId).style.display = "block";
    getEle(spanId).innerHTML = mes;
    return false;
  };
}