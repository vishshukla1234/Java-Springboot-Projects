package com.vishal.resumebuilder.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.vishal.resumebuilder.document.Resume;
import com.vishal.resumebuilder.dto.AuthResponse;
import com.vishal.resumebuilder.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileUploadService {

    private final Cloudinary cloudinary;
    private final AuthService authService;
    private final ResumeRepository resumeRepository;

    public Map<String, String> uploadSingleImage(MultipartFile file) throws IOException {
        Map<String, Object> imageUploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("resource_type", "image"));
        log.info("Inside FileUploadService - uploadSingleImage() {}", imageUploadResult.get("secure_url").toString());
        return Map.of("image_url", imageUploadResult.get("secure_url").toString());
//        Map<String, String> result = imageUploadResult.get("secure_url");
    }

    public Map<String, String> uploadResumeImages(String resumeId, @Nullable Object principal, MultipartFile thumbnail, MultipartFile profileImage) throws IOException {
        //step 1: get the current profile
        AuthResponse response = authService.getProfile(principal);

        //step 2: get the existing resume
        Resume existingResume = resumeRepository.findByUserIdAndId(response.getId(), resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found!!"));

        //step 3: upload the resume images and set the resume
        Map<String, String> returnValue = new HashMap<>();
        Map<String, String> uploadResult;

        if (Objects.nonNull(thumbnail)) {
            uploadResult = uploadSingleImage(thumbnail);
            existingResume.setThumbnailLink(uploadResult.get("image_url"));
            returnValue.put("thumbnailLink", uploadResult.get("image_url"));
        }

        if (Objects.nonNull(profileImage)) {
            uploadResult = uploadSingleImage(profileImage);
            if (Objects.isNull(existingResume.getProfileInfo())) {
                existingResume.setProfileInfo(new Resume.ProfileInfo());
            }
            existingResume.getProfileInfo().setProfilePreviewUrl(uploadResult.get("image_url"));
            returnValue.put("profilePreviewUrl", uploadResult.get("image_url"));

        }

        //step4: update the details into DB
        resumeRepository.save(existingResume);
        returnValue.put("message", "Image is uploaded successfully");

        //step 5: return the result
        return returnValue;
    }
}
