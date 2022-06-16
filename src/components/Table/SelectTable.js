import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'reactstrap';

import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import useAgendaFunctions from '../../hooks/useAgendaFunctions';
import ModalInput from '../ModalInput';
import ModalDelete from '../ModalDelete';

const SelectTable = () => {
  const agendaData = useSelector(state => state.agenda.list);

  const countPerPage = 5;
  const [masterChecked, setMasterChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    agendaData.slice(0, countPerPage).map(item => ({ ...item, selected: false }))
  );

  const [actionItem, setActionItem] = useState({});
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDel, setShowModalDel] = useState(false);
  const modalInitValue = useRef({});

  const agendaFunctions = useAgendaFunctions();

  const onMasterCheck = (e) => {
    const tmpItems = collection.map(item => {
      return { ...item, selected: e.target.checked };
    });

    setMasterChecked(e.target.checked);
    setCollection(tmpItems);
  }
  const onItemCheck = (e, item) => {
    const tmpItems = collection.map((collect) => {
      if (collect.id === item.id)
        return { ...collect, selected: e.target.checked };
      return collect;
    });

    setCollection(tmpItems);
  }
  const getSelectedRows = () => {
    return collection.filter((item) => item.selected);
  }

  const updatePage = p => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(agendaData.slice(from, to).map(item => ({ ...item, selected: false })));
  };

  const handleModalEdit = (item) => {
    modalInitValue.current = item;
    setShowModalEdit(!showModalEdit);
  }
  const handleActionDel = (item) => {
    setActionItem(item);
    setShowModalDel(!showModalDel);
  }
  const handleItemEdit = (value) => {
    const item = {
      id: value.id,
      title: value.title,
      description: value.description,
      date: value.date,
    }
    agendaFunctions.updateAgenda(item);
  }
  const handleItemDelete = () => {
    agendaFunctions.deleteAgenda(actionItem.id);
  }

  useEffect(() => {
    if (collection.length <= 0 && currentPage > 1) {
      updatePage(currentPage - 1);
      return;
    }
    let masterCheck = false;
    if(agendaData.length > 0) {
      masterCheck = getSelectedRows().length === (countPerPage < agendaData.length ? countPerPage : agendaData.length);
    }
    setMasterChecked(masterCheck);
    agendaFunctions.setSelectedAgenda(collection.filter((item) => item.selected));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection]);

  useEffect(() => {
    updatePage(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, agendaData]);

  const tableHeaderData = () => {
    return (
      <tr className="align-middle">
        <th key={-1}>
          <input
            type="checkbox"
            className="form-check-input fs-5"
            checked={masterChecked}
            id="mastercheck"
            onChange={(e) => onMasterCheck(e)}
          />
        </th>
        <th>Title</th>
        <th>Description</th>
        <th>Date</th>
        <th>Edit</th>
      </tr>
    )
  };
  const tableBodyData = () => {
    return collection.map((item) => (
      <tr key={item.id} className={clsx(item.selected && "selected", "align-middle")}>
        <th scope="row">
          <input
            type="checkbox"
            checked={item.selected}
            className="form-check-input fs-5"
            id={`rowcheck-${item.id}`}
            onChange={(e) => onItemCheck(e, item)}
          />
        </th>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{item.date}</td>
        <td>
          <Button
            color='link'
            onClick={() => handleModalEdit(item)}
          >
            <FontAwesomeIcon color='#fec928' icon={faPencilAlt} size="lg" />
          </Button>
          <Button
            color='link'
            // onClick={() => setShowModalDel(!showModalDel)}
            onClick={() => handleActionDel(item)}
          >
            <FontAwesomeIcon color='#d9534f' icon={faTrash} size="lg" />
          </Button>
        </td>
      </tr>
    ))
  }

  const paginationOptions = (current, type, element) => {
    if (type === 'prev') {
      return 'Previous'
    }
    if (type === 'next') {
      return 'Next'
    }
    if (type === 'page') {
      return <div className={current === currentPage ? 'btn btn-primary' : 'btn btn-light'}>{current}</div>;
    }
    return element;
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-no-border">
            <thead style={{ color: '#435d7d' }}>
              {tableHeaderData()}
            </thead>
            <tbody className="text-secondary border-top-0">
              {tableBodyData()}
            </tbody>
          </table>

          <div className='d-flex justify-content-between'>
            <div className='align-self-center'>
              <p className='text-secondary m-0'>
                Showing <strong>{collection.length}</strong> out of <strong>{agendaData.length}</strong> entities
              </p>
            </div>
            <PaginationContainer>
              <Pagination
                pageSize={countPerPage}
                onChange={updatePage}
                current={currentPage}
                total={agendaData.length}
                showTitle={false}
                itemRender={paginationOptions}
              />
            </PaginationContainer>
          </div>
        </div>
      </div>

      {showModalEdit && <ModalInput
        modalType='edit'
        initValue={modalInitValue.current}
        show={showModalEdit}
        setShow={setShowModalEdit}
        handleSubmit={handleItemEdit}
      />}
      <ModalDelete
        show={showModalDel}
        setShow={setShowModalDel}
        handleSubmit={handleItemDelete}
      />
    </>
  );
}

export default SelectTable;

const PaginationContainer = styled.div`
  li {
    border: none;
    height: auto;
  }
  .btn-light {
    background-color: transparent;
  }
  .rc-pagination-disabled {
    color: rgb(108, 117, 125);
  }
`;

