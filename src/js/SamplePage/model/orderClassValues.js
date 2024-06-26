/**
 * @extends Ext.data.Model
 * @author Patrick Swiggers
 */
Ext.define('rp.customer.model.orderClassValues', {
    extend: 'Ext.data.Model',
    idProperty: 'resourceId',

    fields: [{
        name: 'resourceId'
        }, {
            name: 'order_class',
            type: 'string'
        }, {
            name: 'ordnum',
            type: 'string'
        }],

    getCountHandlePaging: function() {
        return this.getTotalCount();
    }
});