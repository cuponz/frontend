// menuData.js

export const menuItems = [
  { name: "Home", link: "/" },
  { name: "Hot Deals", link: "#" },
  {
    name: "Categories",
    dropdown: true,
    items: [
      { name: "Desktop", link: "#" },
      { name: "Laptop", link: "#" },
      { name: "Mobile", link: "#" },
      { name: "Xiaomi", link: "#" },
      { name: "Huawei", link: "#" },
      // Add more categories as needed
    ],
  },
  { name: "Contact Us", link: "contactus" },
  { name: "About Us", link: "aboutus" },
  { name: "Customer Profile", link: "customerProfile" },
];
