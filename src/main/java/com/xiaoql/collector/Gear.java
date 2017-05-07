package com.xiaoql.collector;

public interface Gear {
    boolean match(Request request);
    Streams rotation(Request request);
}
