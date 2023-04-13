import { Container, Grid, Space, Text } from "@mantine/core";
import { HomeAnime } from "../components/HomeAnime";
import { useEffect, useState } from "react";
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8080/api/anime",
});
export function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client.get("/current-season").then((res) => {
      setPosts(res.data.data.splice(0, 6));
    });
  }, []);
  return (
    <>
      <Container size="90%">
        <Text color="white" fz="36px" fw={700} align="start">
          {displaySeasonAndYear(posts)}
        </Text>
        <Space h="xl" />
        <Grid gutter="50px">
          {posts.map((element) => (
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
