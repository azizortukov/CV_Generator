package uz.anas.cv_gen.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DetailsDto {

    private String name;
    private String fromDate;
    private String toDate;
    private String description;
    private long totalMonth;

    public String formatter(String localDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("MMMM yyyy");
        LocalDate parsed = LocalDate.parse(localDate, formatter);
        return parsed.format(outputFormatter);
    }

}
