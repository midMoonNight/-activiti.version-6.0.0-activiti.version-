Ext.define('Admin.view.order.Order', {
    extend: 'Ext.container.Container',
    xtype: 'order',
    //requires: [],
    //controller: 'order',				//viewController:代码与视图分离。声明视图绑定的事件，可以多个视图共享。
    //viewModel: {type: 'orderlist'},	//viewModel：配置Stote数据源。多个视图共享Store。
    
    controller: 'orderViewController',
    viewModel: {type: 'orderViewModel'},
    	
    layout: 'fit',
    items: [{xtype:'orderPanel'}]
    //html:'订单管理模块'
});
