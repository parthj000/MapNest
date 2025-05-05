"use client";

import InputBox from "@/components/InputBox";
import React, { useContext, useState } from "react";

import { makeMaps } from "@/app/actions/makeMaps";
import { DashboardContext } from "@/hooks/dashboardContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "./loading";

export default function page() {
  const [prompt, setPrompt] = useState("");
  const { mapData, setMapData, allMaps, setAllMaps } =
    useContext(DashboardContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="flex-col flex-1">
        <>
          {!loading ? (
            <InputBox
              prompt={prompt}
              setPrompt={setPrompt}
              onClickFunction={async () => {
                setLoading(true);
                let data = await makeMaps(prompt);
                if (!data.success) {
                  setLoading(false);
                  toast.error(data.error);

                  return;
                }
                setAllMaps((prev: any[]) => [...prev, data]);
                setMapData(data);

                router.push(`/dashboard/m/${data._id}`);
              }}
            />
          ) : (
            <div className="flex flex-1 justify-center items-center">
              <Loading />
            </div>
          )}
        </>
      </div>
    </>
  );
}
