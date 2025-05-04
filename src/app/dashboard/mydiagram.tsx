"use client";
import React from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  MiniMap,
  Controls
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { BFS } from "@/lib/layoutGenerator";





export default function Flow({ data = {} }: { data?: any }) {
  const { nodes: generatedNodes, edges: generatedEdges } = BFS(data);

  const [nodes, setNodes, onNodesChange] = useNodesState(generatedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(generatedEdges);

  const onConnect = () => {
    console.log("hello connect");
    return;
  };

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        proOptions={{ hideAttribution: true }}
        
      >
        <MiniMap />
        <Controls position="top-right" />
        <Background gap={16} />
      </ReactFlow>
      
    </div>
  );
}
