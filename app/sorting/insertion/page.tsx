"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InsertionSortRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/sorting/insertionSort");
  }, [router]);

  return null;
}
