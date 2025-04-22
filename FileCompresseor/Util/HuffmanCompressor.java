package com.SpringbootCompressor.FileCompressor.Util;

import java.io.*;
import java.util.*;

public class HuffmanCompressor {
    private  Map<Character, String> huffmanCode = new HashMap<>();


    public byte[] compress(String text) {
        HuffNode root = buildFrequencyTable(text);
        generateHuffmanCode(root, "");

        StringBuilder sb = new StringBuilder();
        for(char c: text.toCharArray()) {
            sb.append(huffmanCode.get(c));
        }
        return binaryStringToByteArray(sb.toString());
    }

    private void generateHuffmanCode(HuffNode root, String s) {
        if(root == null) return;
        if(root.left == null && root.right == null) {
            huffmanCode.put(root.ch, s);
        }
        generateHuffmanCode(root.left, s + "0");
        generateHuffmanCode(root.right, s + "1");
    }

    private HuffNode buildFrequencyTable(String text) {
        Map<Character, Integer> freqMap = new HashMap<>();
        PriorityQueue<HuffNode> minHeap = new PriorityQueue<>();

        for(int i = 0; i < text.length(); i++) {
            freqMap.put(text.charAt(i), freqMap.getOrDefault(text.charAt(i), 0)+1);
        }
        for(Map.Entry<Character, Integer> entry: freqMap.entrySet()) {
            minHeap.add(new HuffNode(entry.getKey(), entry.getValue()));
        }

        while(minHeap.size() > 1) {
            HuffNode left = minHeap.poll();
            HuffNode right = minHeap.poll();
            HuffNode merged = new HuffNode('\0', left.freq+ right.freq, left, right);
            minHeap.add(merged);
        }

        return minHeap.poll();
    }

    public static byte[] binaryStringToByteArray(String binary) {
        int byteLength = (binary.length() + 7) / 8;
        byte[] byteArray = new byte[byteLength];

        for (int i = 0; i < binary.length(); i++) {
            int byteIndex = i / 8;
            int bitIndex = 7 - (i % 8);
            if (binary.charAt(i) == '1') {
                byteArray[byteIndex] |= (1 << bitIndex);  //check this later
            }
        }
        return byteArray;
    }

    public Map<String, Character> getReverseCodeMap() {
        Map<String, Character> reverse = new HashMap<>();
        for (Map.Entry<Character, String> entry : huffmanCode.entrySet()) {
            reverse.put(entry.getValue(), entry.getKey());
        }
        return reverse;
    }

    public String decompress(byte[] compressedData, Map<String, Character> reverseCodeMap) {
        StringBuilder binaryString = new StringBuilder();

        for (byte b : compressedData) {
            for (int i = 7; i >= 0; i--) {
                binaryString.append((b >> i) & 1);
            }
        }

        // Decode binary string using reverse code map
        StringBuilder decoded = new StringBuilder();
        String temp = "";
        for (int i = 0; i < binaryString.length(); i++) {
            temp += binaryString.charAt(i);
            if (reverseCodeMap.containsKey(temp)) {
                decoded.append(reverseCodeMap.get(temp));
                temp = "";
            }
        }
        return decoded.toString();
    }


    public Map<Character, String> getHuffmanCode() {
        return huffmanCode;
    }

}
