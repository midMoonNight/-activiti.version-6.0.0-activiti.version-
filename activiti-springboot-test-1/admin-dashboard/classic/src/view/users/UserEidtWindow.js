Ext.define('Admin.view.user.UserEditWindow',{
	extend:'Ext.window.Window',
	alias:'widget.userEditWindow',
	autoShow: true,
	modal: true,
	layout:'fit',
	width:500,
	height:300,
	title:'修改用户信息',
	requires:[
		'Ext.grid.column.Date'
	],
	items:[{
		xtype:'form',
		layout:'form',
		bodyPadding: 20,
		ariaLabel: 'Enter your name',
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
            xtype: 'textfield',
            fieldLabel: 'Password',
            name:'password'
        }, {
            xtype: 'datefield',
            fieldLabel: 'Birthday',
            name:'birthday',
            format: 'Y/m/d H:i:s'
        }],
		buttons: ["->", 
			{
				xtype: 'button',
				text: 'Submit',
				handler: 'submitEditForm'
			}
			,{
				xtype: 'button',
				text: 'Close',
				handler: function(btn) {
					btn.up('window').close();
				}
			},
			"->"
		]
	}],
});