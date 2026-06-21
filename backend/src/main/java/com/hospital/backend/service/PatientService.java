package com.hospital.backend.service;

import com.hospital.backend.entity.Patient;
import com.hospital.backend.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public Patient updatePatient(Long id, Patient patient) {
        Patient existing = getPatientById(id);
        existing.setName(patient.getName());
        existing.setEmail(patient.getEmail());
        existing.setPhone(patient.getPhone());
        existing.setGender(patient.getGender());
        existing.setDateOfBirth(patient.getDateOfBirth());
        existing.setAddress(patient.getAddress());
        existing.setBloodGroup(patient.getBloodGroup());
        return patientRepository.save(existing);
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}