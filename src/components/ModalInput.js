import { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Container
} from 'reactstrap';

const ModalInput = ({
  modalType, initValue = { title: "", description: "", date: "" },
  show = false, setShow, handleSubmit 
}) => {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    setValue(initValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!value.title || !value.description || !value.date) {
      return;
    }
    // console.log('value', value);
    handleSubmit(value);
    toggleShow();
  }
  const handleChange = (e) => {
    e.preventDefault();
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  }
  const toggleShow = () => {
    setValue(initValue);
    setShow(!show);
  }

  return (
    <>
      <Modal
        isOpen={show}
        toggle={toggleShow}
      >
        <ModalHeader toggle={toggleShow}>
          Add an Student
        </ModalHeader>
        <Form onSubmit={(e) => handleOnSubmit(e)}>
          <ModalBody>
            <Container className='px-4'>
              <FormGroup>
                <Label for='_fname'> Title: </Label>
                <Input
                  id='_fname'
                  type='text'
                  name='title'
                  value={value.title}
                  placeholder='Enter Title'
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for='_lname'> Description: </Label>
                <Input
                  id='_lname'
                  type='textarea'
                  name='description'
                  value={value.description}
                  placeholder='Enter Description'
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for='_date'> Date: </Label>
                <Input
                  id='_date'
                  type='date'
                  name='date'
                  value={value.date}
                  placeholder='Enter date'
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>

            </Container>
          </ModalBody>
          <ModalFooter>
            {modalType === 'add' ?
              <Button
                type='submit'
                block
                style={{ backgroundColor: '#5cb85c', borderColor: '#5cb85c' }}
              >
                &nbsp; Add New Student
              </Button>
              :
              <Button
                type='submit'
                block
                color='warning'
              >
                &nbsp; Save Edit
              </Button>
            }
          </ModalFooter>
        </Form>
      </Modal>
    </>
  )
}

export default ModalInput;