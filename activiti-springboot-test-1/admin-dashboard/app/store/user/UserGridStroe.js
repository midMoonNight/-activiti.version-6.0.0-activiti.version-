Ext.define('Admin.store.user.UserGridStroe', {
    extend: 'Ext.data.Store',
    alias: 'store.userGridStroe',
    model:'Admin.model.user.UserModel',
	storeId:'userGridStroe',
    proxy: {
        type: 'rest',
        url: '/user',
        reader:{
            type:'json',
            rootProperty:'content',//对应后台返回的结果集名称
            totalProperty: 'totalElements'//分页需要知道总记录数
        },
        writer: {
            type: 'json'
        },
        simpleSortMode: true    //简单排序模式
    },

    autoLoad: 'true',
    autoSync: true,//连后台后修改sotre数据自动触发rest请求
    pageSize:20,
    remoteSort: true,//全局排序
    sorters: {
        direction: 'DESC',
        property: 'id'
    }
});
