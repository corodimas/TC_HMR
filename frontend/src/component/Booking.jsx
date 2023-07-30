import React, { useState } from 'react';
import Popup from 'reactjs-popup';

//

const Booking = () => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  
  return (
    <div>
      <button type="button" className="button" onClick={() => setOpen(o => !o)}>
        Booking
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
         <div>Are you sure</div>
         <button>Confirm</button>
         <button>Decline</button>
      </Popup>
    </div>
  );
};

export default Booking