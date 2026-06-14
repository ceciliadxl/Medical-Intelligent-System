package com.medical.controller;

import com.medical.service.CasesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/cases")
@CrossOrigin(origins = "*")
public class CasesController {
    
    @Autowired
    private CasesService casesService;
    
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllCases() {
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("data", casesService.findAll());
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("data", casesService.getStats());
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/disease-distribution")
    public ResponseEntity<Map<String, Object>> getDiseaseDistribution() {
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("data", casesService.getDiseaseDistribution());
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/gender-distribution")
    public ResponseEntity<Map<String, Object>> getGenderDistribution() {
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("data", casesService.getGenderDistribution());
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/department-distribution")
    public ResponseEntity<Map<String, Object>> getDepartmentDistribution() {
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("data", casesService.getDepartmentDistribution());
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/top-hospitals")
    public ResponseEntity<Map<String, Object>> getTopHospitals() {
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("data", casesService.getTopHospitals());
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/height-weight")
    public ResponseEntity<Map<String, Object>> getHeightWeightByType() {
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("data", casesService.getHeightWeightByType());
        return ResponseEntity.ok(result);
    }
}
