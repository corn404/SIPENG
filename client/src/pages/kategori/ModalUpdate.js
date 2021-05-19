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
import { updateKategori } from "src/redux/actions/kategori";

const ModalUpdate = ({ modal, setModal, item }) => {
  const dispatch = useDispatch();
  const [nama, setNama] = useState("");
  const [id, setId] = useState("");
  const handleUpdate = () => {
    if (nama !== "") {
      dispatch(updateKategori(id, nama));
      setNama("");
      setModal(false);
    }
  };

  useEffect(() => {
    setNama(item.kategori);
    setId(item.id);
  }, [item]);

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Update Kategori</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="name">Kategori</CLabel>
              <CInput
                id="name"
                placeholder="Masukan Nama Kategori"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </CFormGroup>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="success" onClick={() => handleUpdate()}>
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
