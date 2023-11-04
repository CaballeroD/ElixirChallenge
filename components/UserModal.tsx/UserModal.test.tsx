import React from 'react';
import { RecoilRoot } from 'recoil';
import { render, screen } from '@/test-utils';
import UserModal from './UserModal';
import { mockUsers } from '@/test-utils/mockUser';
import { modalOpenAtom } from '../Store/ModalOpenAtom';

describe('<UserModal /> Component', () => {
  const mockSetSelectedUser = jest.fn();
  const user = mockUsers[0];

  it('renderiza los detalles del usuario cuando selectedUser tiene valor', () => {
    render(
      <RecoilRoot initializeState={(snapshot) => snapshot.set(modalOpenAtom, true)}>
        <UserModal selectedUser={user} setSelectedUser={mockSetSelectedUser} />
      </RecoilRoot>
    );

    expect(screen.getByText('Detalles del usuario')).toBeInTheDocument();
    expect(
      screen.getByText(`${user.name.title} ${user.name.first} ${user.name.last}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`País: ${user.location.country}`)).toBeInTheDocument();
    expect(screen.getByText(`Estado: ${user.location.state}`)).toBeInTheDocument();
    expect(screen.getByText(`Ciudad: ${user.location.city}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Calle: ${user.location.street.name} Nº${user.location.street.number}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Email: ${user.email}`)).toBeInTheDocument();
    expect(screen.getByText(`Teléfono: ${user.phone}`)).toBeInTheDocument();
    expect(screen.getByText(`Nombre de usuario: ${user.login.username}`)).toBeInTheDocument();
    expect(screen.getByText(`Edad registrada: ${user.registered.age} años`)).toBeInTheDocument();
  });

  it('no renderiza el modal cuando selectedUser es null', () => {
    render(
      <RecoilRoot initializeState={(snapshot) => snapshot.set(modalOpenAtom, false)}>
        <UserModal selectedUser={null} setSelectedUser={mockSetSelectedUser} />
      </RecoilRoot>
    );

    expect(screen.queryByText('Detalles del usuario')).not.toBeInTheDocument();
  });
});
