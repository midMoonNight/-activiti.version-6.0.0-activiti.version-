package com.example.demo.leave.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.activiti.engine.runtime.ProcessInstance;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.activiti.domain.ProcessStatus;
import com.example.demo.activiti.domain.WorkflowDTO;
import com.example.demo.activiti.service.IWorkflowService;
import com.example.demo.leave.domain.Leave;
import com.example.demo.leave.domain.LeaveDTO;
import com.example.demo.leave.repository.LeaveRepository;
@Service
@Transactional
public class LeaveService implements ILeaveService {

	/**
	 * 系统服务
	 */
	@Autowired
	private LeaveRepository leaveRepository;
	
	@Autowired 
	private IWorkflowService workflowService;
	
	/*----------------------------------------------系统业务--------------------------------------------*/
	@Override
	public void save(Leave leave) {
		leaveRepository.save(leave);
	}

	@Override
	public void delete(Long id) {
		Leave leave = leaveRepository.findById(id).get();
		if(leave!=null){
			leaveRepository.delete(leave);
		}
	}

	@Override
	public void deleteAll(Long[] ids) {
		List<Long> idLists = new ArrayList<Long>(Arrays.asList(ids));
		
		List<Leave> leaves = (List<Leave>) leaveRepository.findAllById(idLists);
		if(leaves!=null) {
			leaveRepository.deleteAll(leaves);
		}
	}
	
	@Override
	@Transactional(readOnly=true)
	public Leave findOne(Long id) {
		return leaveRepository.findById(id).get();
	}

	@Override
	@Transactional(readOnly=true)
	public Page<Leave> findAll(Specification<Leave> spec, Pageable pageable) {
		
		return leaveRepository.findAll(spec, pageable);
	}
	/*----------------------------------------------流程业务--------------------------------------------*/
	 /**
     * 开始请假流程
     *
     * @param userId 用户ID
     * @param pageable 分页条件
     * @return
     */
	@Override
	public void startWorkflow(String userId ,Long leaveId, Map<String, Object> variables) 
	{
		//1.声明流程实例
		ProcessInstance processInstance = null;
		//2.获取创建好的请假实例
		Leave leave = leaveRepository.findById(leaveId).get();
		if(leave!=null){
			try {
				processInstance = workflowService.startWorkflow(userId, "leave", leave.getId().toString(), variables);
				leave.setProcessStatus(ProcessStatus.APPROVAL);
				leave.setProcessInstanceId(processInstance.getId());
				leave.setApplyTime(new Date());
				//leaveRepository.save(leave);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	 /**
     * 查询待办任务
     *
     * @param userId 用户ID
     * @param pageable 分页条件
     * @return
     */
	@Override
	public Page<LeaveDTO> findTodoTasks(String userId, Pageable pageable) 
	{
		List<LeaveDTO> results = null;
		List<WorkflowDTO> workflowLists = workflowService.findTodoTasks(userId);
        // 根据流程的业务ID查询实体并关联
		if(null!=workflowLists) {
			results = new ArrayList<LeaveDTO>();
			for (WorkflowDTO workflow : workflowLists) {
	        	Long businessKey = new Long(workflow.getBusinessKey());
	            if (workflow.getBusinessKey() == null) {
	                continue;
	            }
	            Leave leave = leaveRepository.findById(businessKey).get();
	            if(leave!=null){
	            	LeaveDTO leaveDTO = new LeaveDTO();
	            	BeanUtils.copyProperties(leave, leaveDTO);
	            	BeanUtils.copyProperties(workflow, leaveDTO);
	            	results.add(leaveDTO);
	            }
	        }
		}
		return new PageImpl<LeaveDTO> (results, pageable, null!=results?results.size():0);
	}

    /**
     * 签收流程任务
     *
     * @param taskId 任务ID
     * @param userId 签收人用户ID
     * @return
     */
	public void claim(String taskId, String userId) {
		workflowService.claim(taskId, userId);
	}

	 /**
     * 完成流程任务
     *
     * @param taskId 任务ID
     * @param variables 流程变量
     * @return
     */
	public void complete(String taskId, Map<String, Object> variables) {
		workflowService.complete(taskId, variables);
	}
}
