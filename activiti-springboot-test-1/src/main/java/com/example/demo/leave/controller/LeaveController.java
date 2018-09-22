package com.example.demo.leave.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.activiti.domain.ProcessStatus;
import com.example.demo.activiti.util.WorkflowVariable;
import com.example.demo.common.beans.BeanUtils;
import com.example.demo.common.web.ExtAjaxResponse;
import com.example.demo.common.web.ExtjsPageRequest;
import com.example.demo.common.web.SessionUtil;
import com.example.demo.leave.domain.Leave;
import com.example.demo.leave.domain.LeaveDTO;
import com.example.demo.leave.domain.LeaveQueryDTO;
import com.example.demo.leave.service.ILeaveService;

@RestController
@RequestMapping(value="/leave")
public class LeaveController 
{
	@Autowired
	private ILeaveService leaveService;
	
	@PostMapping
    public ExtAjaxResponse save(HttpSession session,@RequestBody Leave leave) {
		
    	try {
    		String userId = SessionUtil.getUserName(session);
    		if(userId!=null) {
    			leave.setUserId(userId);
    			leave.setProcessStatus(ProcessStatus.NEW);
        		leaveService.save(leave);
    		}
    		return new ExtAjaxResponse(true,"保存成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"保存失败!");
	    }
    }
	
	@PutMapping(value="{id}")
    public @ResponseBody ExtAjaxResponse update(@PathVariable("id") Long id,@RequestBody Leave leave) {
    	try {
    		Leave entity = leaveService.findOne(id);
			if(entity!=null) {
				BeanUtils.copyProperties(leave, entity);//使用自定义的BeanUtils
				leaveService.save(entity);
			}
    		return new ExtAjaxResponse(true,"更新成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"更新失败!");
	    }
    }

	@DeleteMapping(value="{id}")
    public @ResponseBody ExtAjaxResponse delete(@PathVariable("id") Long id) {
    	try {
    		Leave entity = leaveService.findOne(id);
			if(entity!=null) {
				leaveService.delete(id);
			}
    		return new ExtAjaxResponse(true,"删除成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"删除失败!");
	    }
    }
	
	@PostMapping("/deletes")
	public ExtAjaxResponse deleteRows(@RequestParam(name="ids") Long[] ids) 
	{
		try {
			if(ids!=null) {
				leaveService.deleteAll(ids);
			}
			return new ExtAjaxResponse(true,"批量删除成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(true,"批量删除失败！");
		}
	}
	
	@GetMapping
    public Page<Leave> findLeaveByUserId(LeaveQueryDTO leaveQueryDTO,HttpSession session,ExtjsPageRequest pageable) 
	{
		Page<Leave> page;
		String userId = SessionUtil.getUserName(session);
		if(userId!=null) {
			leaveQueryDTO.setUserId(SessionUtil.getUserName(session));
			page = leaveService.findAll(LeaveQueryDTO.getWhereClause(leaveQueryDTO), pageable.getPageable());
		}else {
			page = new PageImpl<Leave>(new ArrayList<Leave>(),pageable.getPageable(),0);
		}
		return page;
    }
	/*-------------------------------------流程引擎web层------------------------------------------*/
	
	/**
	 * 启动流程
	 * @param leaveId	请假信息Id
	 * @param session	通过会话获取登录用户(请假人)
	 * @return
	 */
	@RequestMapping(value = "/start")
    public @ResponseBody ExtAjaxResponse start(@RequestParam(name="id") Long leaveId,HttpSession session) {
    	try {
    		String userId = SessionUtil.getUserName(session);
    		Map<String, Object> variables = new HashMap<String, Object>();
    		variables.put("deptLeader", "financeManager");
    		variables.put("applyUserId", userId);
    		leaveService.startWorkflow(userId,leaveId, variables);
    		return new ExtAjaxResponse(true,"操作成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"操作失败!");
	    }
    }
	
	/**
	 * 查询待处理流程任务
	 * @param pageable	分页对象
	 * @param session	通过会话获取登录用户(请假人)
	 * @return
	 */
	@RequestMapping(value = "/tasks")
    public @ResponseBody Page<LeaveDTO> findTodoTasks(HttpSession session,ExtjsPageRequest pageable) {
		Page<LeaveDTO> page = new PageImpl<LeaveDTO>(new ArrayList<LeaveDTO>(), pageable.getPageable(), 0);
    	try {
    		page = leaveService.findTodoTasks(SessionUtil.getUserName(session), pageable.getPageable());
	    } catch (Exception e) {
	    	e.printStackTrace();
	    }
    	
    	return page;
    }
	
	/**
     * 签收任务
     */
    @RequestMapping(value = "claim/{id}")
    public @ResponseBody ExtAjaxResponse claim(@PathVariable("id") String taskId, HttpSession session) {
    	try{
	    	leaveService.claim(taskId, SessionUtil.getUserName(session));
	    	return new ExtAjaxResponse(true,"任务签收成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"任务签收失败!");
	    }
    }
    
    /**
     * 完成任务
     * @param id
     * @return
     */
    @RequestMapping(value = "complete/{id}")
    public @ResponseBody ExtAjaxResponse complete(@PathVariable("id") String taskId, WorkflowVariable var) {
    	try{
    		Map<String, Object> variables = var.getVariableMap();
	    	leaveService.complete(taskId, variables);
	    	return new ExtAjaxResponse(true,"审批成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"审批失败!");
	    }
    }
}
