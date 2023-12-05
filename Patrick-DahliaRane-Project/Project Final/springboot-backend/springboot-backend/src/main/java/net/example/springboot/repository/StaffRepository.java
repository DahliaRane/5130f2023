package net.example.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.example.springboot.model.Employee;

public interface StaffRepository extends JpaRepository<Employee, Long> {
    // all crud database methods
}


