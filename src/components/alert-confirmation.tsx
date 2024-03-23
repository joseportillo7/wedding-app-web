import React from "react";

interface AlertProps {
  message: string;
}

const AlertConfirmation: React.FC<AlertProps> = ({ message }) => {
  return (
    <div className="alert-confirmation">
      <p>{message}</p>
    </div>
  );
};

export default AlertConfirmation;
