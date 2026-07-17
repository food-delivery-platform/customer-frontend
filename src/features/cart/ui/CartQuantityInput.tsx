"use client";

import { Input } from "@chakra-ui/react";
import { useState } from "react";

type CartQuantityInputProps = {
  quantity: number;
  onCommit: (quantity: number) => void;
};

export function CartQuantityInput({ quantity, onCommit }: CartQuantityInputProps) {
  const [committedQuantity, setCommittedQuantity] = useState(quantity);
  const [draft, setDraft] = useState(String(quantity));

  if (quantity !== committedQuantity) {
    setCommittedQuantity(quantity);
    setDraft(String(quantity));
  }

  function commit(value: string) {
    const parsed = Number(value);

    if (value.trim() === "" || !Number.isFinite(parsed) || parsed <= 0) {
      setDraft(String(quantity));
      return;
    }

    onCommit(Math.trunc(parsed));
  }

  return (
    <Input
      min={1}
      onBlur={(e) => commit(e.target.value)}
      onChange={(e) => setDraft(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.currentTarget.blur();
        }
      }}
      size="sm"
      type="number"
      value={draft}
      width="70px"
    />
  );
}
