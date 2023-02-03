import { Container } from './styles';

import Loader from '../../components/Loader';
import useHome from './useHome';
import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';
import Modal from '../../components/Modal';

export default function Home() {
  const {
    isLoading,
    contactBeingDelete,
    isDeleteModalVisible,
    orderBy,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    isLoadingDelete,
    contacts,
    searchTerm,
    handleSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    handleToggleOrderBy,
    handleDeleteContact,
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearch
          value={searchTerm}
          onChange={handleSearchTerm}
        />
      )}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

      {hasError && (
        <ErrorStatus
          onTryAgain={handleTryAgain}
        />
      )}

      {!hasError && (
        <>
          {(contacts.length < 1 && !isLoading) && (
            <EmptyList />
          )}

          {(filteredContacts.length < 1 && contacts.length > 0) && (
            <SearchNotFound
              searchTerm={searchTerm}
            />
          )}

          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onDeleteContact={handleDeleteContact}
            onToggleOrderBy={handleToggleOrderBy}
          />
        </>
      )}

      <Modal
        danger
        confirmLabel="Deletar"
        title={`Tem certeza que deseja deletar o contato "${contactBeingDelete?.name}"`}
        visible={isDeleteModalVisible}
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
        isLoading={isLoadingDelete}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>
    </Container>
  );
}
