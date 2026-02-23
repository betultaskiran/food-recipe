import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextInput,
  Textarea,
  Button,
  Container,
  Title,
  FileInput,
  Image,
  ActionIcon,
  Group,
  Select,
} from "@mantine/core";
import baseUrl, { uploadsPath } from "../../atoms/popupAtom";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IconPlus, IconTrash } from "@tabler/icons-react";

export default function AddRecipe() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    category: "",
    ingredients: [""],
    image: null,
  });

  const [instructions, setInstructions] = useState([
    { step_name: "", description: "", image: null, preview: null },
  ]);

  const [previewUrl, setPreviewUrl] = useState(null);

  const categoryOptions = [
    { value: "Salad", label: "🥗 Salad" },
    { value: "Soup", label: "🍲 Soup" },
    { value: "Dessert", label: "🍰 Dessert" },
    { value: "Sandwich", label: "🥪 Sandwich" },
    { value: "Meat", label: "🥩 Meat" },
    { value: "Drink", label: "🍹 Drink" },
    { value: "Pasta", label: "🍝 Pasta" },
    { value: "SeaFood", label: "🦐 SeaFood" },
  ];

  useEffect(() => {
    if (isEditMode) {
      const fetchRecipe = async () => {
        try {
          const res = await axios.get(`${baseUrl}/recipe/${id}`);
          const data = res.data.recipe;

          setFormData((prev) => ({
            ...prev,
            title: data.title || "",
            description: data.description || "",
            videoUrl: data.videoUrl || "",
            category: data.category || "",
            ingredients: Array.isArray(data.ingredients)
              ? data.ingredients
              : [""],
            image: data.image,
          }));
          setPreviewUrl(uploadsPath + data.image);

          if (data.instructions) {
            setInstructions(
              data.instructions.map((inst) => ({
                step_name: inst.step_name || "",
                description: inst.description || "",
                image: inst.image,
                preview: inst.image ? `${uploadsPath}${inst.image}` : null,
              }))
            );
          }
        } catch (err) {
          toast.error("Recipe could not be loaded!");
        }
      };

      fetchRecipe();
    }
  }, [id, isEditMode]);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post(`${baseUrl}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.url;
    } catch (err) {
      toast.error("Image upload failed!");
      return null;
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = async (file) => {
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setFormData((prev) => ({ ...prev, image: imageUrl }));
      setPreviewUrl(uploadsPath + imageUrl);
    }
  };

  const handleIngredientChange = (value, index) => {
    const updated = [...formData.ingredients];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, ingredients: updated }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const removeIngredient = (index) => {
    const updated = formData.ingredients.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, ingredients: updated }));
  };

  const handleInstructionChange = (index, field, value) => {
    const updated = [...instructions];
    updated[index][field] = value;
    setInstructions(updated);
  };

  const handleInstructionImageChange = async (index, file) => {
    const imageUrl = await uploadImage(file);
    const updated = [...instructions];
    updated[index].image = imageUrl;
    updated[index].preview = uploadsPath + imageUrl;
    setInstructions(updated);
  };

  const addInstruction = () => {
    setInstructions([
      ...instructions,
      { step_name: "", description: "", image: null, preview: null },
    ]);
  };

  const removeInstruction = (index) => {
    const updated = instructions.filter((_, i) => i !== index);
    setInstructions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    const payload = {
      ...formData,
      userId,
      instructions: instructions.map((inst) => ({
        step_name: inst.step_name,
        description: inst.description,
        image: inst.image,
      })),
    };

    try {
      if (isEditMode) {
        await axios.put(`${baseUrl}/recipe/update/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Recipe updated successfully!");
      } else {
        await axios.post(`${baseUrl}/recipe/create`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Recipe added successfully!");
      }

      navigate("/profile");
    } catch (error) {
      console.error("Recipe işlem hatası:", error);
      toast.error(isEditMode ? "Update failed!" : "Create failed!");
    }
  };

  return (
    <Container size="sm">
      <Title order={2} my="md">
        {isEditMode ? "Update Recipe" : "Add New Recipe"}
      </Title>

      <form onSubmit={handleSubmit}>
        <TextInput
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <TextInput
          label="Video URL"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
        />

        <Select
          label="Category"
          placeholder="Select a category"
          data={categoryOptions}
          value={formData.category}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, category: value }))
          }
          required
        />

        <Title order={4} mt="md">
          Ingredients
        </Title>
        {formData.ingredients.map((item, index) => (
          <Group key={index} mb="xs" align="center">
            <div style={{ flex: 1 }}>
              <TextInput
                placeholder={`Ingredient ${index + 1}`}
                value={item}
                onChange={(e) => handleIngredientChange(e.target.value, index)}
                required
              />
            </div>
            <ActionIcon
              color="red"
              variant="light"
              onClick={() => removeIngredient(index)}
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        ))}
        <Button
          variant="outline"
          leftSection={<IconPlus />}
          onClick={addIngredient}
          mt="sm"
        >
          Add Ingredient
        </Button>

        <Title order={4} mt="lg">
          Instructions
        </Title>
        {instructions.map((inst, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              marginBottom: "1rem",
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 12,
            }}
          >
            <ActionIcon
              color="red"
              onClick={() => removeInstruction(index)}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 1,
              }}
            >
              <IconTrash size={18} />
            </ActionIcon>

            <Title order={5} mb="sm">
              Step {index + 1}
            </Title>

            <TextInput
              label="Step Title"
              value={inst.step_name}
              onChange={(e) =>
                handleInstructionChange(index, "step_name", e.target.value)
              }
              required
              mt="sm"
            />
            <Textarea
              label="Description"
              value={inst.description}
              onChange={(e) =>
                handleInstructionChange(index, "description", e.target.value)
              }
              required
              mt="sm"
            />
            <FileInput
              label="Step Image"
              onChange={(file) => handleInstructionImageChange(index, file)}
              mt="sm"
            />
            {inst.preview && (
              <Image
                src={inst.preview}
                alt={`Step ${index + 1} Preview`}
                height={150}
                radius="md"
                mt="xs"
                withPlaceholder
              />
            )}
          </div>
        ))}

        <Button
          variant="outline"
          leftSection={<IconPlus />}
          onClick={addInstruction}
          mt="sm"
        >
          Add Instruction
        </Button>

        <FileInput
          label="Main Image"
          name="image"
          onChange={handleImageChange}
          placeholder="Select an image"
          mt="md"
        />

        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Preview"
            mt="md"
            height={200}
            radius="md"
            withPlaceholder
          />
        )}

        <Button
          type="submit"
          fullWidth
          mt="md"
          color={isEditMode ? "#333399" : "#006600"}
        >
          {isEditMode ? "Update Recipe" : "Save Recipe"}
        </Button>
      </form>
    </Container>
  );
}
