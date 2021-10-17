// Se envía solo un parámetro que es un diccionario, lee el servicio y carga los datos al diccionario json
//DEBO CAMBIAR LA URL Y LA ESTRUCTURA DEL DICCIONARIO JSON
function limpiar(){
    document.getElementById("idCodigo").value = "";
    document.getElementById("idBrand").value = "";
    document.getElementById("idModel").value = "";
    document.getElementById("idCategory").value = "";
    document.getElementById("idName").value = "";
}
function consultar() {

    $.ajax (
        {
            url          : 'https://ge5f47e521d3134-db202110011836.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costume/costume',
            type         : 'GET',
            dataType     : 'json',
            success      :  function(json){

                $("#idDivConsulta").empty();
                $("#idDivConsulta").append("<table>");
                
                $("#idDivConsulta").append("<tr><th>Codigo</th><th>Brand</th><th>Modelo</th><th>Id Categoría</th><th>Nombre</th></tr>");
                var misItems=response.items;                                    
                for (i=0; i < misItems.length; i++){
                    $("#idDivConsulta").append("<tr>");
                    $("#idDivConsulta").append("<td>" + misItems[i].id + "</td>");
                    $("#idDivConsulta").append("<td>" + misItems[i].brand + "</td>");
                    $("#idDivConsulta").append("<td>" + misItems[i].model + "</td>");
                    $("#idDivConsulta").append("<td>" + misItems[i].category_id + "</td>");
                    $("#idDivConsulta").append("<td>" + misItems[i].name + "</td>");
                    $("#idDivConsulta").append('<td><button onclick="borrar('+misItems[i].id+')"><img src ="../img/delete.png" ></button> </td>');
                    $("#idDivConsulta").append("</tr>");
                }
                $("#idDivConsulta").append("</table>");
                console.log(json)
                },
                            
                function(jqXHR,textStatus,errorThrown){
                console.log(xhr)
            }
        }
    );

}


function insertar() {
    var elemento;
    elemento = { 
        id: $("#idCodigo").val(), 
        brand:$("#idBrand").val(),
        model: $("#idModel").val(),
        category_id: $("#idCategory").val(),
        name: $("#idName").val()
    }
    var datatosend = JSON.stringify(elemento);
    $.ajax (
        {
            datatype:   'json',
            data    :   elemento,
            url     : 'https://ge5f47e521d3134-db202110011836.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costume/costume',
            type    :   'POST',
            success      :  function(response){
                               
                               console.log(response);
                               obtenerItems();
                               limpiar();
                            },
            error       :   function(jqXHR,textStatus,errorThrown){
                            console.log( xhr);

                            }


        }
    );



}

function borrar(idElemento) {
    var elemento;
    elemento = { 
        id:idElemento
    };
    var dataToSend   = JSON.stringify(elemento);

    $.ajax (
        {
            datatype    : 'json',
            data        :  dataToSend,
            contentType  : 'application/json', 
            url         :'https://ge5f47e521d3134-db202110011836.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costume/costume',
            type        : 'DELETE',
            success      :  function(response){
                                console.log(response);
                                obtenerItems();
                                limpiar();

                            },
            error       :   function(jqXHR,textStatus,errorThrown){
                                console.log(xhr);

                            }
        }
    );
}

function actualizar() {
    var elemento;
    elemento = { 
        id: $("#idCodigo").val(), 
        brand:$("#idBrand").val(),
        model: $("#idModel").val(),
        category_id: $("#idCategory").val(),
        name: $("#idName").val()
    };
    var datatosend = JSON.stringify(elemento);
    $.ajax (
        {
            datatype:   'json',
            data    :   datatosend,
            contentType: 'application/json', 
            url     : 'https://ge5f47e521d3134-db202110011836.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costume/costume',
            type    :   'PUT',
            success      :  function(response){
                               
                               console.log(response);
                               obtenerItems();
                               limpiar();
                            },
            error       :   function(jqXHR,textStatus,errorThrown){
                            console.log( xhr);

                            }


        }
    );

    }
                                                 
function consultarId() {
    var id =$("#idCodigo").val();
    $.ajax (
        {
            url          : 'https://ge5f47e521d3134-db202110011836.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costume/costume/:id',
            type         : 'GET',
            dataType     : 'json',
            success      :  function(json){
                $("#idDivConsulta").empty();
                for (i=0; i < json.items.length; i++){
                    $("#idDivConsulta").append(json.items[i].id + json.items[i].brand + " " + json.items[i].model + " " + json.items[i].category_id + " " + json.items[i].name + " ");
                }
                console.log(json)
            },
            error       :   function(xhr,status){
                console.log(xhr)
            },
        }
    );
}

function obtenerItems(){
    $.ajax (
        {
            dataType     : 'json', 
            url          : 'https://ge5f47e521d3134-db202110011836.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costume/costume',
            type         : 'GET',
            success      :  function(response){
                $("#idDivConsulta").empty();
              
                $("#idDivConsulta").append("<tr><th>Codigo</th><th>Brand</th><th>Modelo</th><th>Id Categoría</th><th>Nombre</th><th>Acción</th></tr>");
                var misItems=response.items;
                for(i=0;i<misItems.length;i++){
                    $("#idDivConsulta").append("<tr>");
                    $("#idDivConsulta").append("<td>" + misItems[i].id + "</td>");
                    $("#idDivConsulta").append("<td>" + misItems[i].brand + "</td>");
                    $("#idDivConsulta").append("<td>" + misItems[i].model + "</td>");
                    $("#idDivConsulta").append("<td>" + misItems[i].category_id + "</td>");
                    $("#idDivConsulta").append("<td>" + misItems[i].name + "</td>");
                    $("#idDivConsulta").append('<td><button onclick="borrar('+misItems[i].id+')"><img src ="../img/delete.png" ></button> </td>');
                    $("#idDivConsulta").append('<td><button onclick="obtenerItemEspecifico('+misItems[i].id+')"><img src ="../img/load.png"></button> </td>');
                    $("#idDivConsulta").append("</tr>");
                }    
                console.log(response)
            },
            error       :   function(jqXHR,textStatus,errorThrown){
                
            },
        }
    );
}

function obtenerItemEspecifico(idIdItem){
    $.ajax (
        {
            dataType     : 'json', 
            url          : 'https://ge5f47e521d3134-db202110011836.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costume/costume/'+idIdItem,
            type         : 'GET',
            success      :  function(response){
                console.log(response);
                var item=response.items[0];
                $("#idCodigo").val(item.id);
                $("#idBrand").val(item.brand);
                $("#idModel").val(item.model);
                $("#idCategory").val(item.category_id);
                $("#idName").val(item.name);
            },
            error       :   function(jqXHR,textStatus,errorThrown){
                console.log( xhr);
            },
        }
    );
}


function obtenerItemEspecifico2(){
     
    idIdItem = document.getElementById("idCodigo").value;
    $.ajax (
        {
            dataType     : 'json', 
            url          : 'https://ge5f47e521d3134-db202110011836.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costume/costume/'+idIdItem,
            type         : 'GET',
            success      :  function(response){
                console.log(response);
                var item=response.items[0];
                $("#idCodigo").val(item.id);
                $("#idBrand").val(item.brand);
                $("#idModel").val(item.model);
                $("#idCategory").val(item.category_id);
                $("#idName").val(item.name);

                $("#idDivConsulta").empty();
                $("#idDivConsulta").append("<table>");
                
                $("#idDivConsulta").append("<tr><th>Codigo</th><th>Brand</th><th>Modelo</th><th>Id Categoría</th><th>Nombre</th></tr>");
                var misItems=response.items;                                    
                for (i=0; i < misItems.length; i++){
                    $("#idDivConsulta").append("<tr>");
                    $("#idDivConsulta").append("<td>" + misItems[i].id + "</td>");
                    $("#idDivConsulta").append("<td>" + misItems[i].brand + "</td>");
                    $("#idDivConsulta").append("<td>" + misItems[i].model + "</td>");
                    $("#idDivConsulta").append("<td>" + misItems[i].category_id + "</td>");
                    $("#idDivConsulta").append("<td>" + misItems[i].name + "</td>");
                    $("#idDivConsulta").append('<td><button onclick="borrar('+misItems[i].id+')"><img src ="../img/delete.png" ></button> </td>');
                    $("#idDivConsulta").append("</tr>");
                }
                $("#idDivConsulta").append("</table>");
                
            },
            error       :   function(jqXHR,textStatus,errorThrown){
                console.log( xhr);
            },
        }
    );
}
