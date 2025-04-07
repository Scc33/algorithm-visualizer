"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SelectionSortRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/sorting/selectionSort");
  }, [router]);

  return null;
}
