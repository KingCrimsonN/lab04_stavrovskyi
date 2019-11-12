import './scss/main.scss';
console.log('Hell!');
console.log(`The time is ${new Date()}`);


var cart = (function() {
    var cartArr = [];
    //
    function Item(name, price, amount) {
        this.name = name;
        this.price = price;
        this.amount = amount;
    }
    //Methods
    var obj = {};
    //add
    obj.add = function(name, price) {
        for (var i in cartArr) {
            if (cartArr[i].name === name) {
                cartArr[i].amount++;
                return;
            }
        }
        var item = new Item(name, price, 1);
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

$('.add-to-cart').click(function(event) {
    // event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    cart.add(name, price);
    showCart();
})

$('.clear').click(function() {
    cart.clearCart();
    showCart();
})

$('total-amount').html("<tr>" + cart.totalAmount + "</tr>")

function showCart() {
    var cartArray = cart.list();
    var output = "";
    for (var i in cartArray) {
        output += "<tr>" +
            "<td>" + cartArray[i].name + "</td>" +
            "<td>" + cartArray[i].price + "$</td>" +
            "<td>" + cartArray[i].amount + "</td>" +
            "<td><button class='add-item btn button' data-name=" + cartArray[i].name + ">+</button></td>" +
            "<td><button class='remove-item btn button' data-name=" + cartArray[i].name + ">-</button></td>" +
            "<td><button class='delete-item btn button' data-name=" + cartArray[i].name + ">X</button></td>" +
            "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-price').html(cart.totalPrice() + "$");
    $('.total-amount').html(cart.totalAmount());
}

$('.show-cart').on("click", ".add-item", function(event) {
    var name = $(this).data('name');
    cart.add(name);
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