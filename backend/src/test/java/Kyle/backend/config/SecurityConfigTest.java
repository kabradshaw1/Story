package Kyle.backend.config;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class SecurityConfigTest {

  @Autowired
  private MockMvc mockMvc;

  @Test
  public void postMethodWithoutAuthTokenShouldBeDenied() throws Exception {
    mockMvc.perform(post("/api/resource"))
      .andExpect(status().isForbidden());
  }
}
