import carousel from "./carousel.jpg";
import logo from "./logo.png";
import blog_card1 from "./blog_card1.jpg";
import blog_card2 from "./blog_card2.jpg";
import menu_1 from "./menu_1.png";
import menu_2 from "./menu_2.png";
import menu_3 from "./menu_3.png";
import menu_4 from "./menu_4.png";
import menu_5 from "./menu_5.png";
import menu_6 from "./menu_6.png";
import menu_7 from "./menu_7.png";
import menu_8 from "./menu_8.png";
import food_1 from "./food_1.jpg";
import food_2 from "./food_2.jpg";
import food_3 from "./food_3.jpg";
import food_4 from "./food_4.jpg";
import food_5 from "./food_5.jpg";
import food_6 from "./food_6.jpg";
import food_7 from "./food_7.jpg";
import food_8 from "./food_8.jpg";
import rec5_step1 from "./rec5_step1.jpg";
import rec5_step2 from "./rec5_step2.jpg";
import rec5_step3 from "./rec5_step3.jpg";
import rec5_step4 from "./rec5_step4.jpg";
import author_1 from "./author_1.jpg";
// import author_2 from "./author_2.jpg";
// import author_3 from "./author_3.jpg";
import author_4 from "./author_4.jpg";
import author_5 from "./author_5.jpg";
// import author_6 from "./author_6.jpg";
// import author_7 from "./author_7.jpg";
// import author_8 from "./author_8.jpg";

import user_1 from "./user_1.jpg";
import user_2 from "./user_2.jpg";
import user_3 from "./user_3.jpg";
import about_title from "./about_title.jpg";
import about_1 from "./about_1.jpg";
import about_2 from "./about_2.jpg";
import about_3 from "./about_3.jpg";
import founder_1 from "./founder_1.jpg";
import founder_2 from "./founder_2.jpg";
import founder_3 from "./founder_3.jpg";
import contact_1 from "./contact_1.jpg";

export const aboutImages = {
  about_title,
  about_1,
  about_2,
  about_3,
  founder_1,
  founder_2,
  founder_3,
};

export const contactImages = {
  contact_1,
};

export const assets = {
  carousel,
  logo,
};

export const blogImages = {
  blog_card1,
  blog_card2,
};

export const menu_list = [
  {
    menu_name: "Salad",
    menu_image: menu_1,
  },
  {
    menu_name: "Soup",
    menu_image: menu_2,
  },
  {
    menu_name: "Dessert",
    menu_image: menu_3,
  },
  {
    menu_name: "Sandwich",
    menu_image: menu_4,
  },
  {
    menu_name: "Meat",
    menu_image: menu_5,
  },
  {
    menu_name: "Drink",
    menu_image: menu_6,
  },
  {
    menu_name: "Pasta",
    menu_image: menu_7,
  },
  {
    menu_name: "SeaFood",
    menu_image: menu_8,
  },
];

export const author_list = [
  {
    _id: "1",
    name: "Gordon Ramsay",
    image: author_1,
    description:
      "Michelin-starred chef, restaurateur, and television personality known for his fiery passion and exquisite dishes.",
    social: {
      instagram: "https://www.instagram.com/gordongram/",
      twitter: "https://twitter.com/GordonRamsay",
      youtube: "https://www.youtube.com/c/gordonramsay",
    },
  },
  {
    _id: "2",
    name: "Jamie Oliver",
    image: "author_2",
    description:
      "British chef and campaigner known for his simple yet delicious home-cooked meals.",
    social: {
      instagram: "https://www.instagram.com/jamieoliver/",
      twitter: "https://twitter.com/jamieoliver",
      youtube: "https://www.youtube.com/user/JamieOliver",
    },
  },
  {
    _id: "3",
    name: "Nigella Lawson",
    image: "author_3",
    description:
      "English food writer and television cook known for her indulgent, comforting recipes.",
    social: {
      instagram: "https://www.instagram.com/nigellalawson/",
      twitter: "https://twitter.com/Nigella_Lawson",
      youtube: "https://www.youtube.com/c/NigellaLawson",
    },
  },
  {
    _id: "4",
    name: "Martha Stewart",
    image: author_4,
    description:
      "Lifestyle expert and cookbook author specializing in elegant home cooking.",
    social: {
      instagram: "https://www.instagram.com/marthastewart/",
      twitter: "https://twitter.com/MarthaStewart",
      youtube: "https://www.youtube.com/user/MarthaStewart",
    },
  },
  {
    _id: "5",
    name: "Bobby Flay",
    image: author_5,
    description:
      "An American celebrity chef known for his bold flavors, innovative grilling techniques, and signature fusion of classic American and international cuisine. With years of experience in the culinary world, he has inspired countless home cooks and professionals alike. His passion for cooking is reflected in his creative recipes and dedication to bringing people together through food.",
    social: {
      instagram: "https://www.instagram.com/bobbyflay/",
      twitter: "https://twitter.com/bflay",
      youtube: "https://www.youtube.com/c/BobbyFlay",
    },
  },
  {
    _id: "6",
    name: "Yotam Ottolenghi",
    image: "author_6",
    description:
      "Israeli-British chef known for his vibrant Middle Eastern-inspired dishes.",
    social: {
      instagram: "https://www.instagram.com/ottolenghi/",
      twitter: "https://twitter.com/Ottolenghi",
      youtube: "https://www.youtube.com/c/Ottolenghi",
    },
  },
  {
    _id: "7",
    name: "Samin Nosrat",
    image: "author_7",
    description:
      "Chef and author of 'Salt, Fat, Acid, Heat', known for her engaging teaching style.",
    social: {
      instagram: "https://www.instagram.com/ciaosamin/",
      twitter: "https://twitter.com/ciaosamin",
      youtube: "https://www.youtube.com/c/SaminNosrat",
    },
  },
  {
    _id: "8",
    name: "Anthony Bourdain",
    image: "author_8",
    description:
      "Renowned chef, author, and TV host known for his culinary travel adventures.",
    social: {
      instagram: "https://www.instagram.com/anthonybourdain/",
      twitter: "https://twitter.com/Bourdain",
      youtube: "https://www.youtube.com/c/AnthonyBourdain",
    },
  },
];

export const recipe_list = [
  {
    _id: "1",
    title: "Greek Salad",
    image: food_1,
    description:
      "A refreshing salad with feta cheese, olives, and fresh vegetables.",
    ingredients: [
      "1 cucumber",
      "2 tomatoes",
      "1/2 red onion",
      "100g feta cheese",
      "10 olives",
      "2 tbsp olive oil",
      "1 tsp oregano",
    ],
    instructions: [
      {
        step_name: "Prepare the Ingredients",
        image: "prepare_ingredients.jpg",
        description:
          "Proper preparation is key to a smooth and enjoyable cooking process. Start by measuring 500 grams of chicken, 2 lemons, 3 teaspoons of olive oil, 4 garlic cloves, 1 chili pepper, 2 teaspoons of parsley, and the remaining ingredients accurately. Cut the chicken into bite-sized pieces for even cooking, and dice the bell peppers and onions into similar-sized chunks to ensure uniform grilling. Mince the garlic finely to release its full, aromatic flavor. Soak the wooden skewers in water for at least 30 minutes to prevent burning or splintering during grilling. Arrange and organize all the ingredients neatly in advance to avoid last-minute scrambling and ensure a seamless, efficient, and enjoyable assembly process that leads to a perfectly prepared dish.",
      },
      {
        step_name: "Make the Marinade",
        image: "make_marinade.jpg",
        description:
          "In a large mixing bowl, whisk together the juice of 2 lemons, 3 teaspoons of olive oil, 4 minced garlic cloves, 1 chopped chili pepper, 2 teaspoons of parsley, 1 teaspoon of salt, 1/2 teaspoon of black pepper, and 1 teaspoon of cumin. Whisk thoroughly to blend the ingredients until the salt and cumin are fully dissolved. Add the chicken pieces to the bowl, making sure each piece is well coated with the marinade. Massage the marinade into the chicken to maximize flavor absorption. Cover the bowl with plastic wrap and let it marinate for at least 20 minutes at room temperature. For more intense flavor, refrigerate the chicken for up to 2 hours. Marinating allows the flavors to deeply infuse into the chicken, resulting in a more flavorful and juicy final dish.",
      },
      {
        step_name: "Assemble the Skewers",
        image: "assemble_skewers.jpg",
        description:
          "Thread marinated chicken onto soaked skewers, alternating with bell pepper and onion chunks. Distribute chicken and vegetables evenly to balance flavors and ensure consistent cooking. Leave small gaps between pieces for better heat circulation during grilling, preventing uneven cooking. Avoid overcrowding, as this can cause chicken to cook improperly. Brush leftover marinade over skewers for extra flavor. The colorful vegetables and marinated chicken create an appealing presentation. Secure ingredients firmly to prevent slipping off during grilling. Well-assembled skewers ensure efficient grilling and an attractive final dish. Taking the time to assemble the skewers properly enhances both the taste and visual appeal of the meal.",
      },
      {
        step_name: "Grill the Skewers",
        image: "grill_skewers.jpg",
        description:
          "Preheat your grill to medium-high heat and lightly oil the grates to prevent sticking. Place the skewers on the grill, leaving some space between them for even heat distribution. Grill the skewers for 10-12 minutes, turning them occasionally to cook all sides evenly. Baste with any leftover marinade for added moisture and flavor. The chicken should be cooked through, with a slight char on the outside, while the vegetables should be tender but still crisp. Use a meat thermometer to ensure the chicken reaches an internal temperature of 75°C (165°F) for safe consumption. Once the skewers are grilled to perfection, carefully remove them and let them rest for a few minutes. Resting allows the juices to redistribute, keeping the chicken moist, juicy, and flavorful when served.",
      },
      {
        step_name: "Serve and Enjoy",
        image: "serve_enjoy.jpg",
        description:
          "Allow the skewers to rest briefly to lock in their juices before serving. Pair them with roasted potatoes, a fresh green salad, or warm pita bread for a complete and satisfying meal. Drizzle the skewers with fresh lemon juice or sprinkle with extra parsley for added zest and brightness. These skewers are perfect for family dinners, barbecues, or casual gatherings with friends and loved ones. Serve with flavorful dips like tzatziki, hummus, or garlic sauce to enhance the flavors even more. The combination of spicy, tender chicken and crisp, charred vegetables creates a dish that is both flavorful and deeply satisfying. The vibrant colors, enticing aroma, and rich taste make these skewers a crowd-pleaser, bringing people together to enjoy a delicious, memorable, and heartwarming meal experience.",
      },
    ],
    category: "Salad",
  },
  {
    _id: "2",
    title: "Tomato Soup",
    image: food_2,
    description: "A classic tomato soup with a rich and creamy texture.",
    ingredients: [
      "4 tomatoes",
      "1 onion",
      "2 cloves garlic",
      "2 cups vegetable broth",
      "1/2 cup heavy cream",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Sauté onions and garlic until soft.",
      "Add chopped tomatoes and cook for 5 minutes.",
      "Pour in vegetable broth and simmer for 15 minutes.",
      "Blend until smooth, add cream, and season to taste.",
      "Serve hot.",
    ],
    category: "Soup",
  },
  {
    _id: "3",
    title: "Chocolate Brownie",
    image: food_3,
    description: "A rich and fudgy chocolate dessert.",
    ingredients: [
      "200g dark chocolate",
      "100g butter",
      "3/4 cup sugar",
      "2 eggs",
      "1/2 cup flour",
      "1 tsp vanilla extract",
    ],
    instructions: [
      "Melt chocolate and butter together.",
      "Whisk in sugar, eggs, and vanilla.",
      "Fold in flour and mix well.",
      "Pour into a baking dish and bake at 180°C for 25 minutes.",
      "Let cool before serving.",
    ],
    category: "Dessert",
  },
  {
    _id: "4",
    title: "Chicken Sandwich",
    image: food_4,
    description: "A delicious grilled chicken sandwich with fresh veggies.",
    ingredients: [
      "2 slices of bread",
      "1 grilled chicken breast",
      "Lettuce",
      "Tomato slices",
      "Mayonnaise",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Grill the chicken breast with salt and pepper.",
      "Toast the bread slices.",
      "Spread mayonnaise on bread and add lettuce, chicken, and tomato slices.",
      "Close the sandwich and serve.",
    ],
    category: "Sandwich",
  },
  {
    _id: "5",
    title: "Grilled Steak",
    image: food_5,
    description: "Juicy and tender steak grilled to perfection.",
    videoUrl:
      "https://www.youtube.com/embed/lj4ZCxh25WE?si=lMVsWZnRe7YP7xo_?rel=0", // ?rel=0 parametresi, önerilen videoları engeller"
    ingredients: [
      "1 beef steak",
      "1 tbsp olive oil",
      "Salt and pepper to taste",
      "1 tsp garlic powder",
      "Fresh rosemary (optional)",
    ],
    instructions: [
      {
        step_name: "Prepare the Ingredients",
        image: rec5_step1,
        description:
          "Proper preparation is key to a smooth and enjoyable cooking process. Start by measuring 500 grams of chicken, 2 lemons, 3 teaspoons of olive oil, 4 garlic cloves, 1 chili pepper, 2 teaspoons of parsley, and the remaining ingredients accurately. Cut the chicken into bite-sized pieces for even cooking, and dice the bell peppers and onions into similar-sized chunks to ensure uniform grilling. Mince the garlic finely to release its full, aromatic flavor. Soak the wooden skewers in water for at least 30 minutes to prevent burning or splintering during grilling. Arrange and organize all the ingredients neatly in advance to avoid last-minute scrambling and ensure a seamless, efficient, and enjoyable assembly process that leads to a perfectly prepared dish.",
      },
      {
        step_name: "Make the Marinade",
        image: rec5_step2,
        description:
          "In a large mixing bowl, whisk together the juice of 2 lemons, 3 teaspoons of olive oil, 4 minced garlic cloves, 1 chopped chili pepper, 2 teaspoons of parsley, 1 teaspoon of salt, 1/2 teaspoon of black pepper, and 1 teaspoon of cumin. Whisk thoroughly to blend the ingredients until the salt and cumin are fully dissolved. Add the chicken pieces to the bowl, making sure each piece is well coated with the marinade. Massage the marinade into the chicken to maximize flavor absorption. Cover the bowl with plastic wrap and let it marinate for at least 20 minutes at room temperature. For more intense flavor, refrigerate the chicken for up to 2 hours. Marinating allows the flavors to deeply infuse into the chicken, resulting in a more flavorful and juicy final dish.",
      },
      {
        step_name: "Grill the Skewers",
        image: rec5_step3,
        description:
          "Preheat your grill to medium-high heat and lightly oil the grates to prevent sticking. Place the skewers on the grill, leaving some space between them for even heat distribution. Grill the skewers for 10-12 minutes, turning them occasionally to cook all sides evenly. Baste with any leftover marinade for added moisture and flavor. The chicken should be cooked through, with a slight char on the outside, while the vegetables should be tender but still crisp. Use a meat thermometer to ensure the chicken reaches an internal temperature of 75°C (165°F) for safe consumption. Once the skewers are grilled to perfection, carefully remove them and let them rest for a few minutes. Resting allows the juices to redistribute, keeping the chicken moist, juicy, and flavorful when served.",
      },
      {
        step_name: "Serve and Enjoy",
        image: rec5_step4,
        description:
          "Allow the skewers to rest briefly to lock in their juices before serving. Pair them with roasted potatoes, a fresh green salad, or warm pita bread for a complete and satisfying meal. Drizzle the skewers with fresh lemon juice or sprinkle with extra parsley for added zest and brightness. These skewers are perfect for family dinners, barbecues, or casual gatherings with friends and loved ones. Serve with flavorful dips like tzatziki, hummus, or garlic sauce to enhance the flavors even more. The combination of spicy, tender chicken and crisp, charred vegetables creates a dish that is both flavorful and deeply satisfying. The vibrant colors, enticing aroma, and rich taste make these skewers a crowd-pleaser, bringing people together to enjoy a delicious, memorable, and heartwarming meal experience.",
      },
    ],
    category: "Meat",
  },
  {
    _id: "6",
    title: "Lemonade",
    image: food_6,
    description: "A refreshing homemade lemonade with fresh lemons.",
    ingredients: [
      "4 lemons",
      "1/2 cup sugar",
      "4 cups water",
      "Ice cubes",
      "Fresh mint (optional)",
    ],
    instructions: [
      "Juice the lemons and strain the seeds.",
      "Dissolve sugar in warm water.",
      "Mix lemon juice and sweetened water.",
      "Serve over ice and garnish with mint.",
    ],
    category: "Drink",
  },
  {
    _id: "7",
    title: "Creamy Alfredo Pasta",
    image: food_7,
    description: "A rich and creamy Alfredo pasta with parmesan cheese.",
    ingredients: [
      "200g pasta",
      "1 cup heavy cream",
      "50g butter",
      "100g parmesan cheese",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Cook pasta according to package instructions.",
      "Melt butter in a pan and add heavy cream.",
      "Stir in grated parmesan cheese and season with salt and pepper.",
      "Mix in the cooked pasta and serve warm.",
    ],
    category: "Pasta",
  },
  {
    _id: "8",
    title: "Garlic Butter Shrimp",
    image: food_8,
    description: "A quick and delicious garlic butter shrimp dish.",
    ingredients: [
      "200g shrimp",
      "2 tbsp butter",
      "3 cloves garlic (minced)",
      "Salt and pepper to taste",
      "1 tbsp lemon juice",
    ],
    instructions: [
      "Heat butter in a pan and add minced garlic.",
      "Add shrimp and cook for 2-3 minutes per side.",
      "Season with salt, pepper, and lemon juice.",
      "Serve hot with rice or salad.",
    ],
    category: "SeaFood",
  },
];
/*recipe._id === comment.recipeId //eşleşirse yorum o tarife ait demektir. */
export const comment_list = [
  {
    _id: "1", //yorumun id'si
    recipeId: "5", // hangi tarife ait
    user: {
      _id: "u1", //hangi kullanıcıya ait
      name: "Emily Carter",
      image: user_1,
    },
    commentText: "This recipe was absolutely delicious! My family loved it.",
    rating: 5, // 1-5 arası puan
    createdAt: "2024-08-01T10:15:00Z",
  },
  {
    _id: "2",
    recipeId: "5",
    user: {
      _id: "u2",
      name: "Liam Johnson",
      image: user_2,
    },
    commentText: "So easy to follow, and the results were amazing. Thanks!",
    rating: 4,
    createdAt: "2024-08-02T12:45:00Z",
  },
  {
    _id: "3",
    recipeId: "5",
    user: {
      _id: "u3",
      name: "Sophia Martinez",
      image: user_3,
    },
    commentText: "Tried this last night — 10/10 would recommend!",
    rating: 5,
    createdAt: "2024-08-03T09:30:00Z",
  },
  {
    _id: "4",
    recipeId: "6",
    user: {
      _id: "u4",
      name: "Noah Smith",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    commentText: "Perfect for a weeknight dinner. Quick, easy, and tasty.",
    rating: 4,
    createdAt: "2024-08-04T14:20:00Z",
  },
  {
    _id: "5",
    recipeId: "1",
    user: {
      _id: "u5",
      name: "Olivia Brown",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    commentText: "Absolutely loved it. Will definitely make it again!",
    rating: 5,
    createdAt: "2024-08-05T17:05:00Z",
  },
];
