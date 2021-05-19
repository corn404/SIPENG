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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateFakultas } from "src/redux/actions/fakultas";

const ModalUpdate = ({ modal, setModal, item }) => {
  const dispatch = useDispatch();
  const [nama, setNama] = useState("");
  const [id, setId] = useState("");

  const handleTambah = () => {
    if (nama !== "") {
      dispatch(updateFakultas(id, nama));
      setNama("");
      setModal(false);
    }
  };

  useEffect(() => {
    setNama(item.nama_fakultas);
    setId(item.id);
  }, [item]);

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Update Fakultas</CModalTitle>
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
