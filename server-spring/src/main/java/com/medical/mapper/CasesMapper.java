package com.medical.mapper;

import com.medical.entity.Cases;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;
import java.util.Map;

@Mapper
public interface CasesMapper {
    
    @Select("SELECT * FROM cases ORDER BY id DESC")
    List<Cases> findAll();
    
    @Select("SELECT COUNT(*) FROM cases")
    int countAll();
    
    @Select("SELECT type as name, COUNT(*) as value FROM cases GROUP BY type ORDER BY value DESC")
    List<Map<String, Object>> getDiseaseDistribution();
    
    @Select("SELECT gender as name, COUNT(*) as value FROM cases GROUP BY gender")
    List<Map<String, Object>> getGenderDistribution();
    
    @Select("SELECT department as name, COUNT(*) as value FROM cases GROUP BY department ORDER BY value DESC LIMIT 10")
    List<Map<String, Object>> getDepartmentDistribution();
    
    @Select("SELECT docHospital as name, COUNT(*) as value FROM cases GROUP BY docHospital ORDER BY value DESC LIMIT 10")
    List<Map<String, Object>> getTopHospitals();
    
    @Select("SELECT type, AVG(CAST(height AS UNSIGNED)) as avgHeight, AVG(CAST(weight AS UNSIGNED)) as avgWeight FROM cases GROUP BY type")
    List<Map<String, Object>> getHeightWeightByType();
}
