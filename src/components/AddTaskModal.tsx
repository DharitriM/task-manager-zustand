import { Modal, Button, Input, Form } from "antd";
import useTaskStore from "../store/taskStore";

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  column: string;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ open, onClose, column }) => {
  const [form] = Form.useForm();
  const addTask = useTaskStore((state) => state.addTask);

  const handleAddTask = () => {
    form.validateFields().then((values) => {
      addTask({
        id: Date.now().toString(),
        title: values.title,
        description: values.description,
        status: column as "todo" | "inProgress" | "done" | "hold",
      });
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal
      title="Add New Task"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>Cancel</Button>,
        <Button key="submit" type="primary" onClick={handleAddTask}>Add</Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter a title!" }]}>
          <Input placeholder="Enter task title" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Enter task description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTaskModal;
