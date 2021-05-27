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
import { updateFakultas } from "src/redux/actions/fakultas";
import { updateProdi } from "src/redux/actions/prodi";
import Swal from "sweetalert2";

const ModalUpdate = ({ modal, setModal, item }) => {
  const dispatch = useDispatch();
  const [nama, setNama] = useState("");
  const [fakultas, setFakultas] = useState(0);
  const dataFakultas = useSelector((x) => x.fakultas.fakultas);
  const [id, setId] = useState(0);

  // console.log(item);

  const handleTambah = () => {
    if (nama === "") {
      pesanError("nama masih kosong");
    } else if (fakultas === 0) {
      pesanError("fakultas belum dipilih");
    } else {
      dispatch(updateProdi(id, nama, fakultas));
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

  useEffect(() => {
    setNama(item.nama_prodi);
    setFakultas(item.id_fakultas);
    setId(item.id);
  }, [item]);

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Update Prodi</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol xs="12">
            <CFormGroup>
              <CLabel htmlFor="name">Nama Prodi</CLabel>
              <CInput
                id="name"
                placeholder="Masukan Nama Prodi"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </CFormGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormGroup>
              <CLabel htmlFor="fakultas">Fakultas</CLabel>
              <CSelect
                custom
                name="fakultas"
                id="fakultas"
                value={fakultas}
                onChange={(e) => setFakultas(e.target.value)}
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
