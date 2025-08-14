import { CircleAlert } from "lucide-react";

function Warning({past, children}) {
  const classes = past ? "text-red-900 bg-red-200 ring-red-100" : "text-indigo-900 bg-indigo-200 ring-indigo-100"
  return (
    <h3 className={"text-light text-center px-5 py-2 rounded-full ring-1 " + classes}>
      <CircleAlert className="inline align-middle" /> {children}
    </h3>
  );
}

export default Warning;
