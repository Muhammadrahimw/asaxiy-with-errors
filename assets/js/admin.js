let postData = document.querySelector("#post");
let deleteData = document.querySelector("#delete");
let putData = document.querySelector("#put");
let accpet = document.querySelector("#accpet");
let info = document.querySelector(".info");
let inputImg = document.querySelector("#inputImg");
let inputName = document.querySelector("#inputName");
let inputPrice = document.querySelector("#inputPrice");
let select = document.querySelector("select");
let dataLength = null;
let forDeleteContainer = document.querySelector(".forDeleteContainer");
let forDelete = document.querySelector("#forDelete");
let acceptDelete = document.querySelector("#acceptDelete");
let acceptDeleteTwo = document.querySelector("#acceptDeleteTwo");
let deleteValue = null;
let preview = document.querySelector(".preview");
let changeContainer = document.querySelector(".changeContainer");
let changeItemTwo = document.querySelector("#changeItemTwo");
let changeItem = document.querySelector("#changeItem");
let otherP = document.querySelector(".otherP");

fetch("http://localhost:3000/products")
  .then((data) => data.json())
  .then((data) => (dataLength = data.length))
  .catch((error) => error + ":(");

postData.addEventListener("click", () => {
  info.style.display === "grid"
    ? accpet.click()
    : ((info.style.display = "grid"),
      (forDeleteContainer.style.display = "none"),
      (changeContainer.style.display = "none"));
});

accpet.addEventListener("click", (e) => {
  e.preventDefault();
  let img = inputImg.files[0];
  let baseImg = "";
  if (inputImg.files.length > 0 && inputImg.files[0].type === "image/jpeg") {
    let reader = new FileReader();
    reader.onload = function (event) {
      baseImg = event.target.result;

      fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: `${dataLength + 1}`,
          img: baseImg,
          title: inputName.value,
          price: inputPrice.value,
          category: select.value,
        }),
      })
        .then((data) => data.json())
        .then(
          (data) => console.log(data.length),
          alert("muvaffaqiyatli qo'shildi")
        )
        .catch((error) => console.log(error + ":("));
    };
    reader.readAsDataURL(img);
  } else {
    console.log("rasm kiritilmagan yoki noto'g'ri format kiritilgan!");
    alert("rasm kiritilmagan yoki noto'g'ri format kiritilgan!");
  }
});

deleteData.addEventListener("click", (event) => {
  event.preventDefault();
  info.style.display !== "none"
    ? ((info.style.display = "none"),
      (changeContainer.style.display = "none"),
      (forDeleteContainer.style.display = "flex"))
    : ((info.style.display = "grid"),
      (forDeleteContainer.style.display = "none"),
      (changeContainer.style.display = "none"));
});

acceptDelete.addEventListener("click", () => {
  fetch("http://localhost:3000/products")
    .then((data) => data.json())
    .then((data) =>
      data.forEach((item) => {
        if (item.id === forDelete.value) {
          preview.innerHTML = "";
          let card = document.createElement("div");
          let otherPrice = item.price;
          otherPrice = otherPrice.replace(/\D/g, "");
          card.innerHTML = `
            <div class="card">
                <div style="background-image: url(${
                  item.img
                })" class="img"></div>
                <p class="title">${item.title}</p>
                <div class="rating">
                    <div class="stars">
                        <i class="fa-solid fa-star fa-2xs" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star fa-2xs" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star fa-2xs" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star fa-2xs" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star fa-2xs" style="color: #FFD43B;"></i>
                    </div>
                    <div class="comments">
                        4 отзывов
                    </div>
                </div>
                <div class="price">
                    <div class="real_price">${Number(otherPrice) + 250000}</div>
                    <div class="precent_price">${item.price}</div>
                    <div class="monthly_price">${
                      Math.ceil(Number(otherPrice) / 12) + " x 12 мес"
                    }</div>
                </div>
                <div class="adding_product">
                    <button class="btn">Купить в один клик</button>
                    <div>
                        <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i>
                    </div>
                </div>
            </div>
`;
          preview.append(card);
        }
      })
    )
    .catch((error) => error + ":(");
  acceptDelete.style.display = "none";
  acceptDeleteTwo.style.display = "block";
});

acceptDeleteTwo.addEventListener("click", () => {
  fetch(`http://localhost:3000/products/${forDelete.value}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        alert("mahsulot mavjud emas");
      } else {
        alert("muvaffaqiyatli o'chirildi");
      }
    })
    .catch((error) => console.log(error + ":("));
  acceptDelete.style.display = "block";
});

putData.addEventListener("click", (event) => {
  event.preventDefault();
  info.style.display !== "none"
    ? ((info.style.display = "none"),
      (changeContainer.style.display = "flex"),
      (changeItem.style.display = "block"))
    : ((info.style.display = "grid"),
      (changeContainer.style.display = "none"),
      (forDeleteContainer.style.display = "none"));
});

changeItem.addEventListener("click", (e) => {
  e.preventDefault();
  changeItem.style.display = "none";
  fetch("http://localhost:3000/products")
    .then((data) => data.json())
    .then((data) =>
      data.forEach((item) => {
        if (item.id === forPut.value) {
          info.style.display = "grid";
          changeContainer.style.display = "none";
          forDeleteContainer.style.display = "none";
          inputName.value = item.title;
          inputPrice.value = item.price;
          select.value = item.category;
          preview.innerHTML = "";
          let card = document.createElement("div");
          let otherPrice = item.price;
          otherPrice = otherPrice.replace(/\D/g, "");
          card.innerHTML = `
            <div class="card">
                <div style="background-image: url(${
                  item.img
                })" class="img"></div>
                <p class="title">${item.title}</p>
                <div class="rating">
                    <div class="stars">
                        <i class="fa-solid fa-star fa-2xs" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star fa-2xs" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star fa-2xs" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star fa-2xs" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star fa-2xs" style="color: #FFD43B;"></i>
                    </div>
                    <div class="comments">
                        4 отзывов
                    </div>
                </div>
                <div class="price">
                    <div class="real_price">${Number(otherPrice) + 250000}</div>
                    <div class="precent_price">${item.price}</div>
                    <div class="monthly_price">${
                      Math.ceil(Number(otherPrice) / 12) + " x 12 мес"
                    }</div>
                </div>
                <div class="adding_product">
                    <button class="btn">Купить в один клик</button>
                    <div>
                        <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i>
                    </div>
                </div>
            </div>
`;
          accpet.style.display = "none";
          changeContainer.style.display = "block";
          forPut.style.display = "none";
          otherP.style.display = "none";
          changeItemTwo.style.display = "block";
          changeItemTwo.addEventListener("click", (e) => {
            let img = inputImg.files[0];
            let baseImg = "";
            if (!img) {
              alert("rasm kiriting");
            }
            if (
              inputImg.files[0].type === "image/jpeg" ||
              inputImg.files[0].type === "image/jpg" ||
              inputImg.files[0].type === "image/png" ||
              inputImg.files[0].type === "image/webp"
            ) {
              let reader = new FileReader();
              reader.onload = function (event) {
                baseImg = event.target.result;

                fetch(`http://localhost:3000/products/${item.id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id: `${item.id}`,
                    img: baseImg,
                    title: inputName.value,
                    price: inputPrice.value,
                    category: select.value,
                  }),
                })
                  .then((data) => data.json())
                  .then(
                    (data) => console.log(data.length),
                    alert("muvaffaqiyatli o'zgartirildi")
                  )
                  .catch((error) => console.log(error + ":("));
              };
              reader.readAsDataURL(img);
            } else {
              alert("faqat rasm kirita olasiz!");
            }
          });
          preview.append(card);
        }
      })
    )
    .catch((error) => error + ":(");
});
