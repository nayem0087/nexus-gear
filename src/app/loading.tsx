"use client";

import { Spinner } from "@heroui/react";

export default function Loading(): JSX.Element {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07070a]">
      <Spinner 
        size="lg" 
        color="primary" 
        label="Loading NexusGear..." 
        className="text-blue-500" 
      />
    </div>
  );
}