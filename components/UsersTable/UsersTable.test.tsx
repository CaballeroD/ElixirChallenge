import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, screen } from '@/test-utils';
import '@testing-library/jest-dom/extend-expect';
import UsersTable from './UsersTable';
import { mockUsers } from '@/test-utils/mockUser';

describe('<UsersTable /> Component', () => {
  it('renderiza los usuarios correctamente', () => {
    render(<UsersTable users={mockUsers} onUserClick={() => {}} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('llama a onUserClick cuando se hace clic en una fila', () => {
    const mockOnClick = jest.fn();
    render(<UsersTable users={mockUsers} onUserClick={mockOnClick} />);

    fireEvent.click(screen.getByText('John Doe'));

    expect(mockOnClick).toHaveBeenCalledWith(mockUsers[0]);
  });
});
