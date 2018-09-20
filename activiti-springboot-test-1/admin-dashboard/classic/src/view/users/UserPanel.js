Ext.define('Admin.view.user.UserPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'userPanel',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.grid.column.Date'
    ],

    layout: 'fit',
    
    items: [{
            xtype: 'gridpanel',
            cls: 'user-grid',
            title: 'UserGrid Results',
            bind: '{userLists}',
            scrollable: false,
            selModel: {type: 'checkboxmodel',checkOnly: true},
            columns: [
                {xtype: 'gridcolumn',width: 40,dataIndex: 'id',text: '#',hidden:true},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'userName',text: 'UserName',flex: 1},
                {xtype: 'gridcolumn',cls: 'content-column',dataIndex: 'password',text: 'Password',flex: 1},
                {xtype: 'datecolumn',cls: 'content-column',width: 200,dataIndex: 'birthday',text: 'Birthday',formatter: 'date("Y/m/d H:i:s")',flex: 1},
                {xtype: 'actioncolumn',cls: 'content-column', width: 120,text: 'Actions',tooltip: 'edit ',
                    items: [
                        {xtype: 'button', iconCls: 'x-fa fa-pencil' ,handler: 'openEditWindow'},
                        {xtype: 'button',iconCls: 'x-fa fa-close'	,handler: 'deleteOneRow'},
                        {xtype: 'button',iconCls: 'x-fa fa-ban'	 	,handler: 'onDisableButton'}
                    ]
                }
            ],
        	listeners: {
                selectionchange: function(selModel, selections){
                    this.down('#userGridPanelRemove').setDisabled(selections.length === 0);
                }
	        },
            tbar: [{
                xtype: 'combobox',
                hideLabel: true,
                reference:'searchFieldName',
                store:Ext.create("Ext.data.Store", {
                    fields: ["name", "value"],
                    data: [
                        { name: '用户名', value: 'userName' },
                        { name: '生日', value: 'birthday' }
                    ]
                }),
                displayField: 'name',
                valueField:'value',
                value:'userName',
                editable: false,
                queryMode: 'local',
                triggerAction: 'all',
                emptyText: 'Select a state...',
                width: 135,
                listeners:{
                    select: 'searchComboboxSelectChange'
                }
            }, '-',{
                xtype:'textfield',
                reference:'searchFieldValue',
                name:'orderPanelSearchField'
            }, '-',{
                xtype: 'datefield',
                hideLabel: true,
                hidden:true,
                format: 'Y/m/d H:i:s',
                reference:'searchDataFieldValue',
                fieldLabel: 'From',
                name: 'from_date'
            }, '-',{
                xtype: 'datefield',
                hideLabel: true,
                hidden:true,
                format: 'Y/m/d H:i:s',
                reference:'searchDataFieldValue2',
                fieldLabel: 'To',
                name: 'to_date'
            }, '-',{
                text: 'Search',
                iconCls: 'fa fa-search',
                handler: 'quickSearch'
            }, '-',{
                text: 'Search More',
                iconCls: 'fa fa-search-plus',
                handler: 'openSearchWindow' 
            }, '->',{
                text: 'Add',
                tooltip: 'Add a new row',
                iconCls: 'fa fa-plus',
                handler: 'openAddWindow'    
            },'-',{
                text: 'Removes',
                itemId: 'userGridPanelRemove',
                tooltip: 'Remove the selected item',
                iconCls:'fa fa-trash',
                disabled: true,
                handler: 'deleteMoreRows'   
            }],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                bind: '{userLists}'
            }]
        }]
});
