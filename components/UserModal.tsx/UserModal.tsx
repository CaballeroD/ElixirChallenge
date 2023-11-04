import { Avatar, Center, Modal, Container, Text, Divider, Space } from '@mantine/core';
import { useRecoilState } from 'recoil';
import { User } from '../UserList/user';
import { modalOpenAtom } from '../Store/ModalOpenAtom';

interface UserModalProps {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
}

const UserModal: React.FC<UserModalProps> = ({ selectedUser, setSelectedUser }) => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalOpenAtom);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  return (
    <Modal opened={isModalOpen} onClose={closeModal} title="Detalles del usuario" centered>
      {selectedUser && (
        <Container size="md">
          <Center>
            <Avatar
              variant="filled"
              src={selectedUser.picture.large}
              alt={`${selectedUser.name.first} ${selectedUser.name.last}`}
              radius="xl"
              size={80}
            />
          </Center>
          <Space h="md" />
          <Text ta="center" size="xl" fw={500}>
            {`${selectedUser.name.title} ${selectedUser.name.first} ${selectedUser.name.last}`}
          </Text>
          <Divider />
          <Space h="md" />
          <Text>País: {selectedUser.location.country}</Text>
          <Text>Estado: {selectedUser.location.state}</Text>
          <Text>Ciudad: {selectedUser.location.city}</Text>
          <Text>
            Calle: {selectedUser.location.street.name} Nº{selectedUser.location.street.number}
          </Text>
          <Divider />
          <Space h="md" />
          <Text>Email: {selectedUser.email}</Text>
          <Text>Teléfono: {selectedUser.phone}</Text>
          <Divider />
          <Space h="md" />
          <Text>Nombre de usuario: {selectedUser.login.username}</Text>
          <Text>Edad registrada: {selectedUser.registered.age} años</Text>
        </Container>
      )}
    </Modal>
  );
};

export default UserModal;
