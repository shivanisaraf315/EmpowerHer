import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function UpdateTodoModal({ todo, onSave }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(todo.title);
  }, [todo.title]);

  async function save() {
    const trimmed = title.trim();
    if (!trimmed) return;

    setSaving(true);
    try {
      await onSave(trimmed);
      setOpen(false);
    } catch (err) {
      alert(err?.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Update</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Todo</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          <p className="text-xs text-muted-foreground">
            Edit the title and click Save.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
