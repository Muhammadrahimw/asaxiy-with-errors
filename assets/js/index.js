import { addData } from "./function.js";
import { addDataTocart } from "./function.js";
const loader = document.querySelector(".loader");
const products = document.querySelector(".products");
let categories = document.querySelector(".categories");
let counter = document.querySelector(".counter");
let category = localStorage.getItem("category") || "discount";
let cartlength = JSON.parse(localStorage.getItem("cart"))?.length || 0;
let otherData = JSON.parse(localStorage.getItem("isLike")) || [];
let arrData = [otherData];
counter.textContent = cartlength;

const getData = async () => {
  try {
    loader.style.display = "block";
    const request = await fetch("http://localhost:3000/products");
    let response = await request.json();
    loader.style.display = "none";
    return response;
  } catch (error) {
    return error.message;
  }
};
getData()
  .then((data) => getDataFunc(data))
  .catch((error) => console.log(error));

function getDataFunc(data) {
  products.innerHTML = "";
  let filterData = data;
  if (category !== "discount") {
    filterData = data.filter((value) => value.category === category);
  } else {
    filterData = data;
  }

  filterData.forEach((value) => {
    addData(value);
    let oneObj = {
      id: value.id,
      isLike: false,
      img: value.img,
      title: value.title,
      price: value.price,
      category: value.category,
      rate: value.rate,
    };
  });
  const buttons = document.querySelectorAll(".btn_shop");
  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      counter.textContent = cartlength;
      addDataTocart(filterData[index]);
    });
  });
}

categories.addEventListener("click", (e) => {
  let id = e.target.id;
  if (id !== "") {
    category = id;
    localStorage.setItem("category", id);
    getData().then((data) => getDataFunc(data));
  }
});

export { products };
export { getDataFunc };
