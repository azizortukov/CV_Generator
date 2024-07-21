package uz.anas.cv_gen.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private String firstName;
    private String lastName;
    private Integer age;
    private String[] technologies;
    private DetailsDto[] educations;
    private DetailsDto[] experiences;

}
