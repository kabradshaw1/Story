package Kyle.backend.controller;

import static org.mockito.Mockito.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import Kyle.backend.entity.Character;

@SpringBootTest
@AutoConfigureMockMvc
public class CharacterControllerTest {

  @Autowired
  private MockMvc mockMvc;
}
