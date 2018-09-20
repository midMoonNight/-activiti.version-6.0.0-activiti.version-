Ext.define('Admin.view.order.OrderViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.orderViewController',
    

/********************************************** Controller View *****************************************************/

    /*Add*/
    openAddWindow:function(grid, rowIndex, colIndex){
        grid.up('container').add(Ext.widget('orderAddWindow')).show();
    },

    /*Edit*/
    openEditWindow:function(grid, rowIndex, colIndex){
         var record = grid.getStore().getAt(rowIndex);
        //获取选中数据的字段值：console.log(record.get('id')); 或者 console.log(record.data.id);
        if (record ) {
            var win = grid.up('container').add(Ext.widget('orderEditWindow'));
            win.show();
            win.down('form').getForm().loadRecord(record);
        }
    },
    
    /*Search More*/ 
    openSearchWindow:function(toolbar, rowIndex, colIndex){
        toolbar.up('grid').up('container').add(Ext.widget('orderSearchWindow')).show();
    },

/********************************************** Submit / Ajax / Rest *****************************************************/
    /*Add Submit*/ 
    submitAddForm:function(btn){
      var win    = btn.up('window');
      var form = win.down('form');
      var record = Ext.create('Admin.model.order.OrderModel');
      var values  =form.getValues();//获取form数据
      console.log(values);
      record.set(values);
      record.save();
      Ext.data.StoreManager.lookup('orderGridStroe').load();
      win.close();
    }, 
    
    /*Edit Submit*/
    submitEditForm:function(btn){
        //获取当前window
        var win    = btn.up('window');
        //获取stroe
        var store = Ext.data.StoreManager.lookup('orderGridStroe');
        //获取form数据
        var values  = win.down('form').getValues();
        //获取id获取store中的数据
        var record = store.getById(values.id);
        record.set(values);
        //store.load();
        win.close();
    },

    /*combobox选中后控制对应输入（文本框和日期框）框显示隐藏*/
    searchComboboxSelectChuang:function(combo,record,index){
        //根据reference获取combobox的值
        var searchField = this.lookupReference('searchFieldName').getValue();
        //根据combobox的值来控制文本框和日期框的显示和隐藏
        if(searchField==='createTime'){
            this.lookupReference('searchFieldValue').hide();
            this.lookupReference('searchDataFieldValue').show();
            this.lookupReference('searchDataFieldValue2').show();
        }else{
            this.lookupReference('searchFieldValue').show();
            this.lookupReference('searchDataFieldValue').hide();
            this.lookupReference('searchDataFieldValue2').hide();
        }        
    },

    /*Quick Search*/    
    quickSearch:function(btn){
        //根据reference获取值
        var searchField = this.lookupReference('searchFieldName').getValue();
        var searchValue = this.lookupReference('searchFieldValue').getValue();
        var searchDataFieldValue = this.lookupReference('searchDataFieldValue').getValue();
        var searchDataFieldValue2 = this.lookupReference('searchDataFieldValue2').getValue();
        //获取stroe
        var store = btn.up('gridpanel').getStore();
        //var store = Ext.getCmp('userGridPanel').getStore();// Ext.getCmp(）需要在OrderPanel设置id属性
        //设置参数，默认为空
        Ext.apply(store.proxy.extraParams, {orderNumber:"",createTimeStart:"",createTimeEnd:""});
        //根据查询的对象，动态修改参数的值
        if(searchField==='orderNumber'){
            Ext.apply(store.proxy.extraParams, {orderNumber:searchValue});
        }
        if(searchField==='createTime'){
            Ext.apply(store.proxy.extraParams,{
                createTimeStart:Ext.util.Format.date(searchDataFieldValue, 'Y/m/d H:i:s'),
                createTimeEnd:Ext.util.Format.date(searchDataFieldValue2, 'Y/m/d H:i:s')
            });
        }
        //发送请求
        store.load({params:{start:0, limit:20, page:1}});
    },

    /*Search Submit*/
    submitSearchForm:function(btn){
        //获取stroe
        var store = Ext.data.StoreManager.lookup('orderGridStroe');
        //获取Window
        var win = btn.up('window');
        //获取form表单
        var form = win.down('form');
        //获取表单的数据
        var values  = form.getValues();
        //设置参数，默认为空
        Ext.apply(store.proxy.extraParams, {orderNumber:"",createTimeStart:"",createTimeEnd:""});
        //动态修改参数的值
        Ext.apply(store.proxy.extraParams,{
            orderNumber:values.orderNumber,
            //将日期数据格式化
            createTimeStart:Ext.util.Format.date(values.createTimeStart, 'Y/m/d H:i:s'),
            createTimeEnd:Ext.util.Format.date(values.createTimeEnd, 'Y/m/d H:i:s')
        });
        //发送请求
        store.load({params:{start:0, limit:20, page:1}});
        //关闭Windos
        win.close();
    },
    /*Delete*/  
    deleteOneRow:function(grid, rowIndex, colIndex){
        Ext.MessageBox.confirm('提示', '确定要进行删除操作吗？数据将无法还原！',
            function(btn, text){
                if(btn=='yes'){
                    //获取stroe
                    var store = grid.getStore();
                    //获取选中的行的信息
                    var record = store.getAt(rowIndex);
                    //DELETE//http://localhost:8081/order/112
                    store.remove(record);
                    //重新加载数据
                    Ext.data.StoreManager.lookup('orderGridStroe').load();
                    //store.sync();
                }
            }
        , this);
    },
    /*Delete More Rows*/    
    deleteMoreRows:function(grid, rowIndex, colIndex){
        //如果选中且确认删除则执行操作  
        /*Ext.MessageBox.confirm("","确定要删除所选信息吗？",function(choice){
            if(choice == 'yes'){
                //获取grid
                var grid = btn.up('grid');
                var selecteds= grid.getSelectionModel().getSelection();
                //获取grid的store
                var store = grid.getStore();
                //删除多行信息，但是它是有多少行信息就发送多少条请求
                store.remove(selecteds);
                //设置一个定时器，等删除完之后重新加载一次
                setTimeout(function(){
                    Ext.data.StoreManager.lookup('orderGridStroe').load();
                    console.log("时间定时器启动了");
                },1000);
            }
        })*/
        //获取grid
        var grid = btn.up('gridpanel');
        //获取选中的model
        var selModel = grid.getSelectionModel();
        //判断model中是否有被选中的列
        if (selModel.hasSelection()) {
            Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
                if (button == "yes") {
                    //获取选中的列
                    var rows = selModel.getSelection();
                    //保存要删除的id
                    var selectIds = []; 
                    //遍历获取id
                    Ext.each(rows, function (row) {
                        selectIds.push(row.data.id);
                    });
                    //异步发送请求
                    Ext.Ajax.request({ 
                        url : '/order/deletes', 
                        method : 'post', 
                        params : { 
                            //ids[] :selectIds
                            ids :selectIds
                        }, 
                        success: function(response, options) {
                            var json = Ext.util.JSON.decode(response.responseText);
                            if(json.success){
                                Ext.Msg.alert('操作成功', json.msg, function() {
                                    grid.getStore().reload();
                                });
                            }else{
                                 Ext.Msg.alert('操作失败', json.msg);
                            }
                        }
                    });
                }
            });
        }else {
            Ext.Msg.alert("错误", "没有任何行被选中，无法进行删除操作！");
        }
    },
    /*Disable*/ 
    onDisableButton:function(grid, rowIndex, colIndex){
        Ext.Msg.alert("Title","Click Disable Button");
    }
});