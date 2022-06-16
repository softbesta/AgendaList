import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from 'reactstrap';

const ModalDelete = ({ show = false, setShow, handleSubmit }) => {

  const handleOnSubmit = (e) => {
    e.preventDefault();

    handleSubmit();
    toggleShow();
  }
  const toggleShow = () => {
    setShow(!show);
  }

  return (
    <>
      <Modal
        isOpen={show}
        toggle={toggleShow}
      >
        <ModalHeader toggle={toggleShow}>
          Add an Agenda
        </ModalHeader>
        <Form onSubmit={(e) => handleOnSubmit(e)}>
          <ModalBody>
            Are you sure you want to delete items?
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={toggleShow}
              color='danger'
            >
              &nbsp; Cancel
            </Button>
            <Button
              type='submit'
              style={{ backgroundColor: '#5cb85c', borderColor: '#5cb85c' }}
            >
              &nbsp; Confirm
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  )
}

export default ModalDelete;