import React from "react";

type Props = { error: Error };

const ErrorState: React.FC<{ error: Error }> = ({ error }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
    <strong className="font-bold">Error: </strong>
    <span className="block sm:inline">{error.message}</span>
  </div>
);

export default ErrorState;