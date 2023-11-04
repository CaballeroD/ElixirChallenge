import { Table, Center, Avatar } from '@mantine/core';
import { User } from '../UserList/user';

interface UsersTableProps {
  users: User[];
  onUserClick: (user: User) => void;
}

function UsersTable({ users, onUserClick }: UsersTableProps) {
  const centeredCell = (content: React.ReactNode, idx: number) => (
    <Table.Td key={idx}>
      <Center>{content}</Center>
    </Table.Td>
  );

  const rows = users.map((user: User) => {
    const userProperties = [
      <Avatar
        variant="filled"
        src={user.picture.thumbnail}
        alt={`${user.name.first} ${user.name.last}`}
        radius="xl"
        size={50}
      />,
      `${user.name.first} ${user.name.last}`,
      user.location.country,
      user.email,
      user.phone,
    ];
    return (
      <Table.Tr key={user.email} onClick={() => onUserClick(user)}>
        {userProperties.map((property, index) => centeredCell(property, index))}
      </Table.Tr>
    );
  });

  const headers = ['Foto', 'Nombre Completo', 'País', 'Correo Electrónico', 'Teléfono'].map(
    (header) => (
      <Table.Th key={header}>
        <Center>{header}</Center>
      </Table.Th>
    )
  );

  return (
    <Table
      captionSide="top"
      striped
      highlightOnHover
      withTableBorder
      withColumnBorders
      withRowBorders={false}
    >
      <Table.Thead>
        <Table.Tr>{headers}</Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default UsersTable;
