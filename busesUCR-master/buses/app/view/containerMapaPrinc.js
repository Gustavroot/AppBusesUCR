/*
 * File: app/view/containerMapaPrinc.js
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

Ext.define('MyApp.view.containerMapaPrinc', {
    extend: 'Ext.Container',
    alias: 'widget.mycontainer1',

    requires: [
        'MyApp.view.mapaDesplieguePines'
    ],

    config: {
        id: 'containerMapaPrinc',
        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'Mapa',
                items: [
                    {
                        xtype: 'button',
                        handler: function(button, event) {
                            Ext.getCmp('mapaDesplieguePines').getMap().fitBounds(limitesPinesParadas);
                            Ext.getStore('storeBusesUCR').load();
                        },
                        width: '20%',
                        iconCls: 'refresh'
                    }
                ]
            },
            {
                xtype: 'mapadesplieguepines1'
            }
        ],
        listeners: [
            {
                fn: 'onContainerMapaPrincInitialize',
                event: 'initialize'
            }
        ]
    },

    onContainerMapaPrincInitialize: function(component, eOpts) {
        this.setMasked({xtype: "loadmask", message: "Espere por favor..."});
    }

});