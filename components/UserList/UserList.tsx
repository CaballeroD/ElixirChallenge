import { useEffect } from 'react';
import { ScrollArea, Box, LoadingOverlay } from '@mantine/core';
import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { useMediaQuery } from '@mantine/hooks';
import TableHeader from '../TableHeader/TableHeader';
import { selectedNationalitiesAtom } from '../Store/NationalitySelectorAtom';
import UserModal from '../UserModal.tsx/UserModal';
import UsersTable from '../UsersTable/UsersTable';
import { searchValueAtom } from '../Store/SearchValueAtom';
import { modalOpenAtom } from '../Store/ModalOpenAtom';
import { selectedUserAtom } from '../Store/SelectedUserAtom';
import { APIResponse } from '../Types/queryObject';
import { User } from './user';

function fetchUsers(context: any): Promise<APIResponse> {
  const nationalities = context.queryKey[1];
  const natParam = nationalities.length > 0 ? nationalities.join(',') : null;
  const url = natParam
    ? `https://randomuser.me/api/1.4/?results=50&nat=${natParam}`
    : 'https://randomuser.me/api/1.4/?results=50';

  return fetch(url).then((res) => res.json());
}

function UserList() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalOpenAtom);
  const [searchValue, setSearchValue] = useRecoilState(searchValueAtom);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [selectedNationalities] = useRecoilState(selectedNationalitiesAtom);
  const { data, error, isLoading } = useQuery<APIResponse>(
    ['users', selectedNationalities],
    fetchUsers
  );
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserAtom);
  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  useEffect(() => {
    setSearchValue('');
  }, [selectedNationalities, setSearchValue]);

  if (isLoading)
    return <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />;
  if (error || !data) return <div>Error al cargar los usuarios</div>;

  const filteredUsers = data.results.filter((user: User) =>
    `${user.name.first} ${user.name.last}`.toLowerCase().startsWith(searchValue.toLowerCase())
  );

  const boxWidth = isMobile ? 300 : 1200;

  return (
    <>
      <TableHeader onSearch={setSearchValue} />
      <ScrollArea.Autosize mx="auto" h={700}>
        <Box w={boxWidth}>
          <UsersTable users={filteredUsers} onUserClick={openModal} />
        </Box>
      </ScrollArea.Autosize>
      <UserModal selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
    </>
  );
}

export default UserList;
