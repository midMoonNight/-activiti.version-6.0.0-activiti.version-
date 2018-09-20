Ext.define('Admin.view.order.OrderAddWindow',{
	extend:'Ext.window.Window',
	alias:'widget.orderAddWindow',
	autoShow: true,
	modal: true,
	layout:'fit',
	width:500,
	height:300,
	title:'添加订单信息',
	requires:[
		'Ext.grid.column.Date'
	],
	items:[{
		xtype:'form',
		layout:'form',
		bodyPadding: 20,
		scrollable: true,
		items:[{
            xtype: 'textfield',
            fieldLabel: 'id',
            name:'id',
            hidden: true,
            readOnly: true
        }, {
            xtype: 'textfield',
            fieldLabel: 'Order Number',
            name:'orderNumber'
        }, {
            xtype: 'datefield',
            fieldLabel: 'Create Time',
            name:'createTime',
            format: 'Y/m/d H:i:s'
        }],
		buttons: [ 
			{
            	xtype: 'button',
            	text: 'Submit',
            	handler: 'submitAddForm'
	        },{
	            xtype: 'button',
	            text: 'Close',
	            handler: function(btn) {
	                btn.up('window').close();
	            }
	        }
		]
	}]
});