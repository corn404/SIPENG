import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CRow,
  CCol,
  CDataTable,
} from "@coreui/react";
import ModalTambah from "./ModalTambah";
import { useDispatch, useSelector } from "react-redux";
import { deleteFakultas, getFakultas } from "src/redux/actions/fakultas";
import { IoEye, IoTrash } from "react-icons/io5";
import Swal from "sweetalert2";
import ModalUpdate from "./ModalUpdate";

const Fakultas = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [item, setItem] = useState(null);
  const dataFakultas = useSelector((x) => x.fakultas.fakultas);

  const columns = [
    { key: "no", label: "NO", _style: { width: "50px" } },
    { key: "nama_fakultas", label: "FAKULTAS" },
    { key: "aksi", label: "AKSI", _style: { width: "100px" } },
  ];

  const handleHapus = (id) => {
    Swal.fire({
      title: "Apakah anda yakin ?",
      text: "Anda akan menghapus fakultas ini",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFakultas(id));
      }
    });
  };

  const handleUpdate = async (item) => {
    await setItem(item);
    await setModalUpdate(true);
  };

  useEffect(() => {
    dispatch(getFakultas());
  }, []);

  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Fakultas
              </h4>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton
                color="primary"
                className="float-right"
                onClick={() => setModal(!modal)}
              >
                Tambah
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={dataFakultas}
            fields={columns}
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            tableFilter
            pagination
            scopedSlots={{
              no: (item, i) => <td>{i + 1}</td>,
              aksi: (item) => (
                <>
                  <td style={{ display: "flex" }}>
                    <CButton
                      color="info"
                      size="sm"
                      style={{ margin: 5 }}
                      onClick={() => handleUpdate(item)}
                    >
                      <IoEye />
                    </CButton>
                    <CButton
                      color="danger"
                      size="sm"
                      style={{ margin: 5 }}
                      onClick={() => handleHapus(item.id)}
                    >
                      <IoTrash />
                    </CButton>
                  </td>
                </>
              ),
            }}
          />
        </CCardBody>
      </CCard>
      <ModalTambah modal={modal} setModal={setModal} />
      {item && (
        <ModalUpdate
          modal={modalUpdate}
          setModal={setModalUpdate}
          item={item}
        />
      )}
    </>
  );
};

export default Fakultas;
