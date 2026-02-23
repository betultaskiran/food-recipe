import { Card, Avatar, Text, Group, Button, Stack, Badge } from "@mantine/core";
import {
  IconEdit,
  IconLock,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import classes from "./UserInfoCard.module.css";
import { uploadsPath } from "../../atoms/popupAtom";

export default function UserInfoCard({ user, onEdit, onChangePassword }) {
  return (
    <Card shadow="sm" radius="md" p="lg" withBorder>
      <Group align="center" mb="md">
        <Avatar
          key={user.image}
          src={`${uploadsPath}uploads/${user.image}`} // Cache sorununu önlemek için benzersiz parametre
          alt="Profile"
          className={classes.avatarLarge} // Avatar boyutunu arttırdık
        />
        <Stack gap={4}>
          <Text fw={700} fz="lg" className={classes.textTitle}>
            {user.firstName} {user.lastName}
            {/* Rol bilgisini badge içinde gösteriyoruz */}
            {user.role && (
              <Badge className={classes.roleBadge} size="sm">
                {user.role}
              </Badge>
            )}
          </Text>
          <Text c="dimmed">{user.email}</Text>
        </Stack>
      </Group>

      {/* Kullanıcı açıklaması */}
      {user.description && (
        <Text c="dimmed" size="sm" mb="sm">
          {user.description}
        </Text>
      )}

      {/* Sosyal medya linkleri */}
      <Stack gap={6} mt="sm">
        {user.instagram && (
          <Text size="sm" className={classes.socialLink}>
            <IconBrandInstagram
              className={classes.socialIcon}
              size={25}
              style={{ marginRight: 8 }}
            />
            <b>Instagram:</b> {user.instagram}
          </Text>
        )}
        {user.twitter && (
          <Text size="sm" className={classes.socialLink}>
            <IconBrandTwitter
              className={classes.socialIcon}
              size={25}
              style={{ marginRight: 8 }}
            />
            <b>Twitter:</b> {user.twitter}
          </Text>
        )}
        {user.youtube && (
          <Text size="sm" className={classes.socialLink}>
            <IconBrandYoutube
              className={classes.socialIcon}
              size={25}
              style={{ marginRight: 8 }}
            />
            <b>YouTube:</b> {user.youtube}
          </Text>
        )}
      </Stack>

      {/* Butonlar */}
      <Group justify="flex-end" mt="md">
        <Button
          variant="outline"
          leftSection={<IconEdit size={16} />}
          onClick={onEdit}
        >
          Edit Profile
        </Button>
        <Button
          variant="light"
          color="red"
          leftSection={<IconLock size={16} />}
          onClick={onChangePassword}
        >
          Change Password
        </Button>
      </Group>
    </Card>
  );
}
