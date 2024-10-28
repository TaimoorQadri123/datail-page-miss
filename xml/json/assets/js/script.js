$(document).ready(function(){
    $.ajax({
        url:"assets/data.json",
        type:"get",
        success:function(brands){
            let apple ="";
            $.each(brands, function(keys, arrays){
                $.each(arrays, function(index, objects){
                    apple += `<div class="col-lg-3 mt-3">
                                  <div class="card">
                                      <img class="card-img-top" src="${objects.image}" alt="Title" />
                                      <div class="card-body">
                                          <h4 class="card-title">${objects.name}</h4>
                                          <p class="card-text">Rs: ${objects.price}</p>
                                          <a href="detail.html?product=${keys+index}" class="btn btn-info">detail</a>
                                      </div>
                                  </div>
                              </div>`;
                });
            });
            $("#data").html(apple);
        }
    });
});

// detail page
let url = window.location.href;
let getUrl = new URL(url);
let getQueryString = getUrl.searchParams.get("product");

$.ajax({
    url:"assets/data.json",
    type:"get",
    success:function(detailProducts){
        $.each(detailProducts, function(detKey, detArray){
            $.each(detArray, function(detIndex, detobjects){
                let concatVal = detKey + detIndex;
                if(concatVal == getQueryString){
                    $("#detailImage").html(`
                        <img class="card-img-top" src="${detobjects.image}" alt="Title" />
                    `);
                    $("#detailDes").html(`
                        <div class="card-body">
                            <h4 class="card-title">${detobjects.name}</h4>
                            <p class="card-text">Rs: ${detobjects.price}</p>
                            <p class="card-text">${detobjects.description}</p>
                            <button type="button" class="btn btn-outline-danger" onclick="Decreament()">-</button>
                            <input type="number" id="number" value="1" class="" />
                            <button type="button" class="btn btn-outline-success" onclick="Increament()">+</button>
                        </div>
                        <button type="button" class="mt-3 btn btn-outline-primary" onclick="AddToCart('${getQueryString}')">
                            Add To Cart
                        </button>
                    `);
                }
            });
        });
    }
});

// Increase & Decrease quantity functions
let count = 1;
function Increament() {
    count++;
    document.querySelector("#number").value = count;
}
function Decreament() {
    if(count > 1) {
        count--;
        document.querySelector("#number").value = count;
    } else {
        document.querySelector("#number").value = 1;
    }
}

// Add to cart function
function AddToCart(id) {
    let quantity = $("#number").val();
    $.ajax({
        url: "assets/data.json",
        type: "get",
        success: function(cartProducts) {
            $.each(cartProducts, function(cartKeys, cartArrays) {
                $.each(cartArrays, function(cartIndex, cartObject) {
                    if(cartKeys + cartIndex == id) {
                        let localdata = JSON.parse(localStorage.getItem("cartData")) || [];
                        let obj = {
                            productId: id,
                            productName: cartObject.name,
                            productPrice: cartObject.price,
                            productImage: cartObject.image,
                            productQuantity: quantity
                        };
                        localdata.push(obj);
                        localStorage.setItem("cartData", JSON.stringify(localdata));
                        location.assign("cart.html");
                    }
                });
            });
        }
    });
}

// Display cart items count
let cartData = JSON.parse(localStorage.getItem("cartData")) || [];
$("#cartCount").html(cartData.length);

// Display cart items on cart.html
function displayCartItems() {
    let cartData = JSON.parse(localStorage.getItem("cartData"));
    let cartItemsHTML = '';

    if (cartData && cartData.length > 0) {
        cartData.forEach(item => {
            let totalPrice = item.productPrice * item.productQuantity;
            cartItemsHTML += `
                <tr>
                    <td>${item.productName}</td>
                    <td>Rs: ${item.productPrice}</td>
                    <td><img src="${item.productImage}" alt="${item.productName}" width="50"></td>
                    <td>${item.productQuantity}</td>
                    <td>Rs: ${totalPrice}</td>
                    <td><a href="detail.html?product=${item.productId}" class="btn btn-info">Edit</a></td>
                    <td><a onclick="CartDelete('${item.productId}')" class="btn btn-danger">Delete</a></td>
                </tr>
            `;
        });
    } else {
        cartItemsHTML = '<tr><td colspan="5" class="text-center">Your cart is empty</td></tr>';
    }

    $("#cartItems").html(cartItemsHTML);
}

// Load cart items when cart.html loads
$(document).ready(function() {
    displayCartItems();
});

// Delete item from cart
function CartDelete(id) {
    let cartData = JSON.parse(localStorage.getItem("cartData"));
    for(let index in cartData) {
        if(cartData[index].productId == id) {
            cartData.splice(index, 1);
            localStorage.setItem("cartData", JSON.stringify(cartData));
            location.assign("cart.html")
            alert("Item deleted from cart");

            break;
        }
    }
}
