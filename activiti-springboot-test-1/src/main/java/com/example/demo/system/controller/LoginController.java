package com.example.demo.system.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import org.activiti.engine.IdentityService;
import org.activiti.engine.identity.Group;
import org.activiti.engine.identity.User;
import org.apache.commons.lang3.ArrayUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.common.web.ExtAjaxResponse;
import com.example.demo.common.web.SessionUtil;

@RestController
public class LoginController {
	private static Logger logger = LoggerFactory.getLogger(LoginController.class);
    @Autowired
    private IdentityService identityService;
    /** 登录系统**/
    @RequestMapping(value = "/activiti/login")
    public @ResponseBody ExtAjaxResponse logon(@RequestParam("userName") String userName, @RequestParam("password") String password, HttpSession session) {
    	logger.debug("logon request: {userName={}, password={}}", userName, password);
        boolean checkPassword = identityService.checkPassword(userName, password);
        if (checkPassword) {
            // 查看用户是否存在
            User user = identityService.createUserQuery().userId(userName).singleResult();
            SessionUtil.setUser(session, user);
	  
	        //读取角色Group
            List<Group> groupList = identityService.createGroupQuery().groupMember(user.getId()).list();

            SessionUtil.setGroupList(session, groupList);

            String[] groupNames = new String[groupList.size()];
            for (int i = 0; i < groupNames.length; i++) {
                groupNames[i] = groupList.get(i).getName();
            }
            SessionUtil.setGroupNames(session, ArrayUtils.toString(groupNames));//"groupNames"  : "admin,hrManager"
            
            Map<String,String> map=new HashMap<String, String>();
            map.put("userName", userName);
            map.put("msg", "登录成功!");
            return new ExtAjaxResponse(true,map);
        } else {
        	return new ExtAjaxResponse(false,"登录失败!帐号或者密码有误!请重新登录!");
        }
    }
    
    /** 退出登录**/
    @RequestMapping(value = "/logout")
    public @ResponseBody ExtAjaxResponse logout(HttpSession session) 
    {
    	try {
    		SessionUtil.removeAttribute(session);
        	return new ExtAjaxResponse(true,"登出成功!");
		} catch (Exception e) {
			return new ExtAjaxResponse(false,"登出失败!");
		}
    }

}
