package com.SpringbootCompressor.FileCompressor.Model;

import lombok.Data;

@Data
public class CompressionResponse {
    private int originalSize;
    private int compressedSize;
    private byte[] compressedData;

//    public CompressionResponse(int originalSize, int compressedSize, String compressedData) {
//        this.originalSize = originalSize;
//        this.compressedSize = compressedSize;
//        this.compressedData = compressedData;
//    }

    public CompressionResponse(byte[] compressedData) {
        this.compressedData = compressedData;
    }
}
