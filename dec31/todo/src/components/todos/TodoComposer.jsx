import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TodoComposer({ onCreate }) {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    setSubmitting(true);
    try {
      await onCreate(trimmed);
      setTitle("");
    } catch (err) {
      alert(err?.message || "Failed to create todo");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <Input
        placeholder="Add a new todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button disabled={submitting} type="submit">
        {submitting ? "Adding..." : "Add"}
      </Button>
    </form>
  );
}
