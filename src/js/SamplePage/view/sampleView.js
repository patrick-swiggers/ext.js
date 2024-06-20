Ext.define('rp.customer.view.sampleView', {
    extend: 'WM.ui.view.CardDeck',
    alias: 'widget.kn-sampleView-main',
    itemId: 'kn-sampleView-main',
    componentCls: 'kn-sampleView-main',
    vertical: true,
    store: undefined,

    initComponent: function () {
        var me = this,
        store = me.store || Ext.StoreManager.lookup('rp.customer.store.sampleStore');

        Ext.apply(me, {
            layout: 'fit',
            items: [{
                xtype: 'container',
                itemId: 'sampleContainer',
                layout: 'border',
                text: RP.getMessage('rp.customer.title'), /* title */
                items: [{
                    region: 'center',
                    xtype: 'rpuxFilterableGrid', /* grid */
                    plugins: [{
                        ptype: 'rpExportableGrid', /* Allow data exports only PDF/CSV Available as defined in RP.plugin.ExportablePlugin and rpExportableGrid */
                        exportFormats: [
                            new RP.data.model.Format({format: 'pdf', display: 'PDF'}),
                            new RP.data.model.Format({format: 'csv', display: 'CSV'})
                        ]},{
                        ptype: 'wm.gridActions',
                        enableDelete: true,
                        enableAdd: true,
                        enableCopy: true,
                        enableSimpleFilter: false
                    }],
                    selModel: {
                        pruneRemoved: false,
                        checkOnly: true
                    },
                    itemId: 'sampleGrid',
                    store: store,
                    filterController: me._getFilterController(),
                    /*
                       Paging controls
                     */
                    dockedItems: [{
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        store: store,
                        xhooks: {
                            doRefresh: function (args) {
                                var me = this,
                                    filterableView = me.up('rpuxFilterableGrid');
                                this.up('kn-sampleView-main').performRefresh();
                            }
                        },
                        dock: 'bottom'
                    }],
                    columns: {
                        items: [{
                            xtype: 'linkcolumn',
                            itemId: 'ordnum',
                            header: RP.getMessage('rp.customer.ordnum'),
                            flex: 3,
                            dataIndex: 'ordnum'
                        }, {
                            header: RP.getMessage('rp.customer.ordtyp'),
                            flex: 2,
                            dataIndex: 'ordtyp'
                        }, {
                            header: RP.getMessage('rp.customer.client_id'),
                            flex: 2,
                            dataIndex: 'client_id'
                        }, {
                            header: RP.getMessage('rp.customer.btcust'),
                            flex: 2,
                            dataIndex: 'btcust'
                        }, {
                            header: RP.getMessage('rp.customer.stcust'),
                            flex: 2,
                            dataIndex: 'stcust'
                        }, {
                            header: RP.getMessage('rp.customer.rtcust'),
                            flex: 2,
                            dataIndex: 'rtcust'
                        }]
                    }
                }]
            }]
        });

        me.callParent();
    },

    /**
     * @private
     * Creates the filter controller.
     * @return {RPUX.FilterController} The custom filter controller.
     */
    _getFilterController: function () {
        var store = Ext.StoreManager.lookup('rp.customer.store.sampleStore');

        return Ext.create('RPUX.FilterController', {
            filterType: 'sampleScreen',
            backend: 'wm',
            localFilter: false,
            entityStore: Ext.StoreManager.lookup('rp.customer.store.sampleStore'),

            executeFilter: function (queryJson, force) {
                var query = this.encodeQuery(queryJson);

                if (!force && query === this.lastQuery) {
                    return;
                }
                this.lastQuery = query;
                store.currentPage = 1;
                if (query != '[]') {
                    store.load({
                        params: {query: query}
                    });
                    this.fireEvent('afterfilter');
                } else {
                    store.load();
                }
            }
        });
    }
});
