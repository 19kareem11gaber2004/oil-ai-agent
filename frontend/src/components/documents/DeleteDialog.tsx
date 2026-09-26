import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

import { Trash2 } from "lucide-react";

interface DeleteDialogProps {
  fileName: string;
  onDelete?: () => void;
}

export default function DeleteDialog({
  fileName,
  onDelete,
}: DeleteDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="rounded-lg p-2 transition hover:bg-red-100">
        <Trash2
          size={18}
          className="text-red-600"
        />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Document
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete
            <span className="font-semibold"> {fileName}</span>?
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}