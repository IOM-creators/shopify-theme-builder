import { h } from "preact";

import { useEffect, useState } from "preact/hooks";

export const getData = (asyncFunc) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const getData = await asyncFunc;
      setData(getData);
    })();
  }, []);
  return data;
};
