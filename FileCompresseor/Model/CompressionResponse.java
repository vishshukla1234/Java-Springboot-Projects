package com.MyProject.FileCompressor.Model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class CompressionResponse {
    private int compressedSize;
    private int originalSize;
    private byte[] compressedData;

    public CompressionResponse(byte[] compressedData, int originalSize, int compressedSize) {
        this.compressedData = compressedData;
        this.originalSize = originalSize;
        this.compressedSize = compressedSize;
    }
}
