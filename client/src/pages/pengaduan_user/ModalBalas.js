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
  CTextarea,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { balasPengaduan } from "src/redux/actions/pengaduan";
import Swal from "sweetalert2";

const ModalBalas = ({ modal, setModal, item }) => {
  const dispatch = useDispatch();
  const [pesan, setPesan] = useState("");
  const [id, setId] = useState("");

  const handleTambah = () => {
    if (pesan === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pesan balasan masih kosong",
      });
    } else {
      dispatch(balasPengaduan(id, pesan));
      setPesan("");
      setModal(false);
    }
  };

  useEffect(() => {
    setId(item.id);
  }, [item]);
  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Balas Aduan</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="pesan">Pesan Balasan</CLabel>
              <CTextarea
                name="pesan"
                id="pesan"
                rows="9"
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                placeholder="isi pesan..."
              />
            </CFormGroup>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="success" onClick={() => handleTambah()}>
          Balas
        </CButton>
        <CButton color="secondary" onClick={() => setModal(false)}>
          Batal
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalBalas;
