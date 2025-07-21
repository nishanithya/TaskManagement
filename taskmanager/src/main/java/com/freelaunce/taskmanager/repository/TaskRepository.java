package com.freelaunce.taskmanager.repository;

import com.freelaunce.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task,Long> {
}
