import { totalPrice } from "./total.js";
let counter2 = document.querySelector(".counter");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
counter2.textContent = cart.length;

function add() {
  let shop_carts = document.querySelector(".shop_cards_item");
  if (!shop_carts) return;

  cart.forEach((value) => {
    let regx = RegExp(/[a-z\s\']/, "g");
    let userPrice = Number(value.price.replace(regx, ""));
    let shop_cart = document.createElement("div");
    shop_cart.classList.add("shop_card");
    shop_cart.innerHTML += `
    <img
    src=${value.img}
    alt=""
  />
  <h2>${value.title}</h2>
  <div class="counter_btn">
    <button class="decrement" id=${value.id}>-</button>
    <span class="counter_btn_shop">${value.counter}</span>
    <button class="increment" id=${value.id}>+</button>
  </div>
  <div class="shop_price">
    <h3>${value.userPrice} so'm</h3>
    <div class="month_price">${Math.round(value.userPrice / 12)}x 12</div>
  </div>
  <button  class="delete_shop">
    <i id=${value.id} class="fa-solid fa-trash"></i>
  </button>
    
    `;
    shop_carts.append(shop_cart);
  });
  totalPrice();
  deleteData();
  counterProduct(shop_carts);
}
add();
function deleteData() {
  const deleteButtons = document.querySelectorAll(".delete_shop i");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.id;
      cart = cart.filter((value) => value.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      e.target.closest(".shop_card").remove();
      totalPrice();
      counter2.textContent = cart.length;
    });
  });
}

function counterProduct(shop_carts) {
  let regx = RegExp(/[a-z\s\']/, "g");
  shop_carts.addEventListener("click", (e) => {
    let classCart = e.target.classList[0];
    if (classCart === "increment") {
      let id = e.target.id;
      if (cart.find((value) => value?.id === id)) {
        cart = cart.map((value) => {
          if (value.id === id) {
            return {
              ...value,
              counter: value.counter + 1,
              userPrice:
                (value.counter + 1) * Number(value.price?.replace(regx, "")),
            };
          }
          return value;
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        return;
      }
    }
    if (classCart === "decrement") {
      let id = e.target.id;
      if (cart.find((value) => value?.id === id)) {
        cart = cart.map((value) => {
          if (value.id === id) {
            return {
              ...value,
              counter: value.counter - 1,
              userPrice:
                (value.counter - 1) * Number(value.price?.replace(regx, "")),
            };
          }
          return value;
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        return;
      }
    }
  });
}
export { counter2 };
