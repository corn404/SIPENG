import {
  CButton,
  CCol,
  CFormGroup,
  CInput,
  CInputRadio,
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
import { getFakultas } from "src/redux/actions/fakultas";
import {
  addMahasiswa,
  addMahasiswaFakultas,
} from "src/redux/actions/mahasiswa";
import { getProdyByFakultas } from "src/redux/actions/prodi";
import Swal from "sweetalert2";

const ModalTambah = ({ modal, setModal }) => {
  const dispatch = useDispatch();
  const dataProdi = useSelector((x) => x.prodi.prodi);
  const users = useSelector((x) => x.users.currentUser);
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [kelamin, setKelamin] = useState("");
  const [alamat, setAlamat] = useState("");
  const [prodi, setProdi] = useState(0);

  const handleTambah = () => {
    if (nim === "") {
      pesanError("NIM masih kosong");
    } else if (nama === "") {
      pesanError("Nama masih kosong");
    } else if (kelamin === "") {
      pesanError("Kelamin belum dipilih");
    } else if (prodi === 0) {
      pesanError("prodi belum dipilih");
    } else {
      const data = {
        nim,
        nama,
        kelamin,
        id_prodi: prodi,
      };
      dispatch(addMahasiswaFakultas(data, users.id_prodi));
      setNama("");
      setModal(false);
    }
  };

  const pesanError = (text) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: text,
    });
  };

  // nim, nama, kelamin, alamat, id_fakultas

  useEffect(() => {
    dispatch(getFakultas());
    dispatch(getProdyByFakultas(users.id_fakultas));
  }, []);

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Tambah Mahasiswa</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="nim">NIM</CLabel>
              <CInput
                id="NIM"
                placeholder="Masukan NIM"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
              />
            </CFormGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="name">Nama Mahasiswa</CLabel>
              <CInput
                id="name"
                placeholder="Masukan Nama Mahasiswa"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </CFormGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="nim">Jenis Kelamin</CLabel>
            </CFormGroup>
            <CFormGroup>
              <CFormGroup variant="custom-radio" inline>
                <CInputRadio
                  custom
                  id="L"
                  name="kelamin"
                  value="L"
                  onChange={(e) => setKelamin(e.target.value)}
                />
                <CLabel variant="custom-checkbox" htmlFor="L">
                  Laki-Laki
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="custom-radio" inline>
                <CInputRadio
                  custom
                  id="P"
                  name="kelamin"
                  value="P"
                  onChange={(e) => setKelamin(e.target.value)}
                />
                <CLabel variant="custom-checkbox" htmlFor="P">
                  Perempuan
                </CLabel>
              </CFormGroup>
            </CFormGroup>
          </CCol>
        </CRow>
        {/* <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="alamat">Alamat</CLabel>
              <CInput
                id="alamat"
                placeholder="Masukan Alamat"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
            </CFormGroup>
          </CCol>
        </CRow> */}
        <CRow>
          <CCol>
            <CFormGroup>
              <CLabel htmlFor="prodi">Program Studi</CLabel>
              <CSelect
                custom
                name="prodi"
                id="prodi"
                value={prodi}
                onChange={(e) => setProdi(e.target.value)}
              >
                <option value="0">-- pilih prodi --</option>
                {dataProdi.map((x, i) => (
                  <option key={i} value={x.id}>
                    {x.nama_prodi}
                  </option>
                ))}
              </CSelect>
            </CFormGroup>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="success" onClick={() => handleTambah()}>
          Tambah
        </CButton>
        <CButton color="secondary" onClick={() => setModal(false)}>
          Batal
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalTambah;
