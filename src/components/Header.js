import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";

import useAgendaFunctions from '../hooks/useAgendaFunctions';

import {
  Navbar,
  NavbarBrand,
  Container,
  Button
} from 'reactstrap';

function Header(props) {
  const importFile = useRef(null);

  const agendaData = useSelector(state => state.agenda.list);
  const agendaFunctions = useAgendaFunctions();

  const handleImportClick = () => {
    importFile.current.click();
  }
  const onChangeFileImport = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.target.files[0];
    if (!file) return;
    agendaFunctions.importAgenda(file);
  }

  const handleExportClick = () => {
    if (agendaData.length < 1) return;
  
    const data = JSON.stringify(agendaData);
    const blob = new Blob([data], { type: 'json' });
    const a = document.createElement('a');
    a.download = 'agenda_list.json';
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  }

  function getNavbar() {
    return (
      <>
        <Navbar
          dark expand="sm" className="mb-3"
          style={{ backgroundColor: '#435d7d' }}
        >
          <Container className='d-flex justify-content-between align-items-center'>
            <NavbarBrand
              className='fs-1'
            >
              Manage Agenda
            </NavbarBrand>
            <div>
              <input
                type="file"
                ref={importFile}
                style={{ display: 'none' }}
                onChange={onChangeFileImport}
                onClick={(e) => {e.target.value = null}}
              />
              <Button
                className='btn fs-6 me-3'
                color='info'
                size='lg'
                onClick={() => handleImportClick()}
              >
                <FontAwesomeIcon icon={faDownload} size="lg" />
                &nbsp; Import
              </Button>

              <Button
                className='btn fs-6 me-3'
                color='warning'
                size='lg'
                onClick={() => handleExportClick()}
              >
                <FontAwesomeIcon icon={faUpload} size="lg" />
                &nbsp; Export
              </Button>
            </div>
          </Container>
        </Navbar>
      </>
    );
  }

  return getNavbar();
}

export default Header;
