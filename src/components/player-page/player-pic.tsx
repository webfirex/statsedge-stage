import { Card } from "@mantine/core";
import Image from "next/image";



export function PlayerImg() {

    return (
        <>
            <Card p={"md"} radius={"md"}>
                <Image
                src={"/playerimg.png"}
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
    )

}