/**
 *
 * This is the data model for label file.
 *
 * @extends Ext.data.Model
 * @author Patrick
 */
Ext.define('rp.customer.model.sampleModel', {
    extend: 'Ext.data.Model',
    idProperty: 'ordnum',

    fields: [{
        name: 'ordnum',
        type: 'string'
    }, {
        name: 'ordtyp',
        type: 'string'
    }, {
        name: 'client_id',
        type: 'string'
    }, {
        name: 'btcust',
        type: 'string'
    }, {
        name: 'stcust',
        type: 'string'
    }, {
        name: 'rtcust',
        type: 'string'
    }],

    getCountHandlePaging: function() {
        return this.getTotalCount();
    }
});
