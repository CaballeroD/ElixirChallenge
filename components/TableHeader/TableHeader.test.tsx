import React from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { fireEvent, render, screen } from '@/test-utils';
import TableHeader from './TableHeader';
import { selectedNationalitiesAtom } from '../Store/NationalitySelectorAtom';

function DisplaySelectedNationalities() {
  const selected = useRecoilValue(selectedNationalitiesAtom);
  return <span data-testid="selectedNationalities">{JSON.stringify(selected)}</span>;
}

describe('<TableHeader />', () => {
  it('calls onSearch with the correct value when typing in the name search input', () => {
    const onSearchMock = jest.fn();
    render(
      <RecoilRoot>
        <TableHeader onSearch={onSearchMock} />
      </RecoilRoot>
    );

    const searchInput = screen.getByPlaceholderText('Buscar por nombre');
    fireEvent.input(searchInput, { target: { value: 'John' } });

    expect(onSearchMock).toHaveBeenCalledWith('John');
  });

  it('updates selectedNationalities state when a new nationality is selected', () => {
    render(
      <RecoilRoot>
        <TableHeader onSearch={jest.fn()} />
        <DisplaySelectedNationalities />
      </RecoilRoot>
    );

    const multiSelectInput = screen.getByPlaceholderText('Buscar nacionalidades');
    fireEvent.click(multiSelectInput);

    const option = screen.getByText('Australia');
    fireEvent.click(option);

    const displayedSelected = screen.getByTestId('selectedNationalities');
    expect(displayedSelected.textContent).toBe('["AU"]');
  });
});
