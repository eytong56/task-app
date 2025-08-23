function Logout({onLogout}) {
  return (
    <button onClick={onLogout} className="cursor-pointer inline text-neutral-500 text-sm font-semibold underline underline-offset-4 hover:text-neutral-800 transition-colors duration-300">
      Logout
    </button>
  );
}

export default Logout;
