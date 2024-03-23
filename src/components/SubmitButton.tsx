"use client";
import { Button } from "./ui/button";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      Submit
    </Button>
  );
}
