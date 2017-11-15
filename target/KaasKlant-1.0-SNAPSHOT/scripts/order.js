$(document).ready(function () {
    showAllOrders();
});

function showAllOrders() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/Workshop3/webresources/order1",
        dataType: "json",
        error: function () {
            console.log("error");
        },
        success: function (data) {
            $("#orderTable").tabulator({
//                layout:"fitDataFill",
                height: 300,
                layout: "fitColumns",
                columns: [
                    {title: "Id", field: "id", width: 30},
                    {title: "Klant", field: "customerId.lastName", headerFilter: "input", width: 200},
                    {title: "Totaalprijs", field: "totalPrice", width: 100, align:"right"},
                    {title: "Bestelstatus", field: "orderStatus", width: 100},
                    {title: "Besteldatum", field: "dateTime", headerFilter: "input", width: 150}
                ],
                rowClick: function (e, row) {
                    $("#randomText").css("color", "red").toggle(500);
                    alert("Clicked row: " + row.getData().id);
//                    hideAll();
//                    $("#showOneOrder").show(500);
//                    showOneProduct(row.getData());
                }
            });
            $("#orderTable").tabulator("setData", data);
        }
    });
}



// Utility method to hide all elements. Can be called in methods, followed by showX to show just 1 element

function hideAll() {
    $("#orderTable").hide(500);
    
}
