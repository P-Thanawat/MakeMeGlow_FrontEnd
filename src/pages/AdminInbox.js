import axios from '../config/axios';
import React, { useEffect, useState } from 'react';
import AdminHeader from '../component/AdminHeader';
import InboxMessage from '../component/AdminInbox/InboxMessage';
import Pagination from '../component/Pagination';

function AdminInbox() {
  const [onPage, setOnPage] = useState(1);
  const [numberOfPage, setnumberOfPage] = useState(0);
  const [contactUs, setContactUs] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    try {
      const run = async () => {
        const {
          data: { contactUs, numberOfPage },
        } = await axios.get(`/contactUs?offset=${7 * (onPage - 1)}`);
        setContactUs(contactUs);
        setnumberOfPage(numberOfPage);
      };
      run();
    } catch (err) {
      console.log(err.message);
    }
  }, [onPage, refresh]);

  return (
    <>
      <AdminHeader />
      {contactUs.length ? (
        <div className='my-5'>
          <div className='container d-flex justify-content-end' style={{ width: '75%' }}>
            {numberOfPage === 0 ? null : <Pagination countPage={numberOfPage} onPage={onPage} setOnPage={setOnPage} />}
          </div>
          {contactUs.map((item) => (
            <InboxMessage key={item.id} message={item} setOnPage={setOnPage} setRefresh={setRefresh} />
          ))}
        </div>
      ) : (
        <div
          className='my-5 text-center d-flex justify-content-center align-items-center'
          style={{ width: '80%', margin: 'auto', height: '20vh' }}
        >
          <p style={{ color: '#979797', fontSize: '30px' }}>There hasn't been any inboxes yet.</p>
        </div>
      )}
    </>
  );
}

export default AdminInbox;
