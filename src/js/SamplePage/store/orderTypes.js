/**
 * Label File Store
 *
 * @extends Ext.data.Store
 * @author Patrick Swiggers
 */
Ext.define('rp.customer.store.orderTypes', {
    extend: 'Ext.data.Store',
    model: 'rp.customer.model.orderTypes',
    pagingEnabled: true,
    remoteSort: true,
    proxy: {
        type: 'rpuxRest', /* special type used here */
        url: RP.core.ApplicationSites.buildDataServiceUrl('wm', 'wm/orderTypes'),
        reader: {
            type: 'json',
            root: 'data'  /* stuff is inside data hierarchy */
        }
    },
    autoLoad: true
});
