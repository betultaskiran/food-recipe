import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { ActionIcon, Anchor, Container, Group } from "@mantine/core";
import classes from "./FooterCentered.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const links = [
  { link: "#", label: "Home" },
  { link: "#", label: "Recipes" },
  { link: "#", label: "Categories" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Contact" },
];

export function FooterCentered() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Container size="xl">
      <div className={classes.footer}>
        <div className={classes.inner}>
          <Link to="/" className={classes.logoContainer}>
            <div className={classes.logoWrapper}>
              <img src={logo} alt="Logo" className={classes.logo} />
              <span>GastronoMagic</span>
            </div>
          </Link>

          <Group className={classes.links}>{items}</Group>

          <Group gap="xs" justify="flex-end" wrap="nowrap">
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandTwitter size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandYoutube size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandInstagram size={18} stroke={1.5} />
            </ActionIcon>
          </Group>
        </div>
        <hr />
        <p className={classes.copyright}>
          Copyright 2025 @ GastronoMagic.com - All Right Reserved.
        </p>
      </div>
    </Container>
  );
}
