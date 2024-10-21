import { products } from "./index.js";
import { counter2 } from "./shop.js";
let regx = RegExp(/[a-z\s\']/, "g");

function addData({ id, img, title, price, rate }) {
  let userPrice = Number(price.replace(regx, ""));
  let card = document.createElement("card");
  card.classList.add("card");

  card.innerHTML += `
     <div class="card">
        <img style="position: relative;" class="img" src=${img}>
        <i id="likes" data-id="${id}" style="position: absolute; cursor: pointer;" class="fa-regular fa-heart"></i>
        <p class="title">${title}</p>
        <div class="rating">
            <div class="stars">
              ${Array.from({ length: rate })
                .map(
                  () =>
                    `<i class="fa-solid fa-star fa-2xs" style="color: #FFD43B;"></i>`
                )
                .join(" ")}
              ${Array.from({ length: 5 - rate })
                .map(
                  () =>
                    `<i class="fa-regular fa-star fa-2xs" style="color: #FFD43B;"></i>`
                )
                .join(" ")}
            </div>
            <div class="comments">4 отзывов</div>
        </div>
        <div class="price">
            <div class="real_price">${price}</div>
            <div class="precent_price">${price}</div>
            <div class="monthly_price">${Math.round(
              userPrice / 12
            )} x 12 мес</div>
        </div>
        <div class="adding_product">
            <button class="btn">Купить в один клик</button>
            <button class="btn_shop">
                <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i>
            </button>
        </div>
     </div>
  `;

  products.append(card);
  let liked = card.querySelector("#likes");
  let localData = JSON.parse(localStorage.getItem("isLike")) || [];
  if (localData[id]?.isLike) {
    liked.classList.remove("fa-regular");
    liked.classList.add("fa-solid");
  }

  liked.addEventListener("click", (e) => {
    location.reload();
    let likeId = e.target.dataset.id;
    if (liked.classList.contains("fa-regular")) {
      liked.classList.remove("fa-regular");
      liked.classList.add("fa-solid");
      localData[likeId] = { isLike: true };
    } else {
      liked.classList.remove("fa-solid");
      liked.classList.add("fa-regular");
      localData[likeId] = { isLike: false };
    }

    localStorage.setItem("isLike", JSON.stringify(localData));
  });
}

function addDataTocart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.find((value) => value?.id === product?.id)) {
    cart = cart.map((value) => {
      if (value?.id === product?.id) {
        return {
          ...value,
        };
      }
      return value;
    });
    return;
  }

  cart = [
    ...cart,
    {
      ...product,
      counter: 1,
      userPrice: Number(product.price?.replace(regx, "")),
    },
  ];
  localStorage.setItem("cart", JSON.stringify(cart));
  counter2.textContent = cart.length;
}

export { addData, addDataTocart };
