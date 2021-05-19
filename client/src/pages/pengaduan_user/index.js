import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CRow,
  CCol,
  CDataTable,
  CBadge,
} from "@coreui/react";
// import DataTable from "react-data-table-component";
// import ModalTambah from "./ModalTambah";
import { useDispatch, useSelector } from "react-redux";
import ModalImage from "react-modal-image";
import {
  getPengaduanByFakultas,
  hapusPengaduanFakultas,
} from "src/redux/actions/pengaduan";
import { SOCKETS_URL } from "src/redux/actions";
import { IoChatboxSharp, IoTrash } from "react-icons/io5";
import Swal from "sweetalert2";
import ModalBalas from "./ModalBalas";

const Pengaduan = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState(item);
  const dataPengaduan = useSelector((x) => x.pengaduan.data);
  const users = useSelector((x) => x.users.currentUser);

  const columns = [
    { key: "no", label: "NO", _style: { width: "50px" } },
    { key: "kategori", label: "KATEGORI", _style: { width: "200px" } },
    { key: "nama_fakultas", label: "FAKULTAS", _style: { width: "200px" } },
    { key: "keterangan", label: "DESKRIPSI" },
    { key: "foto", label: "FOTO", _style: { width: "100px" } },
    { key: "aksi", label: "AKSI", _style: { width: "100px" } },
  ];

  const handleHapus = (item) => {
    Swal.fire({
      title: "Apakah anda ingin menghapus pengaduan ini ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(hapusPengaduanFakultas(item.id));
      }
    });
  };

  const handleBalas = async (item) => {
    await setItem(item);
    await setModal(true);
  };

  useEffect(() => {
    dispatch(getPengaduanByFakultas(users.id_fakultas));
  }, []);

  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Data Pengaduan
              </h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={dataPengaduan}
            fields={columns}
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            pagination
            tableFilter
            scopedSlots={{
              no: (item, i) => <td>{i + 1}</td>,
              foto: (item) => (
                <td>
                  <div style={{ width: 30, height: 30, overflow: "hidden" }}>
                    <ModalImage
                      hideZoom={false}
                      small={`${SOCKETS_URL}/uploads/pengaduan/${item.foto}`}
                      large={`${SOCKETS_URL}/uploads/pengaduan/${item.foto}`}
                      alt={item.kategori}
                    />
                  </div>
                </td>
              ),
              aksi: (item) => (
                <>
                  {item.status === 0 ? (
                    <td style={{ textAlign: "center" }}>
                      <CButton
                        color="info"
                        size="sm"
                        style={{ marginRight: 5 }}
                        onClick={() => handleBalas(item)}
                      >
                        <IoChatboxSharp />
                      </CButton>
                      <CButton
                        color="danger"
                        size="sm"
                        onClick={() => handleHapus(item)}
                      >
                        <IoTrash />
                      </CButton>
                    </td>
                  ) : (
                    <td style={{ textAlign: "center" }}>
                      <CBadge color="success">dibalas</CBadge>
                    </td>
                  )}
                </>
              ),
            }}
          />
        </CCardBody>
      </CCard>
      {item && <ModalBalas modal={modal} setModal={setModal} item={item} />}
    </>
  );
};

export default Pengaduan;
