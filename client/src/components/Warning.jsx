import { CircleAlert } from "lucide-react";

function Warning({children}) {
  return (
    <h3 className="text-light text-red-900 bg-red-200 text-center px-3 py-1 rounded-full ring-1 ring-red-100">
      <CircleAlert className="inline" /> {children}
    </h3>
  );
}

export default Warning;
