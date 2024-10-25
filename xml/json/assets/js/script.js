$(document).ready(function(){
    $.ajax({
        url:"assets/data.json",
        type:"get",
        success:function(brands){
// console.log(brands)
let apple ="";
// let realme = "";
$.each(brands,function(keys,arrays){
    // if(keys=="apple"){
// console.log(arrays)
        $.each(arrays,function(index,objects){
      apple+=`<div class="col-lg-3 mt-3">
                      <div class="card">
                          <img class="card-img-top" src="${objects.image}" alt="Title" />
                          <div class="card-body">
                              <h4 class="card-title">${objects.name}</h4>
                              <p class="card-text">Rs: ${objects.price}</p>
                              <a href = "detail.html?product=${keys+index}" class="btn btn-info">detail</a>
                          </div>
                      </div>
                      
                  </div>`
        })
    // }else if(keys=="realme"){
    //     $.each(arrays,function(index,objects){
    //         realme+=`    <div class="col-lg-3 mt-3">
    //                         <div class="card">
    //                             <img class="card-img-top" src="${objects.image}" alt="Title" />
    //                             <div class="card-body">
    //                                 <h4 class="card-title">${objects.name}</h4>
    //                                 <p class="card-text">Rs: ${objects.price}</p>
    //                                 <a href = "detail.html?product=${keys+index}=" class="btn btn-info">detail</a>
    //                             </div>
    //                         </div>
                            
    //                     </div>`
    //           })
    // }
})
// $("#datarealme").html(realme)
$("#data").html(apple)
        }
    })
})
// detail page
let url = window.location.href;
// console.log(url);
let getUrl = new URL(url);
// console.log(getUrl)
let getQueryString  = getUrl.searchParams.get("product");
// console.log(getQueryString);
$.ajax({
    url:"assets/data.json",
    type:"get",
    success:function(detailProducts){
        $.each(detailProducts,function(detKey, detArray){
            // console.log(detKey)
            $.each(detArray,function(detIndex,detobjects){
                // console.log()
                let concatVal =detKey+detIndex
if(concatVal==getQueryString){
    // console.log(detobjects)

    $("#detailImage").html(`
                <img class="card-img-top" src="${detobjects.image}" alt="Title" />
        `);
        $("#detailDes").html(`    <div class="card-body">
        <h4 class="card-title">${detobjects.name}</h4>
        <p class="card-text">Rs: ${detobjects.price}</p>
        <p class="card-text">${detobjects.description}</p>
      <button
        type="button"
        class="btn btn-outline-danger"
        onclick="Decreament()"
      >
      -
      </button>
    
      
        <input
            type="number"
            class=""
            name=""
            id="number"
            value="1"
            aria-describedby="helpId"
            placeholder=""
        />
       
        <button
        type="button"
        class="btn btn-outline-success"
        onclick="Increament()"
      >
   +
      </button>
      
    </div>
    <button
        type="button"
        class=" mt-3 btn btn-outline-primary"
        onclick="AddToCart('${getQueryString}')"
    >
       Add To Cart
    </button>`)
}
            })
        })
    }

})
// add to cart
let count =1;
function Increament(){
count++;
document.querySelector("#number").value=count;
}
function Decreament(){
    if(count>1){

    
    count--;
    document.querySelector("#number").value=count;

    }else{
        document.querySelector("#number").value=1
    }

}

function AddToCart(id){
// console.log(id)
// console.log(detailProducts)
let quantity = $("#number").val();
$.ajax({
    url:"assets/data.json",
    type:"get",
    success:function(cartProducts){
        $.each(cartProducts,function(cartKeys,cartArrays){
            $.each(cartArrays,function(cartIndex,cartObject){
               
                if(cartKeys+cartIndex==id){
                   let localdata = JSON.parse(localStorage.getItem("cartData"));
                   console.log(cartObject.name)
                if(localdata==null){
                    localStorage.setItem("cartData",'[]')
                }
               
                        //  console.log(parseJson);
let obj = {
    productId :id,
    productName:cartObject.name,
    productPrice:cartObject.price,
    productImage:cartObject.image,
    productQuantity:quantity
}
localdata.push(obj);
localStorage.setItem("cartData",JSON.stringify(localdata));
location.assign("index.html");

                }

            })
        })
    }
})
}
// cart count
let cartData = JSON.parse(localStorage.getItem("cartData"));
let cart=0;
if(cartData==null){
    $("#cartCount").html(0);
}else{
 let cartLength = cartData.length;
// console.log(cartData);
//  cart=cart+cartLength;
// console.log(cart);
$("#cartCount").html(cartLength);

}
// localStorage.clear()



//  cart items on cart.html
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
                    <td><a class="btn btn-info">Edit</a></td>
                    <td><a class="btn btn-danger">Update</a></td>

            


                </tr>
            `;
        });
    } else {
        cartItemsHTML = '<tr><td colspan="5" class="text-center">Your cart is empty</td></tr>';
    }

    $("#cartItems").html(cartItemsHTML);
}

// Call the function when cart.html is loaded
$(document).ready(function() {
    displayCartItems();
});
