/**
 * @class WM.masterdata.item.view.ItemFamilyGroupWindow
 *
 * This view contains a window that creates or edits an item family group.
 *
 * @extends Ext.window.Window
 * @author Patrick Swiggers
 */
Ext.define('rp.customer.view.orderTypeWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.kn-sample-ordertypewindow',
    itemId: 'sample-ordertypewindow',

    closable: false,
    width: 300,
    closeAction: 'destroy',
    mixins: {
        baseView: 'WM.ui.view.BaseView'
    },
    /**
     * Constructor
     */
    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            title: RP.getMessage('rp.customer.addordertype'),
            items: [{
                xtype: 'form',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border: 0,
                listeners: {
                    dirtyChange: function(component, dirty, eOpts) {
                        this.up().down('#saveBtn').setDisabled(!dirty);
                        this.up().down('#cancelBtn').setDisabled(!dirty);
                    }
                },
                margin: '20 20 0 20',
                items: [
                    me.createTextField('orderType', {
                        allowBlank: false,
                        fieldLabel: RP.getMessage('rp.customer.ordtyp'),
                        disabled: 'edit' === me.action,
                        itemId: 'orderType',
                        maxLength: 256,
                        enforceMaxLength: true,
                        validator: function(value) {
                            var ordertypeStore = Ext.getStore('rp.customer.store.orderTypes'),
                                idx = ordertypeStore.findBy(function(record) {
                                    return record.get('orderType') === value;
                                });

                            if (value && idx !== -1) {
                                return RP.getMessage('rp.customer.ordertypeexists');
                            } else {
                                return true;
                            }
                        }
                    }),{
                        xtype: 'textfield',
                        fieldLabel: RP.getMessage('rp.customer.description'),
                        labelAlign: 'top',
                        name: 'orderTypeLongDescription',
                        allowBlank: false,
                        maxLength: 256,
                        enforceMaxLength: true,
                        itemId: 'sampleForm-description'
                    },
                    {
                        margin: '30 0 20 0',
                        buttonAlign: 'center',
                        border: 0,
                        buttons: [{
                            text: RP.getMessage('wm.common.save'),
                            itemId: 'saveBtn',
                            scale: 'medium',
                            action: 'save',
                            disabled: true
                        }, {
                            text: RP.getMessage('wm.common.cancel'),
                            action: 'cancel',
                            itemId: 'cancelBtn',
                            scale: 'medium',
                            listeners: {
                                scope: me,
                                click: function(button) {
                                    me.onCancelButtonClick();
                                }
                            }
                        }]
                    }
                ]
            }]
        });
        me.callParent(arguments);
    },

    /**
     * Rejects changes it an existing record or removes a newly created record,
     * then closes the window.
     */
    onCancelButtonClick: function() {
        var me = this,
            form = me.down('form').getForm(),
            record = form.getRecord();

        if (me.action === 'edit') {
            record.store.rejectChanges();
            me.fireEvent('cancel');
            me.close();
        } else {
            me.fireEvent('cancel');
            me.close();
        }
    }
});
