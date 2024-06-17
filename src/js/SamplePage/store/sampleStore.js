/**
 * Label File Store
 *
 * @extends Ext.data.Store
 * @author Patrick S.
 */
Ext.define('rp.customer.store.sampleStore', {
    extend: 'Ext.data.Store',
    model: 'rp.customer.model.sampleModel',
    pagingEnabled: true,
    remoteSort: true,
    proxy: {
        type: 'rpuxRest', /* special type used here */
        url: RP.core.ApplicationSites.buildDataServiceUrl('wm', 'cws/sampleData'),
        reader: {
            type: 'json',
            root: 'data'  /* stuff is inside data hierarchy */
        }
    },
    autoLoad: true
});
