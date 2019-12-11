_setPA = async () => {
    const ref = database().ref('polices');
    ref.push({
      macs: "CS000001",
      hoten: "Lê Văn Cảnh",
      ngaysinh: "12/12/1991",
      ngayvao: "06/06/2016",
      capbac: "Thiếu Tá",
      donvi: "Đội CSGT Quận 12",
      dienthoai: "+84949121291",
      loaitk: 'cs',
    });
    this._setUsers(this.state.hoten, this.state.dienthoai, 'cs');
    this._setIndexPolice();
    alert('Đăng ký thành công!');
  };

  _setUsers = async (ten, dt, loaitk) => {
    const ref = database().ref('users');
    ref.push({
      hoten: "Lê Văn Cảnh",
      dienthoai: "+84949121291",
      loaitk: 'cs',
    });
  };
  _setIndexPolice = async () => {
    const ref = database().ref('ipolice');
    const snapshot = await ref.once('value');
    const i = snapshot.val() + 1;
    await database()
      .ref('ipolice')
      .set(i);
  };