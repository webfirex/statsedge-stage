import { useEffect, useState } from "react";

export const URLText = (props: { url: string }) => {
  const [Text, setText] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(props.url);

      if (!response.ok) {
        if (response.status === 404) {
          setText("N/A");
          return;
        }

        setText("Error");
        return;
      }

      const data = await response.text();

      setText(data);
    };

    void fetchData();

    return () => {
      setText("Loading...");
    };
  }, [props.url]);

  return <> {Text} </>;
};
