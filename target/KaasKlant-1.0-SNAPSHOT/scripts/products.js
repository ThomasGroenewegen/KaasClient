$(document).ready(function () {
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
                    $("#productTable").hide(500);
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
        $("#showOneProduct").hide(500);
        $("#productTable").show(500);
    });

    $("#deleteProduct").click(function (event) {
        deleteProduct(product);
    });
}

function deleteProduct(product) {
    var confirmation = confirm("Product verwijderen?");
    if (confirmation) {
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

//$("#backToAllProducts").click(function (event) {
//    
//    $("#randomText").css("color", "green");
////    $("#showOneProduct").hide(500);
////    $("#productTable").show(500);
//});

//$("#helloButton").click(function (event) {
//                $(this).css("color", "red");
//                alert("Hello. Bye.");
//            });
