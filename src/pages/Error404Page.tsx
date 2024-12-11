import React, { useState } from "react";
import { AlertDialog} from "../components/dialog";

const Error404Page: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  let msg =
    "Lorem ipsum ab ipsa aliquam quibusdam dicta optio, animi non architecto, eveniet iusto!";

  return (
    <div className="w-full h-screen">
      <div>
        {isOpen && (
          <AlertDialog
            onClose={handleClose}
            onConfirm={handleClose}
            open={isOpen}
            title="Sample Title"
            message={msg}
            color="primary"
            children={<div>simple child</div>}
          />
        )}
      </div>

      <div>
        <button onClick={() => setIsOpen(true)}>basic dialog</button>
      </div>
      {/* <div>
        <button>basic dialog</button>
      </div>
      <div>
        <button>alert dialog</button>
      </div>
      <div>
        <button>confirm dialog</button>
      </div> */}
    </div>
  );
};

export default Error404Page;
