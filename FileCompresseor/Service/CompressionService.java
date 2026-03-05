package com.MyProject.FileCompressor.Service;

import com.MyProject.FileCompressor.Util.HuffmanCompressor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.io.IOException;
import java.util.Map;

@Service
public class CompressionService {
    private final HuffmanCompressor huffmanCompressor = new HuffmanCompressor();
    private Map<String, Character> reverseCodeMap;

    public ResponseEntity<byte[]> compressText(MultipartFile file) {
        try {
            String text = new String(file.getBytes(), StandardCharsets.UTF_8);
            int originalSize = text.getBytes().length;

            byte[] compressed = huffmanCompressor.compress(text);
            int compressedSize = compressed.length;

            System.out.println("Original Size: " + originalSize);
            System.out.println("Compressed Size: " + compressedSize);
            reverseCodeMap = huffmanCompressor.getReverseCodeMap();

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment")
                    .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                    .body(compressed);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    public ResponseEntity<byte[]> decompressText(MultipartFile file) {
        try {
            byte[] compressedData = file.getBytes();
            String originalText = huffmanCompressor.decompress(compressedData, reverseCodeMap);
            byte[] decompressedBytes = originalText.getBytes(StandardCharsets.UTF_8);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment")
                    .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                    .body(decompressedBytes);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
