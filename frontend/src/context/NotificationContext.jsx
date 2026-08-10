/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4500);
    return () => clearTimeout(timer);
  }, [toast]);

  const notify = (message, type = "info") => {
    setToast({ message, type });
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {toast && (
        <div className="fixed right-6 top-6 z-50 max-w-sm rounded-3xl border border-white/10 bg-[#111] px-6 py-4 text-sm shadow-2xl shadow-black/30">
          <div className="flex items-center gap-3">
            <span className={`h-3 w-3 rounded-full ${toast.type === 'success' ? 'bg-green-400' : toast.type === 'error' ? 'bg-red-500' : 'bg-sky-400'}`} />
            <p className="text-white/90">{toast.message}</p>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
