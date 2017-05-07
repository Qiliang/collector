package com.xiaoql.collector.domain;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Component;

@RepositoryRestResource
public interface SpiderRepository extends JpaRepository<Spider, Long> {

}
