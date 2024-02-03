package Kyle.backend.controller;

import static org.mockito.Mockito.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import Kyle.backend.entity.Character;
import Kyle.backend.service.CharacterService;

@SpringBootTest
@AutoConfigureMockMvc
public class CharacterControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private CharacterService characterService;
}
