Ext.define('Admin.view.user.User', {
    extend: 'Ext.container.Container',
    xtype: 'user',

    //配置插件
    //requires: [],

    //viewController:代码与视图分离。声明视图绑定的事件，可以多个视图共享。
    controller: 'userViewController',
    //viewModel：配置Stote数据源。多个视图共享Store。
    viewModel: {type: 'userViewModel'},
    	
    layout: 'fit',
    items: [{xtype:'userPanel'}]
});
