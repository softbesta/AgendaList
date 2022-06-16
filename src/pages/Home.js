import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { Header, SelectTable, ModalInput, ModalDelete } from '../components';

import useAgendaFunctions from '../hooks/useAgendaFunctions';

const Home = () => {

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDel, setShowModalDel] = useState(false);

  const selectedCollection = useSelector(state => state.agenda.selected);
  const agendaFunctions = useAgendaFunctions();

  const handleItemAdd = (value) => {
    agendaFunctions.addAgenda(value);
  }
  const handleItemDelete = () => {
    agendaFunctions.deleteAgenda(selectedCollection.map(item => item.id));
  }

  return (
    <div>
      <Header />
      <div className="container fs-6 px-lg-5 d-flex flex-column">
        <div className="mb-1">
          <Button
            className='btn fs-6 me-3'
            color='success'
            style={{ backgroundColor: '#5cb85c' }}
            size='lg'
            onClick={() => setShowModalAdd(!showModalAdd)}
          >
            <FontAwesomeIcon icon={faPlusCircle} size="lg" />
            &nbsp; Add
          </Button>
          <ModalInput
            modalType='add'
            show={showModalAdd}
            setShow={setShowModalAdd}
            handleSubmit={handleItemAdd}
          />

          <Button
            className='btn fs-6'
            color='danger'
            style={{ backgroundColor: '#d9534f' }}
            size='lg'
            onClick={() => setShowModalDel(!showModalDel)}
          >
            <FontAwesomeIcon icon={faMinusCircle} size="lg" />
            &nbsp; Delete
          </Button>
          <ModalDelete
            show={showModalDel}
            setShow={setShowModalDel}
            handleSubmit={handleItemDelete}
          />

        </div>
        <SelectTable />
      </div>
    </div>
  )
}
export default Home;