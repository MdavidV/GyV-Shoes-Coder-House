"use strict";

const cartContainer = document.querySelector("#cartContainer");
const cartOpener = document.querySelector("#cartIcon");
const cartCloser = document.querySelector(".closer");
const totalPrice = document.querySelector("#totalPrice");

// RENDERIZAR PRODUCTOS TRAIDOS DEL JSON

const container = document.querySelector(".products-main");

let BBDD = [];

fetch("js/stock.json")
  .then((res) => res.json())
  .then((data) => {
    BBDD = data;

    BBDD.forEach((product) => {
      let productHTML = `

      <div class="product">
        <img src="${product.img}" />
        <div class="product-details">
          <h2 class="product-name">${product.nombre}</h2>
  
        <a class="btn" onclick="addToCart(${product.id})">
          <span class="text1">${product.precio}$</span>
          <span class="text2">
            Add to Cart
            <i class="fa-solid fa-cart-arrow-up"></i>
          </span>
        </a>
      </div>
    </div>
      `;
      container.innerHTML += productHTML;
    });
  });

$(".slideshow").slick({
  dots: true,
  arrows: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  speed: 800,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        slidesToShow: 1,
      },
    },
  ],
});

const renderCart = () => {
  cartContainer.innerHTML = "";

  cart.forEach((item) => {
    const div = document.createElement("tr");
    div.classList.add("cart-item");

    div.innerHTML = `
    <td class="product-pic">
    <img src="${item.img}" alt="">
  </td>
  <td class="product-price">${item.precio}$</td>
  <td class="product-quantity">

    <select name="select" id="selectQuantity">

     
      <option value="Value1" selected>1</option>
      <option value="Value2" >2</option>
      <option value="Value3" >3</option>
        
    </select>

  </td>

  <td class="deleteCart">
  
  <button class="delete" onclick="removeCart(${item.id})">
  <i class="fa-solid fa-trash-can"></i>
  </button>
  
  </td>
    `;

    cartContainer.append(div);
  });
};

const renderTotal = () => {
  let total = 0;

  cart.forEach((product) => {
    total += product.precio;
  });

  totalPrice.innerText = total;
};

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const addToCart = (id) => {
  let product = BBDD.find((item) => item.id === id);
  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
  renderTotal();
};

const removeCart = (id) => {
  const item = cart.find((product) => product.id === id);
  const index = cart.indexOf(item);

  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
  renderTotal();
};

const openCart = () => {
  const headerView = document.querySelector("#headerView");
  const mainViewL = document.querySelector("#mainViewL");
  const mainView = document.querySelector("#mainView");
  const footerView = document.querySelector("#footerView");
  const cartView = document.querySelector("#cart");
  const footerFixed = document.querySelector(".footer-media");

  headerView.classList.add("hidden");
  mainView.classList.add("hidden");
  mainViewL.classList.add("hidden");
  footerView.classList.add("hidden");
  footerFixed.classList.add("footer-fixed");
  cartView.classList.remove("hidden");
  cartView.classList.add("visible");
};

const closeCart = () => {
  const headerView = document.querySelector("#headerView");
  const mainViewL = document.querySelector("#mainViewL");
  const mainView = document.querySelector("#mainView");
  const footerView = document.querySelector("#footerView");
  const cartView = document.querySelector("#cart");
  const footerFixed = document.querySelector(".footer-media");

  headerView.classList.remove("hidden");
  mainView.classList.remove("hidden");
  mainViewL.classList.remove("hidden");
  footerView.classList.remove("hidden");
  footerFixed.classList.remove("footer-fixed");
  cartView.classList.remove("visible");
  cartView.classList.add("hidden");
};

cartOpener.addEventListener("click", openCart);
cartCloser.addEventListener("click", closeCart);



window.onload(renderCart(), renderTotal());
