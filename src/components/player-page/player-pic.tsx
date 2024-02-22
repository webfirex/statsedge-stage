import { Card, Image } from "@mantine/core";

export function PlayerImg(props: { src: string }) {
  return (
    <>
      <Card p={"md"} radius={"md"}>
        <Image
          src={props.src}
          fallbackSrc={"/playerimg.png"}
          alt="Player Img"
          width={"100"}
          height={"100"}
          style={{
            borderRadius: "10px",
            width: "100%",
            height: "Auto",
          }}
        />
      </Card>
    </>
  );
}
