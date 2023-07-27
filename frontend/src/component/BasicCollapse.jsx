import React from 'react';

export default function BasicCollapse() {
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => {
    setOpen((prevOpen) => !prevOpen); // Toggle the state value
  };

  return (
    <div>
      <div onClick={toggleOpen}>
        Open
      </div>
      {open && (
        <div>test</div>
      )}
    </div>
  );
}