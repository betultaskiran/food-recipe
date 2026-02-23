import {
  Box,
  Burger,
  Container,
  Divider,
  Drawer,
  Group,
  HoverCard,
  ScrollArea,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import ButtonComponent from "../Button/ButtonComponent";
import { useAtom, useSetAtom } from "jotai";
import {
  popupOpenAtom,
  popupFormTypeAtom,
  isLoggedInAtom,
  removeToken,
} from "../../atoms/popupAtom";
import LoginPopup from "../LoginPopup/LoginPopup";
import classes from "./HeaderMegaMenu.module.css";
import logo from "../../assets/logo.png";
import { Modal } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

export default function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const setPopupOpen = useSetAtom(popupOpenAtom);
  const setFormType = useSetAtom(popupFormTypeAtom);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleLoginClick = () => {
    setFormType("login");
    setPopupOpen(true);
  };

  const handleLogoutClick = () => {
    removeToken();
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const categories = [
    { name: "Salad", path: "/categories/salad" },
    { name: "Soups", path: "/categories/soups" },
    { name: "Desserts", path: "/categories/desserts" },
    { name: "Sandwich", path: "/categories/sandwich" },
    { name: "Meat", path: "/categories/meat" },
    { name: "Drinks", path: "/categories/drinks" },
    { name: "Pasta", path: "/categories/pasta" },
    { name: "SeaFood", path: "/categories/seafood" },
  ];

  return (
    <Box pb={30}>
      <LoginPopup />
      <Container size="xl">
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <Link to="/" className={classes.logoContainer}>
              <div className={classes.logoWrapper}>
                <img src={logo} alt="Logo" className={classes.logo} />
                <span>GastronoMagic</span>
              </div>
            </Link>

            {/* Desktop Menü */}
            <Group h="50%" gap={{ base: 4, md: 12, lg: 18 }} visibleFrom="md">
              <Link to="/" className={classes.link}>
                Home
              </Link>
              <Link to="/recipes" className={classes.link}>
                Recipes
              </Link>

              {/* <HoverCard width={200} shadow="md" withinPortal>
                <HoverCard.Target>
                  <Text className={classes.link} style={{ cursor: "pointer" }}>
                    Categories
                  </Text>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      className={classes.subLink}
                    >
                      {category.name}
                    </Link>
                  ))}
                </HoverCard.Dropdown>
              </HoverCard> */}

              <Link to="/about-us" className={classes.link}>
                About Us
              </Link>
              <Link to="/contact-us" className={classes.link}>
                Contact
              </Link>

              {isLoggedIn && (
                <>
                  <Link to="/profile" className={classes.link}>
                    Profile
                  </Link>
                  <Link to="/favorites" className={classes.link}>
                    Favorites
                  </Link>
                </>
              )}
            </Group>

            {/* Search + Giriş/Çıkış + Mobil Menü Butonu */}
            <Group visibleFrom="md" gap={{ base: 6, md: 12, lg: 18 }}>
              <FaSearch
                size={20}
                style={{
                  cursor: "pointer",
                  color: "black",
                  transition: "color 0.3s",
                }}
                onClick={() => setSearchModalOpen(true)} // Artık modal açılıyor
                onMouseEnter={(e) => (e.target.style.color = "#b37700")}
                onMouseLeave={(e) => (e.target.style.color = "black")}
              />

              {searchVisible && (
                <TextInput
                  placeholder="Search..."
                  style={{ width: "200px", marginLeft: "10px" }}
                />
              )}

              {isLoggedIn ? (
                <ButtonComponent text="Log out" onClick={handleLogoutClick} />
              ) : (
                <ButtonComponent text="Log in" onClick={handleLoginClick} />
              )}
            </Group>

            <Group hiddenFrom="md">
              <FaSearch
                size={20}
                className={classes.searchIcon}
                onClick={() => setSearchModalOpen(true)}
              />
              <Burger opened={drawerOpened} onClick={toggleDrawer} />
            </Group>
          </Group>
        </header>
      </Container>

      <Modal
        opened={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        title="Search Recipes"
        centered
      >
        <TextInput
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(`/recipes?search=${encodeURIComponent(searchQuery)}`);
              setSearchModalOpen(false);
              setSearchQuery(""); // Arama kutusunu temizle
            }
          }}
        />
      </Modal>

      {/* Mobil Drawer Menüsü */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="md"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <Divider my="sm" />
          <Link to="/" className={classes.link} onClick={closeDrawer}>
            Home
          </Link>
          <Link to="/recipes" className={classes.link} onClick={closeDrawer}>
            Recipes
          </Link>
          <Link to="/about-us" className={classes.link} onClick={closeDrawer}>
            About Us
          </Link>
          <Link to="/contact-us" className={classes.link} onClick={closeDrawer}>
            Contact
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/profile"
                className={classes.link}
                onClick={closeDrawer}
              >
                Profile
              </Link>
              <Link
                to="/favorites"
                className={classes.link}
                onClick={closeDrawer}
              >
                Favorites
              </Link>
            </>
          )}

          {/* Logout / Login button */}
          {!isLoggedIn ? (
            <Link
              to="#"
              className={classes.loginLink}
              onClick={(e) => {
                e.preventDefault();
                handleLoginClick();
                closeDrawer();
              }}
            >
              Log in
            </Link>
          ) : (
            <Link
              to="#"
              className={classes.logoutLink}
              onClick={(e) => {
                e.preventDefault();
                handleLogoutClick();
                closeDrawer();
              }}
            >
              Log out
            </Link>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
HeaderMegaMenu.jsx;
