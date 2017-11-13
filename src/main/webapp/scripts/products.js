$(document).ready(function () {
    $("#addNewProductLink").click(function (event) {
        event.preventDefault();
        hideAll();
        $("#addNewProduct").show(500);
        addNewProduct();

    });

    showAllProducts();
});

function showAllProducts() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/Workshop3/webresources/product",
        dataType: "json",
        error: function () {
            console.log("error");
        },
        success: function (data) {
            $("#productTable").tabulator({
                height: 300,
                layout: "fitColumns",
                columns: [
                    {title: "Id", field: "id", width: 30},
                    {title: "Product name", field: "name", headerFilter: "input", width: 200},
                    {title: "Price", field: "price", width: 100},
                    {title: "Stock", field: "stock", width: 100},
                    {title: "Product status", field: "productStatus", headerFilter: "input", width: 150}
                ],
                rowClick: function (e, row) {
                    $("#randomText").css("color", "red");
                    hideAll();
                    $("#showOneProduct").show(500);
                    showOneProduct(row.getData());
                }
            });
            $("#productTable").tabulator("setData", data);
        }
    });
}

function showOneProduct(product) {

    $("#showOneProduct").html("");
    $("#showOneProduct").append("<button id='backToAllProducts'>Terug naar overzicht</button>");
    $("#showOneProduct").append("<br/><br/><button id='deleteProduct'>Product verwijderen</button>");
    $("#showOneProduct").append("<ul>" +
            "<li>Id: " + product.id + "</li>" +
            "<li>Naam: " + product.name + "</li>" +
            "<li>Prijs: " + product.price + "</li>" +
            "<li>Voorraad: " + product.stock + "</li>" +
            "<li>Productstatus: " + product.productStatus + "</li>" +
            "</ul>");

    $("#backToAllProducts").click(function (event) {

        $("#randomText").css("color", "green");
        hideAll();
        $("#productTable").show(500);
    });

    $("#deleteProduct").click(function (event) {
        deleteProduct(product);
    });
}

function deleteProduct(product) {
    if (confirm("Product verwijderen?")) {
        $.ajax({
            method: "DELETE",
            url: "http://localhost:8080/Workshop3/webresources/product/" + product.id,
            error: function () {
                alert("Dit product kon niet verwijderd worden");
            },
            success: function () {
                window.location.href = "http://localhost:8080/KaasKlant/product.html";
            }
        });
    }
}

function addNewProduct() {
    $("#addNewProduct").html("");
    $("#addNewProduct").append("<button id='backToAllProducts'>Terug naar overzicht</button><br/><br/>");


    $("#addNewProduct").append("" +
            "<form id='newProduct'>" +
            "<input type='text' id='inputName'>  Naam</input><br/>" +
            "<input type='text' id='inputPrice'>  Prijs</input><br/>" +
            "<input type='number' id='inputStock'>  Voorraad</input><br/>" +
            "<input type='text' id='inputProductStatus'>  ProductStatus</input><br/>" +
            "<br/><br/><button id='saveProduct' type='submit'>Submit</button>" +
            "</form>"
            );

    $("#backToAllProducts").click(function (event) {
        hideAll();
        $("#productTable").show(500);
    });


    $("#saveProduct").click(function (event) {
        saveProduct();
    });
}

function saveProduct() {
    if (confirm("Product opslaan?")) {
        $(document).on("submit", "form#newProduct", function (event) {
            event.preventDefault();
            var product = {
                "name": $("#inputName").val(),
                "price": $("#inputPrice").val(),
                "stock": $("#inputStock").val(),
                "productStatus": $("#inputProductStatus").val()
            };
            var productJson = JSON.stringify(product);
            createProduct(productJson);
        });

        function createProduct(product) {
            $.ajax({
                method: "POST",
                url: "http://localhost:8080/Workshop3/webresources/product",
                data: product,
                contentType: "application/json",
                error: function () {
                    console.log("error");
                },
                success: function () {
                    window.location.href = "http://localhost:8080/KaasKlant/product.html";
                }
            });
        }
    }
}

// Utility method to hide all elements. Can be called in methods, followed by showX to show just 1 element

function hideAll() {
    $("#productTable").hide(500);
    $("#showOneProduct").hide(500);
    $("#addNewProduct").hide(500);
}
