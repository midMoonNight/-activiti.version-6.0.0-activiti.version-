package com.example.demo.leave.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.leave.domain.Leave;

@Repository
public interface LeaveRepository extends PagingAndSortingRepository<Leave, Long>,JpaSpecificationExecutor<Leave>
{
//	@Query("from Leave leave where leave.userId = ?1") 
//	public Page<Leave> findLeave(String userId,Pageable pageable); 
}
