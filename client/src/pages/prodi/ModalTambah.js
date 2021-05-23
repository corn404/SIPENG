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
} from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { tambahFakultas } from "src/redux/actions/fakultas";

const ModalTambah = ({ modal, setModal }) => {
  const dispatch = useDispatch();
  const [nama, setNama] = useState("");

  const handleTambah = () => {
    if (nama !== "") {
      dispatch(tambahFakultas(nama));
      setNama("");
      setModal(false);
    }
  };

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Tambah Fakultas</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="name">Fakultas</CLabel>
              <CInput
                id="name"
                placeholder="Masukan Nama Fakultas"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
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
