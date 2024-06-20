/**
 *
 * This is the data model for label file.
 *
 * @extends Ext.data.Model
 * @author Patrick
 */
Ext.define('rp.customer.model.orderTypes', {
    extend: 'Ext.data.Model',
    idProperty: 'orderType',

    fields: [{
        name: 'orderType',
        type: 'string'
    },{
        name: 'orderTypeLongDescription',
        type: 'string'
    }],

    getCountHandlePaging: function() {
        return this.getTotalCount();
    }
});