import { forwardRef } from 'react';
import React, { useState, useEffect } from "react"
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable from "material-table";
import Axios from 'axios'
import { BASEURL } from './Constent';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};



const Table = () => {
    const [data, setData] = useState([])
    const [editModal, setEditModal] = React.useState(false);
    const [selected, setSelected] = useState()
    const [render, setRender] = useState(false)
    const [deleteModal, setDeleteModal] = React.useState(false);

    const getData = async () => {
        const userData = await Axios.get(`${BASEURL}api/user/get-user`)
        setData(userData.data.data)
    }
    useEffect(() => {
        if (!render) setRender(false)
        getData()
    }, [render])
    const columns = [
        { title: "ID", field: "_id" },
        { title: "Name", field: "name" },
        { title: "Email", field: "email" },
        { title: "Phone Number", field: "phoneno" }
    ]



    return (
        <>
            <ToastContainer />
            <EditModal
                show={editModal}
                onHide={() => setEditModal(false)}
                selected={selected}
                setRender={setRender}
            />
            <DeleteModal
                show={deleteModal}
                onHide={() => setDeleteModal(false)}
                selected={selected}
                setRender={setRender}
            />
            <MaterialTable
                title="Users"
                data={data}
                icons={tableIcons}
                columns={columns}
                options={
                    {
                        actionsColumnIndex: -1,
                        addRowPosition: "first",
                        pageSize: 10,
                    }

                }
                actions={
                    [
                        {
                            icon: Edit,
                            tooltip: 'Edit User',
                            onClick: (e, rowData) => {
                                setEditModal(true)
                                setSelected(rowData)
                            }
                        },
                        {
                            icon: DeleteOutline,
                            tooltip: 'Delete User',
                            onClick: (e, rowData) => {
                                setDeleteModal(true)
                                setSelected(rowData._id)
                            }
                        },
                    ]}
            />
        </>
    )
}


export default Table


function EditModal(props) {
    console.log("edit modal props", props)
    const [input, setInput] = useState({})
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...input, [name]: value })
    }
    const handleEdit = async (e) => {
        e.preventDefault();
        await Axios.post(`${BASEURL}api/user/update-user`, { id: props.selected?._id, name: input.name, email: input.email, phoneno: input.number })
            .then(data => {
                if (data.data.errorcode === 0) {
                    toast.success(`${data.data.message}`, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    props.setRender(true)
                    props.onHide()
                    setInput({})

                }
                else {
                    toast.error(`${data.data.message}`, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            })
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit User Data
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder={props.selected?.name} name="name" id="name" value={input.name || ""} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder={props.selected?.email} name="email" id="email" value={input.email || ""} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type="number" placeholder={props.selected?.phoneno} name="number" id="number" value={input.number || ""} onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleEdit}>Edit</Button>
            </Modal.Footer>
        </Modal>
    );
}


function DeleteModal(props) {
    console.log("props.selected?._id", props.selected)
    const handleDelete = async (e) => {
        await Axios.delete(`${BASEURL}api/user/delete-user/${props.selected}`)
            .then(data => {
                if (data.data.errorcode === 0) {
                    toast.success(`${data.data.message}`, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    props.setRender(true)
                    props.onHide()

                }
                else {
                    toast.error(`${data.data.message}`, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            })
    }
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Body>
                <div className='text-center'>
                    <h4>Are you sure ?</h4>
                    <Button variant="primary" onClick={props.onHide}>No</Button>
                    <Button variant="danger" onClick={handleDelete}>Yes</Button>
                </div>

            </Modal.Body>

        </Modal>
    );
}