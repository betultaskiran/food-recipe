// Jotai atomlarını burada tanımlıyoruz
import { atom } from "jotai";
import { recipe_list, author_list, comment_list } from "../assets/assets.js";
const baseUrl = "http://localhost:3000/api";
export const uploadsPath = "http://localhost:3000/";

export const isLoggedInAtom = atom(!!localStorage.getItem("token"));

export const popupOpenAtom = atom(false);

export const popupFormTypeAtom = atom("login");

export const recipesAtom = atom(recipe_list);

export const authorsAtom = atom(author_list);

export const commentsAtom = atom(comment_list);

export default baseUrl;

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!getToken(); // Token varsa kullanıcı giriş yapmıştır
};

export const favoritesAtom = atom([]);
