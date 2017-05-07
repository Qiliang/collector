package com.xiaoql.collector;

import com.xiaoql.collector.domain.Code;
import com.xiaoql.collector.domain.CodeRepository;
import com.xiaoql.collector.domain.Spider;
import com.xiaoql.collector.domain.SpiderRepository;
import groovy.lang.GroovyClassLoader;
import groovy.lang.GroovyObject;
import groovy.util.GroovyScriptEngine;
import org.hibernate.criterion.Example;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.File;
import java.util.List;
import java.util.function.Function;

@Controller
public class Phantomjs {

    @Value("${phantomjs.path}")
    private String phantomjsPath;

    @Autowired
    private SpiderRepository spiderRepository;
    @Autowired
    private CodeRepository codeRepository;

    private void invoke(Code code, Object args) {
        try {
            String script = String.format("class %s_%s \n{ \ndef matcher(driver) \n{\n%s\n} \ndef inputer(driver) \n{\n%s\n} \ndef outputer(driver) \n{\n%s\n}  \n}",code.getSpider().getName(),code.getName(), code.getMatcher(), code.getInputer(), code.getOutputer());
            ClassLoader parent = ClassLoader.getSystemClassLoader();
            GroovyClassLoader loader = new GroovyClassLoader(parent);
            Class<?> clazz = loader.parseClass(script);
            GroovyObject clazzObj = (GroovyObject) clazz.newInstance();
            Object matcherResult = clazzObj.invokeMethod("matcher", args);
            System.out.println(matcherResult);
            Object inputerResult = clazzObj.invokeMethod("inputer", args);
            System.out.println(inputerResult);
            Object outputerResult = clazzObj.invokeMethod("outputer", args);
            System.out.println(outputerResult);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } finally {

        }
    }

    public void execute() {
        System.setProperty("phantomjs.binary.path", phantomjsPath);
        WebDriver driver = new PhantomJSDriver();
        try {
            List<Spider> spiders = spiderRepository.findAll();
            for (Spider spider : spiders) {
                for (Code code : spider.getCodes()) {
                    invoke(code, new Object[]{driver});
                }
            }
        } catch (Exception e) {
            throw e;
        } finally {
            if (driver != null)
                driver.quit();
        }

    }


    @RequestMapping(value = "/exec")
    public String index() {
        execute();
        return "index";
    }


}
