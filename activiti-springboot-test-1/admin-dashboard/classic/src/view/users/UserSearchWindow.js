Ext.define('Admin.view.user.UserSearchWindow',{
	extend:'Ext.window.Window',
	alias:'widget.userSearchWindow',
	autoShow: true,
	modal: true,
	layout:'fit',
	width:500,
	height:300,
	title:'查询用户信息',
	requires:[
		'Ext.grid.column.Date'
	],
	items:[{
		xtype:'form',
		layout:'form',
		bodyPadding: 20,
		scrollable: true,
		defaults: {
			labelWidth: 100
		},
		defaultType: 'textfield',
		items:[{
            xtype: 'textfield',
            fieldLabel: 'id',
            name:'id',
            hidden: true,
            readOnly: true
        }, {
            xtype: 'textfield',
            fieldLabel: 'UserName',
            name:'userName'
        }, {
			xtype: 'datefield',
			format: 'Y/m/d H:i:s',
			fieldLabel: 'From',
			name: 'createTimeStart'		
		}, {
			xtype: 'datefield',
			format: 'Y/m/d H:i:s',
			fieldLabel: 'To',
			name: 'createTimeEnd'				
         }],
		buttons: [
			{
				xtype: 'button',
				text: 'Submit',
				handler: 'submitSearchForm'
			}
			,{
				xtype: 'button',
				text: 'Close',
				handler: function(btn) {
					btn.up('window').close();
				}
			},
		]
	}]
});