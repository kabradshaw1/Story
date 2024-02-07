package Kyle.backend.exception.user;

public class UsernameAlreadyExistsException extends RuntimeException {
  public UsernameAlreadyExistsException(String message) {
    super(message);
  }

}
