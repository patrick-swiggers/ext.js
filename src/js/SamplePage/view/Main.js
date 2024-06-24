//////////////////////
// \js\tf\packing\packing\packing\view\Main.js
//////////////////////
/**
 * @class kn.packing.view.Main
 *
 * This is the main view for the Packing Operator Packing screen.
 *
 * @extends Ext.panel.Panel
 * @author Patrick Swiggers
 */
Ext.define('rp.customer.view.Main', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.kn-sample-main',

    /**
     * @cfg for label form
     * where we are packing from.
     */
    config: {
        packingFromId: undefined
    },

    initComponent: function() {
        Ext.apply(this, {
            autoScroll: true,
            /*layout: {
                type: 'vbox',
                align: 'stretch'
            },*/
			layout: {
                type: 'border'
            },
            /*defaults: {
                flex: 1,
                minWidth: 800
            },*/
            items: [{
				     region: "north",
					 xtype: "panel",
					 split: true,
					 items: [{
                          xtype: "button",
					      width: 75,
					      height: 30,
						  align: "left",
                          itemId: "Submit",
                          text: "Submit"
					 }]
            },
			{
                    //xtype: 'rp.customer.view.sampleView',
                    //itemId: 'rp.customer.view.sampleView'
					region: "west",
					split: true,
					xtype: 'kn-sampleView-main',
					itemId: 'kn-sampleView-main',
					width: 1500,
					height: 800
            },
			{
				     region: "center",
                     xtype: "panel",
                     html: "TextPanel"
            }
			]
        });
        this.callParent(arguments);
    },

    onDrillDown: function(next) {
        var me = this;

        me.down('#mainViewCont').getLayout().setActiveItem(next);
    }
});
