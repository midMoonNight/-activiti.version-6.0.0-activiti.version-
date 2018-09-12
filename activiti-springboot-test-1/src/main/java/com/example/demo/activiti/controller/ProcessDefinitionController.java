package com.example.demo.activiti.controller;

import java.util.ArrayList;
import java.util.List;

import org.activiti.engine.RepositoryService;
import org.activiti.engine.repository.ProcessDefinition;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.activiti.domain.ProcessDefinitionDTO;
import com.example.demo.common.web.ExtjsPageRequest;

@RestController
@RequestMapping("/process-definition")
public class ProcessDefinitionController {
	@Autowired
    private RepositoryService repositoryService;
    /**
     * 1.流程定义列表
     */
    @GetMapping
    public Page<ProcessDefinitionDTO> findAll(ExtjsPageRequest pageRequest) {
       //1.查询所有已部署的流程定义
       List<ProcessDefinition> sourceList = repositoryService.createProcessDefinitionQuery().list();
       List<ProcessDefinitionDTO> targetList = null;
       if(sourceList!=null){
    	   targetList = new ArrayList<ProcessDefinitionDTO>();
    	   for (ProcessDefinition source : sourceList) {
    		    ProcessDefinitionDTO target = new ProcessDefinitionDTO();
    			BeanUtils.copyProperties(source, target);
    			targetList.add(target);
    	   }
       }
       //2.把流程列表集合封装为Spring分页对象
       return new PageImpl<ProcessDefinitionDTO>(targetList, pageRequest.getPageable(), targetList!=null?targetList.size():0);
    }
}
