package com.SpringbootCompressor.FileCompressor.Util;

public class HuffNode implements Comparable<HuffNode>{
    char ch;
    int freq;
    public HuffNode left;
    public HuffNode right;

    public HuffNode(char ch, int freq) {
        this.ch = ch;
        this.freq = freq;
    }

    public HuffNode(char ch, int freq, HuffNode left, HuffNode right) {
        this.ch = ch;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }

    @Override
    public int compareTo(HuffNode that) {
        return this.freq - that.freq;
    }
}
