package com.xiaoql.collector.domain;

import javax.persistence.*;
import java.util.List;

@Entity
public class Code {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true,nullable = false)
    private String name;
    @Lob
    private String matcher;
    @Lob
    private String inputer;
    @Lob
    private String outputer;

    @ManyToOne
    @JoinColumn(name = "spider_id", nullable=false)
    private Spider spider;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMatcher() {
        return matcher;
    }

    public void setMatcher(String matcher) {
        this.matcher = matcher;
    }

    public String getInputer() {
        return inputer;
    }

    public void setInputer(String inputer) {
        this.inputer = inputer;
    }

    public String getOutputer() {
        return outputer;
    }

    public void setOutputer(String outputer) {
        this.outputer = outputer;
    }

    public Spider getSpider() {
        return spider;
    }

    public void setSpider(Spider spider) {
        this.spider = spider;
    }
}
