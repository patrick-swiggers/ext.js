/**
 * @extends Ext.data.Store
 * @author Patrick Swiggers
 */
Ext.define('rp.customer.store.orderClassValues', {
    extend: 'Ext.data.Store',
    model: 'rp.customer.model.orderClassValues',
    pagingEnabled: true,
    remoteSort: true,
    proxy: {
        type: 'rpuxRest', /* special type used here */
        url: RP.core.ApplicationSites.buildDataServiceUrl('wm', 'wm/orderClassValues'),
        reader: {
            type: 'json',
            root: 'data'  /* stuff is inside data hierarchy */
        }
    },
    autoLoad: true
});
