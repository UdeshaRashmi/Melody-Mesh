import { useEffect } from 'react';

function Toast({ message, type, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 2500);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const bg = type === 'error' ? 'bg-red-400 text-white' : 'bg-green-400 text-white';

  return (
    <div className={`fixed top-6 right-6 px-6 py-3 rounded shadow-lg z-50 animate-fade-in ${bg}`}>
      {message}
    </div>
  );
}

export default Toast;
