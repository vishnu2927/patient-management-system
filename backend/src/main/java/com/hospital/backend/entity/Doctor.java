package com.hospital.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String specialization;
    private String qualification;
    private String department;
    private Integer experience;

    @Column(updatable = false)
    private LocalDate createdAt = LocalDate.now();
}