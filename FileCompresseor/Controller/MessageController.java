package com.SpringbootCompressor.FileCompressor.Controller;

import com.SpringbootCompressor.FileCompressor.Service.CompressionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/compress")
public class MessageController {

    @Autowired
    private CompressionService compressionService;

    // Compress text and return downloadable file
    @PostMapping(value = "/compressText", consumes = "text/plain")
    public ResponseEntity<byte[]> compressText(@RequestBody String text) {
        return compressionService.compressText(text);
    }

    // Decompress uploaded compressed data and return original file
    @GetMapping("/decompressText")
    public ResponseEntity<byte[]> decompressText(@RequestBody byte[] compressedData) {
        return compressionService.decompressText(compressedData);
    }
}
