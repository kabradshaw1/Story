package Kyle.backend.exception.user;

public class InvalidLoginException extends RuntimeException {
  public InvalidLoginException() {
    super("Invalid login credentials.");
  }

  public InvalidLoginException(String message) {
      super(message);
  }

  public InvalidLoginException(String message, Throwable cause) {
      super(message, cause);
  }
}
