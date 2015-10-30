/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {

    $(".jqueryDataTable").dataTable( 
    {
        "bProcessing": false,
        "bServerSide": false,
        "sAjaxSource": "./Clients",
        "bJQueryUI": true,
        "aoColumns": [
            { "mData": "date" },
            { "mData": "source" },
            { "mData": "number" },
            { "mData": "name" },
            { "mData": "email" },
            { "mData": "location" },
            { "mData": "notes" },
            { "mData": "outcome" },
            { "mData": "grafts" },
            { "mData": "price" },
            { "mData": "status" }

        ] 
    } ); 
 
} );