import {
  CButton,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { useDispatch } from "react-redux";

const ModalInfo = ({ modal, setModal, item }) => {
  const dispatch = useDispatch();

  return (
    <CModal show={modal} onClose={setModal}>
      <CModalHeader closeButton>
        <CModalTitle>Profil Mahasiswa</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {item && (
          <CListGroup>
            <CListGroupItem>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: 5, width: 150 }}>NIM</div>
                <div style={{ marginRight: 5 }}>:</div>
                <div>{item.nim}</div>
              </div>
            </CListGroupItem>
            <CListGroupItem>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: 5, width: 150 }}>Nama</div>
                <div style={{ marginRight: 5 }}>:</div>
                <div>{item.nama}</div>
              </div>
            </CListGroupItem>
            <CListGroupItem>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: 5, width: 150 }}>Kelamin</div>
                <div style={{ marginRight: 5 }}>:</div>
                <div>{item.kelamin === "L" ? "Laki-Laki" : "Perempuan"}</div>
              </div>
            </CListGroupItem>
            <CListGroupItem>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: 5, width: 150 }}>Alamat</div>
                <div style={{ marginRight: 5 }}>:</div>
                <div>{item.alamat}</div>
              </div>
            </CListGroupItem>
            <CListGroupItem>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: 5, width: 150 }}>Fakultas</div>
                <div style={{ marginRight: 5 }}>:</div>
                <div>{item.nama_fakultas}</div>
              </div>
            </CListGroupItem>
          </CListGroup>
        )}
      </CModalBody>
    </CModal>
  );
};

export default ModalInfo;
