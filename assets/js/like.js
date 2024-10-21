let localData = localStorage.getItem("isLike");
let arrData = JSON.parse(localData);
let likeContainer = document.querySelector(".likeContainer");
let regx = RegExp(/[a-z\s\']/g);

fetch("http://localhost:3000/products")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((value) => {
      function addData() {
        let userPrice = Number(value.price.replace(regx, ""));
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML += `
      <div class="card">
        <img style="position: relative;" class="img" src=${value.img}>
        <i id="likes" data-id="${
          value.id
        }" style="position: absolute; cursor: pointer;" class="fa-solid fa-heart"></i>
        <p class="title">${value.title}</p>
        <div class="rating">
          <div class="stars">
            ${Array.from({ length: value.rate })
              .map(
                (_, value) =>
                  `<i class="fa-solid fa-star fa-2xs" style="color: #FFD43B;"></i>`
              )
              .join(" ")}
            ${Array.from({ length: 5 - value.rate })
              .map(
                (_, value) =>
                  `<i class="fa-regular fa-star fa-2xs" style="color: #FFD43B;"></i>`
              )
              .join(" ")}
          </div>
          <div class="comments">4 отзывов</div>
        </div>
        <div class="price">
          <div class="real_price">${value.price}</div>
          <div class="precent_price">${value.price}</div>
          <div class="monthly_price">${
            Math.round(userPrice / 12) + " x 12 мес"
          }</div>
        </div>
        <div class="adding_product">
          <button class="btn">Купить в один клик</button>
          <button class="btn_shop">
            <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i>
          </button>
        </div>
      </div>
      `;
        likeContainer.append(card);
        let liked = card.querySelector("#likes");

        liked.addEventListener("click", (e) => {
          let likeId = e.target.dataset.id;
          let localData = JSON.parse(localStorage.getItem("isLike"));
          localData.splice(likeId, 1);
          localStorage.setItem("isLike", JSON.stringify(localData));
          location.reload();
        });
      }
      if (arrData[value.id].isLike === true) {
        addData(value);
      }
    });
  })
  .catch((error) => console.error(error));

//   liked.classList.remove("fa-regular");
//   liked.classList.add("fa-solid");
