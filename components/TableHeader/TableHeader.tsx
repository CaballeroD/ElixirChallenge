import { MultiSelect, Container, TextInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRecoilState } from 'recoil';
import { selectedNationalitiesAtom } from '../Store/NationalitySelectorAtom';
import { nationalities } from './Nationalities';

type TableHeaderProps = {
  onSearch: (value: string) => void;
};

function TableHeader({ onSearch }: TableHeaderProps) {
  const [selectedNationalities, setSelectedNationalities] =
    useRecoilState(selectedNationalitiesAtom);

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Container
      size="xl"
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
      }}
    >
      <h2>Lista de usuarios:</h2>
      <Container
        size="md"
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
          justifyContent: 'space-between',
          margin: 0,
          padding: 0,
        }}
      >
        <TextInput
          style={{ maxWidth: isMobile ? '100%' : '30%', margin: 'auto' }}
          placeholder="Buscar por nombre"
          label="Nombre"
          onInput={(event) => {
            const searchValue = event.currentTarget.value.trimStart();
            onSearch(searchValue);
          }}
        />
        <MultiSelect
          style={{ maxWidth: isMobile ? '100%' : '40%', marginTop: isMobile ? '10px' : '0' }}
          data={nationalities}
          value={selectedNationalities}
          checkIconPosition="right"
          onChange={setSelectedNationalities}
          hidePickedOptions
          maxDropdownHeight={200}
          label="Nacionalidades"
          placeholder="Buscar nacionalidades"
          nothingFoundMessage="Nothing found..."
          searchable
          clearable
          size="sm"
        />
      </Container>
    </Container>
  );
}

export default TableHeader;
