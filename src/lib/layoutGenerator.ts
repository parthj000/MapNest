// const jsonData = {
//   id: "1",
//   label: "Central Topic",
//   children: [
//     {
//       id: "2",
//       label: "Branch A",
//       children: [
//         { id: "3", label: "Sub A1" },
//         { id: "4", label: "Sub A2" },
//       ],
//     },
//     {
//       id: "5",
//       label: "Branch B",
//       children: [
//         {
//           id: "6",
//           label: "kapa",
//           children: [
//             {
//               id: "7",
//               label: "kapa deep",
//             },
//             {
//               id: "8",
//               label: "keep deep same",
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

import { getColorByLevel } from "./generateColor";

class Queue<T> {
  private queue: T[];

  constructor() {
    this.queue = [];
  }
  enQ(elem: T) {
    this.queue.push(elem);
    return this.queue;
  }
  deQ() {
    this.queue.shift();
    return this.queue;
  }
  isEmpty() {
    if (Object.keys(this.queue).length === 0) {
      return true;
    }
    return false;
  }
}



export const BFS = (data: { [key: string]: any }) => {
  console.log(data);

  const q: any = new Queue<any>();

  q.enQ({
    id: data.id,
    position: { x: 0, y: 0 },
    data: { label: data.label },
    type: "default",
    level: 1,

    children: data.children,
  });

  var y = 10;
  var x = 0;
  var nodes: any[] = [];
  var edges: any[] = [];
  var level = 1;

  while (true) {
    const first = q.queue[0];

    if (first?.children && Array.isArray(first.children)) {
      first.children.forEach((element: any) => {
        q.enQ({
          id: element.id,
          position: { x: x, y: 120 * first.level },
          data: { label: element.label },
          type: "default",
          children: element.children,
          level: first.level + 1,
        });
        edges.push({
          id: `e${first.id}-${element.id}`,
          source: first.id,
          target: element.id,
          style: { stroke: getColorByLevel(first.id), strokeWidth: 2 },
        });
      });
    }

    const { children, ...rest } = q.queue[0];
    if (first.level !== level) {
      x = 0- level*120;
      level = first.level;
    } else {
      x = x + 200;
    }
    rest.position.x = x;
    nodes.push({ ...rest, style: styles(first.id).node });

    q.deQ();
    if (q.isEmpty()) {
      break;
    }
  }

  return { nodes, edges };
};

const styles = (level:any)=>({
  node: {
    backgroundColor: getColorByLevel(level), 
    color: "white",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #000",
    fontWeight: "bold",
  },
});
