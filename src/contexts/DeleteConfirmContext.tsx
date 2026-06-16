import { createContext, useContext, useState, ReactNode } from "react";
import Modal from "@/components/features/Modal";
import { store } from "@/lib/store";
import { useAuth } from "@/contexts/AuthContext";

interface ConfirmOptions {
  title: string;
  itemName: string;
  itemType: string;
  onConfirm: (reason: string) => void;
}

interface DeleteConfirmContextType {
  confirmDelete: (options: ConfirmOptions) => void;
}

const DeleteConfirmContext = createContext<DeleteConfirmContextType | undefined>(undefined);

export function DeleteConfirmProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();

  const confirmDelete = (opts: ConfirmOptions) => {
    setOptions(opts);
    setReason("");
    setError("");
    setIsOpen(true);
  };

  const handleConfirm = () => {
    if (!reason.trim()) {
      setError("Please enter a reason for deletion.");
      return;
    }
    if (options) {
      // Log the deletion in global store
      store.addHistory({
        action: "deleted",
        itemType: options.itemType,
        itemName: options.itemName,
        timestamp: new Date().toLocaleString("en-IN"),
        performedBy: user ? `${user.name} (${user.role})` : "System",
        details: `Reason: ${reason}`,
      });
      options.onConfirm(reason);
    }
    setIsOpen(false);
    setOptions(null);
    setReason("");
  };

  const handleClose = () => {
    setIsOpen(false);
    setOptions(null);
    setReason("");
    setError("");
  };

  return (
    <DeleteConfirmContext.Provider value={{ confirmDelete }}>
      {children}
      <Modal
        open={isOpen}
        onClose={handleClose}
        title={options?.title ?? "Confirm Deletion"}
        subtitle="This action is permanent and will be logged in history."
        size="sm"
        footer={
          <>
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 text-sm bg-rose-600 text-white rounded-xl hover:bg-rose-700 font-semibold transition-colors"
            >
              Delete
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Are you sure you want to delete <strong className="text-foreground">{options?.itemName}</strong> ({options?.itemType})?
          </p>
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
              Reason for Deletion
            </label>
            <textarea
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (e.target.value.trim()) setError("");
              }}
              placeholder="e.g., Outdated item, student graduated, course cancelled..."
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring resize-none h-20"
              required
            />
            {error && <p className="text-rose-500 text-xs mt-1.5">{error}</p>}
          </div>
        </div>
      </Modal>
    </DeleteConfirmContext.Provider>
  );
}

export function useDeleteConfirm() {
  const context = useContext(DeleteConfirmContext);
  if (!context) {
    throw new Error("useDeleteConfirm must be used within a DeleteConfirmProvider");
  }
  return context;
}
