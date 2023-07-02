import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import Loading from "./Loading";

const Problem2 = () => {
  const [isAllContactsModalOpen, setIsAllContactsModalOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const openAllContactsModal = () => {
    setIsAllContactsModalOpen(true);
  };

  const closeAllContactsModal = () => {
    setIsAllContactsModalOpen(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={openAllContactsModal}
            className="btn btn-lg btn-outline-primary"
            type="button"
          >
            All Contacts
          </button>
          <button className="btn btn-lg btn-outline-warning" type="button">
            US Contacts
          </button>
        </div>
      </div>
      <AllContactModal
        isOpen={isAllContactsModalOpen}
        closeModal={closeAllContactsModal}
        setOpenDetails={setOpenDetails}
      />
      <ContactDetailsModal open={openDetails} />
    </div>
  );
};

const AllContactModal = ({ isOpen, closeModal, setOpenDetails }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      axios
        .get("https://contact.mediusware.com/api/contacts/")
        .then((response) => {
          setContacts(response.data.results);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching contacts:", error);
        });
    }
  }, [isOpen]);

  return (
    <ReactModal isOpen={isOpen} onRequestClose={closeModal}>
      <h2>All Contacts</h2>
      {loading && <Loading />}
      {!loading && (
        <ul>
          {contacts.map((contact) => {
            return (
              <li key={contact.id} className="my-3">
                <span>Phone: {contact.phone}</span>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => setOpenDetails(true)}
                >
                  Details
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <button onClick={closeModal} className="btn btn-danger">
        Close
      </button>
    </ReactModal>
  );
};

const ContactDetailsModal = ({ contact, open }) => {
  const [isOpen, setIsOpen] = useState(open);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <ReactModal isOpen={isOpen} onRequestClose={closeModal}>
      <h2>Contact Details</h2>
      <button onClick={closeModal} className="btn btn-danger">
        Close
      </button>
    </ReactModal>
  );
};

export default Problem2;
