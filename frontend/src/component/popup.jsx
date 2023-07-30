import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import CCreateCustomer from './createCourse';
import '../pages/patient'


//

const ControlledPopup = ({onconfirm}) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  
  return (
    <div>
      <button type="button" className="myButton" onClick={() => setOpen(o => !o)}>
        สร้างคอสต์
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
        <button type="button" className="button" onClick={closeModal}>X</button>
        </div>
        <CCreateCustomer onclose={closeModal} onconfirm={onconfirm}/>
      </Popup>
    </div>
  );
};

export default ControlledPopup