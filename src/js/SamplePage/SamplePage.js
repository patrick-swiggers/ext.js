
/**
 * @author Patrick
 */
Ext.define('LES.sample.SampleApp', {
  extend: 'WM.taskflow.App',
  allowRefresh: true, /* Assume required for refreshable mixin*/
    enableRefreshInterval: true, /* Assume allows refreshable interval*/
    allowPrint: true, /* Assume required for printbale mixin*/
    allowExport: true, /* Export is configured as plugin in view*/

    mixins: {
        printable: 'RP.mixin.Printable', /* Add print controls to grid*/
        refreshable: 'RP.mixin.Refreshable' /* Add refresh controls to grid*/
    },

    controllers: [
        'sampleController'
    ],

    views: [
        'sampleView'
    ],

    mainView: 'sampleView',
    namespace: 'rp.customer',

    initComponent: function() {
        // Title must be set here due to the message packs not being loaded soon enough.
        this.title = RP.getMessage('rp.customer.title');
        this.callParent(arguments);
    },
    /**
     * Overriding performRefresh method of refreshable mixin.  This function will
     * show a mask prior to and hide the mask after the refresh.
     *
     * Does not seem to work without an override, may be a different base class, but I like the
     * mask
     *
     * Just push to the controller
     */
    performRefresh: function() {
        var me = this;

        Ext.getBody().mask(RP.getMessage('wm.common.refreshing'));
        me.applet.getController('sampleController').performRefresh();
        Ext.getBody().unmask();
    },

    /**
     * This method prints the grid component on the short screen and drill down grids also
     * when clicked on print button.
     *
     * Just push to the controller
     *
     */
    performPrint: function() {
        var me = this;

        me.applet.getController('sampleController').performPrint();
    }

});