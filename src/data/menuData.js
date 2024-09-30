// menuData.js

export const menuItems = [
  { name: "Home", link: "/" },
  { name: "Hot Deals", link: "#" },
  {
    name: "Categories",
    dropdown: true,
    items: [
      {
        name: "Electronics",
        dropdown: true,
        items: [
          { name: "Desktop", type: "Desktop", brand: ["Dell", "Microsoft"] },
          { name: "Laptop", type: "Laptop", brand: ["Xiaomi", "Huawei"] },
          { name: "Mobile", type: "Mobile", brand: ["Apple", "Samsung"] },
        ],
      },
      {
        name: "Clothing & Accessories",
        dropdown: true,
        items: [
          { name: "Men", type: "Men's Clothing", brand: ["Nike", "Adidas"] },
          { name: "Women", type: "Women's Clothing", brand: ["H&M", "Zara"] },
        ],
      },
      {
        name: "Health and Beauty",
        dropdown: true,
        items: [
          {
            name: "Skincare",
            type: "Skincare Products",
            brand: ["Clinique", "Neutrogena"],
          },
          {
            name: "Makeup",
            type: "Makeup Products",
            brand: ["MAC", "Sephora"],
          },
        ],
      },
      { name: "Offers", link: "#" },
    ],
  },
  { name: "Contact Us", link: "contactus" },
  { name: "About Us", link: "aboutus" },
  { name: "Customer Profile", link: "customerProfile" },
];
