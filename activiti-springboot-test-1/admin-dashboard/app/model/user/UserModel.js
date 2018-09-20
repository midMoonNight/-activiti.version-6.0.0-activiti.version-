Ext.define('Admin.model.user.UserModel', {
    extend: 'Ext.data.Model',
    requires:[
    	'Ext.data.proxy.Rest'
    ],
    fields:[
    	{type:'int', name:'id'},
    	{type:'string', name:'userName'},
        {type:'string', name:'password'},
    	{type:'date', name:'birthday',dateFormat:'Y/m/d H:i:s'}
    ],
    proxy:{
    	type:'rest',
    	url:'/user'
    }
});