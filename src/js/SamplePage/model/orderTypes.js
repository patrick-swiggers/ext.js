/**
 *
 * This is the data model for label file.
 *
 * @extends Ext.data.Model
 * @author Patrick Swiggers
 */
Ext.define('rp.customer.model.orderTypes', {
    extend: 'Ext.data.Model',
    idProperty: 'resourceId',

    fields: [{
        name: 'resourceId'
        }, {
            name: 'warehouseId',
            defaultValue: RP.globals.SITEID
        }, {
            name: 'orderType'
        }, {
            name: 'bulkPickingFlag'
        }, {
            name: 'orderTypeLongDescription',
            type: 'string'
        }, {
            name: 'shippingRestrictedInventoryFlag'
        }, {
            name: 'gs1OrderType'
        }, {
            name: 'wmDefaultFlag'
        }],

    getCountHandlePaging: function() {
        return this.getTotalCount();
    }
});