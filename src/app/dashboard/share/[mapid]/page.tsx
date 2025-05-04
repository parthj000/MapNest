'use server';

import React from 'react';
import Flow from '../../mydiagram';
import { fetchOneMap } from '@/app/actions/fetchOneMap';

export default async function Page({ params }: { params: { mapid: string } }) {
  const data:any = await fetchOneMap(params.mapid);

  return (
    <>
      <Flow data={data.mapJson} />
    </>
  );
}
