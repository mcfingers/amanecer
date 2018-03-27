//////////////////////// Menu Toggle Script
        $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    //$('#page-content-wrapper').css("height", $(document).height());



///////////////////////////////// Mapa puntos de venta
 function initMap() {
        var centro = {lat: -37.9832863, lng: -57.679887};
         var colores = [
            {
              featureType: "all",
              elementType: "all",
              stylers: [
                { saturation: -100 }
              ]
            }
        ];

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: centro
        });

        var estilo = new google.maps.StyledMapType(colores);
        map.mapTypes.set('mapa-bn',estilo);
        map.setMapTypeId('mapa-bn');

        var puntos_venta = [
        ["<strong>FÁBRICA MAR DEL PLATA</strong><br>Tierra del fuego 1650<br>LUnes a Viernes de 8 a 18hs. Sábados de 8 a 13hs<br>Feriados de 8 a 12hs","-37.983037","-57.577709"],
        ["<strong>SHOPPING PEATONAL</strong><br>San Martín 2250 3º piso<br>Lunes a Sábados de 9 a 21hs.","-38.000990","-57.543332"],
        ["<strong>FERIA LA ESTACION</strong><br>Avenida Luro 3924 (entre Funes y Guido)<br>Lunes a Sábados de 9 a 21hs.","-37.991748","-57.559726"],
        ["<strong>SIERRA DE LOS PADRES</strong><br>Avenida Argentina 255, Locales 35 y 36 - 1º piso<br>Lunes a Sábados de 10 a 13hs. y de 17 a 21hs.","-37.941498","-57.776120"],
        ["<strong>PERALTA RAMOS</strong><br>Avenida Peralta Ramos 1699 esquina Soler<br>Lunes a Sábados de 9 a 19hs.","-38.030263","-57.585186"],
        ["<strong>BATÁN</strong><br>Hugo del Carril 3273<br>Lunes a Sábados de 9 a 13hs y de 16 a 20hs.","-38.009490","-57.710021"],
        ["<strong>PASO DE COMPRAS NUEVO GOLF</strong><br>Avenida Mario Bravo 3840<br>Lunes a Sábados de 8:30 a 13:30hs y de 16:30 a 20:30hs.","-38.058062","-57.574179"],

        ];

        marcadores(map,puntos_venta);
        
        function marcadores(map,pto_venta){

                for (var i = 0; i < pto_venta.length; i++) {
                    var info = pto_venta[i][0];
                    var direcLat = pto_venta[i][1];
                    var direcLng = pto_venta[i][2];
                    var LatLng = new google.maps.LatLng(direcLat,direcLng);

                    var marker = new google.maps.Marker({
                                map: map,
                                position: LatLng,
                                icon:'marker-amanecer.png'});

                            var infowindow = new google.maps.InfoWindow();
                      google.maps.event.addListener(marker,'click', (function(marker,info){ 
        return function() {
           infowindow.setContent(info);
           infowindow.open(map,marker);
        };
    })(marker,info));

                
                }
            }
        }


///////////////////////////////// Base de datos de productos

    // var base = new localStorageDB("base", localStorage);

    //         if (base.isNew()) {

    //         base.createTable("productos",["nombre","pack","peso","descripcion","imagen","precio"]);

    //         base.insert("productos",{nombre:"Leche entera en polvo",pack:"Caja",peso:"800grs",descripcion:"Rinde 6,4 lts",imagen:"leche-polvo-entera.png",precio:"$114,40"});
    //         base.insert("productos",{nombre:"Leche descremada en polvo",pack:"Caja",peso:"800grs",descripcion:"Rinde 8 lts",imagen:"leche-polvo-descremada.png",precio:"$114,40"});
    //         base.insert("productos",{nombre:"Caramelos Bandolero",pack:"Bolsa",peso:"800grs",descripcion:"",imagen:"caramelos-bandolero.png",precio:"$80,76"});

    //         base.commit();

    //         }

            // base.drop();

        // var productos = base.queryAll("productos");
        var urlbase_img = "img/productos/";
        // var data;
        $(".loader").fadeIn();
        $.ajax({
    // url:'https://api.jsonbin.io/b/5ab9c67f989617146bd70f6d/latest',
    url:'https://cdn.rawgit.com/mcfingers/amanecer/0313c24c/tablas.json',
    type:'GET',
    // headers:{
    //     'secret-key':'$2a$10$4eM4POSXosMa.Q1tWyJbHOaY/LR/aqrb4kQ.bnmpTRCqOLVpXhUui'
    // }, 
  success: (info) => {
    console.log(info.items); 
    $(".loader").fadeOut();

            $.each(info.items, function(i, valor){
                var prods, tablas;
                var that = this;
                tablas = '<div class="modal fade" id="tabla-modal-'+i+'" tabindex="-1" role="dialog" aria-labelledby="TablasNutricionales" aria-hidden="true">';
                        tablas += '<div class="modal-dialog" role="document">';
                        tablas += '<div class="modal-content">';
                        tablas += '<div class="modal-header">';
                        tablas += '<img src="'+urlbase_img+that.imagen+'" alt="" id="img-prod-tabla'+i+'" class="d-block mx-auto img-prod-tabla">';
                        tablas += '<h5 class="modal-title text-center d-block" id="TablasNutricionales">'+that.nombre+'</h5>';
                        tablas += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
                        tablas += '</div>';
                        tablas += '<div class="modal-body">';
                        tablas += '<p class="text-center">Tabla nutricional</p>';
                        tablas += '<table class="table table-striped">';
                        tablas += '<thead><tr><th scope="col">Elemento</th><th scope="col">Cant x 100ml</th><th scope="col">Cant x porci&oacute;n</th><th scope="col">% VD</th></tr></thead>';
                        tablas += '<tbody>'
                $.each(valor.tabla_nutri, function(k,j){

                        tablas += '<tr><td scope="row">'+this.Elemento+ '</td><td>'+this.Cantx100ml+ '</td><td>'+this.Cantxporcion+ '</td><td>'+this.VD+ '</td></tr>';
                });

                        tablas += '</tbody></table>';
                        tablas += '</div>';
                        tablas += '<div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div>';
                        tablas += '</div></div></div>';

                        $("#modal-container").append(tablas);

            
            prods = '<div class="col-3" id="prod-img-container">';
            prods += '<img src="'+urlbase_img+valor.imagen+'" alt="" id="img-prod-'+i+'" class="float-left img-fluid">';
            prods += '</div>';
            prods += '<div class="col-9 prod-info-container" id="prod-info-container-'+i+'">';
            prods += '<h5>'+valor.nombre+'</h5>';
            prods += '<p>'+valor.descripcion+'</p>';
            prods += '<p><span class="badge badge-success">'+valor.precio+'</span> <a href="javascript:void(0);" data-toggle="modal" data-target="#tabla-modal-'+i+'" class="badge badge-secondary" id="tabla-'+i+'">Tabla nutricional</a></p>';
            prods += '<p><small>Envase: <span id="pack-"'+i+'">'+valor.pack+'</span></small> | <small>Peso: <span id="peso-"'+i+'">'+valor.peso+'</span></small></p>';
            prods += '</div>';
            prods += '<div class="col-12 separador"></div>';

            $("#prod-container").append(prods);


            });

          
  },
  error: (err) => {
    console.log(err.responseJSON);
  }
});

        // $.each(productos, function(i, valor){
        //     var prods;
        //     prods = '<div class="col-3" id="prod-img-container">';
        //     prods += '<img src="'+urlbase_img+valor.imagen+'" alt="" id="img-prod-'+i+'" class="float-left img-fluid">';
        //     prods += '</div>';
        //     prods += '<div class="col-9 prod-info-container" id="prod-info-container-'+i+'">';
        //     prods += '<h5>'+valor.nombre+'</h5>';
        //     prods += '<p>'+valor.descripcion+'</p>';
        //     prods += '<p><span class="badge badge-success">'+valor.precio+'</span> <a href="javascript:void(0);" class="badge badge-secondary" id="tabla-'+i+'">Tabla nutricional</a></p>';
        //     prods += '<p><small>Envase: <span id="pack-"'+i+'">'+valor.pack+'</span></small> | <small>Peso: <span id="peso-"'+i+'">'+valor.peso+'</span></small></p>';
        //     prods += '</div>';
        //     prods += '<div class="col-12 separador"></div>';

        //     $("#prod-container").append(prods);
        // });


/////////////////////////////////////////// Animaciones Home
        $('#tit-container-productos').addClass('animated bounceInLeft');
        $('#tit-container-productos').click(function(){
            window.location = 'productos.html';
        });
        
        $('#tit-container-ptoventa').addClass('animated bounceInLeft');
        $('#tit-container-ptoventa').click(function(){
            window.location = 'puntos-venta.html';
        });

        $('#tit-container-ofertas').addClass('animated bounceInLeft');
        $('#tit-container-ofertas').click(function(){
            window.location = 'ofertas.html';
        });

        $('#tit-container-recetas').addClass('animated bounceInLeft');
        $('#tit-container-recetas').click(function(){
            window.location = 'recetas.html';
        });

        $('#tit-container-consultas').addClass('animated bounceInLeft');
        $('#tit-container-consultas').click(function(){
            window.location = 'consultas.html';
        });


////////////////////////////////////// Leer JSON



