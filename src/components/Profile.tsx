'use client';

import React from 'react';
import LogOut from './LogOut';
import Image from 'next/image';
import { Progress } from "@/components/ui/progress";

export default function Profile({
  session,
  show,
}: {
  session: any;
  show: boolean;
}) {
  return (
    <div
      className={`absolute min-w-60 w-72 min-h-64 z-20 right-0 rounded-xl shadow-2xl border bg-white dark:bg-[var(--dash-bg)] mt-2 top-full flex-col p-4 gap-4 transition-all ${
        show ? 'flex' : 'hidden'
      }`}
    >
      <div className="flex items-center gap-4">
        <Image
          src={session.user?.image || "/logo.png"}
          alt="Profile"
          width={50}
          height={50}
          className="rounded-full border border-gray-300 object-cover"
        />
        <div>
          <p className="text-md font-semibold text-gray-900 dark:text-white truncate">
            {session.user?.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-teal-300 truncate">
            {session.user?.email}
          </p>
        </div>
      </div>

      <div className="text-sm text-gray-700 dark:text-gray-300 flex flex-col gap-1">
        <div>
          <div className="w-full mb-2">
            <Progress
              value={((10 - Number(session.credits)) / 10) * 100}
              className="h-3 w-full bg-muted"
            />
          </div>
          <span className="font-medium">Credits used:</span>{' '}
          {`${10 - session.credits}/10`}
        </div>
        <div>
          <span className="font-medium">Provider:</span>{' '}
          {session.provider ? session.provider : 'Unknown'}
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-auto">
        <LogOut />
      </div>
    </div>
  );
}
