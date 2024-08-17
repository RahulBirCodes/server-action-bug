'use client'

import {useEffect, useState} from "react";
import {getData} from "@/lib/actions";

export default function Home() {
  const [data, setData] = useState<string | undefined>(undefined)

  useEffect(() => {
    getData().then(p => setData(p.data))
  }, []);

  return (
    <p>
      {`Data from server is: ${data}`}
    </p>
  );
}
