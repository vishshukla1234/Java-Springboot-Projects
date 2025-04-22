package com.SpringbootCompressor.FileCompressor.Service;

import com.SpringbootCompressor.FileCompressor.Model.CompressionResponse;
import com.SpringbootCompressor.FileCompressor.Util.HuffmanCompressor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Map;

@Service

public class CompressionService {
    private final HuffmanCompressor huffmanCompressor = new HuffmanCompressor();
    private Map<String, Character> reverseCodeMap;

    @PostMapping("/compressText")
    public ResponseEntity<byte[]> compressText(@RequestBody String text) {
        byte[] compressed = huffmanCompressor.compress(text);
        reverseCodeMap = huffmanCompressor.getReverseCodeMap(); // capture the map here

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=compressed.txt")
                .body(compressed);
    }

    @PostMapping("/decompressText")
    public ResponseEntity<byte[]> decompressText(@RequestBody byte[] compressedData) {
        String originalText = huffmanCompressor.decompress(compressedData, reverseCodeMap);
        byte[] decompressedBytes = originalText.getBytes(StandardCharsets.UTF_8); // convert string to bytes

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=decompressed.txt")
                .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                .body(decompressedBytes);
    }



}
