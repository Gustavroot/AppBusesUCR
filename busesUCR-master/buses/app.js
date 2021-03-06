/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.2.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

//@require @packageOverrides
Ext.Loader.setConfig({

});

Ext.application({
    models: [
        'modelBusesUCR',
        'modelPinesParadas',
        'modelDespliegueInfo',
        'modelDespliegueInfoBuses'
    ],
    stores: [
        'storeBusesUCR',
        'storePinesParadas',
        'storeDespliegueInfo',
        'storeDespliegueInfoBuses'
    ],
    views: [
        'tabPanelPrincipal',
        'containerInfo',
        'containerDescripProyecto',
        'containerMapaPrinc',
        'containerEleccionPines',
        'mapaEleccionPines',
        'mapaDesplieguePines'
    ],
    name: 'MyApp',

    insertarPinEnMapa: function(lat, lng, idMap, stringInfoWindow, boundsObject, iconURL) {
        var point = new google.maps.LatLng(lat,lng);

        if(iconURL!==undefined){
            var iconoPinParada=new google.maps.MarkerImage(iconURL,null,null,null,new google.maps.Size(35,35));
            var marker = new google.maps.Marker({
                map: Ext.getCmp(idMap).getMap(),
                position: point,
                icon: iconoPinParada
            });
        }
        else{
            var marker = new google.maps.Marker({
                map: Ext.getCmp(idMap).getMap(),
                position: point
            });
        }


        //Ext.getCmp(idMap).setMapCenter(point);

        //markersPinesParadas.push(marker);
        try{
            if(boundsObject==limitesPinesParadas){
                boundsObject.extend(point);
                Ext.getCmp(idMap).getMap().fitBounds(boundsObject);
            }
        }
        catch(e){}
        if(boundsObject==markersPinesBuses){
            markersPinesBuses.push(marker);
            marker.setZIndex(google.maps.Marker.MAX_ZINDEX+1);
        }

        var infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, "click", function() {
            infoWindow.setContent(stringInfoWindow);
            infoWindow.open(Ext.getCmp(idMap).getMap(), marker);
        });
        try{
            if(boundsObject==limitesPinesParadas){
                variableGlobalZoomPinesParadas=Ext.getCmp(idMap).getMap().getZoom();
                //alert(Ext.getCmp(idMap).getMap().getZoom());
            }
        }
        catch(e){}
    },

    launch: function() {
        //Array de pines
        markersPinesBuses=[];
        arrayMarkersDiplayInfo1=[];
        arrayMarkersDiplayInfo2=[];
        limitesPinesEleccion = new google.maps.LatLngBounds();
        limitesPinesBuses = new google.maps.LatLngBounds();

        setTimeout(function(){
            Ext.getCmp('listaDespliegueInfo').setLoadingText(null);
            Ext.getStore('storeBusesUCR').load(function(records){
                MyApp.app.loadDelStoreBusesUCR(records);
                MyApp.app.funcionEjecRefreshBg();
            });
            Ext.getCmp('containerMapaPrinc').setMasked(false);
        },1000);
        Ext.create('MyApp.view.tabPanelPrincipal', {fullscreen: true});
    },

    funcionEjecRefreshBg: function() {
        varTimeoutEjecRefreshBg=setTimeout(function(){
            Ext.getStore('storeBusesUCR').load(function(records){
                MyApp.app.loadDelStoreBusesUCR(records);
            });
            MyApp.app.funcionEjecRefreshBg();
        },2500);
    },

    refrescadoPosMarkers: function(arrayMarkers, recordsStore) {
        for(var i=0; i<arrayMarkers.length; i++){
            var point = new google.maps.LatLng(recordsStore[i].get('Latitude'),recordsStore[i].get('Longitude'));
            arrayMarkers[i].setPosition(point);
            if(recordsStore[i].get('State')===0){
                var iconUrlBuffer='busGreen.png';
            }
            else if(recordsStore[i].get('State')===1){
                var iconUrlBuffer='busBlue.png';
            }
            else if(recordsStore[i].get('State')==2){
                var iconUrlBuffer='busRed.png';
            }
            else{
                var iconUrlBuffer='busGreen.png';
            }
            var iconoBusRefresh=new google.maps.MarkerImage(iconUrlBuffer,null,null,null,new google.maps.Size(35,35));
            arrayMarkers[i].setIcon(iconoBusRefresh);
        }
    },

    refrescadoPinesParadas: function() {
        setTimeout(function(){
            Ext.getStore('storePinesParadas').load(function(records){
                MyApp.app.loadStorePinesParadas(records);
            });
            MyApp.app.refrescadoPinesParadas();
        },300000);
    },

    loadDelStoreBusesUCR: function(records) {
        if(markersPinesBuses.length===0){
            for(var i=0; i<records.length; i++){
                if(records[i].get('State')===0){
                    var iconUrlBuffer='busGreen.png';
                }
                else if(records[i].get('State')===1){
                    var iconUrlBuffer='busBlue.png';
                }
                else if(records[i].get('State')==2){
                    var iconUrlBuffer='busRed.png';
                }
                else{
                    var iconUrlBuffer='busGreen.png';
                }
                MyApp.app.insertarPinEnMapa(records[i].get('Latitude'),records[i].get('Longitude'),'mapaDesplieguePines',"Bus "+records[i].get('idBus'),markersPinesBuses,iconUrlBuffer);
                //MyApp.app.refrescadoPosMarkers(markersPinesBuses,records);
            }
        }
        else{
            MyApp.app.refrescadoPosMarkers(markersPinesBuses,records);
        }
    },

    loadStorePinesParadas: function(records) {
        limitesPinesParadas = new google.maps.LatLngBounds();

        for(var i=0; i<records.length; i++){
            MyApp.app.insertarPinEnMapa(records[i].get('Latitude'),records[i].get('Longitude'),'mapaDesplieguePines',records[i].get('Name'),limitesPinesParadas,'busstop.png');
        }
    },

    load2StorePinesParadas: function(records, target) {
        limitesPinesEleccion = new google.maps.LatLngBounds();

        for(var i=0; i<records.length; i++){
            MyApp.app.insertarPinesEleccionDisplay(records[i].get('Latitude'),records[i].get('Longitude'),'mapaEleccionPines','busstop.png','parada',records[i].get('Name'),target,records[i].get('Name'));
        }
        //lat, lng, idMaps, iconURL, tipoPin
    },

    insertarPinesEleccionDisplay: function(lat, lng, idMap, iconURL, tipoPin, identificador, target, stringInfoWindow) {
        if(tipoPin=='bus'){
            var indiceBusEnRecords=Ext.getStore('storeBusesUCR').findExact('idBus',identificador);
            var stateBus=Ext.getStore('storeBusesUCR').getAt(indiceBusEnRecords).get('State');
            if(stateBus===0){
                var iconUrl='busGreen.png';
            }
            else if(stateBus===1){
                var iconUrl='busBlue.png';
            }
            else if(stateBus==2){
                var iconUrl='busRed.png';
            }
            else{
                var iconUrl='busGreen.png';
            }
        }
        else{
            iconUrl=iconURL;
        }



        var point = new google.maps.LatLng(lat,lng);

        if(iconUrl!==undefined){
            var iconoPinParada=new google.maps.MarkerImage(iconUrl,null,null,null,new google.maps.Size(35,35));
            var marker = new google.maps.Marker({
                map: Ext.getCmp(idMap).getMap(),
                position: point,
                icon: iconoPinParada
            });
        }
        else{
            var marker = new google.maps.Marker({
                map: Ext.getCmp(idMap).getMap(),
                position: point
            });
        }

        limitesPinesEleccion.extend(point);
        if(tipoPin=='parada'){
            Ext.getCmp(idMap).getMap().fitBounds(limitesPinesEleccion);
        }
        else{
            marker.setZIndex(google.maps.Marker.MAX_ZINDEX+1);
        }

        //AQUI SE LE APLICA LA PRIORIDAD A LOS PINES EN EL MAPA

        if(tipoPin=='parada'){
            arrayMarkersDiplayInfo1.push(marker);
        }
        else{
            arrayMarkersDiplayInfo2.push(marker);
        }


        var infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, "click", function() {
            Ext.getCmp('containerInfo').setMasked({xtype: "loadmask", message: "Espere por favor..."});
            if(target=='parada'){
                Ext.getCmp('listaDespliegueInfo').setStore(Ext.getStore('storeDespliegueInfo'));
                if(tipoPin=='parada'){
                    Ext.getCmp('tabPanelPrincipal').setActiveItem(Ext.getCmp('containerInfo'));
                    Ext.getCmp('tabPanelPrincipal').getTabBar().setHidden(0);
                    //alert('esta es una parada con identificador: '+identificador);
                    Ext.getStore('storeDespliegueInfo').getProxy().setExtraParam('busstopname',identificador);
                    Ext.getStore('storeDespliegueInfo').load(function(records){
                        Ext.getCmp('panelInfoDespuesClickear').setHtml('<center><b><p>&nbsp;</p><p>Parada:</p><p>'+identificador+'</p></b></center>');
                        Ext.getCmp('listaDespliegueInfo').setItemTpl('<b>Bus {Name}</b>  >  Distancia: {Distance} m &nbsp; - &nbsp;   Tiempo: {[MyApp.app.parseTime(values.Time)]}');
                        Ext.getCmp('containerInfo').setMasked(false);
                    });
                }
                else{
                    infoWindow.setContent(stringInfoWindow);
                    infoWindow.open(Ext.getCmp(idMap).getMap(), marker);
                }
            }
            else{
                Ext.getCmp('listaDespliegueInfo').setStore(Ext.getStore('storeDespliegueInfoBuses'));
                if(tipoPin=='parada'){
                    infoWindow.setContent(stringInfoWindow);
                    infoWindow.open(Ext.getCmp(idMap).getMap(), marker);
                    //alert('no!');
                    //Ext.getStore('storeDespliegueInfo').getProxy().setExtraParam('busstopname',identificador);
                }
                else{
                    Ext.getCmp('tabPanelPrincipal').setActiveItem(Ext.getCmp('containerInfo'));
                    Ext.getCmp('tabPanelPrincipal').getTabBar().setHidden(0);
                    //alert('este es un bus con identificador: '+identificador);
                    Ext.getStore('storeDespliegueInfoBuses').getProxy().setExtraParam('idbus',identificador);
                    Ext.getStore('storeDespliegueInfoBuses').load(function(){
                        Ext.getCmp('panelInfoDespuesClickear').setHtml('<center><b><p>&nbsp;</p><p>Bus: '+identificador+'</p></b></center>');
                        Ext.getCmp('listaDespliegueInfo').setItemTpl('<b>{Name}</b>  >  Distancia: {Distance} m &nbsp; - &nbsp;   Tiempo: {[MyApp.app.parseTime(values.Time)]}');
                        Ext.getCmp('containerInfo').setMasked(false);
                    });
                }
            }
        });
    },

    load2DelStoreBusesUCR: function(records, target) {
        limitesPinesEleccion = new google.maps.LatLngBounds();

        for(var i=0; i<records.length; i++){
            var j=i+1;
            MyApp.app.insertarPinesEleccionDisplay(records[i].get('Latitude'),records[i].get('Longitude'),'mapaEleccionPines','bus.png','bus',records[i].get('idBus'),target,'Bus '+j);
        }
    },

    ejectBotonesDespliegue: function(target) {
        while(arrayMarkersDiplayInfo1[0]){
            arrayMarkersDiplayInfo1.pop().setMap(null);
        }
        while(arrayMarkersDiplayInfo2[0]){
            arrayMarkersDiplayInfo2.pop().setMap(null);
        }

        Ext.getCmp('tabPanelPrincipal').setActiveItem(Ext.getCmp('containerEleccionPines'));
        Ext.getCmp('tabPanelPrincipal').getTabBar().setHidden(1);

        Ext.getStore('storeBusesUCR').load(function(records){
            MyApp.app.load2DelStoreBusesUCR(records,target);
            MyApp.app.refrescadoPinesDespliegueInfo(arrayMarkersDiplayInfo2,records);
            Ext.getCmp('containerEleccionPines').setMasked(false);
        });
        Ext.getStore('storePinesParadas').load(function(records){
            MyApp.app.load2StorePinesParadas(records,target);
            Ext.getCmp('containerEleccionPines').setMasked(false);
        });
    },

    refrescadoPinesDespliegueInfo: function(arregloPines, records) {
        variableTimeOutRefreshDespliegueInfo=setTimeout(function(){
            Ext.getStore('storeBusesUCR').load(function(records){
                for(var i=0; i<records.length; i++){
                    var point = new google.maps.LatLng(records[i].get('Latitude'),records[i].get('Longitude'));
                    arrayMarkersDiplayInfo2[i].setPosition(point);
                }
            });
            MyApp.app.refrescadoPinesDespliegueInfo();
        },1500);
    },

    parseTime: function(time) {
        //alert(time);
        //alert(time.split(":")[0]+" h "+time.split(":")[1]+" min");
        return time.split(":")[0]+" h "+time.split(":")[1]+" min";
    }

});
