import React from "react";
import styles from "./Contact.module.css";
import {
  Button,
  Group,
  SimpleGrid,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const Contact = () => {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  return (
    <div className={styles.hero}>
      <div className={styles.overlay}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
          <Title
            order={1}
            style={{
              fontFamily: "Greycliff CF, var(--mantine-font-family)",
              fontSize: "2.5rem",
              fontWeight: 900,
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Contact Us
          </Title>
          <p
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              fontSize: "1.1rem",
            }}
          >
            Get in touch with GastronoMagic! Whether you have a question, need
            assistance, or want to make a reservation, our team is here to help.
            Reach out to us today for a seamless experience.
          </p>

          <form onSubmit={form.onSubmit(() => {})}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
              <TextInput
                label="Name"
                placeholder="Your name"
                name="name"
                variant="filled"
                {...form.getInputProps("name")}
              />
              <TextInput
                label="Email"
                placeholder="Your email"
                name="email"
                variant="filled"
                {...form.getInputProps("email")}
              />
            </SimpleGrid>

            <TextInput
              label="Subject"
              placeholder="Subject"
              mt="md"
              name="subject"
              variant="filled"
              {...form.getInputProps("subject")}
            />
            <Textarea
              mt="md"
              label="Message"
              placeholder="Your message"
              maxRows={10}
              minRows={5}
              autosize
              name="message"
              variant="filled"
              {...form.getInputProps("message")}
            />

            <Group justify="center" mt="xl">
              <Button type="submit" size="md" color="#ffcc70">
                Send message
              </Button>
            </Group>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
