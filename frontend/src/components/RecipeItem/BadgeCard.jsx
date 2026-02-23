// import {
//   Badge,
//   Button,
//   Card,
//   Group,
//   Image,
//   Text,
//   Rating,
//   ActionIcon,
// } from "@mantine/core";
// import axios from "axios";
// import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
// import classes from "./BadgeCard.module.css";
// import { useNavigate } from "react-router-dom";
// import { useAtom } from "jotai";
// import { isLoggedInAtom } from "../../atoms/popupAtom";
// import { useSetAtom } from "jotai";
// import { recipesAtom, getToken } from "../../atoms/popupAtom";
// import baseUrl from "../../atoms/popupAtom";
// import { toast } from "react-toastify";
// import { useState } from "react";
// import { uploadsPath } from "../../atoms/popupAtom";

// const BadgeCard = ({
//   id,
//   image,
//   title,
//   description,
//   category,
//   showOwnerActions = false,
//   onDeleteSuccess,
// }) => {
//   const navigate = useNavigate();
//   const setRecipesGlobal = useSetAtom(recipesAtom);
//   const [isLoggedIn] = useAtom(isLoggedInAtom);
//   const [isFavorited, setIsFavorited] = useState(isInitiallyFavorited);

//   const handleUpdate = () => {
//     navigate(`/update-recipe/${id}`);
//   };

//   const handleDelete = async () => {
//     const token = getToken();
//     if (!token) return;

//     try {
//       const res = await axios.delete(`${baseUrl}/recipe/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data.success) {
//         setRecipesGlobal((prev) => prev.filter((r) => r._id !== id));
//         onDeleteSuccess?.(id);
//         toast.success("Recipe deleted successfully!");
//       }
//     } catch (err) {
//       console.error("Silme hatası:", err);
//       toast.error("Recipe can't be deleted.");
//     }
//   };

//   const handleFavoriteToggle = async () => {
//     const token = getToken();
//     if (!token) {
//       toast.error("Favorilere eklemek için giriş yapmalısınız.");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         `${baseUrl}/favorites`,
//         { recipeId: id },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setIsFavorited((prev) => !prev);
//       toast.success(res.data.message);
//     } catch (err) {
//       console.error("Favori hatası:", err);
//       toast.error("Favori işlemi başarısız.");
//     }
//   };

//   return (
//     <Card withBorder radius="md" p="md" className={classes.card}>
//       <Card.Section className={classes.imageContainer}>
//         <div className={classes.ratingBadge}>
//           <Rating value={4.8} count={1} readOnly size="sm" />
//           <Text className={classes.ratingText}>4.8</Text>
//         </div>
//         <Image
//           src={
//             image?.startsWith("http")
//               ? image
//               : `${uploadsPath}${
//                   image?.startsWith("uploads/") ? "" : "uploads/"
//                 }${image}`
//           }
//           alt={title}
//           className={classes.cardImage}
//         />
//       </Card.Section>

//       <Card.Section className={classes.section} mt="md">
//         <Group justify="apart">
//           <Text fz="lg" fw={500}>
//             {title}
//           </Text>
//           <Badge size="sm" variant="light" className={classes.badge}>
//             {category}
//           </Badge>
//         </Group>
//         <Text fz="sm" mt="xs" className={classes.truncatedText}>
//           {description}
//         </Text>
//       </Card.Section>

//       <Group mt="xs">
//         <Button
//           radius="md"
//           style={{ flex: 1 }}
//           className={classes.button}
//           onClick={() => navigate(`/recipe/${id}`)}
//         >
//           Show details
//         </Button>

//         {isLoggedIn && (
//           <ActionIcon
//             variant="default"
//             radius="md"
//             size={36}
//             onClick={handleFavoriteToggle}
//           >
//             {isFavorited ? (
//               <IconHeartFilled
//                 className={classes.like}
//                 stroke={1.5}
//                 color="red"
//               />
//             ) : (
//               <IconHeart className={classes.like} stroke={1.5} />
//             )}
//           </ActionIcon>
//         )}
//       </Group>

//       {isLoggedIn && showOwnerActions && (
//         <Group mt="xs" grow>
//           <Button color="#333399" radius="md" onClick={handleUpdate}>
//             Update
//           </Button>
//           <Button color="#990000" radius="md" onClick={handleDelete}>
//             Delete
//           </Button>
//         </Group>
//       )}
//     </Card>
//   );
// };

// export default BadgeCard;
import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Text,
  Rating,
  ActionIcon,
} from "@mantine/core";
import axios from "axios";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import classes from "./BadgeCard.module.css";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "../../atoms/popupAtom";
import { useSetAtom } from "jotai";
import { recipesAtom, getToken } from "../../atoms/popupAtom";
import baseUrl from "../../atoms/popupAtom";
import { toast } from "react-toastify";
import { useState } from "react";
import { uploadsPath } from "../../atoms/popupAtom";

const BadgeCard = ({
  id,
  image,
  title,
  description,
  category,
  showOwnerActions = false,
  onDeleteSuccess,
  isInitiallyFavorited = false,
  onToggleFavorite,
  averageRating = 0,
  ratingCount = 0,
}) => {
  const navigate = useNavigate();
  const setRecipesGlobal = useSetAtom(recipesAtom);
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [isFavorited, setIsFavorited] = useState(isInitiallyFavorited);

  const handleUpdate = () => {
    navigate(`/update-recipe/${id}`);
  };

  const handleDelete = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await axios.delete(`${baseUrl}/recipe/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setRecipesGlobal((prev) => prev.filter((r) => r._id !== id));
        onDeleteSuccess?.(id);
        toast.success("Recipe deleted successfully!");
      }
    } catch (err) {
      console.error("Silme hatası:", err);
      toast.error("Recipe can't be deleted.");
    }
  };

  const handleFavoriteToggle = async () => {
    const token = getToken();
    if (!token) {
      toast.error("Favorilere eklemek için giriş yapmalısınız.");
      return;
    }

    try {
      const res = await axios.post(
        `${baseUrl}/favorites`,
        { recipeId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const newFavorited = !isFavorited;
      setIsFavorited(newFavorited);
      toast.success(res.data.message);

      // 🔥 Favoriden çıkarıldıysa parent'a bildir
      if (!newFavorited && typeof onToggleFavorite === "function") {
        onToggleFavorite(id);
      }
    } catch (err) {
      console.error("Favori hatası:", err);
      toast.error("Favori işlemi başarısız.");
    }
  };

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section className={classes.imageContainer}>
        <div className={classes.ratingBadge}>
          <Rating
            value={averageRating || 0}
            count={1}
            readOnly
            size="sm"
            color="yellow"
          />
          <Text size="sm" fw={500} className={classes.ratingText}>
            {Number(averageRating || 0).toFixed(1)}
          </Text>
        </div>

        <Image
          src={
            image?.startsWith("http")
              ? image
              : `${uploadsPath}${
                  image?.startsWith("uploads/") ? "" : "uploads/"
                }${image}`
          }
          alt={title}
          className={classes.cardImage}
        />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart" wrap="nowrap">
          <Text fz="lg" fw={500} className={classes.title}>
            {title}
          </Text>
          <Badge size="sm" variant="light" className={classes.badge}>
            {category}
          </Badge>
        </Group>

        <Text fz="sm" mt="xs" className={classes.truncatedText}>
          {description}
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Button
          radius="md"
          style={{ flex: 1 }}
          className={classes.button}
          onClick={() => navigate(`/recipe/${id}`)}
        >
          Show details
        </Button>

        {isLoggedIn && (
          <ActionIcon
            variant="default"
            radius="md"
            size={36}
            onClick={handleFavoriteToggle}
          >
            {isFavorited ? (
              <IconHeartFilled
                className={classes.like}
                stroke={1.5}
                color="red"
              />
            ) : (
              <IconHeart className={classes.like} stroke={1.5} />
            )}
          </ActionIcon>
        )}
      </Group>

      {isLoggedIn && showOwnerActions && (
        <Group mt="xs" grow>
          <Button color="#333399" radius="md" onClick={handleUpdate}>
            Update
          </Button>
          <Button color="#990000" radius="md" onClick={handleDelete}>
            Delete
          </Button>
        </Group>
      )}
    </Card>
  );
};

export default BadgeCard;
