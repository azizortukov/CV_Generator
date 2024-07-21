package uz.anas.cv_gen.controller;

import jakarta.servlet.annotation.MultipartConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import uz.anas.cv_gen.service.CVService;

@Controller
@RequestMapping("/api/generate_cv")
@MultipartConfig
@RequiredArgsConstructor
public class CvController {

    private final CVService cvService;

    @PostMapping
    public HttpEntity<?> generateCv(@RequestParam(value = "file") MultipartFile file, @RequestParam("details") String detailsJson) {
        return cvService.generateCVHtml(detailsJson, file);
    }

}
