package Kyle.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import Kyle.backend.service.JwtService;

@WebMvcTest
@Import({SecurityConfig.class, JwtAuthenticationFilter.class})
public class JwtAuthenticationFilterTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private JwtService jwtService;


}
