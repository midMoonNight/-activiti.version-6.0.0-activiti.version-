Ext.define('Admin.view.order.OrderAddWindow2',{
	extend:'Ext.window.Window',
	alias:'widget.orderAddWindow2',
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
	}]/*,
	dockedItems: {
        dock: 'bottom',
        items: [{
            xtype: 'button',
            text: 'Submit',
            handler: 'submitAddForm'
        },{
            xtype: 'button',
            text: 'Close',
            handler: function(btn) {
                btn.up('window').close();
            }
        }]
    }*/
	/*afterRender: function () {
		var me = this;
		me.callParent(arguments);
		me.syncSize();
		Ext.on(me.resizeListeners = {
			resize: me.onViewportResize,
			scope: me,
			buffer: 50
		});
	},
	doDestroy: function () {
		Ext.un(this.resizeListeners);
		this.callParent();
	},
	onViewportResize: function () {
		this.syncSize();
	},
	syncSize: function () {
		var width = Ext.Element.getViewportWidth(),
		height = Ext.Element.getViewportHeight();
		this.setSize(Math.floor(width * 0.9), Math.floor(height * 0.9));
		this.setXY([ Math.floor(width * 0.05), Math.floor(height * 0.05) ]);
	}*/
});