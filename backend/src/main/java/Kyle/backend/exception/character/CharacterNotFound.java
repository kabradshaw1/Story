package Kyle.backend.exception.character;

public class CharacterNotFound extends RuntimeException {
  public CharacterNotFound(String message) {
    super(message);
  }
}
