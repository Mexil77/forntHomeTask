import { format } from "@formkit/tempo";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { Task } from "../types";
import { TaskStatus } from "../enums";

type ModalTaskProps = {
  task: Task;
  show: boolean;
  setShow: (show: boolean) => void;
};

export default function ModalTaskform({ task, show, setShow }: ModalTaskProps) {
  const [modalForm, setModalForm] = useState<Task>(task);

  useEffect(() => {
    setModalForm(task);
  }, [task]);

  return (
    <Modal
      className="ModalTask"
      show={show}
      onHide={() => setShow(false)}
      closebutton="true"
    >
      {task._id ? (
        <Modal.Header>{`${task.name} #${task._id}`}</Modal.Header>
      ) : (
        <Modal.Header>Nueva tarea</Modal.Header>
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
              value={format(modalForm.date, "YYYY-MM-DD")}
              onChange={(e) =>
                setModalForm({ ...modalForm, date: new Date(e.target.value) })
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
            />
            <Form.Check
              type="radio"
              label="Pendiente"
              name="taskStatus"
              value={TaskStatus.PENDING}
              checked={modalForm.status === TaskStatus.PENDING}
            />
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {task._id ? (
          <Button variant="primary" onClick={() => setShow(false)}>
            Guardar
          </Button>
        ) : (
          <Button variant="success" onClick={() => setShow(false)}>
            Crear
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
