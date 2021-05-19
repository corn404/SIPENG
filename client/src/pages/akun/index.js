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
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "src/redux/actions/users";
import ModalTambah from "./ModalTambah";
import { getFakultas } from "src/redux/actions/fakultas";
import { IoEye, IoTrash } from "react-icons/io5";
import Swal from "sweetalert2";
import ModalUpdate from "./ModalUpdate";

const Akun = () => {
  const dispatch = useDispatch();
  const dataUsers = useSelector((x) => x.users.data);
  const [modal, setModal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [item, setItem] = useState(null);
  const columns = [
    { key: "no", label: "NO", _style: { width: "50px" } },
    { key: "nama_lengkap", label: "NAMA LENGKAP" },
    { key: "username", label: "USERNAME" },
    { key: "role", label: "ACCESS", _style: { textAlign: "center" } },
    { key: "aksi", label: "AKSI", _style: { width: "100px" } },
  ];

  const handleHapus = (uuid) => {
    Swal.fire({
      title: "Apakah anda yakin ?",
      text: "Anda akan menghapus user ini",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(uuid));
      }
    });
  };

  const handleUpdate = async (item) => {
    console.log(item);
    await setItem(item);
    await setModalUpdate(true);
  };

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getFakultas());
  }, []);
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Akun
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
            items={dataUsers}
            fields={columns}
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            pagination
            tableFilter
            scopedSlots={{
              no: (item, i) => <td>{i + 1}</td>,
              role: (item) => (
                <>
                  <td style={{ textAlign: "center" }}>
                    {item.role == "admin" ? (
                      <CBadge color="success">{item.role}</CBadge>
                    ) : (
                      <CBadge color="info">{item.role}</CBadge>
                    )}
                  </td>
                </>
              ),
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
                      onClick={() => handleHapus(item.uuid)}
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

export default Akun;
