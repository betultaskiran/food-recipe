import React, { useEffect, useRef, useState } from "react";
import styles from "./About.module.css";
import { aboutImages } from "../../assets/assets";
import Founders from "../../components/Founders/Founders";
import { Container } from "@mantine/core";

const About = () => {
  /*useRef React Hook’udur ve temel olarak DOM elemanlarına referans tutmak veya değişken gibi davranan, yeniden render tetiklemeyen bir şeyler saklamak için kullanılır.*/
  const imageRef1 = useRef(null);
  const imageRef2 = useRef(null);
  const [image1Visible, setImage1Visible] = useState(false);
  const [image2Visible, setImage2Visible] = useState(false);

  useEffect(() => {
    //IntersectionObserver tarayıcı API’sidir. Bir eleman, görünüm alanına (viewport) girdiğinde veya çıktığında tetiklenir.
    const observer1 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImage1Visible(true);
        }
      },
      { threshold: 0.3 } // Görselin en az %30’u görünür olduğunda bu tetiklenir.
    );

    const observer2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImage2Visible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (imageRef1.current) observer1.observe(imageRef1.current); //imageRef1.current varsa (yani bir DOM elemanına bağlandıysa), observer1 bu DOM elemanını izlemeye başlar.
    if (imageRef2.current) observer2.observe(imageRef2.current);

    return () => {
      if (imageRef1.current) observer1.unobserve(imageRef1.current); //imageRef1 ile işaretlenmiş DOM elemanının gözlemini durdurur (temizlik işlemi).
      if (imageRef2.current) observer2.unobserve(imageRef2.current);
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.overlay}>
          <h1>About Us</h1>
          <p>
            Explore our passion for food and creativity. We craft inspiring
            recipes to bring people together, celebrate great meals, and make
            cooking a joyful experience.
          </p>
        </div>
      </div>

      <Container size="xl">
        <div className={styles.container}>
          <div className={styles.section}>
            <div className={styles.text}>
              <h2>
                Driven by a love for food, we craft unique culinary experiences
                that bring people together.
              </h2>
              <p>
                We are a team of food enthusiasts dedicated to crafting
                exceptional recipes that inspire joy and creativity in every
                meal. Focused on quality ingredients and innovative flavors, we
                aim to create dishes that bring people together and celebrate
                the art of cooking.
              </p>
            </div>
            <div className={styles.image} ref={imageRef1}>
              <img
                src={aboutImages.about_1}
                alt="about_1"
                className={`${styles.imageSlideInRight} ${
                  image1Visible ? styles.imageVisible : ""
                }`}
              />
            </div>
          </div>

          <div className={`${styles.section} ${styles.reverse}`}>
            <div className={styles.text}>
              <h2>A team driven by passion and creativity in the kitchen.</h2>
              <p>
                Our journey began with a shared love for food and a desire to
                inspire others to explore the joy of cooking. What started as a
                collection of home recipes grew into a mission to create
                memorable meals that bring people together. Driven by a
                commitment to quality ingredients and innovative flavors, we
                believe food is more than just sustenance – it’s an experience
                to be shared and celebrated. Each recipe we craft reflects our
                passion for creativity, connection, and the simple joy of a
                great meal.
              </p>
            </div>
            <div className={styles.image} ref={imageRef2}>
              <img
                src={aboutImages.about_2}
                alt="teamwork"
                className={`${styles.imageSlideInLeft} ${
                  image2Visible ? styles.imageVisible : ""
                }`}
              />
            </div>
          </div>

          <Founders />

          <div className={styles.callToAction}>
            <div className={styles.callOverlay}>
              <h2>
                Join us in exploring the art of cooking and create unforgettable
                meals. Start your culinary journey today!
              </h2>
              <a href="/contact-us" className={styles.contactButton}>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default About;
