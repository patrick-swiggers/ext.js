
Ext.define('rp.customer.view.SampleForm', {
    extend: 'WM.ui.view.FormView',
    alias: 'widget.kn-sample-sampleForm',
    componentCls: 'kn-sample-sampleForm',
    config: {
        record: undefined
    },

    /**
     * The initialization function for this component.
     */
    initComponent: function() {
        var me = this;

        associationKey = '';
        spotifyLink = '';

        me.initialConfig = {
            trackResetOnLoad: true
        };

        Ext.apply(me, {
            scroll: 'vertical',
            itemId: 'sampleForm-form',
            bodyItems: [{
                xtype: 'questiongrouper',
                header: RP.getMessage('rp.customer.title'),
                headerCls: 'sampleForm-formTitle-uppercase',
                // Tip: Items below need to have a name that matches the name in the model
                items: [{
                    xtype: 'label',
                    fillWholeRow: true,
                    text: RP.getMessage('rp.customer.title'),
                    cls: 'wm-formview-font wm-sampleFormLabel'
                }, {
                    xtype: 'textfield',
                    fieldLabel: RP.getMessage('rp.customer.ordnum'),
                    labelAlign: 'top',
                    name: 'ordnum',
                    allowBlank: false,
                    maxLength: 256,
                    enforceMaxLength: true,
                    itemId: 'sampleForm-ordnum'
                }, {
                    xtype: 'combo',
                    queryMode: 'local',
                    fieldLabel: RP.getMessage('rp.customer.ordtyp'),
                    labelAlign: 'top',
                    maxLength: 256,
                    enforceMaxLength: true,
                    name: 'ordtyp',
                    allowBlank: false,
                    itemId: 'sampleForm-ordtyp',
                    store: 'rp.customer.store.orderTypes',
                    displayField: 'orderTypeLongDescription',
                    valueField: 'orderType',
                    forceSelection: true,
                    typeAhead: true,
                    markDirty: true,
                    dirtyCls: 'x-grid-dirty-cell'
                }, {
                    xtype: 'textfield',
                    fieldLabel: RP.getMessage('rp.customer.client_id'),
                    labelAlign: 'top',
                    name: 'client_id',
                    allowBlank: false,
                    maxLength: 256,
                    enforceMaxLength: true,
                    itemId: 'sampleForm-client_id'
                },{
                    xtype: 'textfield',
                    fieldLabel: RP.getMessage('rp.customer.btcust'),
                    labelAlign: 'top',
                    name: 'btcust',
                    allowBlank: false,
                    maxLength: 256,
                    enforceMaxLength: true,
                    itemId: 'sampleForm-btcust'
                },{
                    xtype: 'textfield',
                    fieldLabel: RP.getMessage('rp.customer.stcust'),
                    labelAlign: 'top',
                    name: 'stcust',
                    allowBlank: false,
                    maxLength: 256,
                    enforceMaxLength: true,
                    itemId: 'sampleForm-stcust'
                },{
                    xtype: 'textfield',
                    fieldLabel: RP.getMessage('rp.customer.rtcust'),
                    labelAlign: 'top',
                    name: 'rtcust',
                    allowBlank: false,
                    maxLength: 256,
                    enforceMaxLength: true,
                    itemId: 'sampleForm-rtcust'
                }]
            }]
        });

        this.callParent();
    }
});
