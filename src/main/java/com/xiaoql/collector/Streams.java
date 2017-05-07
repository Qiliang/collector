package com.xiaoql.collector;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Streams {

    private List<Request> targets = new ArrayList<>();
    private Map<String, String> values = new HashMap<>();

    public List<Request> getTargets() {
        return targets;
    }

    public void setTargets(List<Request> targets) {
        this.targets = targets;
    }

    public Map<String, String> getValues() {
        return values;
    }

    public void setValues(Map<String, String> values) {
        this.values = values;
    }
}
