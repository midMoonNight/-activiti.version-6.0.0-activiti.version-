package com.example.demo.threadpool.test;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MyThreadPoolTest {
	public static void main(String[] args) {
		ExecutorService cachedThreadPool = Executors.newCachedThreadPool();
		/*Executors.newFixedThreadPool(nThreads);
		Executors.newFixedThreadPool(nThreads, threadFactory);*/
		/*Executors.newSingleThreadExecutor();
		Executors.newSingleThreadExecutor(threadFactory);*/
		/*Executors.newCachedThreadPool();
		Executors.newCachedThreadPool(threadFactory);*/
		/*Executors.newScheduledThreadPool(corePoolSize);
		Executors.newScheduledThreadPool(corePoolSize, threadFactory);*/
	}
}
