"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlusIcon } from "lucide-react";
import { useState } from "react";

export function CreateDialog() {
  const [open, setOpen] = useState(false);
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CirclePlusIcon className="w-5 h-5 text-green-500 cursor-pointer hover:text-green-600" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleCreate}>
          <DialogHeader>
            <DialogTitle>Create Pool</DialogTitle>
            <DialogDescription>Create a new pool</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4"></div>
          <DialogFooter>
            <Button type="submit">Create Pool</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
