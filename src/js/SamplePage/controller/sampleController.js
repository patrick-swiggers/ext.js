/**
 * This controller handles Label File grid and form
 * @author Ryan Zhu
 */
Ext.define('rp.customer.controller.sampleController', {
    extend: 'Ext.app.Controller',
    /**
     * @cfg refs
     * Provides a set of references.
     * @type {Object[]}
     */
    refs: [{
        ref: 'main',
        selector: 'kn-sampleView-main'
    }, {
        ref: 'sampleGrid',
        selector: 'kn-sampleScreen-main #sampleGrid'
    }],

    /**
     * @cfg models
     * The array of models to retrieve.
     * @type {String[]}
     */
    models: [],

    /**
     * @cfg stores
     * The array of stores to retrieve.
     * @type {String[]}
     */
    stores: [
        'sampleStore'
    ],

    /**
     * @cfg views
     * The array of views to retrieve.
     * @type {Array}
     */
    views: [],

    /**
     * The init method is called first while creating the controller.
     * Adds listeners to the views.
     */
    init: function() {
        var me = this;

        me.application.on({
            activate: me.onActivate,
            deactivate: me.onDeActivate,
            scope: me
        });

        me.control({
        /* enable the main grid from the main view */
        'kn-sampleScreen-main #sampleGrid': {
            deactivate: me._clearSampleFilterGrid,
            linkclick: me._onCellClickSampleGrid,
            beforecopy: me._beforeCopySampleData
        },
        /* link the activate function to activate */
        'kn-sampleScreen-main [itemId=sampleContainer]': {
            activate: me._onSampleViewActivate
        }
        });

    },

    /**
     * Sets current item in left navigation
     */
    onActivate: function() {
        var me = this;
        me.getSampleStoreStore().load();
    },

    /**
     * This function will perform refresh function
     */
    performRefresh: function() {
        Ext.StoreManager.lookup('rp.customer.store.sampleStore').reload();
    },

    /**
     * @private
     * This method is used to clear rpux filter.
     */
    _clearSampleFilterGrid: function() {
        var me = this;

        if (me.getSampleGrid().getFilterController().getCriteriaView().isVisible()) {
            me.getSampleGrid().getFilterController().getCriteriaView().removeAll();
            me.getSampleGrid().getStore().clearFilter();
        }
    },

    /**
     * @method onDeActivate
     * This method is invoked on application deactivate.
     */
    onDeActivate: function() {
        var me = this;
        me._clearSampleFilterGrid();
    },

    /**
     * @private
     * This method is invoked on click of link column of UOMs grid.
     */
    _onCellClickSampleGrid: function(grid, record) {

    },

    /**
     * @private
     * @param {Ext.grid.Panel} grid The owning grid.
     * @param {RPUX.grid.plugin.GridActions} plugin This plugin.
     * @param {Object[]} selected An array of objects.
     * This method is invoked on click of copy button of UOMs grid.
     */
    _beforeCopySampleData: function(grid, plugin, selected) {

    },

    /**
     * @private
     * This method is invoked on activate of main grid.
     */
    _onSampleViewActivate: function() {
        var me = this;
        me.updateTitle(RP.getMessage('rp.customer.title'));
    }

});
