package com.medical.entity;

import lombok.Data;
import java.math.BigInteger;

@Data
public class Cases {
    private BigInteger id;
    private String type;
    private String gender;
    private String age;
    private String time;
    private String content;
    private String docName;
    private String docHospital;
    private String department;
    private String detailUrl;
    private String height;
    private String weight;
    private String illDuration;
    private String allergy;
    private String detailUrl2;
    private String docHospital2;
    private String docName2;
    private String illDuration2;
}
