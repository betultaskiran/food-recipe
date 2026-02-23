import {
  Avatar,
  Card,
  Group,
  Text,
  Button,
  Rating,
  Stack,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { format } from "date-fns";
import classes from "./CommentCard.module.css";

const CommentCard = ({ comment, onEdit, onDelete }) => {
  const { user, createdAt, rating, commentText } = comment;

  return (
    <Card withBorder radius="md" p="md" shadow="sm" mb="md">
      <Group align="flex-start" justify="space-between">
        <Group>
          <Avatar
            src={
              user?.image && user.image !== "null"
                ? user.image
                : "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(user?.name)
            }
            alt={user?.name}
            size="lg"
            radius="xl"
          />

          <Stack gap={0}>
            <Text fw={600}>{user.name}</Text>
            <Text fz="sm" c="dimmed">
              {format(new Date(createdAt), "MMMM dd, yyyy")}
            </Text>
          </Stack>
        </Group>

        <Group gap="xs">
          <Button
            size="xs"
            variant="light"
            leftSection={<IconEdit size={14} />}
            onClick={() => onEdit(comment)}
          >
            Edit
          </Button>
          <Button
            size="xs"
            variant="light"
            color="red"
            leftSection={<IconTrash size={14} />}
            onClick={() => onDelete(comment._id)}
          >
            Delete
          </Button>
        </Group>
      </Group>

      <Rating value={rating} readOnly mt="sm" />

      <Text mt="sm">{commentText}</Text>
    </Card>
  );
};

export default CommentCard;
