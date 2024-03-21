// package Kyle.backend.resolvers;

// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.http.MediaType;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.ResultActions;
// import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

// @SpringBootTest
// @AutoConfigureMockMvc
// public class ResolverTest {
//   @Autowired
//   private MockMvc mockMvc;

//   @Test
//   public void testCharacterQuery() throws Exception {
//     String graphqlQuery = """
//       {
//         "query": "{character(title: \\"test title\\") {title body}}"
//       }
//       """;
//     ((ResultActions) ((MockHttpServletRequestBuilder) mockMvc.perform(post("/graphql")))
//       .contentType(MediaType.APPLICATION_JSON)
//       .content(graphqlQuery))
//       .andExpect(status().isOk())
//       .andExpect(jsonPaßth("$.data.character.title").value("test title"));
//   }
// }
