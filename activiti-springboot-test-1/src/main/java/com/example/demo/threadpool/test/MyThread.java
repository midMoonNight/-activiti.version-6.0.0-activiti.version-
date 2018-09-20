package com.example.demo.threadpool.test;

/*
 * 通过继承Thread接口，实现多线程
 * 参考：
 * 
http://blog.csdn.net/qq_31753145/article/details/50899119

 * */
public class MyThread extends Thread {
	@Override
    public void run() {
        // TODO Auto-generated method stub
		// super.run();
		System.out.println(Thread.currentThread().getName()+"正在执行....");
    } 
}
