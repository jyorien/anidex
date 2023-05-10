import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Text,
  Button,
  UnstyledButton,
  Burger,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { AnidexLogo } from "./Logo";
import { Link } from "react-router-dom";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    textDecoration: "none",
    color: "white",
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      borderBottom: "1px solid white",
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

interface HeaderActionProps {
  links: {
    link: string;
    label: string;
    links: { link: string; label: string }[];
  }[];
}

export function NavBar({ links }: HeaderActionProps) {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems.length > 0) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <Link
              to={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
              color="white"
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={rem(12)} stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link
        key={link.label}
        to={link.link}
        className={classes.link}
        color="white"
      >
        {link.label}
      </Link>
    );
  });

  return (
    <Header
      height={HEADER_HEIGHT}
      sx={{ borderBottom: 0 }}
      bg="#2B4E67"
      px="sm"
    >
      <Container className={classes.inner} fluid>
        <Group spacing={20}>
          <AnidexLogo />
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
        </Group>

        {/* <Group spacing={5}>
          <UnstyledButton px="sm">
            <Text color="white">Register</Text>
          </UnstyledButton>

          <UnstyledButton px="sm">
            <Text color="white">Login</Text>
          </UnstyledButton>
        </Group> */}
      </Container>
    </Header>
  );
}
