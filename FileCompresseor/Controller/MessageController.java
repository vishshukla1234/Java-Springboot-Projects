package com.MyProject.FileCompressor.Controller;

import com.MyProject.FileCompressor.Model.CompressionResponse;
import com.MyProject.FileCompressor.Service.CompressionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class MessageController {
    @Autowired
    private CompressionService compressionService;
    private CompressionResponse compressionResponse;

    @PostMapping(value="/compressText", consumes = "multipart/form-data")
    public ResponseEntity<byte []> compressText(@RequestParam("file") MultipartFile file) {
        System.out.println("Compress endpoint hit. File name: " + file.getOriginalFilename());
        return compressionService.compressText(file);
    }

    @PostMapping(value="/decompressText", consumes = "multipart/form-data")
    public ResponseEntity<byte []> decompressText(@RequestParam("file") MultipartFile file) {
        System.out.println("Received file with size: " + file.getSize());
        return compressionService.decompressText(file);
    }
}
