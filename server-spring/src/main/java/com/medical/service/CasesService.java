package com.medical.service;

import com.medical.entity.Cases;
import com.medical.mapper.CasesMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class CasesService {
    
    @Autowired
    private CasesMapper casesMapper;
    
    public List<Cases> findAll() {
        return casesMapper.findAll();
    }
    
    public int countAll() {
        return casesMapper.countAll();
    }
    
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", countAll());
        
        List<Map<String, Object>> diseaseDist = casesMapper.getDiseaseDistribution();
        if (!diseaseDist.isEmpty()) {
            stats.put("topDisease", diseaseDist.get(0).get("name"));
        }
        
        List<Map<String, Object>> deptDist = casesMapper.getDepartmentDistribution();
        if (!deptDist.isEmpty()) {
            stats.put("topDept", deptDist.get(0).get("name"));
        }
        
        List<Map<String, Object>> hospitals = casesMapper.getTopHospitals();
        if (!hospitals.isEmpty()) {
            stats.put("topHospital", hospitals.get(0).get("name"));
        }
        
        return stats;
    }
    
    public List<Map<String, Object>> getDiseaseDistribution() {
        return casesMapper.getDiseaseDistribution();
    }
    
    public List<Map<String, Object>> getGenderDistribution() {
        return casesMapper.getGenderDistribution();
    }
    
    public List<Map<String, Object>> getDepartmentDistribution() {
        return casesMapper.getDepartmentDistribution();
    }
    
    public List<Map<String, Object>> getTopHospitals() {
        return casesMapper.getTopHospitals();
    }
    
    public List<Map<String, Object>> getHeightWeightByType() {
        return casesMapper.getHeightWeightByType();
    }
}
