/**
 * @extends Ext.data.Model
 * @author Patrick Swiggers
 */
Ext.define('rp.customer.model.orderClassTypes', {
    extend: 'Ext.data.Model',
    idProperty: 'resourceId',

    fields: [{
        name: 'resourceId'
        }, {
            name: 'order_class',
            type: 'string'
        }, {
            name: 'description',
            type: 'string'
        }],

    getCountHandlePaging: function() {
        return this.getTotalCount();
    }
});