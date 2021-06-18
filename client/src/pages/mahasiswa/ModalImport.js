import {
  CButton,
  CCol,
  CFormGroup,
  CInputFile,
  CLabel,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSelect,
} from "@coreui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "src/redux/actions";
import { getMahasiswa } from "src/redux/actions/mahasiswa";
import { getProdi } from "src/redux/actions/prodi";
import Swal from "sweetalert2";
import Downloads from "./Downloads";

const ModalImport = ({ modal, setModal, item }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [prodi, setProdi] = useState(0);
  const dataProdi = useSelector((x) => x.prodi.prodi);

  const kosong = () => {
    setFile(null);
    setProdi(0);
    setModal(false);
  };

  const handleChange = (e) => {
    setFile(e[0]);
  };

  const handleImport = () => {
    if (file !== null) {
      const data = new FormData();
      data.append("file", file);
      data.append("prodi", prodi);
      axios
        .post(`${BASE_URL}/mahasiswa/import`, data)
        .then((e) => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Import data berhasil!",
          });
          kosong();
          dispatch(getMahasiswa());
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Ooops!",
            text: "Import data GAGAL!",
          });
        });
    }
  };

  const handleBatal = () => setModal(false);

  useEffect(() => {
    dispatch(getProdi());
  }, []);

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Import Data Mahasiswa</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol>
            <p>
              Silahkan download tempate import data mahasiswa{" "}
              {/* <CButton color="primary" variant="outline">
                disini
              </CButton> */}
              <Downloads />
            </p>
          </CCol>
        </CRow>

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

        <CRow>
          <CCol>
            <CFormGroup>
              <CLabel htmlFor="file">Cari File</CLabel>
              <CRow>
                <CCol>
                  <input
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={(e) => handleChange(e.target.files)}
                  />
                </CCol>
              </CRow>
            </CFormGroup>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="success" onClick={() => handleImport()}>
          Import
        </CButton>
        <CButton color="secondary" onClick={() => handleBatal()}>
          Batal
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalImport;
