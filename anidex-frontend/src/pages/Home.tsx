import {
  Button,
  Col,
  Container,
  Grid,
  Input,
  Space,
  Text,
} from "@mantine/core";
import { HomeAnime } from "../components/HomeAnime";
import { useEffect, useState } from "react";
import axios from "axios";
import { IconSearch } from "@tabler/icons-react";

const client = axios.create({
  baseURL: "http://localhost:8080/api/anime",
});
export function Home() {
  const [seasonalAnime, setSeasonalAnime] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  useEffect(() => {
    client.get("/current-season").then((res) => {
      setSeasonalAnime(res.data.data.splice(0, 6));
    });
    client.get("/top").then((res) => {
      setTopAnime(res.data.data.splice(0, 6));
    });
  }, []);
  return (
    <>
      <Container size="90%" mt={50}>
        <Grid justify="center">
          <Input
            size="md"
            w={"50%"}
            icon={<IconSearch />}
            placeholder="Search for anime..."
          />
          <Space w="md" />
          <Button onClick={(event) => {}} size="md">
            Search
          </Button>
        </Grid>

        <Text color="white" fz="36px" fw={700} align="start">
          {displaySeasonAndYear(seasonalAnime)}
        </Text>
        <Space h="xl" />
        <Grid gutter="50px">
          {seasonalAnime.map((element) => (
            <Grid.Col span={4} key={element["mal_id"]}>
              <HomeAnime
                mal_id={element["mal_id"]}
                name={element["title"]}
                type={element["type"]}
                status={element["status"]}
                src={element["images"]["jpg"]["image_url"]}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      <Space h="xl" />

      <Container size="90%">
        <Text color="white" fz="36px" fw={700} align="start">
          Top Anime
        </Text>
        <Space h="xl" />
        <Grid gutter="50px">
          {topAnime.map((element) => (
            <Grid.Col span={4} key={element["mal_id"]}>
              <HomeAnime
                mal_id={element["mal_id"]}
                name={element["title"]}
                type={element["type"]}
                status={element["status"]}
                src={element["images"]["jpg"]["image_url"]}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
}

function displaySeasonAndYear(arr: Array<any>) {
  if (arr.length > 0) {
    return `${arr[0]["season"].charAt(0).toUpperCase()}${arr[0]["season"].slice(
      1
    )} ${arr[0]["year"]}`;
  }
}
