import { Box, Card, Title, Image, Flex, Text } from "@mantine/core"
import { BREAKPOINTS } from "~/styles/globals";
import { useMediaQuery } from "@mantine/hooks";

export default function MatchStats() {
    const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);
    
    return (
        
        <Card style={{ backgroundImage: "url(./blur-bg-1.png)", backgroundSize: "cover" }} p={"20px"}>
        <Title order={4} tt={"uppercase"} pb={"sm"}>Matches</Title>
        <Box mah={400} mih={400} style={{ overflowY: "scroll" }} py={"md"}>
          <Box mt={"sm"} display={"flex"} style={{ flexDirection: "column", gap: "10px" }}>
            <Flex bg={"#1d1d1d"} justify={"space-between"} style={{ borderRadius: "20px" }} p={"xs"}>
              <Text fz={"xs"}>10:50 17-01-2024</Text>
              <Box w={20} h={20} bg={"green"} style={{ borderRadius: "50%" }} />
            </Flex>
            <Flex gap={"xs"}>
              
              <Image
                src={"/icon.png"}
                alt="league logo"
                fit="contain"
                h={BigThenXs ? 30 : 20}
                m={10}
              />

              <Flex direction={"column"} gap={"xs"} w={"100%"}>
                <Flex justify={"space-between"} w={"100%"}>
                  <Box display={"flex"} style={{ gap: "5px" }}>
                    <Image
                      src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                      alt="league logo"
                      fit="contain"
                      h={BigThenXs ? 20 : 15}
                    />
                    <Text fz={"xs"}>Team Name</Text>
                  </Box>
                  <Text fz={"xs"}>2</Text>
                </Flex>
                <Flex justify={"space-between"} w={"100%"}>
                  <Box display={"flex"} style={{ gap: "5px" }}>
                    <Image
                      src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                      alt="league logo"
                      fit="contain"
                      h={BigThenXs ? 20 : 15}
                    />
                    <Text fz={"xs"}>Team Name</Text>
                  </Box>
                  <Text fz={"xs"}>0</Text>
                </Flex>
              </Flex>

            </Flex>
          </Box>
          <Box mt={"sm"} display={"flex"} style={{ flexDirection: "column", gap: "10px" }}>
            <Flex bg={"#1d1d1d"} justify={"space-between"} style={{ borderRadius: "20px" }} p={"xs"}>
              <Text fz={"xs"}>10:50 17-01-2024</Text>
              <Box w={20} h={20} bg={"green"} style={{ borderRadius: "50%" }} />
            </Flex>
            <Flex gap={"xs"}>
              
              <Image
                src={"/icon.png"}
                alt="league logo"
                fit="contain"
                h={BigThenXs ? 30 : 20}
                m={10}
              />

              <Flex direction={"column"} gap={"xs"} w={"100%"}>
                <Flex justify={"space-between"} w={"100%"}>
                  <Box display={"flex"} style={{ gap: "5px" }}>
                    <Image
                      src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                      alt="league logo"
                      fit="contain"
                      h={BigThenXs ? 20 : 15}
                    />
                    <Text fz={"xs"}>Team Name</Text>
                  </Box>
                  <Text fz={"xs"}>2</Text>
                </Flex>
                <Flex justify={"space-between"} w={"100%"}>
                  <Box display={"flex"} style={{ gap: "5px" }}>
                    <Image
                      src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                      alt="league logo"
                      fit="contain"
                      h={BigThenXs ? 20 : 15}
                    />
                    <Text fz={"xs"}>Team Name</Text>
                  </Box>
                  <Text fz={"xs"}>0</Text>
                </Flex>
              </Flex>

            </Flex>
          </Box>
          <Box mt={"sm"} display={"flex"} style={{ flexDirection: "column", gap: "10px" }}>
            <Flex bg={"#1d1d1d"} justify={"space-between"} style={{ borderRadius: "20px" }} p={"xs"}>
              <Text fz={"xs"}>10:50 17-01-2024</Text>
              <Box w={20} h={20} bg={"green"} style={{ borderRadius: "50%" }} />
            </Flex>
            <Flex gap={"xs"}>
              
              <Image
                src={"/icon.png"}
                alt="league logo"
                fit="contain"
                h={BigThenXs ? 30 : 20}
                m={10}
              />

              <Flex direction={"column"} gap={"xs"} w={"100%"}>
                <Flex justify={"space-between"} w={"100%"}>
                  <Box display={"flex"} style={{ gap: "5px" }}>
                    <Image
                      src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                      alt="league logo"
                      fit="contain"
                      h={BigThenXs ? 20 : 15}
                    />
                    <Text fz={"xs"}>Team Name</Text>
                  </Box>
                  <Text fz={"xs"}>2</Text>
                </Flex>
                <Flex justify={"space-between"} w={"100%"}>
                  <Box display={"flex"} style={{ gap: "5px" }}>
                    <Image
                      src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                      alt="league logo"
                      fit="contain"
                      h={BigThenXs ? 20 : 15}
                    />
                    <Text fz={"xs"}>Team Name</Text>
                  </Box>
                  <Text fz={"xs"}>0</Text>
                </Flex>
              </Flex>

            </Flex>
          </Box>
          <Box mt={"sm"} display={"flex"} style={{ flexDirection: "column", gap: "10px" }}>
            <Flex bg={"#1d1d1d"} justify={"space-between"} style={{ borderRadius: "20px" }} p={"xs"}>
              <Text fz={"xs"}>10:50 17-01-2024</Text>
              <Box w={20} h={20} bg={"green"} style={{ borderRadius: "50%" }} />
            </Flex>
            <Flex gap={"xs"}>
              
              <Image
                src={"/icon.png"}
                alt="league logo"
                fit="contain"
                h={BigThenXs ? 30 : 20}
                m={10}
              />

              <Flex direction={"column"} gap={"xs"} w={"100%"}>
                <Flex justify={"space-between"} w={"100%"}>
                  <Box display={"flex"} style={{ gap: "5px" }}>
                    <Image
                      src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                      alt="league logo"
                      fit="contain"
                      h={BigThenXs ? 20 : 15}
                    />
                    <Text fz={"xs"}>Team Name</Text>
                  </Box>
                  <Text fz={"xs"}>2</Text>
                </Flex>
                <Flex justify={"space-between"} w={"100%"}>
                  <Box display={"flex"} style={{ gap: "5px" }}>
                    <Image
                      src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                      alt="league logo"
                      fit="contain"
                      h={BigThenXs ? 20 : 15}
                    />
                    <Text fz={"xs"}>Team Name</Text>
                  </Box>
                  <Text fz={"xs"}>0</Text>
                </Flex>
              </Flex>

            </Flex>
          </Box>
          <Box mt={"sm"} display={"flex"} style={{ flexDirection: "column", gap: "10px" }}>
            <Flex bg={"#1d1d1d"} justify={"space-between"} style={{ borderRadius: "20px" }} p={"xs"}>
              <Text fz={"xs"}>10:50 17-01-2024</Text>
              <Box w={20} h={20} bg={"green"} style={{ borderRadius: "50%" }} />
            </Flex>
            <Flex gap={"xs"}>
              
              <Image
                src={"/icon.png"}
                alt="league logo"
                fit="contain"
                h={BigThenXs ? 30 : 20}
                m={10}
              />

              <Flex direction={"column"} gap={"xs"} w={"100%"}>
                <Flex justify={"space-between"} w={"100%"}>
                  <Box display={"flex"} style={{ gap: "5px" }}>
                    <Image
                      src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                      alt="league logo"
                      fit="contain"
                      h={BigThenXs ? 20 : 15}
                    />
                    <Text fz={"xs"}>Team Name</Text>
                  </Box>
                  <Text fz={"xs"}>2</Text>
                </Flex>
                <Flex justify={"space-between"} w={"100%"}>
                  <Box display={"flex"} style={{ gap: "5px" }}>
                    <Image
                      src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                      alt="league logo"
                      fit="contain"
                      h={BigThenXs ? 20 : 15}
                    />
                    <Text fz={"xs"}>Team Name</Text>
                  </Box>
                  <Text fz={"xs"}>0</Text>
                </Flex>
              </Flex>

            </Flex>
          </Box>
          <Box mt={"sm"} display={"flex"} style={{ flexDirection: "column", gap: "10px" }}>
            <Flex bg={"#1d1d1d"} justify={"space-between"} style={{ borderRadius: "20px" }} p={"xs"}>
              <Text fz={"xs"}>10:50 17-01-2024</Text>
              <Box w={20} h={20} bg={"green"} style={{ borderRadius: "50%" }} />
            </Flex>
            <Flex gap={"xs"}>
              
              <Image
                src={"/icon.png"}
                alt="league logo"
                fit="contain"
                h={BigThenXs ? 30 : 20}
                m={10}
              />

              <Flex direction={"column"} gap={"xs"} w={"100%"}>
                <Flex justify={"space-between"} w={"100%"}>
                  <Box display={"flex"} style={{ gap: "5px" }}>
                    <Image
                      src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                      alt="league logo"
                      fit="contain"
                      h={BigThenXs ? 20 : 15}
                    />
                    <Text fz={"xs"}>Team Name</Text>
                  </Box>
                  <Text fz={"xs"}>2</Text>
                </Flex>
                <Flex justify={"space-between"} w={"100%"}>
                  <Box display={"flex"} style={{ gap: "5px" }}>
                    <Image
                      src={"https://assets-global.website-files.com/622606ef3eafab51dbfa178d/6238793e742015185a0d4095_Gold.svg"}
                      alt="league logo"
                      fit="contain"
                      h={BigThenXs ? 20 : 15}
                    />
                    <Text fz={"xs"}>Team Name</Text>
                  </Box>
                  <Text fz={"xs"}>0</Text>
                </Flex>
              </Flex>

            </Flex>
          </Box>
        </Box>
      </Card>
    )
}
