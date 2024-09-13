import { format } from "@formkit/tempo";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { Task } from "../types";
import { TaskStatus } from "../enums";
import axios from "axios";

const clearTask = {
  name: "",
  dateToDone: new Date(),
  dateDone: new Date(),
  status: TaskStatus.PENDING,
  recurrent: { active: false, days: 0 },
};

type ModalTaskProps = {
  task: Task;
  show: boolean;
  setShow: (show: boolean) => void;
  fetchData: () => Promise<void>;
};

export default function ModalTaskform({
  task,
  show,
  setShow,
  fetchData,
}: ModalTaskProps) {
  const [modalForm, setModalForm] = useState<Task>(task);

  useEffect(() => {
    setModalForm(task);
  }, [task]);

  const handlerSave = async () => {
    try {
      const res = await axios.post("http://localhost:4000/task", modalForm);
      if (res) {
        setShow(false);
        fetchData();
        setModalForm(clearTask);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:4000/task/${modalForm._id}`,
        modalForm
      );
      if (res) {
        setShow(false);
        fetchData();
        setModalForm(clearTask);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/task/${modalForm._id}`
      );
      if (res) {
        setShow(false);
        fetchData();
        setModalForm(clearTask);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      className="ModalTask"
      show={show}
      onHide={() => setShow(false)}
      closebutton="true"
    >
      {task._id ? (
        <Modal.Header>
          <div className="ModalTask_Header">
            <h2>{`${task.name}`}</h2>
            <p>{`#${task.showId}`}</p>
          </div>
        </Modal.Header>
      ) : (
        <Modal.Header>
          <div className="ModalTask_Header">
            <h1>Nueva tarea</h1>
          </div>
        </Modal.Header>
      )}
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={modalForm.name}
              onChange={(e) =>
                setModalForm({ ...modalForm, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cuando debo hacerlo?</Form.Label>
            <Form.Control
              type="date"
              value={format(modalForm.dateToDone, "YYYY-MM-DD")}
              onChange={(e) =>
                setModalForm({
                  ...modalForm,
                  dateToDone: new Date(e.target.value),
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Switch
              label="Sera recurrente?"
              checked={modalForm.recurrent.active}
              onChange={() =>
                setModalForm({
                  ...modalForm,
                  recurrent: {
                    ...modalForm.recurrent,
                    active: !modalForm.recurrent.active,
                  },
                })
              }
            />
            {modalForm.recurrent.active && (
              <>
                <Form.Label>Cada cuantos dias?</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    value={modalForm.recurrent.days}
                    onChange={(e) =>
                      setModalForm({
                        ...modalForm,
                        recurrent: {
                          ...modalForm.recurrent,
                          days: Number(e.target.value),
                        },
                      })
                    }
                  />
                  <InputGroup.Text>dias</InputGroup.Text>
                </InputGroup>
              </>
            )}
          </Form.Group>
          <div className="mb-3">
            <Form.Check
              type="radio"
              label="Hecha"
              name="taskStatus"
              value={TaskStatus.DONE}
              checked={modalForm.status === TaskStatus.DONE}
              onChange={() =>
                setModalForm({
                  ...modalForm,
                  status: TaskStatus.DONE,
                })
              }
            />
            <Form.Check
              type="radio"
              label="Pendiente"
              name="taskStatus"
              value={TaskStatus.PENDING}
              checked={modalForm.status === TaskStatus.PENDING}
              onChange={() =>
                setModalForm({
                  ...modalForm,
                  status: TaskStatus.PENDING,
                })
              }
            />
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {task._id && (
          <Button variant="danger" onClick={handlerDelete}>
            Borrar
          </Button>
        )}
        {task._id ? (
          <Button variant="primary" onClick={handlerUpdate}>
            Guardar
          </Button>
        ) : (
          <Button variant="success" onClick={handlerSave}>
            Crear
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
