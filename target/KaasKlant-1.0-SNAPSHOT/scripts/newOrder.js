$(document).ready(function () {
    $("#saveOrderButton").click(function (event) {
        saveOrder();
    });

    showAllProducts();
});

var selectedRows = [];

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
                    {title: "Product status", field: "productStatus", headerFilter: "input", width: 150},
                    {title: "Lege kolom", field: "aantal", editor: true, width: 150, validator: ["min:0", "numeric"]},
                    {formatter: "buttonTick", title: "Toevoegen", align: "center", width: 150, cellClick: function (e, cell) {
//                        {alert("Printing row data for: " + cell.getRow().getData().id);}}
                            rowData = cell.getRow().getData();
                            rowData.subTotal = rowData.aantal * rowData.price;

                            if (rowData.aantal > rowData.stock) {
                                alert("Het is niet mogelijk om meer producten te bestellen dan de voorraad bevat");
                                return;
                            }

                            selectedRows.push(rowData);
                            addRowToSelected(cell.getRow().getData());
                            $("#productTable").tabulator("deleteRow", cell.getRow());

                        }}
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

function addRowToSelected(data) {

    $("#selectedProductsTable").tabulator({
        height: 300,
        layout: "fitColumns",
        columns: [
            {title: "Id", field: "id", width: 30},
            {title: "Kaas", field: "name", width: 200},
            {title: "Aantal", field: "aantal", width: 100},
            {title: "Subtotaal", field: "subTotal", width: 100}
        ]
    });

    $("#selectedProductsTable").tabulator("setData", selectedRows);
}

//function saveOrder() {
//    if (confirm("Bestelling opslaan?")) {
//        var order1 = {
//            
//            "orderItemCollecion": {
//                
//            }
//            "name": $("#inputName").val(),
//            "price": $("#inputPrice").val(),
//            "stock": $("#inputStock").val(),
//            "productStatus": $("#inputProductStatus").val()
//        };
//        var productJson = JSON.stringify(product);
//        createProduct(productJson);
//    }
//    
//    function createProduct(product) {
//        $.ajax({
//            method: "POST",
//            url: "http://localhost:8080/Workshop3/webresources/product",
//            data: product,
//            contentType: "application/json",
//            error: function () {
//                console.log("error");
//            },
//            success: function () {
//                window.location.href = "http://localhost:8080/KaasKlant/product.html";
//            }
//        });
//    }
//}
