import {
  CButton,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSelect,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { updateUser } from "src/redux/actions/users";

const ModalUpdate = ({ modal, setModal, item }) => {
  const dataFakultas = useSelector((x) => x.fakultas.fakultas);
  const dispatch = useDispatch();
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [idPengguna, setIdPengguna] = useState(0);
  const [uuid, setUuid] = useState("");

  const handleTambah = () => {
    if (nama === "") {
      pesanError("Nama Lengkap masih kosong");
    } else if (username === "") {
      pesanError("username masih kosong");
    } else if (password === "") {
      pesanError("password masih kosong");
    } else if (role === "" || role === "0") {
      pesanError("hak akses belum di pilih");
    } else if (role === "user" && idPengguna === 0) {
      pesanError("fakultas belum di pilih");
    } else {
      if (
        nama !== "" ||
        username !== "" ||
        password !== "" ||
        role !== "" ||
        idPengguna !== 0
      ) {
        const data = {
          id: uuid,
          nama_lengkap: nama,
          username: username,
          password: password,
          role: role,
          id_pengguna: idPengguna,
        };
        dispatch(updateUser(data));
        kosong();
        setModal(false);
      }
    }
  };

  const kosong = () => {
    setNama("");
    setUsername("");
    setPassword("");
    setRole("");
    setIdPengguna(0);
  };

  const pesanError = (text) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: text,
    });
  };

  useEffect(() => {
    setUuid(item.id);
    setNama(item.nama_lengkap);
    setUsername(item.username);
    setPassword("");
    setRole(item.role);
    setIdPengguna(item.id_pengguna);
  }, [item]);

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Update User</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="name">Nama Lengkap</CLabel>
              <CInput
                id="name"
                placeholder="Nama Lengkap"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </CFormGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="username">Username</CLabel>
              <CInput
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </CFormGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="password">Password</CLabel>
              <CInput
                id="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </CFormGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormGroup>
              <CLabel htmlFor="role">Hak Akses</CLabel>
              <CSelect
                custom
                name="role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="0">-- pilih hak akses --</option>
                <option value="admin">ADMIN</option>
                <option value="user">FAKULTAS</option>
              </CSelect>
            </CFormGroup>
          </CCol>
        </CRow>
        {role === "user" && (
          <CRow>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="fakultas">Fakultas</CLabel>
                <CSelect
                  custom
                  name="fakultas"
                  id="fakultas"
                  value={idPengguna}
                  onChange={(e) => setIdPengguna(e.target.value)}
                >
                  <option value="0">-- pilih fakultas --</option>
                  {dataFakultas.map((x, i) => (
                    <option key={i} value={x.id}>
                      {x.nama_fakultas}
                    </option>
                  ))}
                </CSelect>
              </CFormGroup>
            </CCol>
          </CRow>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="success" onClick={() => handleTambah()}>
          Update
        </CButton>
        <CButton color="secondary" onClick={() => setModal(false)}>
          Batal
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalUpdate;
