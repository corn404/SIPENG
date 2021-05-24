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
import { IoEye, IoReload, IoTrash } from "react-icons/io5";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMahasiswa,
  getMahasiswa,
  getMahasiswaFakultas,
  resetPassword,
} from "src/redux/actions/mahasiswa";
import ModalTambah from "./ModelTambah";
import ModalInfo from "./ModalInfo";
import { Message } from "src/redux/actions";

const Mahasiswa = () => {
  const [modal, setModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [item, setItem] = useState(null);
  const dataMahasiswa = useSelector((x) => x.mahasiswa.data);
  const users = useSelector((x) => x.users.currentUser);
  const dispatch = useDispatch();

  const columns = [
    { key: "no", label: "NO", _style: { width: "50px" } },
    { key: "nim", label: "NIM" },
    { key: "nama", label: "NAMA MAHASISWA" },
    {
      key: "kelamin",
      label: "KELAMIN",
      _style: { textAlign: "center", width: "150px" },
    },
    { key: "nama_fakultas", label: "FAKULTAS" },
    { key: "nama_prodi", label: "PRODI" },
    {
      key: "reset",
      label: "RESET PASSWORD",
      _style: { width: "150px", textAlign: "center" },
    },
    {
      key: "aksi",
      label: "AKSI",
      _style: { width: "100px", textAlign: "center" },
    },
  ];

  const handleReset = (item) => {
    Swal.fire({
      title: "Apakah anda yakin ?",
      text: "Reset Password",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(resetPassword(item.id, item.nim));
      }
    });
  };

  const handleHapus = (id) => {
    Swal.fire({
      title: "Apakah anda yakin ?",
      text: "Anda akan menghapus mahasiswa ini",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMahasiswa(id, (err, res) => {
          if (res) {
            Message.fire({
              icon: "success",
              title: "Data mahasiswa berhasil dihapus",
            });
            dispatch(getMahasiswaFakultas(users.id_fakultas));
          } else {
            Message.fire({
              icon: "error",
              title: "Ada masalah pada server, silahkan hubungi admin",
            });
          }
        });
      }
    });
  };

  const handleInfo = async (item) => {
    await setItem(item);
    await setModalInfo(true);
  };

  useEffect(() => {
    dispatch(getMahasiswaFakultas(users.id_fakultas));
  }, []);

  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Mahasiswa
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
            items={dataMahasiswa}
            fields={columns}
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            pagination
            tableFilter
            scopedSlots={{
              no: (item, i) => <td>{i + 1}</td>,
              kelamin: (item) => (
                <td style={{ textAlign: "center" }}>
                  {item.kelamin === "L" ? "Laki-Laki" : "Perempuan"}
                </td>
              ),
              reset: (item) => (
                <td style={{ textAlign: "center" }}>
                  <CButton
                    color="warning"
                    size="sm"
                    onClick={() => handleReset(item)}
                  >
                    <IoReload />
                  </CButton>
                </td>
              ),
              aksi: (item) => (
                <>
                  <td style={{ display: "flex" }}>
                    <CButton
                      color="info"
                      size="sm"
                      style={{ margin: 5 }}
                      onClick={() => handleInfo(item)}
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
      <ModalInfo modal={modalInfo} setModal={setModalInfo} item={item} />
    </>
  );
};

export default Mahasiswa;
