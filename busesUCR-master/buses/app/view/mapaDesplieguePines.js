/*
 * File: app/view/mapaDesplieguePines.js
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

Ext.define('MyApp.view.mapaDesplieguePines', {
    extend: 'Ext.Map',
    alias: 'widget.mymap1',

    config: {
        id: 'mapaDesplieguePines',
        listeners: [
            {
                fn: 'onMapaDesplieguePinesMaprender',
                event: 'maprender'
            }
        ]
    },

    onMapaDesplieguePinesMaprender: function(map, gmap, eOpts) {
        this.setMasked({xtype: "loadmask", message: "Espere por favor..."});
        setTimeout(function(){Ext.getCmp('mapaDesplieguePines').setMasked(false);},1500);
        Ext.getStore('storePinesParadas').load(function(records){
            MyApp.app.loadStorePinesParadas(records);
        });
        MyApp.app.refrescadoPinesParadas();

        //RUTAS
        var ruta1= new google.maps.KmlLayer('http://faraday.eie.ucr.ac.cr/map/kml/route_1.kml');
        var ruta2= new google.maps.KmlLayer('http://faraday.eie.ucr.ac.cr/map/kml/route_2.kml');

        ruta1.setMap(Ext.getCmp('mapaDesplieguePines').getMap());
        ruta2.setMap(Ext.getCmp('mapaDesplieguePines').getMap());
    }

});