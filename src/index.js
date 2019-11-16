import './scss/main.scss';

// $(document).ready(function() {
function sumbitPost(buyer, email, phone, cartarr){
    var type = "token=DEj5VTbxAcdMLFT5vK2d&name=" + buyer + "&email=" + email + "&phone=" + phone;
    for (var i of cartarr){
        var it_id = i.id;
        var it_am = i.amount;
        type += "&products[" + it_am + "]=" + it_id;
    }
    $.ajax({
    type: 'POST',
    url: 'https://nit.tron.net.ua/api/order/add',
    token: "DEj5VTbxAcdMLFT5vK2d",
    dataType: "JSON",
    data: type,
    success: function(){
        alert('Your order was successfuly ordered');
        cart.clearCart();
        showCart();
    },
    error: function() {
        console.log(type);
        alert('Error while loading data!');
    },
});
}

$.ajax({
    url: 'https://nit.tron.net.ua/api/category/list',
    type: 'GET',
    success: function(content) {
        var output = "";
        for (var i of content) {
            output +=
                "<a class='dropdown-item ' data-id='" + i.id + "' data-name='" + i.name + "'>" + i.name + "</a>";
        }
        $('.category-dropdown').html(output);
    },
    error: function() {
        alert('Error while loading data!');
    },
});

$.ajax({
    url: 'https://nit.tron.net.ua/api/product/list/category/2',
    type: 'GET',
    success: function(content) {
        var output = "";
        var output1 = "<h4>Category: Smartphones</h4>";
        for (var i of content) {
            var p, sp;
            if (i.special_price==null){
                p = "<p class='card-text desc'><a class=card-text>" + i.price + "</a></p>";
                sp = i.price;
            }
            else {
                p = "<p class='card-text desc' >" +  "<h8 class=prev-price> " + i.price + "</h8>" +
            "<a class=card-text> " + i.special_price + "</a></p>";
            sp = i.special_price;
        }
            output +=
                "<div class = 'col-lg-3 col-md-4 col-sm-6'>" +
                "<div class='item card pb-3 h-100 w-100'>" +
                "<div class='image-card' style='background-image: url(" + i.image_url + ")'>" +
                "</div>" +
                "<div class='card-body d-flex flex-column gridcolor'>" +
                "<h4 class='card-title desc'>" + i.name + "</h4>" +
                    p +
                "<div class='btn-group-vertical item_modal mt-auto w-100'><button data-name='" + i.name + "' data-image='" + i.image_url + "' data-price='" +
                i.price + "' data-sp-price='" + i.special_price + "' data-desc='" + i.description +
                "' data-idd='" + i.id +  "' class='button w-100 item-info' data-toggle='modal' data-target='#modal-items'>Info</button>" +

                "<button data-name='" + i.name + "' data-price='" + i.price + "' data-sp-price='" + i.special_price +
                "' data-desc='" + i.description + "' data-idd='" + i.id + "' class='button mt-auto w-100 add-to-cart'>Buy</button>" +
                "</div>" + 
                "</div>" +
                "</div>" +
                "</div>";
        }
        $('.items').html(output);
        $('.category').html(output1);
    },
    error: function() {
        alert('Error while loading data!');
    },
});

$('.category-dropdown').on("click", ".dropdown-item", function(event) {
    var cat_name = $(this).data('name')
    $.ajax({
        url: 'https://nit.tron.net.ua/api/product/list/category/' + $(this).data('id'),
        type: 'GET',
        success: function(content) {
            var output = "";
            var output1 = "<h4>Category: " + cat_name + " </h4>";
            console.log(content);
             var output1 = "<h4>Category: Smartphones</h4>";
        for (var i of content) {
            var p, sp;
            if (i.special_price==null){
                p = "<p class='card-text desc'> <a class=card-text>"  + i.price + "</a></p>";
                sp = i.price;
            }
            else {
                p = "<p class='card-text desc' >" +  "<h8 class=prev-price> " + i.price + "</h8>" +
            "<a class=card-text> " + i.special_price + "</a></p>";
            sp = i.special_price;
        }
            console.log(i.id);
            output +=
                "<div class = 'col-lg-3 col-md-4 col-sm-6'>" +
                "<div class='item card pb-3 h-100 w-100'>" +
                "<div class='image-card' style='background-image: url(" + i.image_url + ")'>" +
                "</div>" +
                "<div class='card-body d-flex flex-column gridcolor'>" +
                "<h4 class='card-title desc'>" + i.name + "</h4>" +
                    p +
                "<div class='btn-group-vertical item_modal mt-auto w-100'><button data-name='" + i.name + "' data-image='" + i.image_url + "' data-price='" +
                i.price + "' data-sp-price='" + i.special_price + "' data-desc='" + i.description +
                "' data-idd='" + i.id +  "' class='button w-100 item-info' data-toggle='modal' data-target='#modal-items'>Info</button>" +

                "<button data-name='" + i.name + "' data-price='" + i.price + "' data-sp-price='" + i.special_price +
                "' data-desc='" + i.description + "' data-idd='" + i.id + "' class='button mt-auto w-100 add-to-cart'>Buy</button>" +
                "</div>" + 
                "</div>" +
                "</div>" +
                "</div>";
        }
            $('.items').html(output);
            $('.category').html(output1);
        },
        error: function() {
            alert('Error while loading data!');
        },
    });
})

// Cart

var cart = (function() {
    var cartArr = [];
    //
    function Item(n, p, a, id) {
        this.name = n;
        this.price = p;
        this.amount = a;
        this.id = id;
    }
    //Methods
    var obj = {};
    //add
    obj.add = function(name, price, id) {
        for (var i in cartArr) {
            if (cartArr[i].id === id) {
                cartArr[i].amount++;
                return;
            }
        }
        var item = new Item(name, price, 1, id);
        cartArr.push(item);
    }
    //
    obj.remove = function(name) {
        for (var i in cartArr) {
            if (cartArr[i].name === name) {
                cartArr[i].amount--;
                if (cartArr[i].amount === 0) {
                    cartArr.splice(i, 1);
                }
                break;
            }
        }
    }

    //
    obj.removeAll = function(name) {
        for (var i in cartArr) {
            if (cartArr[i].name === name) {
                cartArr.splice(i, 1);
                break;
            }
        }
    }

    //
    obj.clearCart = function() {
        cartArr = [];
    }

    //
    obj.totalAmount = function() {
        var res = 0;
        for (var i in cartArr) {
            res += cartArr[i].amount;
        }
        return res;
    }

    obj.totalPrice = function() {
        var res = 0;
        for (var i in cartArr) {
            res += cartArr[i].price * cartArr[i].amount;
        }
        return Number(res.toFixed(2));
    }

    //List
    obj.list = function() {
        var copy = [];
        for (var i in cartArr) {
            var item = cartArr[i];
            var itemCopy = {};
            for (var j in item) {
                itemCopy[j] = item[j];
            }
            itemCopy = Number(item.price * item.amount).toFixed(2);
            copy.push(itemCopy)
        }
        return cartArr;
    }

    return obj;
})();





//Events

$('.items').on("click", ".item-info", function(event) {
    console.log($(this).data('idd'));
    var output = "";
    output =
        "<div>" +
        "<div class='item card h-100 w-100'>" +
        "<div class='image-card' style='background-image: url(" + $(this).data('image') + ")'>" +
        "</div>" +
        "<div class='card-body d-flex flex-column gridcolor item-info-box'>" +
        "<h4 class='card-title desc'>" + $(this).data('name') + "</h4>" +
        // if ($(this).data(sp-price)==null)
        "<p class='card-text desc'>" + $(this).data('price') + "</p>" +
        "<p class='card-text desc'>" + $(this).data('desc') + "</p>" +
        "<button data-name='" + $(this).data('name') +
         "' data-price='" + $(this).data('price') +
          "' data-sp-price='" + $(this).data('sp-price') +
         "' data-desc='" + $(this).data('desc') +
          "' data-idd='" + $(this).data('idd') +
           "' class='button mt-auto w-100 add-to-cart'>Buy</button>" +
        "</div>" +
        "</div>" +
        "</div>";
    $('.item-info-content').html(output);
})


$('.items').on("click", ".add-to-cart", function(event) {
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    var id = $(this).data('idd');
    cart.add(name, price,id);
    showCart();
})

$('.item-info-content').on("click", ".add-to-cart", function(event) {
    // console.log($(this).data('name'));
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    var id = $(this).data('idd');
    cart.add(name, price,id);;
    showCart();
})


$('.clear').click(function() {
    console.log("clear");
    cart.clearCart();
    showCart();
})

$('.submit').click(function() {
        var cartArray = cart.list();
        var name = document.getElementById("buyer-name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
    if (cart.totalAmount()===0)
          alert("You have nothing to buy!");
    else if (name==="")
        alert("Please enter your name");
    else if (email==="")
        alert("Please enter your email");
    else if (!email.includes("@"))
        alert ("Incorrect email");
    else if (phone==="")
        alert("Please enter your phone");
    else{
        var cartArray = cart.list();
        sumbitPost(name,email,phone,cartArray);
    }

})

$('total-amount').html("<tr>" + cart.totalAmount + "</tr>")

function showCart() {
    var cartArray = cart.list();
    var output = "";
    for (var i in cartArray) {
        var name = cartArray[i].name;
        var price = cartArray[i].price;
        var amount = cartArray[i].amount;
        var id = cartArray[i].id;
        output += "<tr>" +
            "<td>" + name + "</td>" +
            "<td>" + price + "$</td>" +
            "<td>" + amount + "</td>" +
            "<td><button class='add-item btn button' data-name='" + name +"' data-price='" + price + "' data-id='" + id + "'>+</button></td>" +
            "<td><button class='remove-item btn button' data-name='" + name + "'>-</button></td>" +
            "<td><button class='delete-item btn button' data-name='" + name + "'>X</button></td>" +
            "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-price').html(cart.totalPrice() + "$");
    $('.total-amount').html(cart.totalAmount());
}

$('.show-cart').on("click", ".add-item", function(event) {
    var name = $(this).data('name');
    var price = $(this).data('price');
    var id = $(this).data('id');
    cart.add(name,price,id);
    showCart();
})

$('.show-cart').on("click", ".remove-item", function(event) {
    var name = $(this).data('name');
    cart.remove(name);
    showCart();
})

$('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name');
    cart.removeAll(name);
    showCart();
})

showCart();


// });