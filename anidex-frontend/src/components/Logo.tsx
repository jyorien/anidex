import { Text } from "@mantine/core";
import { Link } from "react-router-dom";

export function AnidexLogo() {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <Text fz="xl" c="white">
        Anidex
      </Text>
    </Link>
  );
}
