import { format } from "@formkit/tempo";
import { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";

type ModalTaskProps = {
  name: string;
  show: boolean;
  date: Date;
  setShow: (show: boolean) => void;
  recurrent: { active: boolean; days: number };
};

export default function ModalTaskform({
  name,
  show,
  date,
  setShow,
  recurrent,
}: ModalTaskProps) {
  const [modalForm, setModalForm] = useState({ name, date, recurrent });
  return (
    <Modal
      className="ModalTask"
      show={show}
      onHide={() => setShow(false)}
      closebutton="true"
    >
      <Modal.Header closeButton>Nueva Tarea</Modal.Header>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => setShow(false)}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
