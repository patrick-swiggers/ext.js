/**
 * This controller handles Label File grid and form
 * @author Patrick S.
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
    }, {
        ref: 'sampleForm',
        selector: 'kn-sample-sampleForm'
    }, {
        ref: 'ordnum',
        selector: 'kn-sample-sampleForm #sampleForm-ordnum'
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
          'kn-sampleView-main #sampleGrid': {
              deactivate: me._clearSampleFilterGrid,
              addrequested: me._onAddOrderClick,
              beforecopy: me._beforeCopyOrderDetail,
              linkclick: me._onCellClickSampleGrid
          },
          /* link the activate function to activate */
          'kn-sampleScreen-main [itemId=sampleContainer]': {
              activate: me._onSampleViewActivate
          },
          /* function to call if the user clicks save */
          'kn-sample-sampleForm button[action=save]': {
              click: me._onSampleSaveButtonClick
          },
          'kn-sampleView-main': {
              navigateToPrevious: me.goBack
          },
          'kn-sample-sampleForm button[action=cancel]': {
              click: me._onSampleCancelButtonClick
          }
        });

    },

    goBack: function() {
        return this.returnToBack('back', this.getSampleForm());
    },

    returnToBack: function(triggerBy, view) {
        var me = this,
            CurrentButtons = Ext.Msg.YESNOCANCEL,
            CurrentMsg = RP.getMessage('wm.common.saveChangesDialogQuestion'),
            mainView = me.getMain(),
            form = me.getSampleForm();

        if (mainView.getActiveView() === view &&
            !view.down('#saveButton').isDisabled() && form.isValid() &&
            form.isDirty()) {
            Ext.Msg.show({
                msg: CurrentMsg,
                buttons: CurrentButtons,
                icon: Ext.MessageBox.QUESTION,
                scope: this,
                fn: function(btn) {
                    if ('yes' === btn && triggerBy === 'back') {
                        me._onSampleSaveButtonClick();
                    } else if (('no' === btn && triggerBy === 'back') ||
                        ('yes' === btn && triggerBy === 'cancel')) {
                        me.getMain().toPrevious(false);
                    }
                }
            });
            return false;
        }
    },

    /**
     * @private
     * This method is invoked on click of cancel button.
     */
    _onSampleCancelButtonClick: function() {
        var me = this,
            sampleForm = me.getSampleForm().down('form').getForm(),
            sampleStore = me.getSampleStoreStore();

        if (sampleForm.isDirty()) {
            me._showSaveCancelBox('cancel', function callback(btn) {
                if ('yes' === btn) {
                    sampleForm.reset();
                    me.getMain().toPrevious(false);
                }
            });
        }
        else {
            sampleForm.reset();
            me.getMain().toPrevious(false);}
    },

    /**
     * This method is used to show dialog box based on click of cancel or back button
     * if there are any changes on screen.
     * @private
     * @method _showSaveCancelBox
     * @param  {String} triggerBy defines how we are navigating to previous screen (cancel or back).
     * @param  {Function} callback  function which will be called on clicking on button on popup.
     */
    _showSaveCancelBox: function(triggerBy, callback) {
        Ext.Msg.show({
            msg: RP.getMessage('wm.common.cancelConfirmDialog'),
            buttons: Ext.Msg.YESNO,
            scope: this,
            fn: callback
        });
    },

    /**
     * @private
     * This method is invoked on click of link column of grid.
     */
    _onCellClickSampleGrid: function(grid, record) {
        var me = this,
            sampleScreen = Ext.widget('kn-sample-sampleForm'),
            sampleForm;

        sampleScreen.text = record.get('ordnum');
        sampleScreen.associationKey = record.get('assoc_key');

        sampleScreen.action = 'edit';
        me.updateTitle(record.get('ordnum'));

        sampleForm = sampleScreen.down('form');
        sampleScreen.record = record;
        sampleForm.loadRecord(record);
        sampleForm.show();

        me.getMain().onDrillDown(sampleScreen);
        sampleForm.getForm().reset();
        me._getField(sampleForm, 'ordnum').setDisabled(true);
    },

    /**
     * @private
     * Gets a form field based on it's name config.
     * @param  {String} form The tracks form.
     * @param {String} name name of the component.
     */
    _getField: function(form, name) {
        return form.down('[name=' + name + ']');
    },

    /**
     * Sets current item in left navigation
     */
    onActivate: function() {
        var me = this;
        me.getSampleStoreStore().load();
    },

    updateTitle: function(message) {
        this.application.taskForm.setTitle(message);
    },

    /**
     * @private
     * This method is invoked on click of add button
     */
    _onAddOrderClick: function() {
      /* clicking add will display the form */
      var me = this,
          newRecord = Ext.create('rp.customer.model.sampleModel'),
          sampleScreen = Ext.widget('kn-sample-sampleForm'),
          sampleForm;

      sampleScreen.text = RP.getMessage('rp.customer.title');
      sampleScreen.action = 'add';
      sampleScreen.record = newRecord;
      sampleScreen.associationKey = '';
      //trackScreen.spotifyLink = '';

      sampleForm = sampleScreen.down('form');
      sampleForm.loadRecord(newRecord);
      sampleForm.show();

      me.updateTitle(RP.getMessage('rp.customer.title'));
      me.getMain().onDrillDown(sampleScreen);
    },

    /**
     * @private
     * This method is invoked on click of save button of UOMs grid.
     */
    _onSampleSaveButtonClick: function() {
        console.log("save button clicked");
        var me = this,
            sampleScreen = me.getSampleForm(),
            sampleForm = me.getSampleForm().down('form'),
            sampleStore = me.getSampleStoreStore(),
            newValues = sampleForm.getForm().getValues(),
            sampleRecord,
            recordExist;

        if (!sampleForm.getForm().isValid()) {
            return true;
        }

        if (!sampleForm.getForm().isDirty()) {
            return true;
        }

        if (sampleScreen.action !== 'edit') {
            console.log("save -----  adding new record!");
            //Check the duplicate track
            sampleStore.queryBy(function(rec) {
                if (rec.get('ordnum') === newValues.ordnum) {
                    recordExist = true;
                }
            });
            if (!recordExist) {
                console.log("record does not exist so add...");
                sampleRecord = Ext.create('rp.customer.model.sampleModel');
                sampleRecord.set(newValues);
                sampleStore.add(sampleRecord);
                /* following line only required if you have an id field in your model */
                sampleRecord.phantom = true;
                console.log("about to sync store");
                sampleStore.sync({
                    success: function() {
                        sampleStore.load();
                    },
                    failure: function() {
                    }
                });
                console.log("store sync complete");
            }
            else {
                sampleStore.rejectChanges();
                Ext.Msg.alert(RP.getMessage('wm.common.error'), RP.getMessage('wm.common.recordExists'));
                return;
            }
        }
        else {
            console.log("save - changing record!");
            var doesExist = false;
            sampleRecord = sampleForm.getForm().getRecord();
            sampleRecord.set(newValues);

            sampleRecord.setDirty();
            sampleStore.sync({
                success: function() {
                    sampleStore.load();
                }
            });
        }
        console.log("save complete 1");
        me.getMain().toPrevious(false);
        console.log("save complete 2");
        //me.gettracksgrid().getSelectionModel().deselectAll();
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
     * @private
     * @param {Ext.grid.Panel} grid The owning grid.
     * @param {RPUX.grid.plugin.GridActions} plugin This plugin.
     * @param {Object[]} selected An array of objects.
     * This method is invoked on click of copy button of the grid.
     */
    _beforeCopyOrderDetail: function(grid, plugin, selected) {
       console.log("you pressed copy");
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
     * This method is invoked on activate of main grid.
     */
    _onSampleViewActivate: function() {
        var me = this;
        me.updateTitle(RP.getMessage('rp.customer.title'));
    }

});
