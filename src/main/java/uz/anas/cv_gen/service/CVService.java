package uz.anas.cv_gen.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.itextpdf.html2pdf.HtmlConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import uz.anas.cv_gen.dto.UserDto;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class CVService {

    private final SpringTemplateEngine templateEngine;

    public HttpEntity<?> generateCVHtml(String detailsJson, MultipartFile file) {
        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            Context context = new Context();
            UserDto user = new ObjectMapper().readValue(detailsJson, UserDto.class);
            String base64Image = Base64.getEncoder().encodeToString(file.getBytes());

            context.setVariable("avatar", base64Image);
            context.setVariable("user", user);
            String html = templateEngine.process("cv", context);
            HtmlConverter.convertToPdf(new ByteArrayInputStream(html.getBytes(StandardCharsets.UTF_8)), outputStream);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "cv.pdf");
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(outputStream.toByteArray());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //TODO format the details experience and study time like this
    public void formatDatesAndCalculateMonths(String from, String to) {
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("MMMM yyyy");

        LocalDate fromDate = LocalDate.parse(from, inputFormatter);
        LocalDate toDate = LocalDate.parse(to, inputFormatter);

        String formattedFromDate = fromDate.format(outputFormatter);
        String formattedToDate = toDate.format(outputFormatter);

        long monthsBetween = ChronoUnit.MONTHS.between(
                fromDate.withDayOfMonth(1),
                toDate.withDayOfMonth(1)
        );

    }
}
